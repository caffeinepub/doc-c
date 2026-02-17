# Specification

## Summary
**Goal:** Build the DOC C app shell and core Doctor, Hospital Admin, and System Administrator modules with a consistent medical-themed UI, key workflows, and a Motoko backend for persisted CRUD data.

**Planned changes:**
- Create a responsive application shell with global navigation and client-side routing for Doctor, Hospital, and Admin modules (registration, login, dashboards, analytics, subscription/payments).
- Apply a consistent blue/white medical UI theme with modern cards/dashboards and subtle animations (toggles, notifications, modals, payment success).
- Implement Doctor module UIs: Registration (including simulated OTP flow, specialization dropdown with animated heart indicator, and profile photo upload preview), Login (dummy session), and Dashboard (profile card, animated heart specialization, availability toggle, edit profile, notifications, applied jobs).
- Implement Hospital module UIs: Registration, Dashboard (overview metrics, search/filters, emergency mode toggle, doctor list with Hire action), Analytics (charts + insight cards), and Subscription/Payments (plans, UPI/card dummy flows, auto-renew toggle, invoice download, payment history, success animation).
- Implement Admin module UIs: view doctors/hospitals, approve/reject profiles, manage subscription plans, and monitor payments (dummy data/UI-driven actions).
- Implement end-to-end dummy workflow with simulated real-time UI updates via polling/interval refresh (hire requests, notifications, accept/reject, cross-dashboard status updates), backed by seed dummy data.
- Add a single Motoko backend actor with stable storage CRUD methods for doctors, hospitals, hire requests, notifications, subscriptions, and payments; integrate frontend data access via React Query with loading/error states.
- Add generated static brand assets under `frontend/public/assets/generated` and wire them into the header and at least one auth screen.

**User-visible outcome:** Users can navigate between Doctor, Hospital, and Admin areas; register/login and use dashboards; hospitals can subscribe, search and hire; doctors receive and respond to notifications; admins can review entities and manage plans/payments, with data persisted via the Motoko actor and updated in the UI via polling.
