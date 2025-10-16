# Completed Tickets

- TKT-2025-001

---

# Active Tickets

_(No active tickets at this time)_

---

# Summaries of Completed Tickets

### TKT-2025-001

---

ID: TKT-2025-001
Status: Completed
Priority: High
Owner: Development Team
Created: 2025-10-15
Updated: 2025-10-15
Related: Roadmap-Account-Settings

---

**Overview:**
Add a new "Account" settings option to allow users to view and update their user account settings and find account-related information.

**Completion Summary:**

Successfully implemented account settings page with the following features:

**What was done:**

- Created new account settings card in the settings dashboard with IconUserCircle
- Built dedicated account settings page at `/members/settings/account/`
- Created custom `useUserDetails` hook to fetch full user data from Strapi
- Implemented three component sections:
  1. **AccountInformation**: Displays username, email, account ID, account type, organization, member since date, and account status
  2. **SubscriptionInformation**: Shows subscription plan details, pricing, billing period, trial status, delivery day, and onboarding status with link to manage subscription
  3. **AccountPreferences**: Provides editable settings for grouping assets and junior surname preferences
- Added proper loading states, error handling, and secure route protection
- Maintained design consistency with existing settings pages using RoundedSectionContainer and Mantine components

**Impact of the change:**
Users can now view comprehensive account information in one centralized location, manage basic account preferences, and access subscription management directly from the settings. This improves user experience by providing transparency and easy access to account details without navigating through multiple pages.
