# OmniChess — Xadrez Multiverso

Jogo de xadrez multiplayer competitivo com atmosfera imersiva em múltiplos universos conceituais. Cada cosmético é um "Universo/Dimensão" completo que altera a estética sem modificar as regras do jogo.

## Tags
`#mockup` `#in-progress` `#nextjs` `#spring-boot` `#game` `#chess`

## Visão Geral

OmniChess é um jogo de xadrez online que transcende o tabuleiro tradicional. Em vez de simples skins, cada tema é um **Universo/Dimensão** que transforma completamente a experiência visual — geometria das peças, shaders do tabuleiro, filtros de tela e trilha sonora ambiente — tudo isso sem alterar as regras matemáticas do xadrez.

### Público-Alvo
- Jogadores casuais de xadrez (20M+ no Chess.com)
- Entusiastas de cosméticos e personalização
- Jogadores competitivos (sistema Elo)
- Colecionadores (gacha system)

### Diferenciais
- **Universos completos** — não são skins, são dimensões alternativas
- **Cross-platform** — Web + Mobile na mesma conta
- **Live-Ops** — passe de batalha, eventos sazonais, daily login
- **Gacha System** — caixas cosméticas com pity system

---

## Análise da Versão Original (Firebase)

A especificação fornecida propunha uma stack 100% Firebase:

| Camada | Tecnologia Original | Problemas Identificados |
|--------|--------------------|------------------------|
| Web | Next.js | ✅ Ok |
| Mobile | React Native / Flutter | Sem preferência clara |
| Backend | Firebase Cloud Functions | Vendor lock-in, cold starts, limits de execução |
| Database | Firestore | Caro em escala, limite de 1MiB/doc, 20k escritas/dia no Spark |
| Auth | Firebase Auth | Vendor lock-in, difícil migrar |
| Real-time | Firestore onSnapshot | Limitado a 1M conexões simultâneas |
| Storage | Firebase Cloud Storage | Egress caro, vendor lock-in |
| Validação | Firestore Security Rules | Complexas, sem testes locais adequados |

### Decisão de Adaptação

A versão adaptada substitui Firebase por uma stack **open-source, auto-hospedável e 100% sob seu controle**, aproveitando ao máximo o que você já domina:

| Camada | Stack Adaptada | Motivo |
|--------|---------------|--------|
| Web | Next.js 16 | ✅ Você já usa |
| Mobile | React Native | ✅ Você já usa React — mesma linguagem |
| Backend | Java 21 + Spring Boot 3.5 | ✅ Você já usa (SuicidalDropStore) |
| Database | MongoDB + Change Streams | ✅ Você já usa + real-time nativo |
| Auth | JWT + Spring Security | ✅ Você já implementou |
| Real-time | WebSocket (Spring Boot STOMP) | Leve, padrão da indústria |
| File Storage | Vercel Blob / S3 | ✅ Você já usa Vercel Blob |
| State | Zustand + TanStack Query | ✅ Você já usa |
| Recompensas Ads | Google AdMob (Mobile) + API | Separação clara entre app e anúncios |
| Pagamentos | Stripe / PIX (via banco) | Controle total |

---

## Arquivos do Projeto

| Arquivo | Conteúdo |
|---------|----------|
| [`ARCHITECTURE.MD`](./ARCHITECTURE.MD) | Arquitetura completa do sistema (visão original vs adaptada) |
| [`REQUIREMENTS.MD`](./REQUIREMENTS.MD) | Requisitos funcionais, não-funcionais e regras de negócio |
| [`ROADMAP.MD`](./ROADMAP.MD) | Roadmap de desenvolvimento em 8 fases |
| [`Schema/domain-model.MMD`](./Schema/domain-model.MMD) | Diagrama de domínios |
| [`Schema/mongodb-structure.MMD`](./Schema/mongodb-structure.MMD) | Estrutura do MongoDB |
| [`Schema/api-endpoints.MMD`](./Schema/api-endpoints.MMD) | Endpoints da API |
| [`Diagrams/system-architecture.MMD`](./Diagrams/system-architecture.MMD) | Diagrama de arquitetura do sistema |
| [`Diagrams/game-flow.MMD`](./Diagrams/game-flow.MMD) | Fluxo do jogo (matchmaking → partida → resultado) |
| [`Diagrams/liveops-flow.MMD`](./Diagrams/liveops-flow.MMD) | Fluxo de Live-Ops (daily, gacha, passe) |
