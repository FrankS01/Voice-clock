---
id: VC-7
title: 'Voice channel audio player: join, play bongs, leave'
status: To Do
assignee: []
created_date: '2026-06-07 19:18'
labels:
  - audio
  - feature
milestone: m-0
dependencies:
  - VC-2
  - VC-5
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
- [ ] #1 Bot joins the specified voice channel
- [ ] #2 Bot plays the bong sound exactly `count` times
- [ ] #3 There is a configurable pause between bongs
- [ ] #4 Bot leaves the channel after the last bong
- [ ] #5 Bot does NOT join if the channel has zero non-bot members
- [ ] #6 Permission errors are caught, logged, and do not crash the process
- [ ] #7 Voice connection is always cleaned up (no lingering connections on error)
<!-- AC:END -->
