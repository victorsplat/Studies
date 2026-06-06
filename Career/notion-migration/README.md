# Notion Migration — AGENTStudies

Scripts para automatizar a migração do Career/ (roadmap + planos de estudo) para o Notion.

## Estrutura

```
notion-migration/
├── src/
│   ├── notion-ls.js              # Lista páginas/databases do workspace
│   ├── notion-cleanup.js         # Arquiva páginas
│   ├── notion-setup-roadmap.js   # Cria Database Roadmap + seed 12 semanas
│   ├── calendar-ls.sh            # Lista eventos do Google Calendar
│   ├── calendar-setup.sh         # Diagnóstico + autenticação do Calendar
│   └── calendar-create-events.sh # Cria eventos das 12 semanas
├── client-secret-gcal.json       # Credenciais OAuth do Google Calendar
├── database-schema.md            # Schema do Database Roadmap
├── sync-guide.md                 # Como manter git + Notion
└── README.md                     # Este arquivo
```

## Uso

```bash
# Diagnóstico do Notion
NOTION_TOKEN="ntn_..." node src/notion-ls.js

# Setup do Roadmap no Notion
NOTION_TOKEN="ntn_..." node src/notion-setup-roadmap.js

# Google Calendar
./src/calendar-setup.sh          # Diagnóstico
./src/calendar-create-events.sh  # Criar eventos
```

## Credenciais

- **Notion**: SecureNote `notion` no Bitwarden
- **Google Calendar**: SecureNote `google_calendar` no Bitwarden (ou `client-secret-gcal.json` local)

## Arquivos fonte (git)

Os arquivos `.md` originais em `Career/` são a fonte da verdade.
O Notion é uma camada interativa para execução semanal.
