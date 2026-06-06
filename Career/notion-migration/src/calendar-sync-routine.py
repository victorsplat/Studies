#!/usr/bin/env python3
"""Cria eventos recorrentes no Google Calendar a partir da routine-definition.json"""

import json, os, sys, pickle
from datetime import datetime, timedelta
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCOPES = ['https://www.googleapis.com/auth/calendar']
CLIENT_SECRET = os.path.join(DIR, 'client-secret-gcal.json')
TOKEN_FILE = os.path.join(DIR, 'gcal-token.json')
ROUTINE_FILE = os.path.join(DIR, 'routine-definition.json')

def get_service():
    creds = None
    if os.path.exists(TOKEN_FILE):
        with open(TOKEN_FILE, 'rb') as f:
            creds = pickle.load(f) if TOKEN_FILE.endswith('.pickle') else Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not os.path.exists(CLIENT_SECRET):
                print(f"❌ client-secret-gcal.json não encontrado em {CLIENT_SECRET}")
                sys.exit(1)
            flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRET, SCOPES)
            print("\n⚠️  Abrindo navegador para autenticação...")
            creds = flow.run_local_server(port=0)
        with open(TOKEN_FILE, 'w') as f:
            f.write(creds.to_json())
    return build('calendar', 'v3', credentials=creds)

TYPE_ICONS = {
    '📚 Estudo': '📚',
    '💼 Trabalho': '💼',
    '🚌 Deslocamento': '🚌',
    '🍽️ Refeição': '🍽️',
    '🛌 Sono': '😴',
    '🎸 Lazer': '🎸',
}

COLOR_BY_TYPE = {
    '📚': '10',      # green
    '💼': '7',       # blue/teal
    '🚌': '8',       # gray
    '🍽️': '6',       # orange
    '😴': '9',       # blue
    '🎸': '3',       # purple
}

def day_to_rrule(day_codes):
    byday = ','.join(day_codes)
    return f'RRULE:FREQ=WEEKLY;BYDAY={byday}'

def get_reminders(tag, block):
    if tag == '⏰ Alarme':
        minutes = block.get('alarm_minutes', 1)
        return {'useDefault': False, 'overrides': [{'method': 'popup', 'minutes': minutes}]}
    elif tag == '🔴 Ativo':
        return {'useDefault': False, 'overrides': [{'method': 'popup', 'minutes': 10}]}
    else:
        return {'useDefault': False, 'overrides': []}

def get_color(block_type):
    icon = TYPE_ICONS.get(block_type, '')
    return COLOR_BY_TYPE.get(icon)

def create_events(service, routine):
    calendar_id = 'primary'

    # First, delete existing routine events (tagged with [ROTINA] in description)
    print("Limpando eventos de rotina antigos...")
    existing = service.events().list(
        calendarId=calendar_id,
        q='[ROTINA]',
        maxResults=500
    ).execute()
    deleted = 0
    for event in existing.get('items', []):
        desc = event.get('description', '')
        if '[ROTINA]' in desc:
            service.events().delete(calendarId=calendar_id, eventId=event['id']).execute()
            deleted += 1
    print(f"  {deleted} eventos antigos removidos")

    created = 0
    for period_key in ['weekdays', 'saturday', 'sunday']:
        period = routine[period_key]
        label = period['label']
        days = period['days']
        rrule = day_to_rrule(days)

        for block in period['blocks']:
            name = block['name']
            start_t = block['start']
            end_t = block['end']
            block_type = block.get('type', '')
            tag = block.get('tag', '')
            meta = block.get('meta', '')
            icon = TYPE_ICONS.get(block_type, '')

            now = datetime.now()
            start_dt = datetime(now.year, now.month, now.day, int(start_t.split(':')[0]), int(start_t.split(':')[1]))
            end_dt = datetime(now.year, now.month, now.day, int(end_t.split(':')[0]), int(end_t.split(':')[1]))

            if end_dt <= start_dt:
                end_dt += timedelta(days=1)

            desc_lines = ["[ROTINA]"]
            if tag or meta:
                desc_lines.append(f"{tag} {meta}".strip())
            if tag and '🟢' in tag:
                desc_lines.append("🎧 Aproveite pra escutar podcast / estudar passivo")
            description = '\n'.join(desc_lines)

            prefix = f"{icon} " if icon else ""
            summary = f"{prefix}{name}"

            event = {
                'summary': summary,
                'description': description,
                'start': {'dateTime': start_dt.isoformat(), 'timeZone': 'America/Sao_Paulo'},
                'end': {'dateTime': end_dt.isoformat(), 'timeZone': 'America/Sao_Paulo'},
                'recurrence': [rrule],
                'transparency': 'transparent',
                'eventType': 'default',
                'reminders': get_reminders(tag, block),
            }

            color = get_color(block_type)
            if color:
                event['colorId'] = color

            try:
                service.events().insert(calendarId=calendar_id, body=event).execute()
                created += 1
                alarm = get_reminders(tag, block)['overrides']
                alarm_str = f" 🔔{alarm[0]['minutes']}min" if alarm else ""
                print(f"  ✅ {label}: {summary}{alarm_str}")
            except Exception as e:
                print(f"  ❌ {label}: {name} — {e}")

    print(f"\n🎉 Total: {created} eventos recorrentes criados!")

def main():
    if not os.path.exists(ROUTINE_FILE):
        print(f"❌ routine-definition.json não encontrado em {ROUTINE_FILE}")
        sys.exit(1)

    with open(ROUTINE_FILE) as f:
        routine = json.load(f)

    print("=== Google Calendar — Sync Rotina ===\n")
    service = get_service()
    create_events(service, routine)

if __name__ == '__main__':
    main()
