---
id: VC-1
title: 'Project scaffolding: TypeScript, discord.js, and folder structure'
status: To Do
assignee: []
created_date: '2026-06-07 19:16'
labels:
  - setup
  - infrastructure
milestone: m-0
dependencies: []
priority: high
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Bootstrap the Voice Clock bot project with a clean, production-ready foundation.

Set up TypeScript, discord.js v14+, and the agreed folder structure so every subsequent task has a stable base to build on.

Folder layout (src/):
- commands/       — slash command handlers
- events/         — discord.js event handlers (ready, interactionCreate)
- scheduler/      — clock scheduling logic
- audio/          — voice channel + audio playback
- db/             — database access layer
- sounds/         — audio asset folders per sound pack
- utils/          — shared helpers (logger, timezones, etc.)
- index.ts        — bot entry point

The bot should start, connect to Discord, and register slash commands (via a deploy script or on the ready event). The index.ts should wire up events and export a graceful shutdown handler.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 TypeScript compiles without errors (`tsc --noEmit` passes)
- [ ] #2 Bot connects to Discord and logs a ready message
- [ ] #3 Slash command deploy script exists and runs without error
- [ ] #4 interactionCreate event handler routes to the correct command handler
- [ ] #5 Folder structure matches the layout described above
- [ ] #6 package.json includes all runtime dependencies (discord.js, @discordjs/voice, better-sqlite3, etc.) and dev dependencies (typescript, ts-node, @types/*)
- [ ] #7 `.env.example` documents required environment variables (BOT_TOKEN, CLIENT_ID, GUILD_ID for dev)
<!-- AC:END -->
