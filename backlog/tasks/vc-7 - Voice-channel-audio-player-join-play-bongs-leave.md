---
id: VC-7
title: 'Voice channel audio player: join, play bongs, leave'
status: Done
assignee:
  - Frank
created_date: '2026-06-07 19:18'
updated_date: '2026-06-07 20:29'
labels:
  - audio
  - feature
milestone: m-0
dependencies:
  - VC-2
  - VC-5
modified_files:
  - src/audio/player.ts
priority: high
ordinal: 7000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Implement src/audio/player.ts which handles the full lifecycle of a single clock chime session using @discordjs/voice.

playChime(options) function signature:
```ts
interface ChimeOptions {
  guild: Guild;
  channelId: string;
  soundPack: SoundPack;  // from the sound pack registry (VC-5)
  count: number;          // number of bongs to play (1–12)
  pauseMs: number;        // pause between bongs in milliseconds (e.g. 1200)
}
```

Behaviour:
1. Verify the target channel exists and is a voice channel.
2. Check that at least one non-bot member is present — skip silently if empty.
3. Join the channel using joinVoiceChannel().
4. Play the bong audio file `count` times, waiting `pauseMs` between each play.
5. Disconnect and destroy the voice connection after the last bong finishes.
6. Log join, each bong count, and leave events via the logger (VC-2).
7. Handle permission errors (bot lacks Connect/Speak) gracefully — log and return without crashing.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Bot joins the specified voice channel
- [x] #2 Bot plays the bong sound exactly `count` times
- [x] #3 There is a configurable pause between bongs
- [x] #4 Bot leaves the channel after the last bong
- [x] #5 Bot does NOT join if the channel has zero non-bot members
- [x] #6 Permission errors are caught, logged, and do not crash the process
- [x] #7 Voice connection is always cleaned up (no lingering connections on error)
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
Create src/audio/player.ts:\n- Verify channel exists and is GuildVoice, skip if zero non-bot members\n- joinVoiceChannel → entersState(Ready) → subscribe AudioPlayer\n- Loop count times: createAudioResource → player.play → entersState(Idle) → sleep(pauseMs)\n- connection.destroy() in finally block to guarantee cleanup\n- Try/catch permission errors, log and return
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Created src/audio/player.ts. Checks channel exists and is GuildVoice, skips if zero non-bot members. Joins with joinVoiceChannel, waits for Ready state, plays bong count times with pauseMs between each using entersState(Idle). connection.destroy() is in a finally block guaranteeing cleanup on both success and error. Permission/timeout errors are caught and logged without crashing.
<!-- SECTION:FINAL_SUMMARY:END -->
