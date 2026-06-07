---
id: VC-3
title: Implement SQLite database layer for guild settings
status: To Do
assignee: []
created_date: '2026-06-07 19:18'
labels:
  - database
  - infrastructure
milestone: m-0
dependencies:
  - VC-1
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
- [ ] #1 SQLite file is created automatically on first run
- [ ] #2 upsertGuildSettings saves and overwrites settings for a guild
- [ ] #3 getGuildSettings returns undefined for unconfigured guilds
- [ ] #4 getAllGuildSettings returns all configured guilds (used by the scheduler)
- [ ] #5 Settings for different guilds are isolated (no cross-guild data leakage)
- [ ] #6 DB_PATH env var controls the file location
- [ ] #7 data/ directory is .gitignored
<!-- AC:END -->
