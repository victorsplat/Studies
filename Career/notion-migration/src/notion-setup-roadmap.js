const { Client } = require('@notionhq/client')

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const PARENT_PAGE_ID = '5cd719c8-74b3-455f-88a5-10376d02c2da' // Personal Home

const WEEKS = [
  {
    name: 'S1 — Setup + MELI Tests',
    start: '2026-06-06',
    end: '2026-06-14',
    min: 'Configurar Vitest + Testing Library no MELI\nTestar 2 componentes (Gallery, ThemeToggle)',
    des: 'Cobertura >30% no front',
    stretch: 'Testar i18n provider (EN/ES/PT)',
    passivo: 'Podcast "TDD com Vitest" / docs Testing Library'
  },
  {
    name: 'S2 — MELI Tests Profundidade',
    start: '2026-06-15',
    end: '2026-06-21',
    min: 'Testar páginas e rotas (Home, About, Project, Contact)\nTestar authStore e galleryStore',
    des: 'Cobertura >50%',
    stretch: 'Mock de fetch (loading/error/success)',
    passivo: 'Revisar padrões RTL'
  },
  {
    name: 'S3 — TDD + SQL',
    start: '2026-06-22',
    end: '2026-06-28',
    min: '3 testes TDD no SuicidalDrop\nSQL: modelagem relacional, DDL, DML, JOINs',
    des: 'Mockito em 2 testes',
    stretch: 'Subqueries, CTEs, window functions',
    passivo: 'Curso SQL nos deslocamentos'
  },
  {
    name: 'S4 — Spring Data JPA + PostgreSQL',
    start: '2026-06-29',
    end: '2026-07-05',
    min: 'Spring Boot com PostgreSQL rodando\nMigrar 1 entidade do Mongo pra JPA',
    des: 'Relationships @OneToMany, @ManyToOne',
    stretch: 'Flyway ou Liquibase',
    passivo: 'Mongo vs PostgreSQL — quando usar cada um'
  },
  {
    name: 'S5 — SuicidalDrop Catalog TDD',
    start: '2026-07-06',
    end: '2026-07-12',
    min: 'Testar ProductController (GET, POST, PUT, DELETE)\nTestar ProductService com Mockito',
    des: 'Testar ProductRepository (Testcontainers)',
    stretch: 'Cobertura >70% (JaCoCo)',
    passivo: 'Revisar testes existentes do Catalog'
  },
  {
    name: 'S6 — Setup RestauranteAPI',
    start: '2026-07-13',
    end: '2026-07-19',
    min: 'Spring Boot + PostgreSQL + JPA rodando\nDomain model: Cardápio, Mesas, Pedidos',
    des: '2 endpoints REST funcionais',
    stretch: 'Docker Compose com PostgreSQL',
    passivo: 'Estudar domínio de restaurante'
  },
  {
    name: 'S7 — RestauranteAPI TDD',
    start: '2026-07-20',
    end: '2026-07-26',
    min: 'TDD em todos endpoints\n5+ testes passando',
    des: '@RestControllerAdvice com testes',
    stretch: 'Testcontainers com PostgreSQL real',
    passivo: 'Padrões TDD em Spring Boot'
  },
  {
    name: 'S8 — RestauranteAPI Completo',
    start: '2026-07-27',
    end: '2026-08-02',
    min: 'Security JWT + rotas protegidas\nOpenAPI / Swagger',
    des: '100% endpoints testados (>80%)',
    stretch: 'Deploy (Railway ou Render)',
    passivo: 'Preparar pitch do RestauranteAPI'
  },
  {
    name: 'S9 — Estruturas de Dados I',
    start: '2026-08-03',
    end: '2026-08-09',
    min: 'Arrays, Lists, Stacks, Queues (5 ex)\nMaps, Sets (3 ex)',
    des: 'Complexidade Big O — resumo próprio',
    stretch: 'HashMap vs TreeMap, HashSet vs TreeSet',
    passivo: 'Playlist ED no YouTube'
  },
  {
    name: 'S10 — Algoritmos',
    start: '2026-08-10',
    end: '2026-08-16',
    min: 'Sort (Bubble, Merge, Quick) + Busca binária (5 ex)\nTwo Pointers, Sliding Window (3 ex)',
    des: 'Recursão (2 ex)',
    stretch: '2 LeetCode Easy',
    passivo: 'Canais NeetCode, Fábrica de Dev'
  },
  {
    name: 'S11 — LinkedIn + Currículo',
    start: '2026-08-17',
    end: '2026-08-23',
    min: 'LinkedIn completo (foto, headline, sobre, projetos)\nCurrículo PDF pronto',
    des: 'Badges + 3 recomendações',
    stretch: 'Portfolio MELI atualizado',
    passivo: 'Perfis Java Jr aprovados no LinkedIn'
  },
  {
    name: 'S12 — Portfólio + Apps',
    start: '2026-08-24',
    end: '2026-08-30',
    min: 'READMEs dos 3 projetos\n10 aplicações enviadas',
    des: 'GitHub pinned repos (3)',
    stretch: 'Carta de apresentação template',
    passivo: 'Preparar ciclo S13+'
  }
]

