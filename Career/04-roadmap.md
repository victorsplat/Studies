# Study Roadmap

> Roadmap semanal por metas objetivas — sem horários fixos.
> Cada semana tem UM entregável concreto. O resto é bônus.
> Rotina real: passivo nos deslocamentos (3h/dia) + ativo 20h-22h (1-2h) + fim de semana (4-6h/dia).
> Hoje: **6 de Junho de 2026**.

---

## 📌 Legenda dos Entregáveis

| Nível | Significado |
|-------|-------------|
| 🟢 Mínimo | Faz diferença real no portfolio/gaps |
| 🟡 Desejável | Acelera progresso |
| 🔴 Stretch | Se sobrar tempo ou energia |

---

## Junho — MELI Tests + TDD + SQL

### S1 | 06-14 Jun | Setup + MELI Tests

| | Meta | Entregável |
|---|------|------------|
| 🟢 | Configurar Vitest + Testing Library no MELI | `vitest` rodando com 1 teste passando |
| 🟢 | Testar 2 componentes principais | Gallery e ThemeToggle |
| 🟡 | Cobertura >30% no front | Relatório de cobertura |
| 🔴 | Testar i18n provider | Render com EN/ES/PT |

**Passivo da semana**: Podcast "TDD com Vitest" / docs do Testing Library

---

### S2 | 15-21 Jun | MELI Tests — Profundidade

| | Meta | Entregável |
|---|------|------------|
| 🟢 | Testar páginas e rotas | Home, About, Project, Contact |
| 🟢 | Testar authStore e galleryStore | Zustand stores com testes |
| 🟡 | Cobertura >50% | Relatório de cobertura |
| 🔴 | Mock de fetch (API calls) | Testar loading/error/success states |

**Passivo da semana**: Revisar padrões de teste em React Testing Library

---

### S3 | 22-28 Jun | TDD + SQL

| | Meta | Entregável |
|---|------|------------|
| 🟢 | TDD ciclo red-green-refactor (skill tdd-dev nível 1-2) | 3 testes TDD no SuicidalDrop |
| 🟢 | SQL: modelagem relacional, DDL, DML, JOINs | Script SQL de schema relacional |
| 🟡 | Mockito em testes do SuicidalDrop | Mock de dependências em 2 testes |
| 🔴 | Subqueries, CTEs, window functions | Query SQL avançada funcional |

**Passivo da semana**: Curso de SQL (Alura, Udemy) nos deslocamentos

---

### S4 | 29 Jun-05 Jul | Spring Data JPA + PostgreSQL

| | Meta | Entregável |
|---|------|------------|
| 🟢 | JPA + Hibernate + PostgreSQL funcional | Projeto Spring Boot com PostgreSQL rodando |
| 🟢 | Migrar 1 entidade do Mongo pra JPA | Entidade JPA com repository e query |
| 🟡 | Relationships @OneToMany, @ManyToOne | 2 entidades relacionadas |
| 🔴 | Flyway ou Liquibase | Migration versionada |

**Passivo da semana**: Comparativo MongoDB vs PostgreSQL — quando usar cada um

---

## Julho — SuicidalDrop Catalog + RestauranteAPI

### S5 | 06-12 Jul | SuicidalDrop Catalog com TDD

| | Meta | Entregável |
|---|------|------------|
| 🟢 | Testar ProductController com TDD | GET, POST, PUT, DELETE com testes |
| 🟢 | Testar ProductService com Mockito | Regras de negócio testadas |
| 🟡 | Testar ProductRepository (Testcontainers) | Query de busca testada |
| 🔴 | Cobertura >70% no módulo Catalog | Relatório JaCoCo |

**Passivo da semana**: Revisar testes do Catalog que já existem

---

### S6 | 13-19 Jul | Setup RestauranteAPI

| | Meta | Entregável |
|---|------|------------|
| 🟢 | Spring Boot + PostgreSQL + JPA | API rodando com health check |
| 🟢 | Domain model: Cardápio, Mesas, Pedidos | Entidades JPA com relacionamentos |
| 🟡 | Primeiros endpoints REST | 2 endpoints funcionais |
| 🔴 | Docker Compose com PostgreSQL | Ambiente local reproduzível |

**Passivo da semana**: Estudar domínio de restaurante (cardápio, comanda, fechamento de mesa)

---

### S7 | 20-26 Jul | RestauranteAPI — TDD Intensivo

