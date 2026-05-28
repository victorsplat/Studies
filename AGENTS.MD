# AGENTS.MD — Repositório de Estudos e Pesquisas

## Propósito
Este repositório centraliza estudos, pesquisas, mockups e documentação técnica/histórica, organizados de forma que sejam rastreáveis e reutilizáveis.

## Convenções

### Nomenclatura
| Item | Regra | Exemplo |
|------|-------|---------|
| Documentos | UPPERCASE.MD | `README.MD`, `NOTES.MD`, `REFERENCES.MD` |
| Diretórios | PascalCase | `ReactHooks/`, `WW2Timeline/`, `ColdWar/` |
| Arquivos de código | PascalCase | `MainApp.tsx`, `DatabaseService.ts` |

### Idioma
- Código e tech → **Inglês** (comentários, nomes de variáveis, READMEs de código)
- Estudos acadêmicos → **idioma da fonte** (se lendo em EN, anota em EN; se em PT-BR, anota em PT-BR)
- Organização geral, índices, arquivos raiz → **Português (fallback)**

## Estrutura de Diretórios

```
Tech/
  ├── _index_.MD
  └── <PascalCaseTopic>/
      ├── README.MD        # Visão geral do tópico
      ├── NOTES.MD         # Anotações detalhadas
      ├── REFERENCES.MD    # Links, papers, documentação
      ├── Code/            # Código de exemplo
      └── Diagrams/        # Diagramas (Mermaid, excalidraw, PNG)

History/
  ├── _index_.MD
  ├── Books/
  │   └── <PascalCaseBook>/
  │       ├── README.MD    # Ficha: autor, ano, contexto, avaliação
  │       ├── NOTES.MD     # Anotações por capítulo
  │       └── SUMMARY.MD   # Resumo final e conclusões
  └── Facts/
      └── <PascalCasePeriod>/
          ├── README.MD    # Visão geral
          ├── TIMELINE.MD  # Linha do tempo
          └── SOURCES.MD   # Fontes consultadas

Mockups/
  ├── _index_.MD
  ├── Projects/
  │   └── <PascalCaseProject>/
  │       ├── README.MD        # Descrição, objetivo, contexto
  │       ├── REQUIREMENTS.MD  # Requisitos funcionais e não-funcionais
  │       ├── ARCHITECTURE.MD  # Decisões arquiteturais, justificativas
  │       ├── Wireframes/      # Esboços visuais
  │       ├── Diagrams/        # Diagramas C4, UML, fluxos
  │       └── Schema/          # Schemas de BD, contratos de API
  └── Templates/
      ├── ProjectTemplate/
      └── DocTemplate/
```

## Frameworks de Pesquisa (Tipos de Entrada)
Cada novo tópico deve ser classificado em um destes tipos:

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| **How-To** | Guia prático ("Como fazer X") | "Como configurar Docker Compose" |
| **Deep-Dive** | Investigação interna ("Como X funciona") | "Como o Garbage Collector do Go funciona" |
| **Comparison** | Comparação entre ferramentas/abordagens | "React vs Solid: quando usar cada um" |
| **Case Study** | Análise de caso real | "Como a Netflix gerencia microsserviços" |
| **Book Notes** | Fichamento de livro | "Sapiens — Yuval Noah Harari" |
| **Historical Fact** | Registro de fato/período histórico | "Queda do Muro de Berlim" |
| **Mockup/Arch** | Esquema arquitetural de projeto | "Sistema de e-commerce serverless" |

## Glossário de Tags
Use tags nos `_index_.MD` e nos READMEs para facilitar buscas:

### Por Categoria
- `#tech` — Tecnologia
- `#history` — História
- `#mockup` — Mockups/Projetos
- `#study` — Estudos gerais

### Por Abordagem
- `#deep-dive`, `#how-to`, `#comparison`, `#case-study`, `#book-notes`, `#historical-fact`

### Por Nível
- `#beginner`, `#intermediate`, `#advanced`

### Por Estado
- `#in-progress`, `#completed`, `#archived`

## Regras para Agentes

1. **Sempre seguir a estrutura de diretórios** acima ao criar novo conteúdo
2. **Atualizar `_index_.MD`** da categoria ao adicionar ou remover tópicos
3. **Diagramas** devem usar Mermaid (.MMD) ou Excalidraw quando possível
4. **Taggear** todo novo tópico com pelo menos uma tag de categoria e uma de estado
5. **Não remover templates** da pasta `Mockups/Templates/` — eles servem de referência
6. **Manter rastreabilidade**: ao modificar um tópico existente, registrar no README.MD a data da alteração e o motivo
7. **Commits**: usar `git commit` apenas quando explicitamente solicitado pelo usuário

## Index

### Tech/
<!-- Lista atualizada automaticamente pelos agentes -->
- _Nenhum tópico ainda_

### History/
<!-- Lista atualizada automaticamente pelos agentes -->
- _Nenhum tópico ainda_

### Mockups/
<!-- Lista atualizada automaticamente pelos agentes -->
- _Nenhum tópico ainda_
