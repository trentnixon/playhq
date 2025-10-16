# Tickets – Season Tracking Feature

---

## Completed Tickets

- TKT-2025-001
- TKT-2025-002
- TKT-2025-003
- TKT-2025-004
- TKT-2025-005

---

## Cancelled / Not Required Tickets

- TKT-2025-006 (Real-time scores not part of service)
- TKT-2025-007 (Export not required)
- TKT-2025-008 (Notifications not required)

---

# Active Tickets

_(None - all required features completed)_

---

## TKT-2025-001: Enable Previous Fixtures View

---

ID: TKT-2025-001
Status: Completed
Priority: Medium
Owner: Development Team
Created: 2025-10-16
Updated: 2025-10-16
Related: Roadmap Item #1

---

### Overview

Add ability to view past/previous fixtures that have already been played.

### Completion Summary

Implemented tabbed interface in `ListFixtures.js` allowing users to switch between "Upcoming Fixtures" and "Previous Fixtures" views. Previous fixtures are styled with reduced opacity (0.7) and gray color to visually differentiate them from upcoming games. The implementation uses Mantine Tabs component with calendar and history icons for clear navigation.

---

## TKT-2025-002: Highlight Next Fixture

---

ID: TKT-2025-002
Status: Completed
Priority: Low
Owner: Development Team
Created: 2025-10-16
Updated: 2025-10-16
Related: Roadmap Item #2

---

### Overview

Enhance the visual highlighting of the next upcoming fixture in the fixture table.

### Completion Summary

