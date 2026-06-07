import Database from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';
import { GuildSettings } from '../types/index';

const dbPath = process.env.DB_PATH ?? path.join(process.cwd(), 'data', 'voice-clock.sqlite');
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS guild_settings (
    guild_id   TEXT PRIMARY KEY,
    channel_id TEXT NOT NULL,
    timezone   TEXT NOT NULL,
    half_hour  INTEGER NOT NULL DEFAULT 0,
    sound_pack TEXT NOT NULL DEFAULT 'clock-tower'
  )
`);

interface Row {
  guild_id: string;
  channel_id: string;
  timezone: string;
  half_hour: number;
  sound_pack: string;
}

function rowToSettings(row: Row): GuildSettings {
  return {
    guildId: row.guild_id,
    channelId: row.channel_id,
    timezone: row.timezone,
    halfHour: row.half_hour === 1,
    soundPack: row.sound_pack,
  };
}

const stmtUpsert = db.prepare<[string, string, string, number, string]>(`
  INSERT INTO guild_settings (guild_id, channel_id, timezone, half_hour, sound_pack)
  VALUES (?, ?, ?, ?, ?)
  ON CONFLICT(guild_id) DO UPDATE SET
    channel_id = excluded.channel_id,
    timezone   = excluded.timezone,
    half_hour  = excluded.half_hour,
    sound_pack = excluded.sound_pack
`);

const stmtGet = db.prepare<[string], Row>(`
  SELECT * FROM guild_settings WHERE guild_id = ?
`);

const stmtGetAll = db.prepare<[], Row>(`
  SELECT * FROM guild_settings
`);

export function upsertGuildSettings(settings: GuildSettings): void {
  stmtUpsert.run(
    settings.guildId,
    settings.channelId,
    settings.timezone,
    settings.halfHour ? 1 : 0,
    settings.soundPack,
  );
}

export function getGuildSettings(guildId: string): GuildSettings | undefined {
  const row = stmtGet.get(guildId);
  return row ? rowToSettings(row) : undefined;
}

export function getAllGuildSettings(): GuildSettings[] {
  return stmtGetAll.all().map(rowToSettings);
}
