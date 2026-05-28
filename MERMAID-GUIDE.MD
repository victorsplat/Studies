# MERMAID GUIDE — Tutorial de Diagramas

Guia rápido de Mermaid para usar nos arquivos `.MD` do repositório. O GitHub renderiza Mermaid nativamente em qualquer arquivo Markdown.

---

## 1. Graph (Árvores e Hierarquias)

### Sintaxe
```mermaid
graph TD
    A[Texto] --> B[Filho]
    A --> C[Filho]
    B --> D[Neto]
```

- `TD` = Top-Down, `LR` = Left-Right
- `[Texto]` = retângulo, `(Texto)` = arredondado, `{Texto}` = losango

### Exemplo real do repositório
```mermaid
graph TD
    AG[AGENTStudie] --> Tech
    AG --> History
    AG --> Mockups
    Mockups --> MELI[MeliPortfolio]
    Mockups --> SDS[SuicidalDropStore]
```

````markdown
```mermaid
graph TD
    AG[AGENTStudie] --> Tech
    AG --> History
    AG --> Mockups
    Mockups --> MELI[MeliPortfolio]
    Mockups --> SDS[SuicidalDropStore]
```
````

---

## 2. Flowchart (Fluxos e Comparações)

### Sintaxe
```mermaid
flowchart LR
    subgraph Grupo1
        direction TB
        A --> B
    end
    subgraph Grupo2
        C --> D
    end
    A -.-> C
```

- `subgraph` cria caixas agrupadas
- `.->` = linha tracejada, `==>` = linha grossa
- `direction TB` = dentro do subgraph, force Top-Bottom

### Exemplo real do repositório
```mermaid
flowchart LR
    subgraph MELI[MeliPortfolio ✅]
        direction TB
        M1[Next.js 16]
        M2[React 18 + Tailwind]
        M3[MongoDB + Vercel Blob]
    end
    subgraph SDS[SuicidalDropStore 🔧]
        direction TB
        S1[Java 21]
        S2[Spring Boot 3.5]
        S3[MongoDB]
    end
```

````markdown
```mermaid
flowchart LR
    subgraph MELI[MeliPortfolio ✅]
        direction TB
        M1[Next.js 16]
        M2[React 18 + Tailwind]
        M3[MongoDB + Vercel Blob]
    end
    subgraph SDS[SuicidalDropStore 🔧]
        direction TB
        S1[Java 21]
        S2[Spring Boot 3.5]
        S3[MongoDB]
    end
```
````

---

## 3. Mindmap (Mapas Mentais)

### Sintaxe
```mermaid
mindmap
  Topico
    Sub1
      Sub1.1
    Sub2
```

- Indentação define hierarquia
- `(` `)` = arredondado, `[` `]` = quadrado, `[[ ]]` = badge
- Não use `-->`, só indentação

### Exemplo real do repositório
```mermaid
mindmap
  Habilidades
    Frontend
      Next.js 16
      React 18
      Tailwind v4
      Framer Motion
    Backend
      Java 21
      Spring Boot
      MongoDB
      JWT / Security
    Arquitetura
      Monolito Modular
      Saga Pattern
      Atomic Inventory
      i18n
    Ferramentas
      Docker
      Gradle
      Git
```

````markdown
```mermaid
mindmap
  Habilidades
    Frontend
      Next.js 16
      React 18
      Tailwind v4
      Framer Motion
    Backend
      Java 21
      Spring Boot
      MongoDB
      JWT / Security
    Arquitetura
      Monolito Modular
      Saga Pattern
      Atomic Inventory
      i18n
    Ferramentas
      Docker
      Gradle
      Git
```
````

---

## 4. Gantt (Cronogramas)

### Sintaxe
```mermaid
gantt
    title Titulo
    dateFormat  YYYY-MM-DD
    section Nome
    Tarefa 1       :done, 2026-05-01, 5d
    Tarefa 2       :active, 2026-05-06, 3d
    Tarefa 3       :2026-05-10, 4d
```

- `:done` = concluído, `:active` = em andamento, `:crit` = crítico
- Duração em dias (`5d`), horas (`8h`), ou intervalo (`2026-05-01, 2026-05-10`)

### Exemplo real do repositório
```mermaid
gantt
    title Roadmap — Projetos
    dateFormat  YYYY-MM-DD
    section MeliPortfolio
    MVP Completo           :done, 2026-04-01, 2026-05-24
    Testes + Sentry        :2026-06-01, 14d
    section SuicidalDropStore
    Pilar 1 - Identity     :done, 2026-05-26, 1d
    Pilar 2 - Catalog      :2026-06-02, 5d
    Pilar 3 - Inventory    :2026-06-09, 6d
    Pilar 4 - Order        :2026-06-17, 8d
```

````markdown
```mermaid
gantt
    title Roadmap — Projetos
    dateFormat  YYYY-MM-DD
    section MeliPortfolio
    MVP Completo           :done, 2026-04-01, 2026-05-24
    Testes + Sentry        :2026-06-01, 14d
    section SuicidalDropStore
    Pilar 1 - Identity     :done, 2026-05-26, 1d
    Pilar 2 - Catalog      :2026-06-02, 5d
    Pilar 3 - Inventory    :2026-06-09, 6d
    Pilar 4 - Order        :2026-06-17, 8d
```
````

---

## Dicas Rápidas

### Cores e Estilos (graph/flowchart)
```mermaid
graph LR
    A:::destaque --> B
    classDef destaque fill:#ffe600,stroke:#333,color:#000
```

### Links nos nós
```mermaid
graph TD
    A[Clique aqui] --> B[Destino]
    click A "https://github.com" "Tooltip"
```

### Quebra de linha
Use `<br>` dentro dos colchetes:
```
A[Linha 1<br>Linha 2]
```

---

## Referência

- Documentação oficial: https://mermaid.js.org/syntax/
- Editor online: https://mermaid.live/
- Renderização: GitHub, GitLab, Notion, Obsidian (nativo)
