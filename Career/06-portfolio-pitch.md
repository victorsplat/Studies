# Portfolio Pitch

> Como vender MELI + SuicidalDropAPI + RestauranteAPI em entrevistas, LinkedIn e currículo.
> Scripts prontos, perguntas esperadas, e dicas de estudo para entrevistas.

---

## 1. A Narrativa Central

Seu arco em 30 segundos:

> "Programei dos 14 aos 16, parei por 6 anos, e voltei em 2026. Nesse meio tempo fui fotógrafo por 5 anos — aprendi briefing, negociação e entrega — e trabalhei em restaurantes como maître e sommelier — aprendi liderança, pressão e precisão. Hoje tenho 3 projetos reais: um portfolio Next.js no ar, uma API Java com segurança JWT, e uma API de restaurante 100% TDD. Meu diferencial é que entendo de operação real, não só de código."

### 🎯 Dica de estudo
- Memorize o arco, não o script. Treine na frente do espelho até soar natural
- Use as **palavras-chave**: pressão, entrega, briefing, liderança, TDD, segurança
- Grave áudio no celular, ouça, ajuste, repita

---

## 2. MELI — Portfolio Next.js no Ar

### 30 segundos (LinkedIn / início de entrevista)
> "Portfolio pessoal com Next.js 16, React 18, Tailwind v4 e MongoDB. Suporte a i18n em EN/ES/PT, dark mode, galeria de fotos com Vercel Blob. Deploy automático no Vercel com >90 em todas as métricas Lighthouse."

### 3 minutos (entrevista técnica)
- Server Components para fetch de dados + Client Components para interatividade
- i18n customizado: provider com Context API + hook useTranslation
- Galeria de fotos: lazy loading + next/image + Vercel Blob storage
- Tema: CSS variables + data-theme attribute + persistência localStorage
- Performance: Lighthouse >90, cache strategy, Server Components

### LinkedIn bullet
> "Desenvolvi portfolio com Next.js 16 e React 18, alcançando >90 Lighthouse performance com i18n customizado (EN/ES/PT), dark mode e galeria com upload otimizado para Vercel Blob."

### 🎯 Perguntas que podem cair

| Pergunta | Resposta |
|----------|----------|
| "Por que Next.js e não CRA?" | SSR pra SEO, App Router, Server Components pra menos JS no cliente, Turbopack em dev |
| "Como fez i18n sem biblioteca?" | Provider com Context API, dicionário JSON, hook useTranslation. Simples e sem dependência extra |
| "Como lida com imagens?" | next/image pra otimização automática, lazy loading com loading="lazy", Vercel Blob pra upload |
| "Performance?" | Lighthouse >90 em todas as métricas. Server Components pra fetch. Cache com revalidate |
| "Qual sua maior conquista no MELI?" | Ter um projeto real no ar, com URL própria, deploy automatizado, e decisões conscientes de arquitetura |

### 🎯 Dica de estudo
- Abra o Lighthouse no MELI e decore as métricas ("Performance 94, Accessibility 96, Best Practices 92, SEO 100")
- Treine explicar Server vs Client Components com as suas próprias escolhas (quais componentes são Server, quais são Client, por que)

---

## 3. SuicidalDropAPI — Ecommerce Java

### 30 segundos
> "API REST de ecommerce com Java 21, Spring Boot 3.5, MongoDB, arquitetura em camadas, autenticação JWT, validação global e documentação de arquitetura. 4 pilares: Identity, Catalog, Inventory, Orders — em progresso."

### 3 minutos
- Clean Architecture: Controller → Service → Repository, DTOs como records
- Security: JwtTokenProvider, JwtAuthenticationFilter, SecurityConfig com CORS
- Exception handling: @RestControllerAdvice com error DTO padronizado
- MongoDB: aggregation pipeline, índices compostos e de texto, ESR rule
- Documentação: ARCHITECTURE.md público com decisões técnicas

### LinkedIn bullet
> "Projetei API REST com Java 21 + Spring Boot 3.5 + MongoDB, implementando autenticação JWT, validação global e tratamento de erros padronizado. Arquitetura documentada publicamente."

### 🎯 Perguntas que podem cair

| Pergunta | Resposta |
|----------|----------|
| "Por que MongoDB e não PostgreSQL?" | Produto tem variants (tamanho, cor) que mudam o schema — documento flexível. Categoria é fixa — referenciada. Embedding vs referencing consciente |
| "Como funciona o JWT?" | Login → TokenProvider gera token com subject + roles → AuthenticationFilter valida em toda request → SecurityConfig define rotas públicas vs privadas |
| "Tratamento de erros?" | @RestControllerAdvice captura exceções → error DTO padronizado (status, message, timestamp, path) |
| "Arquitetura?" | Camadas: Controller (REST) → Service (regras) → Repository (dados). DTO como record no input/output. Mapper separado |
| "Quais índices no MongoDB?" | Composto (category+price), texto (name), TTL (refresh token). ESR rule pra aggregation |
| "Como lida com concorrência?" | Virtual Threads no Spring Boot 3.5, atomic operations no MongoDB ($inc pra stock) |

