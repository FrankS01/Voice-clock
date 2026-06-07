import * as path from 'path';

export interface SoundPack {
  id: string;
  label: string;
  bongFile: string;
  finalBongFile?: string; // if set, used for the last bong in a sequence
}

const SOUNDS_DIR = path.join(__dirname, '..', 'sounds');

const REGISTRY: SoundPack[] = [
  {
    id: 'clock-tower',
    label: 'Clock Tower',
    bongFile: path.join(SOUNDS_DIR, 'clock-tower', 'bong.mp3'),
    finalBongFile: path.join(SOUNDS_DIR, 'clock-tower', 'bong-final.mp3'),
  },
];

const BY_ID = new Map(REGISTRY.map((p) => [p.id, p]));

export function getSoundPack(id: string): SoundPack {
  const pack = BY_ID.get(id);
  if (!pack) throw new Error(`Unknown sound pack: "${id}". Available: ${[...BY_ID.keys()].join(', ')}`);
  return pack;
}

export function listSoundPacks(): SoundPack[] {
  return REGISTRY;
}
