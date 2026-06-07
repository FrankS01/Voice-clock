import { ApplicationCommandOptionChoiceData } from 'discord.js';

const COMMON_TIMEZONES = [
  'UTC',
  'Europe/London',
  'Europe/Amsterdam',
  'Europe/Berlin',
  'Europe/Paris',
  'Europe/Rome',
  'Europe/Madrid',
  'Europe/Warsaw',
  'Europe/Stockholm',
  'Europe/Helsinki',
  'Europe/Athens',
  'Europe/Moscow',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Sao_Paulo',
  'America/Toronto',
  'America/Mexico_City',
  'Asia/Dubai',
  'Asia/Kolkata',
  'Asia/Shanghai',
  'Asia/Tokyo',
  'Australia/Sydney',
  'Pacific/Auckland',
];

function utcOffset(tz: string): string {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: tz,
    timeZoneName: 'shortOffset',
  }).formatToParts(new Date());
  const tzPart = parts.find((p) => p.type === 'timeZoneName');
  return (tzPart?.value ?? 'GMT+0').replace('GMT', 'UTC');
}

interface TzEntry {
  name: string;
  value: string;
  searchKey: string;
}

// Build once at module load — Intl.supportedValuesOf is Node 18+
const ALL_TIMEZONES: TzEntry[] = (Intl.supportedValuesOf('timeZone') as string[]).map((tz) => {
  const offset = utcOffset(tz);
  const name = `${tz.replace(/_/g, ' ')} (${offset})`;
  return { name, value: tz, searchKey: `${name} ${offset}`.toLowerCase() };
});

const COMMON_CHOICES: ApplicationCommandOptionChoiceData<string>[] = COMMON_TIMEZONES.map((tz) => {
  const offset = utcOffset(tz);
  return { name: `${tz.replace(/_/g, ' ')} (${offset})`, value: tz };
});

export function getTimezoneChoices(query: string): ApplicationCommandOptionChoiceData<string>[] {
  if (!query.trim()) return COMMON_CHOICES;

  const q = query.toLowerCase();
  const matches: ApplicationCommandOptionChoiceData<string>[] = [];

  for (const entry of ALL_TIMEZONES) {
    if (entry.searchKey.includes(q)) {
      matches.push({ name: entry.name, value: entry.value });
      if (matches.length === 25) break;
    }
  }

  return matches;
}
