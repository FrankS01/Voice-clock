import { Events, Interaction } from 'discord.js';
import logger from '../utils/logger';

export const name = Events.InteractionCreate;
export const once = false;

export async function execute(interaction: Interaction): Promise<void> {
  if (interaction.isChatInputCommand()) {
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      logger.error(
        { command: interaction.commandName, guildId: interaction.guildId, guildName: interaction.guild?.name },
        'No command matching interaction was found',
      );
      return;
    }
    const guildCtx = { guildId: interaction.guildId, guildName: interaction.guild?.name, userId: interaction.user.id };
    logger.info({ ...guildCtx, command: interaction.commandName }, 'Command invoked');
    try {
      await command.execute(interaction);
    } catch (error) {
      logger.error({ ...guildCtx, command: interaction.commandName, err: error }, 'Command execution failed');
      const reply = { content: 'An error occurred while executing this command.', ephemeral: true };
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(reply);
      } else {
        await interaction.reply(reply);
      }
    }
  } else if (interaction.isAutocomplete()) {
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command?.autocomplete) return;
    try {
      await command.autocomplete(interaction);
    } catch (error) {
      logger.error(
        { command: interaction.commandName, guildId: interaction.guildId, err: error },
        'Autocomplete failed',
      );
    }
  }
}