| | Meta | Entregável |
|---|------|------------|
| 🟢 | TDD em todos os endpoints | Controller → Service → Repository |
| 🟢 | 5+ testes passando | Testes unitários + integração |
| 🟡 | Tratamento de erros global | @RestControllerAdvice com testes |
| 🔴 | Testcontainers com PostgreSQL real | Teste de integração completo |

**Passivo da semana**: Padrões de TDD em Spring Boot (blogs, YouTube)

---

### S8 | 27 Jul-02 Ago | RestauranteAPI Completo

| | Meta | Entregável |
|---|------|------------|
| 🟢 | Security (JWT) no RestauranteAPI | Login + rotas protegidas |
| 🟢 | OpenAPI / Swagger | Documentação automática |
| 🟡 | 100% dos endpoints testados | Cobertura >80% |
| 🔴 | Deploy (Railway ou render) | API no ar |

**Passivo da semana**: Preparar pitch do RestauranteAPI (domínio que você conhece)

---

## Agosto — Estruturas + Job Prep

### S9 | 03-09 Ago | Estruturas de Dados I

| | Meta | Entregável |
|---|------|------------|
| 🟢 | Arrays, Lists, Stacks, Queues em Java | 5 exercícios resolvidos |
| 🟢 | Maps, Sets | 3 exercícios |
| 🟡 | Complexidade Big O | Resumo próprio |
| 🔴 | HashMap vs TreeMap, HashSet vs TreeSet | Comparação com exemplos |

**Passivo da semana**: Playlist de ED no YouTube (deslocamentos)

---

### S10 | 10-16 Ago | Algoritmos

| | Meta | Entregável |
|---|------|------------|
| 🟢 | Ordenação (Bubble, Merge, Quick) + Busca binária | 5 exercícios |
| 🟢 | Two pointers, Sliding Window | 3 exercícios |
| 🟡 | Recursão | 2 exercícios |
| 🔴 | 2 LeetCode Easy | Challenges resolvidos |

**Passivo da semana**: Canais de algoritmo (NeetCode, Fábrica de Dev)

---

### S11 | 17-23 Ago | LinkedIn + Currículo

| | Meta | Entregável |
|---|------|------------|
| 🟢 | LinkedIn: foto, headline, sobre, projetos | Perfil completo |
| 🟢 | Currículo PDF: experiência, projetos, skills | Currículo pronto |
| 🟡 | Badges + recomendações | 3 recomendações de colegas |
| 🔴 | Portfólio no MELI atualizado | Seção "projetos" no ar |

**Passivo da semana**: Ver perfis de Java Jr aprovados no LinkedIn (inspiração)

---

### S12 | 24-30 Ago | Portfólio + Primeiras Aplicações

| | Meta | Entregável |
|---|------|------------|
| 🟢 | Organizar READMEs dos 3 projetos | README limpo e profissional |
| 🟢 | **10 aplicações enviadas** | Confitec, PariPassu, SysMap + |
| 🟡 | GitHub com pinned repositories | 3 repositórios destacados |
| 🔴 | Carta de apresentação template | Template reutilizável |

---

## Setembro+ — Ciclo de Aplicação

| Semana | Meta | Estratégia |
|--------|------|------------|
| S13+ | Aplicar → errar → gap study → aplicar | Cada erro de entrevista vira estudo na semana seguinte |
| Meta total | 30+ aplicações acumuladas | 3+ entrevistas, oferta até Outubro |

---

## Metas Macro

| Mês | Técnico | Job |
|-----|---------|-----|
| **Junho** | MELI com testes + TDD ★★→★★★ + SQL ★★→★★★ | Nada |
| **Julho** | RestauranteAPI pronta 100% TDD + JPA ★★→★★★ | LinkedIn pronto |
| **Agosto** | ED ★★→★★★ | 10+ aplicações |
| **Setembro** | Fechar gaps de entrevista | 30+ apps, 3+ entrevistas |
| **Outubro** | Estabilizar | **Oferta** |

---

## Notas

- **Passivo é aliado, não substituto**: use deslocamentos + cozinhar para consumir conteúdo, mas o avanço real vem do **ativo** (1-2h/dia + fins de semana)
- **Fim de semana é onde o progresso acelera**: 4-6h/dia sábado e domingo = 8-12h que fazem a semana valer
- **Se atrasar, não acumula**: se S1 não fechar, o entregável vira prioridade do passivo e segue pra S2
- **Oferta até Outubro**: é agressivo mas factível com consistência
