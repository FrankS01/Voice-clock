---
id: VC-5
title: Sound pack system with "clock tower" pack
status: To Do
assignee: []
created_date: '2026-06-07 19:18'
labels:
  - audio
  - feature
milestone: m-0
dependencies:
  - VC-1
priority: medium
ordinal: 6000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Design and implement a sound pack abstraction so additional packs can be added in the future without changing playback logic.

Structure:
- src/sounds/clock-tower/bong.mp3  — single bong audio file (repeated N times by the player)
- src/audio/soundPacks.ts          — SoundPack interface + registry

SoundPack interface:
```ts
interface SoundPack {
  id: string;
  label: string;       // display name for /setup
  bongFile: string;    // absolute path to the bong audio file
}
```

Registry:
- getSoundPack(id: string): SoundPack — throws if unknown
- listSoundPacks(): SoundPack[]       — used to populate the /setup option choices

The "clock tower" pack id is 'clock-tower'. Source a suitable royalty-free bong/bell audio file (e.g., a short ~1 s MP3 or OGG).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 src/sounds/clock-tower/ contains at least one audio file
- [ ] #2 getSoundPack('clock-tower') returns a valid SoundPack with a resolvable bongFile path
- [ ] #3 getSoundPack('unknown') throws a descriptive error
- [ ] #4 listSoundPacks() returns an array with at least the clock-tower entry
- [ ] #5 The registry is the single source of truth — /setup choices and the player both use it
<!-- AC:END -->
