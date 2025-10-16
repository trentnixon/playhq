# Development Roadmap – Season Tracking

This file tracks **progress, priorities, and recommendations** for the Season Tracking feature.

---

## ✅ Completed

- [x] Basic fixture listing by month
- [x] Upcoming fixtures view
- [x] Team statistics display (wins, losses, form, games played)
- [x] Club listing for associations
- [x] Tabbed interface (Fixtures vs Teams/Clubs)
- [x] Calendar view component for fixtures
- [x] Account type detection (Association vs Club)
- [x] Empty state messaging
- [x] Previous fixtures view with tab toggle (TKT-2025-001)
- [x] Next fixture highlighting with badge and enhanced styling (TKT-2025-002)
- [x] Calendar grid view for fixtures (TKT-2025-003)
- [x] Search and filter functionality for fixtures (TKT-2025-004)
- [x] Fixture detail modal view (TKT-2025-005)

---

## ⏳ To Do (easy → hard)

_(All current requirements have been completed)_

---

## 🚫 Not Required / Out of Scope

The following items were documented during initial planning but are not required for this feature:

1. **Real-time Score Updates** (TKT-2025-006)

   - Real-time data not part of current service offering

2. **Export to Calendar** (TKT-2025-007)

   - Not required for current user workflow

3. **Fixture Notifications** (TKT-2025-008)
   - Not required for current feature set

---

## 💡 Recommendations

- Consider adding loading skeletons instead of simple "Loading..." text for better UX
- The WHY CAN'T I SEE A TEAM section is currently commented out - consider re-enabling as an FAQ accordion
- Add error boundary components to handle API failures gracefully
- Consider pagination or virtual scrolling for organizations with many fixtures
- Add analytics tracking for user interactions (fixture views, tab switches)
- Improve mobile responsiveness for table views
- Add data refresh interval or manual refresh button
- Consider adding team performance graphs/charts
- Implement fixture sharing functionality (social media, links)
- Add comparison view between teams

---

### Notes

- Last updated: 2025-10-16
- All required features completed: TKT-2025-001 through TKT-2025-005
- Tickets TKT-2025-006 through TKT-2025-008 marked as not required
- Main page location: `pages/members/tracking.js`
