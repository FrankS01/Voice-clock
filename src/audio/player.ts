import {
  AudioPlayerStatus,
  VoiceConnectionStatus,
  createAudioPlayer,
  createAudioResource,
  entersState,
  joinVoiceChannel,
} from '@discordjs/voice';
import { ChannelType, Guild } from 'discord.js';
import { childLogger } from '../utils/logger';
import { SoundPack } from './soundPacks';

export interface ChimeOptions {
  guild: Guild;
  channelId: string;
  soundPack: SoundPack;
  count: number;
  pauseMs: number;
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function playChime(options: ChimeOptions): Promise<void> {
  const { guild, channelId, soundPack, count, pauseMs } = options;
  const log = childLogger({ guildId: guild.id, guildName: guild.name });

  const channel = guild.channels.cache.get(channelId);
  if (!channel || channel.type !== ChannelType.GuildVoice) {
    log.warn({ channelId }, 'Target channel not found or is not a voice channel — skipping chime');
    return;
  }

  const nonBotCount = channel.members.filter((m) => !m.user.bot).size;
  if (nonBotCount === 0) {
    log.info({ channelId, channelName: channel.name }, 'Voice channel is empty — skipping chime');
    return;
  }

  const connection = joinVoiceChannel({
    channelId,
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator,
  });

  try {
    await entersState(connection, VoiceConnectionStatus.Ready, 10_000);
    log.info({ channelId, channelName: channel.name }, 'Joined voice channel');

    const player = createAudioPlayer();
    connection.subscribe(player);

    for (let i = 0; i < count; i++) {
      const resource = createAudioResource(soundPack.bongFile);
      player.play(resource);
      log.info({ channelName: channel.name, bong: i + 1, total: count }, 'Playing bong');
      await entersState(player, AudioPlayerStatus.Idle, 30_000);
      if (i < count - 1) await sleep(pauseMs);
    }

    log.info({ channelName: channel.name }, 'Chime complete, leaving voice channel');
  } catch (err) {
    log.error({ channelId, err }, 'Error during chime playback (permission issue or timeout)');
  } finally {
    connection.destroy();
  }
}
