---
id: VC-6
title: Implement /setup slash command
status: To Do
assignee: []
created_date: '2026-06-07 19:18'
labels:
  - commands
  - feature
milestone: m-0
dependencies:
  - VC-2
  - VC-3
  - VC-4
  - VC-5
priority: high
ordinal: 5000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Create the /setup slash command (src/commands/setup.ts) that lets a guild administrator configure the Voice Clock bot.

Options:
- channel   (required) — ChannelType.GuildVoice channel picker
- timezone  (required) — string with autocomplete powered by the timezone utility (VC-4)
- half_hour (optional) — boolean, default false — whether to also chime at xx:30
- sound_pack (optional) — string, choices limited to available packs from the sound pack registry (VC-5); currently only "clock-tower"

On successful setup:
- Persist settings via the DB layer (VC-3: upsertGuildSettings).
- Reply with an ephemeral confirmation message listing the saved settings.
- Log the setup event (guild name, channel name, timezone, options chosen) via the logger (VC-2).

Command should be restricted to members with the ManageGuild permission.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Command is registered and appears in Discord's slash command menu
- [ ] #2 channel option only shows voice channels
- [ ] #3 timezone option triggers autocomplete (max 25 results) from the timezone utility
- [ ] #4 sound_pack option shows a choice list of available packs from the sound pack registry
- [ ] #5 Settings are saved to the DB after a successful /setup
- [ ] #6 Bot replies with an ephemeral confirmation showing all saved values
- [ ] #7 Command is rejected (ephemeral error) for users without ManageGuild permission
- [ ] #8 Setup event is logged with guild ID, channel ID, timezone, and invoking user
<!-- AC:END -->
