import {
  AutocompleteInteraction,
  ChannelType,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from 'discord.js';
import { upsertGuildSettings } from '../db/index';
import { childLogger } from '../utils/logger';
import { getTimezoneChoices } from '../utils/timezones';
import { listSoundPacks } from '../audio/soundPacks';

const soundPackChoices = listSoundPacks().map((p) => ({ name: p.label, value: p.id }));

export const data = new SlashCommandBuilder()
  .setName('setup')
  .setDescription('Configure Voice Clock for this server')
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
  .addChannelOption((o) =>
    o
      .setName('channel')
      .setDescription('Voice channel where the bot will chime')
      .setRequired(true)
      .addChannelTypes(ChannelType.GuildVoice),
  )
  .addStringOption((o) =>
    o
      .setName('timezone')
      .setDescription('Your server timezone (e.g. Europe/Amsterdam)')
      .setRequired(true)
      .setAutocomplete(true),
  )
  .addBooleanOption((o) =>
    o.setName('half_hour').setDescription('Also chime at half past the hour').setRequired(false),
  )
  .addStringOption((o) =>
    o
      .setName('sound_pack')
      .setDescription('Sound pack to use (default: Clock Tower)')
      .setRequired(false)
      .addChoices(...soundPackChoices),
  );

export async function autocomplete(interaction: AutocompleteInteraction): Promise<void> {
  const focused = interaction.options.getFocused(true);
  if (focused.name === 'timezone') {
    await interaction.respond(getTimezoneChoices(focused.value));
  }
}

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageGuild)) {
    await interaction.reply({ content: 'You need the **Manage Server** permission to use this command.', ephemeral: true });
    return;
  }

  const channel = interaction.options.getChannel('channel', true);
  const timezone = interaction.options.getString('timezone', true);
  const halfHour = interaction.options.getBoolean('half_hour') ?? false;
  const soundPack = interaction.options.getString('sound_pack') ?? 'clock-tower';
  const guildId = interaction.guildId!;
  const guildName = interaction.guild?.name;

  // Validate timezone is a real IANA key
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
  } catch {
    await interaction.reply({ content: `**${timezone}** is not a valid timezone. Use the autocomplete suggestions.`, ephemeral: true });
    return;
  }

  upsertGuildSettings({ guildId, channelId: channel.id, timezone, halfHour, soundPack });

  const log = childLogger({ guildId, guildName });
  log.info(
    { channelId: channel.id, channelName: channel.name, timezone, halfHour, soundPack, userId: interaction.user.id },
    'Guild setup saved',
  );

  await interaction.reply({
    ephemeral: true,
    content: [
      '✅ **Voice Clock configured!**',
      `• Channel: <#${channel.id}>`,
      `• Timezone: \`${timezone}\``,
      `• Half-hour chime: ${halfHour ? 'enabled' : 'disabled'}`,
      `• Sound pack: \`${soundPack}\``,
    ].join('\n'),
  });
}
