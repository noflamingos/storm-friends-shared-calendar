import ICAL from 'ical.js';
import { writeFile, mkdir } from 'node:fs/promises';

const sources = [
  { team: 'Storm U10 AA', color: '#45dbe6', textColor: '#062f33', url: 'https://southsimcoeminorhockey.ca/webcal.ashx?IDs=1149' },
  { team: 'Storm U12 A', color: '#004e8a', textColor: '#ffffff', url: 'https://southsimcoeminorhockey.ca/webcal.ashx?IDs=1154&O=0' }
];

function toIso(t) {
  if (!t) return null;
  try { return t.toJSDate().toISOString(); } catch { return null; }
}

const events = [];
for (const source of sources) {
  const res = await fetch(source.url, { headers: { 'User-Agent': 'Storm-Friends-Shared-Calendar/1.0' } });
  if (!res.ok) throw new Error(`Failed ${source.team}: HTTP ${res.status}`);
  const text = await res.text();
  const comp = new ICAL.Component(ICAL.parse(text));
  for (const vevent of comp.getAllSubcomponents('vevent')) {
    const e = new ICAL.Event(vevent);
    const title = e.summary || source.team;
    const type = title.includes(' - Game ') ? 'game' : 'practice';

    events.push({
      id: `${source.team}-${e.uid || crypto.randomUUID()}`,
      title,
      start: toIso(e.startDate),
      end: toIso(e.endDate),
      allDay: Boolean(e.startDate?.isDate),
      location: e.location || '',
      description: e.description || '',
      team: source.team,
      type,
      backgroundColor: source.color,
      borderColor: source.color,
      textColor: source.textColor
    });
  }
}

events.sort((a,b) => (a.start || '').localeCompare(b.start || ''));
await mkdir('data', { recursive: true });
await writeFile('data/events.json', JSON.stringify({ updatedAt: new Date().toISOString(), events }, null, 2));
console.log(`Wrote ${events.length} events`);
