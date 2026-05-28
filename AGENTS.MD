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
3. **Diagramas** devem usar Mermaid (.MMD ou diretamente nos `.MD`) ou Excalidraw quando possível
4. **Taggear** todo novo tópico com pelo menos uma tag de categoria e uma de estado
5. **Não remover templates** da pasta `Mockups/Templates/` — eles servem de referência
6. **Manter rastreabilidade**: ao modificar um tópico existente, registrar no README.MD a data da alteração e o motivo
7. **Commits**: usar `git commit` apenas quando explicitamente solicitado pelo usuário

## Regras de Manutenção da Cronologia

1. **Registrar toda sessão** no `CHRONOLOGY.MD` com timestamp `HH:MM`
2. **Usar os tipos corretos**: `[MARCO]`, `[DECISAO]`, `[IDEA]`, `[TODO]`, `[ESTUDO]`, `[BOOKMARK]`, `[DUVIDA]`, `[AGENDADO]`
3. **Ideias futuras** devem incluir `⌛ Sugerir em: <data ou condicao>` para o agente lembrar depois
4. **Ao iniciar uma sessão**, consultar o CHRONOLOGY para verificar pendências e itens agendados
5. **Manter seção "Próximos Passos"** atualizada com checkboxes

## Regras do Mapa Visual (README.MD)

1. **Ao adicionar projeto novo**, seguir os 5 passos da seção "Como Adicionar um Novo Projeto ao Mapa" no README.MD
2. **Diagramas Mermaid** devem ser mantidos sincronizados com o estado real dos projetos
3. **Progresso** (barras e % ) deve refletir o `_index_.MD` da categoria
4. **Roadmap Gantt** deve ser atualizado quando prazos mudarem
5. **Consultar o `MERMAID-GUIDE.MD`** para dúvidas de sintaxe de diagramas

## Arquivos de Referência
- [`CHRONOLOGY.MD`](./CHRONOLOGY.MD) — Cronograma e histórico de atividades
- [`MERMAID-GUIDE.MD`](./MERMAID-GUIDE.MD) — Tutorial de diagramas Mermaid

## Index

### Tech/
<!-- Lista atualizada automaticamente pelos agentes -->
- _Nenhum tópico ainda_

### History/
<!-- Lista atualizada automaticamente pelos agentes -->
- _Nenhum tópico ainda_

### Mockups/
<!-- Lista atualizada automaticamente pelos agentes -->
- [`MeliPortfolio`](./Mockups/Projects/MeliPortfolio/) — Portfólio full-stack Next.js 16
- [`SuicidalDropStore`](./Mockups/Projects/SuicidalDropStore/) — E-commerce API Java 21 + Spring Boot
