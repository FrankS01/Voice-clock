---
id: VC-4
title: 'Timezone utility: user-friendly timezone list for autocomplete'
status: To Do
assignee: []
created_date: '2026-06-07 19:18'
labels:
  - utility
  - commands
milestone: m-0
dependencies:
  - VC-1
priority: medium
ordinal: 4000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Create src/utils/timezones.ts that provides a curated, user-friendly timezone list suitable for a discord.js slash command autocomplete option.

Requirements:
- Use the IANA timezone database (available via Intl or a library like luxon/date-fns-tz).
- Each entry should have a display label (e.g., "Europe/Amsterdam (UTC+2)") and a value (the IANA key).
- The autocomplete handler must filter the list by the user's partial input (case-insensitive substring match on both continent/city and UTC offset).
- Discord autocomplete is limited to 25 results — return at most 25 matches.
- The stored value in the DB is always the raw IANA key.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 getTimezoneChoices(query) returns at most 25 ApplicationCommandOptionChoiceData objects
- [ ] #2 Filtering works by partial city name, continent, or UTC offset string
- [ ] #3 Each choice value is a valid IANA timezone string
- [ ] #4 Empty query returns a useful default set (e.g., common timezones)
- [ ] #5 The list covers all major IANA timezones
<!-- AC:END -->