async function createDatabase() {
  console.log('Criando Database Roadmap...')

  const db = await notion.databases.create({
    parent: { type: 'page_id', page_id: PARENT_PAGE_ID },
    title: [{ type: 'text', text: { content: 'Roadmap' } }],
    properties: {
      'Semana': { title: {} },
      'Data': { date: {} },
      'Status': {
        select: {
          options: [
            { name: '🟢 On Track', color: 'green' },
            { name: '🟡 At Risk', color: 'yellow' },
            { name: '🔴 Stuck', color: 'red' },
            { name: '✅ Done', color: 'green' }
          ]
        }
      },
      '🟢 Mínimo': { rich_text: {} },
      '🟡 Desejável': { rich_text: {} },
      '🔴 Stretch': { rich_text: {} },
      'Progresso': { number: { format: 'percent' } },
      'Passivo': { rich_text: {} },
      'Notas': { rich_text: {} }
    }
  })

  console.log('✅ Database Roadmap criado! ID: ' + db.id)
  return db.id
}

async function seedWeeks(databaseId) {
  console.log('\nPopulando as 12 semanas...')

  for (const week of WEEKS) {
    const props = {
      'Semana': { title: [{ text: { content: week.name } }] },
      'Data': { date: { start: week.start, end: week.end } },
      'Status': { select: { name: '🟢 On Track' } },
      '🟢 Mínimo': { rich_text: [{ text: { content: week.min } }] },
      '🟡 Desejável': { rich_text: [{ text: { content: week.des } }] },
      '🔴 Stretch': { rich_text: [{ text: { content: week.stretch } }] },
      'Passivo': { rich_text: [{ text: { content: week.passivo } }] }
    }

    try {
      await notion.pages.create({
        parent: { database_id: databaseId },
        properties: props
      })
      console.log(`  ✅ ${week.name}`)
    } catch (e) {
      console.log(`  ❌ ${week.name}: ${e.message}`)
    }
  }
}

async function createReferencePages() {
  console.log('\nCriando páginas de referência...')

  const refs = [
    {
      name: 'TDD Deep Dive',
      content: `# TDD Deep Dive

## Dual-Stack TDD
- **MELI (Next.js)**: Vitest + Testing Library
- **SuicidalDrop (Spring Boot)**: JUnit 5 + Mockito
- **RestauranteAPI (Full Stack)**: Ambos + Testcontainers

## Ciclo Red-Green-Refactor
1. **Red**: Escreva teste que falha
2. **Green**: Código mínimo pra passar
3. **Refactor**: Melhore sem quebrar

## Metas
- ★★→★★★ até fim de Julho
- 3+ commits de TDD por semana
- Passivo: podcasts sobre TDD nos deslocamentos`
    },
    {
      name: 'Portfolio Pitch',
      content: `# Portfolio Pitch

## Meli-Portfolio-Resume (Next.js)
- **Problema**: Portfolio estático sem testes
- **Ação**: Implementei Vitest + Testing Library, coverage >50%
- **Resultado**: Portfolio resiliente com deploy contínuo na Vercel

## SuicidalDropAPI (Spring Boot + MongoDB)
- **Problema**: API sem TDD
- **Ação**: Catálogo com TDD + Mockito + Testcontainers
- **Resultado**: API testada, cobertura >70%, pronta pra produção

## RestauranteAPI (Spring Boot + PostgreSQL)
- **Problema**: Domínio de restaurante sem automação
- **Ação**: API completa com TDD, JWT, Swagger
- **Resultado**: Documentada, segura, deployada`
    },
    {
      name: 'Interview Prep',
      content: `# Interview Prep

## STAR Stories

### Resiliência
- **S**: API legada sem testes
- **T**: Implementar TDD do zero após 6 anos sem programar
- **A**: Estudei TDD, apliquei ciclo red-green-refactor, evolui de ★★ para ★★★
- **R**: 3 projetos com cobertura >70%

### Autodidatismo
- **S**: Inglês técnico ★★, precisava contribuir
- **T**: Ler código aberto e documentação em inglês
- **A**: Clean Code no commute, micro-outputs diários
- **R**: Leitura/escrita técnica ★★★★

### Negociação (Mercado Livre)
- **S**: Operação logística com gargalos
- **T**: Realocar equipe e recursos em horário apertado
- **A**: Mapeei fluxo, propus realocação, negociei com gerência
- **R**: Operação des congestionada, entregas no prazo`
    }
  ]

  for (const ref of refs) {
    try {
      await notion.pages.create({
        parent: { type: 'page_id', page_id: PARENT_PAGE_ID },
        properties: {
          title: { title: [{ text: { content: ref.name } }] }
        },
        children: [
          {
            object: 'block',
            type: 'heading_1',
            heading_1: {
              rich_text: [{ type: 'text', text: { content: ref.name } }]
            }
          },
          {
            object: 'block',
            type: 'divider',
            divider: {}
          }
        ]
      })
      console.log(`  ✅ ${ref.name}`)
    } catch (e) {
      console.log(`  ❌ ${ref.name}: ${e.message}`)
    }
  }
}

async function main() {
  console.log('🚀 Setup do Roadmap no Notion')
  console.log('='.repeat(40))

  const dbId = await createDatabase()
  await seedWeeks(dbId)
  await createReferencePages()

  console.log('\n' + '='.repeat(40))
  console.log('✅ Setup completo!')
  console.log(`Database ID: ${dbId}`)
  console.log(`URL: https://notion.so/${dbId.replace(/-/g, '')}`)
}

main().catch(console.error)
