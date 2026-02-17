# Specification

## Summary
**Goal:** Add a premium, glassmorphism-style Doctor Profile Dashboard page with a responsive 3-column profile card, sample doctor data, and subtle UI animations, integrated into the existing authenticated doctor route flow.

**Planned changes:**
- Build a dashboard page with a full-width soft-blue medical hero background and a centered glassmorphism profile card (rounded corners, backdrop blur, soft shadow) in a 3-column desktop layout that stacks on mobile.
- Implement left column content: circular doctor photo, hospital name, phone, email, location, 5-star rating display, primary blue “Contact Now” button, and destructive red “Hire Doctor” button.
- Implement center column content: large doctor name, specialization, years of experience, skills list, green “Available Now” badge, and working hours.
- Implement right column content: About section and a compact map preview with a visible location pin.
- Add animations: card fade-in on load, button hover scale, star rating animation, and pulsing availability badge.
- Populate the UI with English dummy data including “Dr. Anil Kapoor” (Neurosurgeon, 12 years experience).
- Integrate into existing doctor routes without breaking Internet Identity auth gating and existing profile setup dialog behavior.
- Add and reference any needed static images from `frontend/public/assets/generated` (no backend image serving).

**User-visible outcome:** Authenticated doctor users can view a new premium Doctor Profile Dashboard with a glassmorphism 3-column layout (mobile-friendly), animated UI elements, and populated sample profile details; unauthenticated users are redirected as before.
