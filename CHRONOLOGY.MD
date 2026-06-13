# CHRONOLOGY — Cronograma do Repositório

Diário de bordo do AGENTStudie. Registra marcos, decisões, ideias, tarefas pendentes e lembretes agendados.

## Legenda

### Tipos de Entrada
| Tipo | Quando usar |
|------|-------------|
| `[MARCO]` | Marcos concluídos (repositório criado, projeto finalizado) |
| `[DECISAO]` | Decisões arquiteturais ou de design |
| `[IDEA]` | Ideia registrada para implementar depois |
| `[TODO]` | Tarefa pendente sem data definida |
| `[ESTUDO]` | Sessão de estudo realizada |
| `[BOOKMARK]` | Link, artigo, vídeo salvo para revisitar |
| `[DUVIDA]` | Pergunta em aberto |
| `[AGENDADO]` | Algo marcado para fazer em data futura |

### Campos Opcionais
- `⌛ Sugerir em: <data ou condicao>` — Lembrete para o agente retomar o assunto
- `🏷️ <tags>` — Facilita buscas no arquivo

---

## 2026

### Maio

#### 27

- `21:57 — [MARCO] — Início do repositório AGENTStudie`
  Estrutura inicial: AGENTS.MD, README.MD, .gitignore, pastas Tech/, History/, Mockups/ com templates.
  Repositório remoto configurado: `github.com/victorsplat/Studies`
  Link: Commit `81c4f23`
  🏷️ estrutura inicial

- `22:10 — [MARCO] — Catálogo de projetos existentes`
  MeliPortfolio e SuicidalDropStore registrados em `Mockups/Projects/`.
  Cada projeto com README, ARCHITECTURE, REQUIREMENTS e schemas (`.MMD`).
  Link: Commit `8d3a040`
  🏷️ catalog

- `22:30 — [MARCO] — CHRONOLOGY.MD criado`
  Arquivo de cronologia adicionado para rastrear atividades e lembretes.
  🏷️ estrutura

- `22:35 — [MARCO] — Mapa visual Mermaid + guia criados`
  README.MD atualizado com diagramas de repositório, comparativo, stacks, mindmap e roadmap.
  MERMAID-GUIDE.MD criado com tutorial dos 4 tipos de diagrama.
  AGENTS.MD atualizado com regras de manutenção da cronologia e do mapa.
  Link: Commit pendente
  🏷️ documentacao mermaid

- `22:40 — [IDEA] — Protótipo de novo projeto`
  Victor mencionou um protótipo novo para criar.
  ⌛ Sugerir em: proxima sessao
  🏷️ ideia prototipo

- `23:10 — [MARCO] — OmniChess: especificação completa`
  Projeto OmniChess (Xadrez Multiverso) documentado em Mockups/Projects/OmniChess/.
  Arquivos criados: README, ARCHITECTURE, REQUIREMENTS, ROADMAP, schemas (domain-model, mongodb-structure, api-endpoints), diagramas (system-architecture, game-flow, liveops-flow).
  Stack adaptada: Next.js 16 + Spring Boot 3.5 + MongoDB (em vez do Firebase original).
  Link: Commit pendente
  🏷️ omnichess especificacao roadmap

---

### Junho

#### 13

- `12:30 — [MARCO] — Monitor quebrado + replanejamento completo`
  Victor sem monitor (indeterminado). Replanejamento do roadmap:
  - Shift right: S1-S12 deslizam até o monitor chegar
  - Período sem monitor focado em SoloLearn + LeetCode Warm-ups + teoria
  - Novo emprego: barista em cafeteria (Ter-Sáb 7h30-16h30), cidade (commute curto)
  - Rotina nova: Ter-Sáb estudo 17h-22h, Dom+Seg estudo 09h-18h (~39h/semana)
  🏷️ replanejamento monitor-quebrado

- `12:38 — [MARCO] — PersonalPromptsForRemakeTheWorld criado`
  Repositório GitHub criado com contexto completo pra IAs externas:
  - `gemini-system-prompt.md` — perfil, projetos, roadmap, instruções
  - `notebooklm/` — 4 guias de estudo (TDD, SQL, ED, Spring)
  - Acessível do celular via GitHub
  Link: `github.com/victorsplat/PersonalPromptsForRemakeTheWorld`
  🏷️ contexto gemini notebooklm repositorio

---

## Próximos Passos (Agenda Aberta)

### ⏳ Pendentes
- [ ] **Mapa visual**: Verificar se os diagramas Mermaid renderizam corretamente no GitHub
- [ ] **OmniChess**: Revisar especificação com Victor e decidir próximos passos
- [ ] **Estudos Tech/**: Aguardando primeiro tópico
- [ ] **Estudos History/**: Aguardando primeiro livro/fato

### 📌 Agendados
- _Nada agendado ainda_

### 💡 Ideias Futuras
- Explorar template de diagrama C4 para projetos em `Mockups/`
- Criar script de automação para atualizar `_index_.MD` a partir do conteúdo das pastas
