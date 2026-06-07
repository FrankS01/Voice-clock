import pino from 'pino';

const isDev = process.env.NODE_ENV !== 'production';

const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: isDev
    ? { target: 'pino-pretty', options: { colorize: true, translateTime: 'SYS:standard', ignore: 'pid,hostname' } }
    : undefined,
});

export interface GuildContext {
  guildId: string;
  guildName?: string;
}

export function childLogger(guild: GuildContext) {
  return logger.child({ guildId: guild.guildId, guildName: guild.guildName });
}

export default logger;
