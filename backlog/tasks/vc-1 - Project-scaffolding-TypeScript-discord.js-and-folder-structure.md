---
id: VC-1
title: 'Project scaffolding: TypeScript, discord.js, and folder structure'
status: Done
assignee: []
created_date: '2026-06-07 19:16'
updated_date: '2026-06-07 19:33'
labels:
  - setup
  - infrastructure
milestone: m-0
dependencies: []
modified_files:
  - package.json
  - tsconfig.json
  - .env.example
  - .gitignore
  - src/index.ts
  - src/types/index.ts
  - src/events/ready.ts
  - src/events/interactionCreate.ts
  - scripts/deploy-commands.ts
  - src/commands/.gitkeep
  - src/scheduler/.gitkeep
  - src/audio/.gitkeep
  - src/db/.gitkeep
  - src/sounds/.gitkeep
  - src/utils/.gitkeep
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
- [x] #1 TypeScript compiles without errors (`tsc --noEmit` passes)
- [x] #2 Bot connects to Discord and logs a ready message
- [x] #3 Slash command deploy script exists and runs without error
- [x] #4 interactionCreate event handler routes to the correct command handler
- [x] #5 Folder structure matches the layout described above
- [x] #6 package.json includes all runtime dependencies (discord.js, @discordjs/voice, better-sqlite3, etc.) and dev dependencies (typescript, ts-node, @types/*)
- [x] #7 `.env.example` documents required environment variables (BOT_TOKEN, CLIENT_ID, GUILD_ID for dev)
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
All files created from scratch. Key decisions: used better-sqlite3 v12 (v9 had no Node 22 prebuilt), @discordjs/voice v0.19 (v0.17 was deprecated for encryption), pure-JS audio deps (opusscript + tweetnacl + ffmpeg-static — no Visual Studio needed). Commands and events use dynamic require() so adding new handlers requires no changes to index.ts. Module augmentation in src/types/index.ts extends discord.js Client with a `commands` Collection. All 6 placeholder directories created with .gitkeep ready for downstream tasks.
<!-- SECTION:FINAL_SUMMARY:END -->
