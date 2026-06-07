---
id: VC-2
title: Implement structured logging utility
status: To Do
assignee: []
created_date: '2026-06-07 19:18'
labels:
  - infrastructure
  - logging
milestone: m-0
dependencies:
  - VC-1
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
- [ ] #1 Logger is exported from src/utils/logger.ts and importable anywhere
- [ ] #2 Logs include timestamp and level
- [ ] #3 Guild ID/name are included in relevant log calls (command invocations, voice joins)
- [ ] #4 Errors are logged with stack traces at the error level
- [ ] #5 Log level is configurable via LOG_LEVEL env var (default: info)
<!-- AC:END -->
