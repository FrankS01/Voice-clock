---
id: VC-8
title: 'Clock scheduler: trigger chimes at whole and half hours per guild timezone'
status: Done
assignee:
  - Frank
created_date: '2026-06-07 19:19'
updated_date: '2026-06-07 20:33'
labels:
  - scheduler
  - feature
milestone: m-0
dependencies:
  - VC-2
  - VC-3
  - VC-7
modified_files:
  - src/scheduler/clock.ts
  - src/events/ready.ts
priority: high
ordinal: 8000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Implement src/scheduler/clock.ts that runs a cron-like loop and fires chime sessions for every configured guild at the right local time.

Requirements:
- Use a cron library (e.g., node-cron) or a setInterval-based approach with timezone awareness.
- On every minute tick, inspect each guild's settings from the DB (VC-3: getAllGuildSettings).
- Fire a chime when the guild's local time matches:
  - Whole hour (e.g., 15:00) — play bong count = hour % 12 || 12 (12-hour clock: 1–12 bongs)
  - Half hour (e.g., 15:30) — play 1 bong (only if half_hour is enabled for that guild)
- Resolve the correct bong count from the guild's local hour in its configured IANA timezone.
- Call playChime() from the audio player (VC-7) with the correct count and the guild's configured sound pack.
- Log each scheduler tick that results in a chime attempt (guild, local time, bong count) via the logger (VC-2).
- The scheduler is started once on bot ready and should not fire duplicate chimes if the tick fires slightly late.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Chime fires within 60 s of the target whole hour in the guild's local timezone
- [x] #2 Bong count is correct: 12 at noon/midnight, 1 at 1 AM, 3 at 3 PM, etc.
- [x] #3 Half-hour chime plays exactly 1 bong and only fires when half_hour is enabled
- [x] #4 Guilds with different timezones fire independently and correctly
- [x] #5 No duplicate chimes if the cron fires a few seconds late
- [x] #6 Scheduler tick is logged with guild ID, local time, and bong count
- [x] #7 Guilds with no settings configured are silently skipped
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Create src/scheduler/clock.ts:\n   - node-cron '* * * * *' fires every minute\n   - Per guild: get local time via luxon, check minute===0 (whole hour) or minute===30+halfHour\n   - Bong count = hour%12||12 for whole hour, 1 for half hour\n   - Fire playChime() in parallel (not awaited) with .catch for safety\n   - Log each chime attempt\n2. Update src/events/ready.ts to call startScheduler(client)
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Created src/scheduler/clock.ts. node-cron fires every minute; for each guild setting it computes local time via luxon, checks minute===0 (whole hour, count=hour%12||12) or minute===30+halfHour (count=1). playChime() fired in parallel with .catch. Duplicate-safe by design — cron fires at most once per minute period. Wired into src/events/ready.ts via startScheduler(client). Also installed @types/luxon which was missing.
<!-- SECTION:FINAL_SUMMARY:END -->
