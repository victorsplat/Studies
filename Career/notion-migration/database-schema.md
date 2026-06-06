# Database Roadmap — Schema

## Properties

| Property | Type | Config |
|----------|------|--------|
| Semana | Title | — |
| Data | Date | Start + End |
| Status | Select | 🟢 On Track, 🟡 At Risk, 🔴 Stuck, ✅ Done |
| 🟢 Mínimo | Rich Text | Metas mínimas da semana |
| 🟡 Desejável | Rich Text | Metas desejáveis |
| 🔴 Stretch | Rich Text | Metas stretch |
| Progresso | Number | Percent (0-100) |
| Passivo | Rich Text | Conteúdo passivo da semana |
| Notas | Rich Text | Anotações diárias |

## Views

| View | Type | Descrição |
|------|------|-----------|
| 📅 Calendário | Calendar | Semanas no calendário |
| 📋 Tabela | Table | Todas as semanas |
| 📊 Board | Board | Agrupado por Status |

## Template "Semana de Estudo"

```
# 🗓️ {{Semana}}

## 🟢 Mínimo
- [ ] meta 1
- [ ] meta 2

## 🟡 Desejável
- [ ] meta

## 🔴 Stretch
- [ ] meta

## 📝 Notas
Seg: ...
Ter: ...
...

## 📌 Progresso
- Feito:
- Bloqueios:
- Próximo:
```

## Weeks seeded (12)

| Week | Period |
|------|--------|
| S1 — Setup + MELI Tests | 06-14 Jun |
| S2 — MELI Tests Profundidade | 15-21 Jun |
| S3 — TDD + SQL | 22-28 Jun |
| S4 — Spring Data JPA + PostgreSQL | 29 Jun - 05 Jul |
| S5 — SuicidalDrop Catalog TDD | 06-12 Jul |
| S6 — Setup RestauranteAPI | 13-19 Jul |
| S7 — RestauranteAPI TDD | 20-26 Jul |
| S8 — RestauranteAPI Completo | 27 Jul - 02 Ago |
| S9 — Estruturas de Dados I | 03-09 Ago |
| S10 — Algoritmos | 10-16 Ago |
| S11 — LinkedIn + Currículo | 17-23 Ago |
| S12 — Portfólio + Apps | 24-30 Ago |
