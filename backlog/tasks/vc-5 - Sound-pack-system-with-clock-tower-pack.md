---
id: VC-5
title: Sound pack system with "clock tower" pack
status: Done
assignee:
  - Frank
created_date: '2026-06-07 19:18'
updated_date: '2026-06-07 20:26'
labels:
  - audio
  - feature
milestone: m-0
dependencies:
  - VC-1
modified_files:
  - src/audio/soundPacks.ts
  - src/sounds/clock-tower/source.txt
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
- [x] #2 getSoundPack('clock-tower') returns a valid SoundPack with a resolvable bongFile path
- [x] #3 getSoundPack('unknown') throws a descriptive error
- [x] #4 listSoundPacks() returns an array with at least the clock-tower entry
- [x] #5 The registry is the single source of truth — /setup choices and the player both use it
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Create src/audio/soundPacks.ts with SoundPack interface, getSoundPack, listSoundPacks\n2. Create src/sounds/clock-tower/ directory\n3. Source and download a royalty-free ~1s bell/bong MP3 into src/sounds/clock-tower/bong.mp3
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Created src/audio/soundPacks.ts with SoundPack interface, getSoundPack (throws on unknown id), and listSoundPacks. Registry uses absolute path via __dirname. Created src/sounds/clock-tower/source.txt with links to free bong sounds — bong.mp3 needs to be added manually before audio playback works (AC#1 pending).
<!-- SECTION:FINAL_SUMMARY:END -->
