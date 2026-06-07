import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import { DateTime } from 'luxon';
import { getGuildSettings } from '../db/index';
import { getSoundPack } from '../audio/soundPacks';
import { playChime } from '../audio/player';

export const data = new SlashCommandBuilder()
  .setName('test')
  .setDescription('Test the chime — plays the bongs for the current hour in the guild timezone')
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild);

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  const settings = getGuildSettings(interaction.guildId!);
  if (!settings) {
    await interaction.reply({ content: 'This server is not configured yet. Run `/setup` first.', ephemeral: true });
    return;
  }

  const now = DateTime.now().setZone(settings.timezone);
  const count = now.hour % 12 || 12;
  const soundPack = getSoundPack(settings.soundPack);

  await interaction.reply({
    ephemeral: true,
    content: `Playing **${count}** bong${count === 1 ? '' : 's'} (simulating ${now.toFormat('HH:00')} in \`${settings.timezone}\`)…`,
  });

  await playChime({ guild: interaction.guild!, channelId: settings.channelId, soundPack, count, pauseMs: 1200 });
}