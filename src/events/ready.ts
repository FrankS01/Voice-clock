import { Client, Events } from 'discord.js';
import logger from '../utils/logger';

export const name = Events.ClientReady;
export const once = true;

export async function execute(client: Client<true>): Promise<void> {
  logger.info({ tag: client.user.tag }, 'Ready! Bot logged in');
}
