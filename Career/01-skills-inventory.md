# Skills Inventory

> Mapeamento honesto de skills técnicas e comportamentais.
> Níveis baseados em capacidade de entregar **sozinho**, não "já ouvi falar".

---

## 🟢 Backend

### Java 21 — ★★★★☆

| Aspecto | Nível | Evidência |
|---------|-------|-----------|
| Sintaxe moderna (records, pattern matching, VTs) | ★★★★☆ | DTOs como records no SuicidalDropAPI |
| POO / SOLID / Clean Architecture | ★★★★☆ | Service layer, injeção de dependência, mappers |
| Concorrência (Virtual Threads) | ★★★☆☆ | Ativado no Spring Boot 3.5, ainda explorando |
| Streams / Optionals / Functional | ★★★☆☆ | Uso básico consistente |

**Gaps conscientes**: Multithreading complexo (Locks, CompletableFuture encadeado), performance tuning de JVM, módulos (JPMS).

### Spring Boot 3.5 — ★★★★☆

| Aspecto | Nível | Evidência |
|---------|-------|-----------|
| REST Controllers | ★★★★☆ | AuthController, ProductController (em progresso) |
| Security (JWT, CORS, filter chain) | ★★★★☆ | JwtTokenProvider, JwtAuthenticationFilter, SecurityConfig |
| Spring Data MongoDB | ★★★★☆ | MongoRepository, @Query, MongoTemplate, aggregations |
| Validation | ★★★★☆ | `@Valid`, Jakarta Bean Validation, error handling global |
| Exception Handling | ★★★★☆ | @RestControllerAdvice, error DTO padronizado |
| Testes (JUnit, Mockito, Testcontainers) | ★★☆☆☆ | **Em foco agora — maior gap** |
| Spring Data JPA / PostgreSQL | ★☆☆☆☆ | **Nunca usei — SQL é a prioridade** |
| SpringDoc / OpenAPI | ★★☆☆☆ | Conhecimento teórico, não implementado |

### API Design — ★★★★☆
RESTful naming, versionamento via path, paginação, error handling padronizado, OpenAPI. Evidência: toda a arquitetura do SuicidalDropAPI.

---

## 🟡 Frontend

### React 18 — ★★★☆☆

| Aspecto | Nível | Evidência |
|---------|-------|-----------|
| Hooks (useState, useEffect, useContext) | ★★★★☆ | Custom hooks no MELI (useTheme, useGallery, usePageTitle) |
| Componentes funcionais + composição | ★★★★☆ | Componentização limpa no MELI |
| Testing Library | ★☆☆☆☆ | **Nunca testei componente React — gap** |
| Performance (memo, useCallback) | ★★★☆☆ | Uso consciente, sem exageros |
| Estado global (Zustand) | ★★★☆☆ | 2 stores no MELI (authStore, galleryStore) |

### Next.js 16 — ★★★☆☆

| Aspecto | Nível | Evidência |
|---------|-------|-----------|
| App Router | ★★★★☆ | Layouts, loading, error, not-found pages |
| Server vs Client Components | ★★★☆☆ | Uso consciente, Server Components pra fetch |
| RSC / Data Fetching | ★★★☆☆ | fetch com cache e revalidate |
| i18n | ★★★★☆ | Provider customizado EN/ES/PT no MELI |
| Middleware | ★★★☆☆ | Auth redirect, headers |

### Tailwind CSS v4 — ★★★☆☆
Utility-first, `@theme`, custom tokens, dark mode via CSS variables. Evidência: design system completo do MELI.

---

## 🔵 Dados

### MongoDB — ★★★★☆

| Aspecto | Nível | Evidência |
|---------|-------|-----------|
| Modelagem de documentos | ★★★★☆ | Embedding (variants in product) vs referencing (categories) |
| CRUD + MongoRepository | ★★★★☆ | ProductRepository, UserRepository |
| Aggregation Pipeline | ★★★★☆ | Facetas, $match, $group, $unwind |
| Indexes | ★★★★☆ | Compostos, texto, TTL, ESR rule |
| Spring Data MongoDB avançado | ★★★★☆ | MongoTemplate, atomic updates, upsert |

### PostgreSQL — ★★☆☆☆
**Gap reconhecido**. Já vi na ETEC, conheço sintaxe básica (SELECT, JOIN, WHERE). Mas NUNCA usei com Spring Boot JPA. É a prioridade #1 pós-TDD.

---

## 🟣 Infra & Ferramentas

| Skill | Nível | Notas |
|-------|-------|-------|
| Git | ★★★★☆ | Conventional commits, rebase, `--force-with-lease`, branching |
| Docker / Compose | ★★★☆☆ | Dockerfile multi-stage, docker-compose com MongoDB |
| Gradle | ★★★★☆ | Kotlin DSL, tasks, dependências, build cache |
| CI/CD | ★★☆☆☆ | Só teórico/configurado com assistência |
| Vercel | ★★★☆☆ | Deploy automático, env vars, Blob storage |
| Railway | ★★★☆☆ | Deploy configurado (com ajuda) |
| Linux (terminal) | ★★★☆☆ | Navegação, scripts básicos, permissões |
| IntelliJ IDEA | ★★★★☆ | Shortcuts, debug, refatoração |

---

## ⚪ Testes (gap principal)

| Ferramenta | Nível | Status |
|------------|-------|--------|
| JUnit 5 | ★★☆☆☆ | Sei ler e entender, escrevo com ajuda |
| Mockito | ★★☆☆☆ | Mesmo — preciso de prática autônoma |
| Testcontainers | ★☆☆☆☆ | Conceito entendido, nunca usei |
| Vitest | ★☆☆☆☆ | Idem |
| Testing Library | ★☆☆☆☆ | Idem |
| TDD cycle | ★★☆☆☆ | Entendo o ciclo, não internalizei |

**Nota**: a skill `tdd-development` foi criada especificamente pra fechar este gap. O plano é subir de ★★ para ★★★★ em 2 meses.

---

## 🟤 Soft Skills (da vida real)

| Habilidade | Origem | Como aplica em dev |
|------------|--------|-------------------|
| Negociação | Fotografia (briefing, orçamento, fecha) | Discussão técnica, code review |
| Entrega sob pressão | Restaurantes (hora do rush, 6 mesas ao mesmo tempo) | Prazo de sprint, bug em produção |
| Liderança | Maître (coordenar salão inteiro) | Mentoria (futura), Pair Programming |
| Criatividade | Mixologia (criar drinks do zero) | Arquitetura, resolver problema sem tutorial |
| Precisão | Sommelier (temperatura, safra, harmonização) | Testes, validação, segurança |
| Resiliência | Kicked out at 16, se virou sozinho | Aprender tecnologia nova sem ajuda |
| Autodidatismo | Desde os 14 | Acompanhar mercado, aprender frameworks |
| Design / Estética | Fotografia, edição, SM design | UI/UX, CSS limpo, grids, tipografia |
| Comunicação | Garçom (atendimento), fotógrafo (briefing) | Documentação, PR description, daily |

---

## 📊 Resumo da Progressão Desejada

| Skill | Hoje | Meta (3 meses) | Meta (6 meses) |
|-------|------|----------------|----------------|
| TDD / Testes | ★★ | ★★★★ | ★★★★ |
| PostgreSQL + JPA | ★★ | ★★★★ | ★★★★ |
| Estrutura de Dados | ★★ | ★★★ | ★★★★ |
| CI/CD | ★★ | ★★★ | ★★★★ |
| Inglês (writing/talking) | ★★★ | ★★★ | ★★★★ |
| React Testing Library | ★ | ★★★ | ★★★★ |
