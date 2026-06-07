---
id: VC-2
title: Implement structured logging utility
status: Done
assignee: []
created_date: '2026-06-07 19:18'
updated_date: '2026-06-07 20:12'
labels:
  - infrastructure
  - logging
milestone: m-0
dependencies:
  - VC-1
modified_files:
  - src/utils/logger.ts
  - src/index.ts
  - src/events/ready.ts
  - src/events/interactionCreate.ts
priority: high
ordinal: 2000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Create a shared logger (src/utils/logger.ts) used throughout the bot for consistent, structured output.

Requirements:
- Use a well-known Node.js logging library (e.g., pino or winston).
- Support log levels: debug, info, warn, error.
- Every log line should include a timestamp and log level.
- Log messages related to guild actions must include the guild name and/or ID.
- Typical events to log: command invoked (with guild + user), voice channel join/leave, scheduler tick fired, setup saved, errors with stack traces.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Logger is exported from src/utils/logger.ts and importable anywhere
- [x] #2 Logs include timestamp and level
- [x] #3 Guild ID/name are included in relevant log calls (command invocations, voice joins)
- [x] #4 Errors are logged with stack traces at the error level
- [x] #5 Log level is configurable via LOG_LEVEL env var (default: info)
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Install pino + pino-pretty\n2. Create src/utils/logger.ts with LOG_LEVEL env var, timestamp, level; childLogger(guild) helper\n3. Replace console.log/warn/error in src/index.ts, src/events/ready.ts, src/events/interactionCreate.ts
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Created src/utils/logger.ts using pino + pino-pretty. Logger uses LOG_LEVEL env var (default: info), includes timestamp and level on every line, and exports a childLogger(guild) helper for guild-scoped context. Replaced all console.log/warn/error calls across index.ts, ready.ts, and interactionCreate.ts. Command invocations now log guildId, guildName, and userId. Errors are logged with the err field which pino serializes including stack traces.
<!-- SECTION:FINAL_SUMMARY:END -->
