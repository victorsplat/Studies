# Sync Guide — Git ↔ Notion

## Princípio

- **Git** = fonte da verdade, versionada, com histórico
- **Notion** = interface viva pra execução semanal

Eles vão divergir conforme você marca progresso no Notion — e **tudo bem**.

## Quando atualizar o git

1. **Mudanças estruturais** no plano (novas semanas, metas alteradas)
2. **Depois de uma entrevista** (novo gap descoberto → atualiza roadmap)
3. **Fim de mês** (reflete o que realmente aconteceu)

Para sincronizar:

```bash
# Export do Notion → Markdown
# (manual: ⋮ → Export → Markdown & CSV)

# Substitui o arquivo no git
cp ~/Downloads/Roadmap\ Export/*.md Career/04-roadmap.md

# Commit
git add Career/04-roadmap.md
git commit -m "sync(roadmap): atualizado do Notion - $(date +%Y-%m)"
```

## Quando NÃO atualizar o git

- Progresso diário (🟢/🟡/🔴) — fica só no Notion
- Notas de estudo individuais
- Checklist de entregáveis

## Referência

| Ferramenta | Conteúdo | Frequência de update |
|------------|----------|---------------------|
| Git (`Career/`) | Plano, metas, pesquisa | Semanal / mudanças estruturais |
| Notion (`Roadmap`) | Status, progresso, notas | Diário |
| Google Calendar | Eventos das semanas | Setup único |
