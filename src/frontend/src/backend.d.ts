import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface HireRequest {
    id: bigint;
    status: string;
    doctorPrincipal: Principal;
    timestamp: bigint;
    details: string;
    hospitalPrincipal: Principal;
}
export interface UserApprovalInfo {
    status: ApprovalStatus;
    principal: Principal;
}
export interface AggregatedData {
    topSpecialties: Array<[string, bigint]>;
}
export interface Hospital {
    principal: Principal;
    name: string;
    size: string;
    specialization: string;
    location: string;
}
export interface Notification {
    id: bigint;
    principal: Principal;
    message: string;
    timestamp: bigint;
}
export interface Doctor {
    principal: Principal;
    name: string;
    languages: Array<string>;
    experience: bigint;
    specialty: string;
    availability: Array<bigint>;
    certifications: Array<string>;
    consultationFee: bigint;
    location: string;
}
export interface ComparisonResult {
    status: string;
    differences: Array<string>;
}
export interface UserProfile {
    name: string;
    profileType: string;
}
export enum ApprovalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    compareAggregatedData(): Promise<Array<ComparisonResult>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDoctor(principal: Principal): Promise<Doctor>;
    getHireRequests(): Promise<Array<HireRequest>>;
    getHospital(principal: Principal): Promise<Hospital>;
    getNotifications(): Promise<Array<Notification>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isCallerApproved(): Promise<boolean>;
    listAggregatedData(): Promise<Array<AggregatedData>>;
    listApprovals(): Promise<Array<UserApprovalInfo>>;
    listDoctors(): Promise<Array<Doctor>>;
    listHospitals(): Promise<Array<Hospital>>;
    registerDoctor(name: string, specialty: string, experience: bigint, location: string, languages: Array<string>, certifications: Array<string>, availability: Array<bigint>, consultationFee: bigint): Promise<void>;
    registerHospital(name: string, specialization: string, location: string, size: string): Promise<void>;
    requestApproval(): Promise<void>;
    respondToHireRequest(requestId: bigint, response: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    sendHireRequest(doctorPrincipal: Principal, details: string): Promise<void>;
    setApproval(user: Principal, status: ApprovalStatus): Promise<void>;
}
