# Voice Clock

A Discord bot that chimes in voice channels like a clock tower — once per hour at the top of the hour, and optionally once at the half-hour mark. The number of bongs matches the 12-hour clock (1 at 1:00, 6 at 6:00, 12 at midnight/noon, etc.).

## Prerequisites

- Node.js 18 or higher
- A Discord application with a bot user ([Discord Developer Portal](https://discord.com/developers/applications))

## Setup

### 1. Clone and install dependencies

```bash
git clone https://github.com/FrankS01/Voice-clock.git
cd Voice-clock
npm install
```

### 2. Create your Discord application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) and create a new application.
2. Under **Bot**, create a bot user and copy the **Token**.
3. Under **General Information**, copy the **Application ID** — this is your `CLIENT_ID`.
4. Under **Bot**, enable the **Server Members Intent** and **Voice States** intent.

### 3. Configure environment variables

```bash
cp .env.example .env
```

Fill in `.env`:

| Variable | Required | Description |
|----------|----------|-------------|
| `BOT_TOKEN` | Yes | Your bot token from the Developer Portal |
| `CLIENT_ID` | Yes | Your application ID from the Developer Portal |
| `GUILD_ID` | No | A specific server ID for dev deployments (instant). Leave empty for global (up to 1 hour). |
| `DB_PATH` | No | Path to the SQLite database file (default: `data/voice-clock.sqlite`) |
| `LOG_LEVEL` | No | `debug`, `info`, `warn`, or `error` (default: `info`) |

### 4. Add sound files

Place two MP3 files in `src/sounds/clock-tower/`:

- `bong.mp3` — short bong (~1 s), used for all but the final strike
- `bong-final.mp3` — longer bong with a full ring-out tail, used for the last strike

Free sources (no attribution required): [Mixkit](https://mixkit.co/free-sound-effects/bell/), [Pixabay](https://pixabay.com/sound-effects/search/clock-chime/)

### 5. Invite the bot to your server

Generate an invite URL in the Developer Portal under **OAuth2 → URL Generator**. Select the following:

- Scopes: `bot`, `applications.commands`
- Bot permissions: `Connect`, `Speak`, `View Channels`

### 6. Deploy slash commands

```bash
npm run deploy
```

If `GUILD_ID` is set, commands appear instantly in that server. Without it, global deployment can take up to an hour.

### 7. Run the bot

**Development** (auto-restarts on file changes):
```bash
npm run dev
```

**Production** (compiled):
```bash
npm run build
npm start
```

## Configuration (per server)

Once the bot is running, a server administrator can run `/setup` to configure it:

| Option | Required | Description |
|--------|----------|-------------|
| `channel` | Yes | The voice channel the bot will join to chime |
| `timezone` | Yes | IANA timezone (e.g. `Europe/Amsterdam`) — supports autocomplete |
| `half_hour` | No | Also chime once at the half-hour mark (default: off) |
| `sound_pack` | No | Sound pack to use (default: Clock Tower) |

Settings are saved to the database and survive bot restarts.

## How it works

- Every minute the scheduler checks all configured guilds.
- If the guild's local time is on the hour, the bot joins the configured voice channel and plays the bong sound N times (matching the 12-hour clock).
- If the half-hour option is enabled and it's :30, it plays one bong.
- The bot skips the chime if the voice channel has no non-bot members.
- The bot leaves automatically after the last bong.
