---
id: VC-8
title: 'Clock scheduler: trigger chimes at whole and half hours per guild timezone'
status: To Do
assignee: []
created_date: '2026-06-07 19:19'
labels:
  - scheduler
  - feature
milestone: m-0
dependencies:
  - VC-2
  - VC-3
  - VC-7
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
- [ ] #1 Chime fires within 60 s of the target whole hour in the guild's local timezone
- [ ] #2 Bong count is correct: 12 at noon/midnight, 1 at 1 AM, 3 at 3 PM, etc.
- [ ] #3 Half-hour chime plays exactly 1 bong and only fires when half_hour is enabled
- [ ] #4 Guilds with different timezones fire independently and correctly
- [ ] #5 No duplicate chimes if the cron fires a few seconds late
- [ ] #6 Scheduler tick is logged with guild ID, local time, and bong count
- [ ] #7 Guilds with no settings configured are silently skipped
<!-- AC:END -->
