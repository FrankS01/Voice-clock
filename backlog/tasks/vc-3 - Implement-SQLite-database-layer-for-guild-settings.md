---
id: VC-3
title: Implement SQLite database layer for guild settings
status: Done
assignee:
  - Frank
created_date: '2026-06-07 19:18'
updated_date: '2026-06-07 20:18'
labels:
  - database
  - infrastructure
milestone: m-0
dependencies:
  - VC-1
modified_files:
  - src/types/index.ts
  - src/db/index.ts
priority: high
ordinal: 3000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Create the persistence layer (src/db/) that stores per-guild configuration so settings survive bot restarts.

Use better-sqlite3 (synchronous SQLite driver, no ORM needed).

Schema — table: guild_settings
- guild_id        TEXT PRIMARY KEY
- channel_id      TEXT NOT NULL
- timezone        TEXT NOT NULL        -- IANA timezone string, e.g. "Europe/Amsterdam"
- half_hour       INTEGER NOT NULL DEFAULT 0  -- boolean: 1 = enabled
- sound_pack      TEXT NOT NULL DEFAULT 'clock-tower'

Expose a clean repository API:
- upsertGuildSettings(settings): void
- getGuildSettings(guildId): GuildSettings | undefined
- getAllGuildSettings(): GuildSettings[]

Database file path should be configurable via DB_PATH env var (default: data/voice-clock.sqlite).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 SQLite file is created automatically on first run
- [x] #2 upsertGuildSettings saves and overwrites settings for a guild
- [x] #3 getGuildSettings returns undefined for unconfigured guilds
- [x] #4 getAllGuildSettings returns all configured guilds (used by the scheduler)
- [x] #5 Settings for different guilds are isolated (no cross-guild data leakage)
- [x] #6 DB_PATH env var controls the file location
- [x] #7 data/ directory is .gitignored
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Add GuildSettings interface to src/types/index.ts\n2. Create src/db/index.ts — opens DB at DB_PATH (default: data/voice-clock.sqlite), creates table, exports upsertGuildSettings / getGuildSettings / getAllGuildSettings
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added GuildSettings interface to src/types/index.ts. Created src/db/index.ts using better-sqlite3: opens/creates the DB at DB_PATH (default: data/voice-clock.sqlite), auto-creates the data/ directory, creates the guild_settings table with WAL mode, and exports upsertGuildSettings, getGuildSettings, and getAllGuildSettings. Boolean half_hour is stored as 0/1 INTEGER and mapped back to boolean on read. data/ was already .gitignored.
<!-- SECTION:FINAL_SUMMARY:END -->
