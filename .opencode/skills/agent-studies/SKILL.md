---
name: agent-studies
description: AGENTStudies — study notes, architecture references, mockups, learning roadmap
---

# AGENTStudies

## Overview
Repositório central de estudos e referências arquiteturais. Contém notas de tecnologia, decisões de arquitetura, histórico de aprendizado, e mockups de projetos.

## When to Use
- Consultar referência de tecnologia (Spring Boot, MongoDB, Next.js)
- Revisar decisão arquitetural passada
- Ver mockups e protótipos de UI
- Atualizar learning roadmap

## Core Structure
```
AGENTStudies/
├── History/           → Registro cronológico do que foi feito
├── Tech/              → Notas técnicas por tecnologia
├── Mockups/           → Protótipos e wireframes
└── .opencode/
```

## Conventions
| Item | Regra |
|---|---|
| Diretórios | PascalCase (`History/`, `Tech/`, `Mockups/`) |
| Arquivos | PascalCase descritivo |
| Datas | `YYYY-MM-DD` em nomes de arquivo |
| Idioma | Português (notas técnicas) ou conforme contexto |

## Content Types

### Tech/
Arquivos markdown com notas sobre tecnologias específicas:
- `Tech/SpringBoot/` — Anotações sobre Spring Boot 3.5, Security, MongoDB
- `Tech/NextJS/` — Anotações sobre App Router, RSC, Turbopack
- `Tech/MongoDB/` — Aggregation, indexes, schema design
- Conteúdo: conceitos, dicas, problemas resolvidos, code snippets

### History/
Registro cronológico do que foi aprendido/implementado:
- `History/2026-05-31-SpringBoot-JWT-Setup.md`
- `History/2026-06-01-MongoDB-Indexes.md`
- Formato: data + tópico com resumo do que foi feito

### Mockups/
Prototipagem de UI/UX para projetos:
- `Mockups/SuicidalDrop/` — Wireframes do ecommerce
- `Mockups/MeliPortfolio/` — Layouts do portfolio
- Formatos: imagens, PDFs, arquivos de ferramenta de mockup

## Cross-Reference com Projetos
| Projeto | Referência no AGENTStudies |
|---|---|
| SuicidalDropAPI | `ARCHITECTURE_ANCHOR.MD` aponta para decisões registradas aqui |
| Meli-Portfolio-Resume | Padrões de i18n, gallery, e deployment |
| AGENTStudies (este repo) | Central de referência |

## Guidelines
- Tech notes devem ser práticas (code snippets > teoria)
- History entries devem responder "o que aprendi hoje?"
- Mockups devem ter data e contexto (qual projeto, qual feature)
- Manter `ARCHITECTURE_ANCHOR.MD` atualizado com últimas decisões