Enhanced next fixture highlighting with multiple visual cues: light blue background (#e7f5ff), 4px blue left border (#228be6), bold team names (font-weight: 600), and a prominent "Next Game" badge with clock icon. Added ARIA label for screen reader accessibility. All fixtures occurring on the next upcoming date are automatically highlighted using date comparison logic to handle multiple games on the same day.

---

## TKT-2025-003: Integrate Games Calendar View

---

ID: TKT-2025-003
Status: Completed
Priority: Medium
Owner: Development Team
Created: 2025-10-16
Updated: 2025-10-16
Related: Roadmap Item #3

---

### Overview

The `GamesCalendar.js` component exists and provides a calendar grid view of fixtures. Integrate it as an alternative view option.

### Completion Summary

Added Calendar View as a third tab option in the fixtures interface. Users can now switch between Upcoming Fixtures (list), Previous Fixtures (list), and Calendar View (grid). The calendar displays fixtures as date cards in a responsive grid, showing the month, day number, and fixture count with hover tooltips containing team matchups. Past dates appear grayed with reduced opacity, the next upcoming date is highlighted in blue, and future dates use gray styling.

---

## TKT-2025-004: Add Fixture Filtering and Search

---

ID: TKT-2025-004
Status: Completed
Priority: High
Owner: Development Team
Created: 2025-10-16
Updated: 2025-10-16
Related: Roadmap Item #4

---

### Overview

Add filtering and search capabilities to help users find specific fixtures, teams, or date ranges quickly in large fixture lists.

### Completion Summary

Implemented comprehensive filtering system with search by team name (home or away) and date range picker. Filter UI appears in a Paper component above the tabs with search input, date range picker, and clear filters button. Filtering works across all three views (Upcoming, Previous, Calendar). Shows filtered results count when filters are active. Real-time filtering as users type or select dates. Filters are managed via React state and apply to all game data before splitting into upcoming/previous views.

---

## TKT-2025-005: Team and Fixture Detail Views

---

ID: TKT-2025-005
Status: Completed
Priority: Medium
Owner: Development Team
Created: 2025-10-16
Updated: 2025-10-16
Related: Roadmap Item #5

---

### Overview

Add detailed view capabilities for individual fixtures, showing more comprehensive information when a user clicks on a game.

### Completion Summary

Created FixtureDetailModal component that displays fixture details in a centered modal. Fixture rows are now clickable with hover effects (gray background on hover, cursor pointer). Modal shows team matchup (Home vs Away) with VS icon, date information, and Next Game badge if applicable. Modal can be closed via backdrop click or close button. Includes smooth transitions and responsive design. Ready to be extended with additional data like venue, scores, and statistics when available from backend.

---

## TKT-2025-006: Real-time Score Updates

---

ID: TKT-2025-006
Status: Cancelled - Not Required
Priority: Low
Owner: Development Team
Created: 2025-10-16
Updated: 2025-10-16
Related: Roadmap Item #6

---

### Overview

Implement live score updates during game days to show real-time match progress and results.

### Cancellation Reason

Real-time score updates are not part of the current service offering. The application does not process or display live scores during matches.

### What We Need to Do

Integrate with score data sources to display live and final scores for fixtures.

### Phases & Tasks

#### Phase 1: Research and Planning

- [ ] Research available score data sources/APIs
- [ ] Determine data update frequency needs
- [ ] Plan WebSocket vs polling strategy
- [ ] Assess backend requirements

#### Phase 2: Backend Integration

- [ ] Integrate with score data provider
- [ ] Set up real-time data pipeline
- [ ] Create score update endpoints
- [ ] Implement caching strategy

#### Phase 3: Frontend Implementation

- [ ] Add score display to fixture components
- [ ] Implement real-time update mechanism
- [ ] Add live indicator for ongoing matches
- [ ] Style score displays appropriately

#### Phase 4: User Experience

- [ ] Add notifications for score updates
- [ ] Implement auto-refresh toggle
- [ ] Add manual refresh button
- [ ] Show match status (not started, live, finished)

#### Phase 5: Testing

- [ ] Test real-time updates
- [ ] Verify performance with multiple live matches
- [ ] Test connection handling and reconnection
- [ ] Check mobile battery/data impact

### Constraints, Risks, Assumptions

- **Constraints**: Depends on external score data availability
- **Assumptions**: Score data APIs are reliable and affordable
- **Risks**: Real-time updates might increase server load significantly

---

## TKT-2025-007: Export Fixtures to Calendar

---

ID: TKT-2025-007
Status: Cancelled - Not Required
Priority: Medium
Owner: Development Team
Created: 2025-10-16
Updated: 2025-10-16
Related: Roadmap Item #7

---

### Overview

Allow users to export fixtures to calendar applications (iCal format, Google Calendar, Outlook, etc.).

### Cancellation Reason

Export to calendar functionality is not required for the current user workflow and feature set.

### What We Need to Do

Implement export functionality that generates calendar files or links for importing fixtures into external calendar applications.

### Phases & Tasks

#### Phase 1: Format Research

- [ ] Research iCal format requirements
- [ ] Investigate Google Calendar integration
- [ ] Check Outlook calendar compatibility
- [ ] Determine best export formats to support

#### Phase 2: Export Generation

- [ ] Implement iCal file generation
- [ ] Add fixture-to-calendar-event conversion logic
- [ ] Include venue, time, teams in calendar events
- [ ] Generate download functionality

#### Phase 3: Integration Options

- [ ] Add Google Calendar direct integration
- [ ] Add "Add to Calendar" buttons per fixture
- [ ] Create bulk export option for all fixtures
- [ ] Add selective export (filtered fixtures only)

#### Phase 4: User Interface

- [ ] Add export button to UI
- [ ] Design export options modal
- [ ] Add success/error messaging
- [ ] Create help documentation for export feature

#### Phase 5: Testing

- [ ] Test iCal file generation accuracy
- [ ] Verify imports in multiple calendar apps
- [ ] Test timezone handling
- [ ] Check large fixture set exports

### Constraints, Risks, Assumptions

- **Constraints**: Calendar format standards must be followed precisely
- **Assumptions**: Users want fixtures in their personal calendars
- **Risks**: Timezone conversions might cause confusion

---

## TKT-2025-008: Fixture Notifications and Reminders

---

ID: TKT-2025-008
Status: Cancelled - Not Required
Priority: High
Owner: Development Team
Created: 2025-10-16
Updated: 2025-10-16
Related: Roadmap Item #8

---

### Overview

Implement notification system for upcoming fixtures, sending reminders to users before their games.

### Cancellation Reason

Fixture notifications and reminders are not required for the current feature set. Users can view fixtures on-demand through the tracking interface.

### What We Need to Do

Build notification infrastructure to alert users about upcoming fixtures via email, push notifications, or in-app alerts.

### Phases & Tasks

#### Phase 1: Planning

- [ ] Define notification types (email, push, SMS, in-app)
- [ ] Determine notification timing (24h before, 1h before, etc.)
- [ ] Plan user preference settings
- [ ] Assess backend notification service requirements

#### Phase 2: Backend Infrastructure

- [ ] Set up notification service
- [ ] Create scheduled job for fixture reminders
- [ ] Build notification templates
- [ ] Implement user preferences storage

#### Phase 3: Email Notifications

- [ ] Design email templates for fixture reminders
- [ ] Implement email sending logic
- [ ] Add unsubscribe functionality
- [ ] Test email delivery

#### Phase 4: Push Notifications

- [ ] Research push notification service (e.g., Firebase)
- [ ] Implement push notification registration
- [ ] Build push notification sending logic
- [ ] Handle notification permissions

#### Phase 5: User Preferences

- [ ] Create notification settings UI
- [ ] Add per-team notification toggles
- [ ] Implement notification timing preferences
- [ ] Add quiet hours settings

#### Phase 6: Testing

- [ ] Test notification delivery timing
- [ ] Verify notification content accuracy
- [ ] Test unsubscribe functionality
- [ ] Check across multiple devices/browsers

### Constraints, Risks, Assumptions

- **Constraints**: Email delivery depends on third-party services
- **Assumptions**: Users want reminders about their fixtures
- **Risks**: Notification fatigue if too many alerts are sent
- **Risks**: Push notifications require user permission which may be denied

---

# Summaries of Completed Tickets

### TKT-2025-001

Implemented tabbed interface in `ListFixtures.js` allowing users to switch between "Upcoming Fixtures" and "Previous Fixtures" views. Previous fixtures are styled with reduced opacity (0.7) and gray color to visually differentiate them from upcoming games. The implementation uses Mantine Tabs component with calendar and history icons for clear navigation.

### TKT-2025-002

Enhanced next fixture highlighting with multiple visual cues: light blue background (#e7f5ff), 4px blue left border (#228be6), bold team names (font-weight: 600), and a prominent "Next Game" badge with clock icon. Added ARIA label for screen reader accessibility. All fixtures occurring on the next upcoming date are automatically highlighted (handles multiple games on the same day).

### TKT-2025-003

Added Calendar View as a third tab option in the fixtures interface. Users can now switch between Upcoming Fixtures (list), Previous Fixtures (list), and Calendar View (grid). The calendar displays fixtures as date cards in a responsive grid, showing the month, day number, and fixture count with hover tooltips containing team matchups. Past dates appear grayed with reduced opacity, the next upcoming date is highlighted in blue, and future dates use gray styling.

### TKT-2025-004

Implemented comprehensive filtering system with search by team name (home or away) and date range picker. Filter UI appears in a Paper component above the tabs with search input, date range picker, and clear filters button. Filtering works across all three views (Upcoming, Previous, Calendar). Shows filtered results count when filters are active. Real-time filtering as users type or select dates.

### TKT-2025-005

Created FixtureDetailModal component that displays fixture details in a centered modal. Fixture rows are now clickable with hover effects (gray background on hover, cursor pointer). Modal shows team matchup (Home vs Away) with VS icon, date information, and Next Game badge if applicable. Modal can be closed via backdrop click or close button. Ready to be extended with additional data when available.