### 🎯 Dica de estudo
- Releia o `ARCHITECTURE.md` e `ARCHITECTURE_ANCHOR.MD` antes de cada entrevista
- Treine desenhar a arquitetura no papel em 2 minutos: quadrados pra camadas, setas pros fluxos
- Saiba responder "Qual decisão técnica você mais se orgulha?" → "Usar records como DTO imutável ao invés de classes mutáveis"

---

## 4. RestauranteAPI — O Joker

### 30 segundos
> "API de gestão de restaurantes com Spring Boot, PostgreSQL, JPA e 100% TDD. Domínio real: cardápio, mesas, pedidos e comandas. Cobertura de testes >80%."

### 3 minutos
- PostgreSQL + JPA: escolha consciente por relacionamentos rígidos (pedido ↔ item ↔ produto)
- TDD em cada endpoint: red-green-refactor, Testcontainers pra integração real com PostgreSQL
- DDD: entidades de domínio refletem o mundo real (CardapioItem, Mesa, Pedido, Comanda)
- Security: JWT reaproveitado do SuicidalDropAPI, adaptado pro domínio
- OpenAPI / Swagger: documentação automática dos endpoints

### LinkedIn bullet
> "Construí API de gestão de restaurantes com Spring Boot + PostgreSQL + JPA, aplicando TDD em 100% dos endpoints com cobertura >80% e Testcontainers para testes de integração."

### 🎯 Perguntas que podem cair

| Pergunta | Resposta |
|----------|----------|
| "Por que PostgreSQL aqui e MongoDB no SuicidalDrop?" | Restaurante tem relacionamentos rígidos: pedido TEM itens, item TEM produto, mesa TEM pedido. Integridade referencial importa. MongoDB foi escolha pra schema flexível de ecommerce |
| "Como fez TDD?" | Ciclo red-green-refactor. Teste falha → código mínimo → passa → refatora. Testcontainers sobe PostgreSQL real pro teste de integração |
| "Relacionamentos JPA?" | @OneToMany (Pedido → Item), @ManyToOne (Item → Produto), @ManyToMany (Produto → Ingrediente). Fetch LAZY, cascade PERSIST |
| "O que aprendeu que não sabia antes?" | JPA relationships, Flyway pra migração, @DataJpaTest, diferença entre n+1 e fetch join |
| "Por que restaurante?" | Trabalhei 5 anos em restaurante. Conheço o domínio: cardápio, comanda, fechamento de mesa, split de conta. Nenhum outro dev Jr vai ter isso |

### 🎯 Dica de estudo
- **Esta é sua maior vantagem**. Você trabalhou em restaurante de verdade
- Prepare histórias STAR do domínio:
  - "Como funciona uma comanda aberta vs fechada?"
  - "Como é o fechamento de mesa no fim do dia?"
  - "O que é split de conta e como implementaria?"
- NENHUM outro candidato Java Jr vai saber responder isso com propriedade

---

## 5. Qual Projeto Vender em Cada Situação

| Situação | Projeto | Argumento |
|----------|---------|-----------|
| "Tem projeto no ar?" | **MELI** | Único live, URL própria, pode acessar agora |
| "Trabalhou com segurança?" | **SuicidalDropAPI** | JWT, CORS, filter chain, validação global |
| "Sabe SQL/relacional?" | **RestauranteAPI** | PostgreSQL + JPA + relacionamentos |
| "Já fez testes?" | **RestauranteAPI + MELI** | TDD de ponta a ponta + Testing Library |
| "Por que dev Java?" | **SuicidalDrop + Restaurante** | 2 APIs Spring Boot, stacks diferentes |
| "Conhece o negócio?" | **RestauranteAPI** | 5 anos em restaurante, fala a língua |
| "Trabalhou em equipe?" | **MELI + SuicidalDrop** | Código documentado, pronto pra review |
| "Sabe se virar?" | **Todos os 3** | Autodidata, 3 projetos em 4 meses |

### 🎯 Dica de estudo
- Treine a **transição** entre projetos: "Isso me ensinou X, que apliquei em Y"
- Exemplo: "O i18n do MELI me ensinou a pensar em providers, que usei no SecurityContext do SuicidalDrop"

---

## 6. Como Vender Experiências não-Dev

### Tabela STAR

| Soft Skill | Situação Real | Como Aplica em Dev |
|------------|---------------|--------------------|
| **Liderança** | Maître: gerenciava equipe de 5 garçons durante rush de 200 pessoas | Code review, mentoria (futura), Pair Programming |
| **Negociação** | Fotógrafo: cliente queria X, orçamento era Y, propus Z e fechou | Discussão técnica, alinhamento de expectativas, PR review |
| **Pressão** | Garçom: 6 mesas ao mesmo tempo, cozinha atrasou, cliente irritado | Bug em produção, hotfix, deadline de sprint |
| **Precisão** | Sommelier: servir vinho na temperatura exata ou o sabor muda | Testes, validação de dados, segurança |
| **Criatividade** | Mixologista: criar drink do zero com ingredientes limitados | Arquitetura, resolver problema sem tutorial pronto |
| **Resiliência** | Expulso de casa aos 16, se virou sozinho | Aprender tecnologia nova sem ajuda, persistir em bug difícil |
| **Comunicação** | Atendimento: explicar cardápio, ouvir objeção, fechar venda | Daily, documentação, PR description |
| **Design** | 5 anos editando foto, compondo grid, escolhendo tipografia | UI/UX, CSS limpo, acessibilidade |

