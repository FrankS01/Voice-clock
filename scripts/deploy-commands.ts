import { REST, Routes } from 'discord.js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

if (!BOT_TOKEN || !CLIENT_ID) {
  console.error('[ERROR] BOT_TOKEN and CLIENT_ID must be set in .env');
  process.exit(1);
}

const commands: unknown[] = [];
const commandsPath = path.join(__dirname, '..', 'src', 'commands');

if (fs.existsSync(commandsPath)) {
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((f) => (f.endsWith('.ts') || f.endsWith('.js')) && !f.endsWith('.d.ts'));
  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    if (command.data?.toJSON) {
      commands.push(command.data.toJSON());
    }
  }
}

const rest = new REST().setToken(BOT_TOKEN);
const route = GUILD_ID
  ? Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID)
  : Routes.applicationCommands(CLIENT_ID);
const scope = GUILD_ID ? `guild ${GUILD_ID}` : 'global';

(async () => {
  console.log(`[INFO] Deploying ${commands.length} slash command(s) to ${scope}...`);
  await rest.put(route, { body: commands });
  console.log(`[INFO] Successfully deployed ${commands.length} slash command(s) to ${scope}.`);
})().catch((err) => {
  console.error('[ERROR] Deployment failed:', err);
  process.exit(1);
});
