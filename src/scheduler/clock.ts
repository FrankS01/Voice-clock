import { Client } from 'discord.js';
import { DateTime } from 'luxon';
import cron from 'node-cron';
import { getAllGuildSettings } from '../db/index';
import { getSoundPack } from '../audio/soundPacks';
import { playChime } from '../audio/player';
import logger from '../utils/logger';

export function startScheduler(client: Client): void {
  cron.schedule('* * * * *', () => {
    const settings = getAllGuildSettings();

    for (const s of settings) {
      const now = DateTime.now().setZone(s.timezone);
      if (!now.isValid) {
        logger.warn({ guildId: s.guildId, timezone: s.timezone }, 'Invalid timezone in guild settings — skipping');
        continue;
      }

      const { hour, minute } = now;

      let count: number;
      if (minute === 0) {
        count = hour % 12 || 12;
      } else if (minute === 30 && s.halfHour) {
        count = 1;
      } else {
        continue;
      }

      const guild = client.guilds.cache.get(s.guildId);
      if (!guild) continue;

      let soundPack;
      try {
        soundPack = getSoundPack(s.soundPack);
      } catch (err) {
        logger.warn({ guildId: s.guildId, soundPack: s.soundPack, err }, 'Unknown sound pack — skipping chime');
        continue;
      }

      logger.info(
        { guildId: s.guildId, localTime: now.toFormat('HH:mm'), timezone: s.timezone, count },
        'Scheduler firing chime',
      );

      playChime({ guild, channelId: s.channelId, soundPack, count, pauseMs: 1200 }).catch((err) => {
        logger.error({ guildId: s.guildId, err }, 'Unexpected error from playChime');
      });
    }
  });

  logger.info('Clock scheduler started');
}