### 🎯 Dica de estudo
- Prepare **3 histórias STAR completas** — uma de liderança, uma de pressão, uma de negociação
- Formato STAR: Situação curta + Tarefa + Ação (detalhada, o que VOCÊ fez) + Resultado (com dados se possível)
- Pratique contar cada história em 1 minuto

---

## 7. Scripts de Pitch por Situação

### LinkedIn message para recrutador (~30 palavras)
> "Oi [Nome], vi a vaga de Java Jr. Tenho 2 APIs Spring Boot (uma com TDD, outra com JWT) e um portfolio Next.js no ar com i18n. Fora do código, 5 anos como fotógrafo e maître de restaurante — sei entregar sob pressão. Topa um papo?"

### Abertura em entrevista técnica (~1 minuto)
> "Programei dos 14 aos 16, parei por 6 anos, e voltei em 2026. Nesse meio tempo fui fotógrafo por 5 anos — aprendi briefing e entrega no prazo — e trabalhei em restaurantes como maître e sommelier — aprendi liderança e precisão. Hoje tenho 3 projetos: um portfolio Next.js no ar, uma API Java com JWT e MongoDB, e uma API de restaurante 100% TDD. Meu diferencial é que entendo de operação real, não só de código."

### Resposta de RH sobre comportamental (~2 minutos)
> "O que me trouxe pra tecnologia foi curiosidade — aprendi sozinho aos 14. Mas o que me preparou foi a vida. Ser expulso de casa aos 16 me obrigou a trabalhar em restaurante — fui de garçom a maître. Isso me ensinou a operar sob pressão e liderar equipe. Depois, 5 anos como fotógrafo me ensinaram a negociar com cliente e entregar no prazo. Quando voltei a programar em 2026, trouxe essa disciplina. Em 4 meses construí 3 projetos, com testes, segurança e documentação. Não sou o candidato que só estudou — sou o candidato que entrega."

### Resposta sobre gap de 6 anos (~1 minuto)
> "Parei de programar em 2020 e fui trabalhar — fotografia, restaurante, logística. Foram 6 anos longe do código, mas foram 6 anos aprendendo a trabalhar: briefing, pressão, liderança e entrega. Quando voltei em 2026, não voltei do zero — voltei com maturidade profissional que não tinha aos 16. Hoje codifico melhor porque sei o que significa entregar de verdade."

---

## 8. Como Usar Este Material como Estudo para Entrevistas

### Cronograma ideal (semana S11 do roadmap)

| Dia | Atividade | Tempo |
|-----|-----------|-------|
| 🎧 Deslocamento | Ouça seus próprios pitches gravados | 30min |
| 💻 Ativo | Leia o arquivo, escolha 3 STAR stories | 1h |
| 🎤 Treino | Grave pitch de 1 min, ouça, ajuste | 30min |
| 👥 Simulação | Peça pra IA ou amigo fazer perguntas técnicas | 1h |
| 📝 Anki | Crie flashcards com perguntas/respostas | 30min |

### Flashcards Anki sugeridos

| Frente | Verso |
|--------|-------|
| Por que MongoDB no SuicidalDrop e PostgreSQL no Restaurante? | Schema flexível para variants de produto vs integridade referencial pra relacionamentos rígidos |
| Como funciona o JWT no SuicidalDrop? | Login → TokenProvider → AuthenticationFilter → SecurityConfig |
| Server vs Client Component? | Server: fetch, SEO, menos JS. Client: interatividade, hooks, estado |
| O que é ESR rule? | Equality, Sort, Range — ordem dos campos no índice composto do MongoDB |
| Diferença entre @OneToMany e @ManyToMany? | OneToMany: um pedido tem muitos itens. ManyToMany: produto pode ter muitos ingredientes |
| Como fez i18n sem biblioteca? | Context API + dicionário JSON + hook useTranslation |

### Antes de cada entrevista real

1. Releia `03-roles.md` — saiba pra qual empresa está aplicando
2. Releia `05-tdd-deep-dive.md` — TDD é o gap #1, vão perguntar
3. Releia `06-portfolio-pitch.md` — principalmente as perguntas esperadas
4. Abra os projetos no GitHub — esteja pronto pra mostrar código
5. Abra o MELI no navegador — pra mostrar ao vivo se pedirem
6. Respire. Você tem 3 projetos reais. A maioria dos candidatos tem 0.

### Após cada entrevista real

- Volte aqui e anote:
  - O que perguntaram que eu NÃO tinha preparado?
  - O que respondi bem?
  - O que respondi mal?
- Atualize os flashcards Anki com as perguntas reais
- A cada 3 entrevistas, revise este arquivo e identifique padrões
