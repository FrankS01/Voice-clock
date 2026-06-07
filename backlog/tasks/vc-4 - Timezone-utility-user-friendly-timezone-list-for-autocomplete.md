---
id: VC-4
title: 'Timezone utility: user-friendly timezone list for autocomplete'
status: Done
assignee:
  - Frank
created_date: '2026-06-07 19:18'
updated_date: '2026-06-07 20:21'
labels:
  - utility
  - commands
milestone: m-0
dependencies:
  - VC-1
modified_files:
  - src/utils/timezones.ts
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
- [x] #1 getTimezoneChoices(query) returns at most 25 ApplicationCommandOptionChoiceData objects
- [x] #2 Filtering works by partial city name, continent, or UTC offset string
- [x] #3 Each choice value is a valid IANA timezone string
- [x] #4 Empty query returns a useful default set (e.g., common timezones)
- [x] #5 The list covers all major IANA timezones
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Create src/utils/timezones.ts\n   - Build full list at module load from Intl.supportedValuesOf('timeZone') with UTC offset labels\n   - Export getTimezoneChoices(query) — case-insensitive substring filter on name/offset, max 25 results\n   - Empty query returns curated default set of common timezones
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Created src/utils/timezones.ts. Full list built at module load from Intl.supportedValuesOf('timeZone') with UTC offset labels via Intl.DateTimeFormat shortOffset. getTimezoneChoices(query) does case-insensitive substring match on name+offset, caps at 25. Empty query returns 25 curated common timezones. Each choice value is the raw IANA key.
<!-- SECTION:FINAL_SUMMARY:END -->
