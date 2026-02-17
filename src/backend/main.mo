import Map "mo:core/Map";
import Array "mo:core/Array";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Text "mo:core/Text";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import UserApproval "user-approval/approval";

actor {
  // Role & Approval Management
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let approvalState = UserApproval.initState(accessControlState);

  // Types
  public type UserProfile = {
    name : Text;
    profileType : Text; // "doctor" or "hospital"
  };

  public type Doctor = {
    principal : Principal;
    name : Text;
    specialty : Text;
    experience : Nat;
    location : Text;
    languages : [Text];
    certifications : [Text];
    availability : [Nat]; // Time slots
    consultationFee : Nat;
  };

  public type Hospital = {
    principal : Principal;
    name : Text;
    specialization : Text;
    location : Text;
    size : Text;
  };

  public type HireRequest = {
    id : Nat;
    doctorPrincipal : Principal;
    hospitalPrincipal : Principal;
    details : Text;
    status : Text;
    timestamp : Int;
  };

  public type Notification = {
    id : Nat;
    principal : Principal;
    message : Text;
    timestamp : Int;
  };

  public type ComparisonResult = {
    status : Text;
    differences : [Text];
  };

  module ComparisonResult {
    public func compare(result1 : ComparisonResult, result2 : ComparisonResult) : Order.Order {
      switch (Text.compare(result1.status, result2.status)) {
        case (#equal) {
          #equal;
        };
        case (order) { order };
      };
    };
  };

  public type AggregatedData = {
    topSpecialties : [(Text, Nat)];
  };

  module AggregatedData {
    public func compare(data1 : AggregatedData, data2 : AggregatedData) : Order.Order {
      switch (Nat.compare(data1.topSpecialties.size(), data2.topSpecialties.size())) {
        case (#equal) { #equal };
        case (order) { order };
      };
    };
  };

  // Persistent State
  let userProfiles = Map.empty<Principal, UserProfile>();
  let doctors = Map.empty<Principal, Doctor>();
  let hospitals = Map.empty<Principal, Hospital>();
  var hireRequests = List.empty<HireRequest>();
  var notifications = List.empty<Notification>();

  var nextHireRequestId = 1;
  var nextNotificationId = 1;

  // User Profile Management (Required by frontend)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // CRUD Operations
  public shared ({ caller }) func registerDoctor(
    name : Text,
    specialty : Text,
    experience : Nat,
    location : Text,
    languages : [Text],
    certifications : [Text],
    availability : [Nat],
    consultationFee : Nat,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can register as doctors");
    };

    if (not UserApproval.isApproved(approvalState, caller)) {
      Runtime.trap("Doctor not approved");
    };

    let doctor : Doctor = {
      principal = caller;
      name;
      specialty;
      experience;
      location;
      languages;
      certifications;
      availability;
      consultationFee;
    };

    doctors.add(caller, doctor);

    // Update user profile
    let profile : UserProfile = {
      name;
      profileType = "doctor";
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func registerHospital(name : Text, specialization : Text, location : Text, size : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can register as hospitals");
    };

    if (not UserApproval.isApproved(approvalState, caller)) {
      Runtime.trap("Hospital not approved");
    };

    let hospital : Hospital = {
      principal = caller;
      name;
      specialization;
      location;
      size;
    };

    hospitals.add(caller, hospital);

    // Update user profile
    let profile : UserProfile = {
      name;
      profileType = "hospital";
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getDoctor(principal : Principal) : async Doctor {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view doctor profiles");
    };

    switch (doctors.get(principal)) {
      case (null) { Runtime.trap("Doctor not found") };
      case (?doctor) { doctor };
    };
  };

  public query ({ caller }) func getHospital(principal : Principal) : async Hospital {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view hospital profiles");
    };

    switch (hospitals.get(principal)) {
      case (null) { Runtime.trap("Hospital not found") };
      case (?hospital) { hospital };
    };
  };

  public query ({ caller }) func listDoctors() : async [Doctor] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can list doctors");
    };

    doctors.values().toArray();
  };

  public query ({ caller }) func listHospitals() : async [Hospital] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can list hospitals");
    };

    hospitals.values().toArray();
  };

  public shared ({ caller }) func sendHireRequest(doctorPrincipal : Principal, details : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can send hire requests");
    };

    if (not UserApproval.isApproved(approvalState, caller)) {
      Runtime.trap("Hospital not approved");
    };

    // Verify caller is a registered hospital
    switch (hospitals.get(caller)) {
      case (null) { Runtime.trap("Only registered hospitals can send hire requests") };
      case (?_) {};
    };

    // Verify target is a registered doctor
    switch (doctors.get(doctorPrincipal)) {
      case (null) { Runtime.trap("Target doctor not found") };
      case (?_) {};
    };

    let newRequest : HireRequest = {
      id = nextHireRequestId;
      doctorPrincipal;
      hospitalPrincipal = caller;
      details;
      status = "pending";
      timestamp = Time.now();
    };

    nextHireRequestId += 1;
    hireRequests.add(newRequest);

    let notification : Notification = {
      id = nextNotificationId;
      principal = doctorPrincipal;
      message = "New hire request from hospital";
      timestamp = Time.now();
    };

    nextNotificationId += 1;
    notifications.add(notification);
  };

  public shared ({ caller }) func respondToHireRequest(requestId : Nat, response : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can respond to hire requests");
    };

    // Verify caller is a registered doctor
    switch (doctors.get(caller)) {
      case (null) { Runtime.trap("Only registered doctors can respond to hire requests") };
      case (?_) {};
    };

    // Find the request
    var foundRequest : ?HireRequest = null;
    var newRequests = List.empty<HireRequest>();

    for (req in hireRequests.values()) {
      if (req.id == requestId) {
        // Verify ownership: caller must be the doctor who received the request
        if (req.doctorPrincipal != caller) {
          Runtime.trap("Unauthorized: You can only respond to your own hire requests");
        };

        foundRequest := ?req;

        // Update the request status
        let updatedRequest : HireRequest = {
          id = req.id;
          doctorPrincipal = req.doctorPrincipal;
          hospitalPrincipal = req.hospitalPrincipal;
          details = req.details;
          status = response;
          timestamp = req.timestamp;
        };
        newRequests.add(updatedRequest);

        // Send notification to hospital
        let notification : Notification = {
          id = nextNotificationId;
          principal = req.hospitalPrincipal;
          message = "Doctor responded to your request: " # response;
          timestamp = Time.now();
        };
        nextNotificationId += 1;
        notifications.add(notification);
      } else {
        newRequests.add(req);
      };
    };

    switch (foundRequest) {
      case (null) { Runtime.trap("Hire request not found") };
      case (?_) {
        hireRequests := newRequests;
      };
    };
  };

  public query ({ caller }) func getNotifications() : async [Notification] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view notifications");
    };

    notifications.values()
    |> _.filter(func(notif : Notification) : Bool { notif.principal == caller })
    |> _.toArray();
  };

  public query ({ caller }) func getHireRequests() : async [HireRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view hire requests");
    };

    // Return requests where caller is either the doctor or hospital
    hireRequests.values()
    |> _.filter(func(req : HireRequest) : Bool {
         req.doctorPrincipal == caller or req.hospitalPrincipal == caller
       })
    |> _.toArray();
  };

  public query ({ caller }) func compareAggregatedData() : async [ComparisonResult] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can compare aggregated data");
    };

    let result1 : ComparisonResult = {
      status = "stable";
      differences = [];
    };

    let result2 : ComparisonResult = {
      status = "changes detected";
      differences = ["Top specialty updated: Cardiology +3"];
    };

    [result1, result2].sort();
  };

  public query ({ caller }) func listAggregatedData() : async [AggregatedData] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view aggregated data");
    };

    let data1 : AggregatedData = {
      topSpecialties = [("Cardiology", 120), ("Neurology", 85), ("Pediatrics", 100)];
    };

    let data2 : AggregatedData = {
      topSpecialties = [("Cardiology", 110), ("Orthopedics", 75), ("Pediatrics", 95)];
    };

    [data1, data2].sort();
  };

  // Approval-based user management system functions
  public query ({ caller }) func isCallerApproved() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check approval status");
    };
    AccessControl.hasPermission(accessControlState, caller, #admin) or UserApproval.isApproved(approvalState, caller);
  };

  public shared ({ caller }) func requestApproval() : async () {
    UserApproval.requestApproval(approvalState, caller);
  };

  public shared ({ caller }) func setApproval(user : Principal, status : UserApproval.ApprovalStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.setApproval(approvalState, user, status);
  };

  public query ({ caller }) func listApprovals() : async [UserApproval.UserApprovalInfo] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.listApprovals(approvalState);
  };
};
