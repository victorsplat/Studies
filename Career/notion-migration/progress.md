# Progresso — 06 Jun 2026 (Sábado)

## Rotina Sincronizada

### 📁 Fonte da Verdade
- `routine-definition.json` — rotina completa (seg-sex, sábado, domingo)

### 🗄️ Notion — Database "Rotina"
- 63 blocos, sem duplicatas
- Cada bloco com ícone por tipo (📚 💼 🚌 🍽️ 😴 🎸)
- Properties: Nome, Início, Fim, Dia, Tipo, Tag, Meta
- Database ID: `73be0bb0-0dab-4d34-a80a-7987a955fa54`
- Data Source ID: `0c6dc40f-5457-4f75-95e9-9276904dcb8d`
- Views mantidas (não foram recriadas)

### 📅 Google Calendar — Eventos Recorrentes
- 23 eventos base com recorrência semanal
- `transparency: transparent` — não polui seção Meetings do Notion
- `eventType: default`
- Cores por tipo (verde=estudo, azul=trabalho, cinza=deslocamento, etc.)
- Alarmes:
  - ⏰ **Ir trabalhar** (05:00) — 1min antes (04:59)
  - 🔴 **Mercado Livre** + **Estudo ativo** + **Codar/Estudar** — 10min antes
  - ⏰ **Preparar dormir** (Dom 21:00) — 1min antes (20:59)
- Nomes limpos (ex: `😴 Dormir` em vez de `[ROTINA] 😴 Dormir`)
- `[ROTINA]` na descrição (invisível, usado pra sync futuro)

### 🔄 Scripts
| Script | Função |
|--------|--------|
| `routine-sync.sh` | Orquestra sync Notion + Google Calendar |
| `notion-setup-routine.js` | Cria database Rotina |
| `seed-routine.js` | Adiciona blocos novos sem duplicar |
| `update-routine-icons.js` | Adiciona emoji por tipo nas páginas |
| `calendar-sync-routine.py` | Cria/recria eventos no Google Calendar |

### 🔒 Segurança
- `client-secret-gcal.json` no `.gitignore`
- `gcal-token.json` no `.gitignore`
- `AGENTS.md` untracked (contém secrets context)

## Roadmap Semanal
- Database criado com 12 semanas (S1-S12)
- 3 páginas de referência: TDD Deep Dive, Portfolio Pitch, Interview Prep
- Views (Calendar, Board) precisam ser adicionadas manualmente no Notion UI

## Pendências
1. Adicionar views Calendar + Board no Database Rotina (Notion UI)
2. Adicionar views Calendar + Board no Database Roadmap Semanal (Notion UI)
3. Renomear "Projetos" → "Projects" manualmente (API não acessa)
4. Criar `ProductController.java` no SuicidalDropAPI
5. Iniciar S1: Vitest + Testing Library no Meli-Portfolio-Resume
