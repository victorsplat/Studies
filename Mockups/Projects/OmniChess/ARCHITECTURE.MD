# Architecture — OmniChess

## Decisões Arquiteturais

| Decisão | Escolha (Adaptada) | Alternativas | Justificativa |
|---------|-------------------|-------------|---------------|
| Padrão | Monolito Modular | Microsserviços | Reaproveita padrão do SuicidalDropStore, deploy único |
| Web Framework | Next.js 16 App Router | CRA, Vite + React | SSR, API routes isoladas, Turbopack |
| Mobile | React Native (Expo) | Flutter, Kotlin Multiplatform | Reusa React já dominado, componentes compartilháveis |
| Backend | Java 21 + Spring Boot 3.5 | Node.js, Go | Performance, tipos fortes, virtual threads, já usado |
| Database | MongoDB + Change Streams | PostgreSQL, Firestore | Documentos flexíveis, já usado |
| Real-time | WebSocket STOMP (Spring) + GameState in-memory | Socket.io, Firebase | Baixa latência (<50ms), controle total |
| Game State Cache | Redis (obrigatório desde a Fase 2) | Apenas in-memory | Persistência entre instâncias, scale-out |
| Auth | JWT HMAC-SHA256 + Spring Security | Firebase Auth, OAuth2 | Já implementado, sem vendor lock-in |
| Cache | Redis (cache geral + rate limit + leaderboard) | In-memory, Memcached | Uso múltiplo desde o MVP |
| File Storage | Vercel Blob (Web) + S3-compatible (geral) | Firebase Storage, Cloudinary | Já usado no MeliPortfolio |
| State Frontend | Zustand + TanStack Query | Redux, Context API | Já usado, persist middleware, cache |
| Validação | Zod (frontend) + Bean Validation (backend) | Yup, Joi | Consistência entre front e back |
| Pagamentos | Stripe (com suporte a PIX nativo) | Mercado Pago, PayPal | Stripe já oferece PIX desde 2023 |
| Anúncios | Google AdMob (Mobile) | Unity Ads, Meta Audience | Padrão da indústria mobile |
| CI/CD | GitHub Actions | Vercel CI, Railway | Gratuito, flexível |
| Game Loop | Server-authoritative com timers gerenciados no backend | Cliente confiável | Anti-cheat, sincronia perfeita |

---

## 🚨 CORREÇÃO CRÍTICA: Fluxo de Jogada em Tempo Real

**Problema identificado na versão original:** O fluxo usava MongoDB Change Streams para propagar jogadas entre jogadores:

```
❌ Player → WS → GameService → MongoDB → Change Stream → Broadcast
```

Change Streams têm latência de ~50-200ms (polling do oplog), são assíncronas e sujeitas a backpressure. **Isso é inaceitável para um jogo de ação em tempo real.** Uma jogada de xadrez deve ser validada e transmitida em <50ms.

### Fluxo Correto (Otimizado)

```
✅ Player → WS → GameService (valida + estado em memória) → Broadcast direto → MongoDB (persistência assíncrona)
```

```mermaid
sequenceDiagram
    participant P1 as Player 1 (Web)
    participant WS as WebSocket Server
    participant GS as Game Service
    participant MEM as In-Memory GameState
    participant REDIS as Redis Cache
    participant MDB as MongoDB (Async)
    participant P2 as Player 2 (Mobile)

    P1->>WS: move(from, to, gameId)
    WS->>GS: validateMove(gamestate, move)

    critical Validação Síncrona (obrigatória)
        GS->>GS: 1. Verificar turno correto
        GS->>GS: 2. Validar regras FIDE (ChessEngine)
        GS->>GS: 3. Atualizar estado em memória
        GS->>MEM: updateBoard(newState)
        GS->>GS: 4. Calcular timers (server-side)
    end

    parallel Broadcast + Persistência
        GS-->>P1: moveAccepted(newState, timer)
        GS-->>P2: moveAccepted(newState, timer)
        and
        GS->>REDIS: SET game:{id} (TTL=2h)
        GS->>MDB: update game state (async, fire-and-forget)
    end

    Note over GS: Toda validação é SERVER-SIDE<br>Cliente NUNCA dita estado<br>MongoDB não está no caminho crítico
```

### Por que essa mudança é importante?

| Abordagem | Latência | Complexidade | Resiliência |
|-----------|----------|-------------|-------------|
| ❌ Change Streams | ~50-200ms | Média | Frágil (depende do oplog) |
| ✅ In-memory + Broadcast | ~1-5ms | Baixa | Robusta (state em Redis) |

**MongoDB Change Streams** continuam sendo usadas, mas **apenas para eventos não-críticos**:
- Notificar ranking atualizado
- Broadcast de eventos sazonais
- Sincronização entre instâncias do servidor

---

## Diagrama de Arquitetura do Sistema (Otimizado)

```mermaid
graph TB
    subgraph "🌐 Client Layer"
        WEB["Next.js 16 Web App<br/>(React + Tailwind + Zustand)"]
        MOB["React Native Mobile App<br/>(Expo + Zustand)"]
    end

    subgraph "🔒 API Gateway (Spring Boot)"
        REST["REST Controllers<br/>Queries only (reads)"]
        WS["WebSocket STOMP<br/>Commands only (writes)"]
        AUTH["JWT Auth Filter<br/>(OncePerRequest)"]
        RATE["Rate Limiter<br/>(Token Bucket)"]
        REST --> AUTH
        WS --> AUTH
    end

    subgraph "⚙️ Service Layer (CQRS)"
        direction TB
        S_AUTH["Auth Service<br/>Register / Login / Refresh"]
        S_USER["User Service<br/>Profile / Stats"]
        S_GAME["Game Service<br/>ChessEngine + GameState"]
        S_MM["Matchmaking Service<br/>Redis Queue + Elo"]
        S_COS["Cosmetic Service<br/>Universes + Gacha"]
        S_LO["LiveOps Service<br/>Daily / BP / Event"]
        S_PAY["Payment Service<br/>Stripe / PIX"]
        S_AD["Ad Reward Service<br/>Rental"]
    end

    subgraph "🧠 Chess Engine"
        ENGINE["ChessEngine.java<br/>- Regras FIDE completas<br/>- Validação server-side<br/>- Geração de PGN<br/>- Detecção de fim de jogo"]
    end

    subgraph "📦 Data Layer"
        MDB[("MongoDB Atlas<br/>Games Archive / Users / Cosmetics<br/>Persistência de longo prazo")]
        REDIS[("Redis<br/>GameState ativo / Queue / Cache / RateLimit")]
        BLOB[("Vercel Blob / S3<br/>Universe Assets")]
    end

    subgraph "📡 Real-time (WebSocket Sessions)"
        WS_SESS["Game Rooms<br/>(in-memory Map<String, GameRoom>)"]
        GS_STATE["GameState Cache<br/>Redis game:{id}"]
    end

    subgraph "💳 External Services"
        STRIPE["Stripe + PIX API"]
        ADMOB["Google AdMob"]
        SMTP["SMTP (Email Service)"]
    end

    subgraph "⏰ Scheduled Tasks (Cron)"
        CRON["@Scheduled<br/>- Expire rentals<br/>- Clean events<br/>- Reset rankings<br/>- Reconcile game states"]
    end

    subgraph "📱 CI/CD"
        GH["GitHub Actions"]
        GH -->|Deploy Web| VERCEL["Vercel"]
        GH -->|Deploy API| RAILWAY["Railway"]
        GH -->|Deploy Mobile| EAS["EAS Build (Expo)"]
    end

    %% Caminho crítico: Jogada em tempo real (via WebSocket direto)
    WEB -->|Commands| WS
    MOB -->|Commands| WS
    WS --> S_GAME
    S_GAME --> ENGINE
    S_GAME -->|Broadcast| WS_SESS
    WS_SESS --> WEB
    WS_SESS --> MOB
    S_GAME -->|Cache| GS_STATE
    GS_STATE --> REDIS

    %% Caminho de leitura (REST)
    WEB -->|Queries| REST
    MOB -->|Queries| REST
    AUTH --> S_AUTH
    AUTH --> S_USER
    REST --> S_USER
    REST --> S_COS
    REST --> S_LO
    REST --> S_MM

    %% Persistência assíncrona
    S_GAME -.->|Async write| MDB
    S_USER --> MDB
    S_MM --> REDIS
    S_MM --> MDB
    S_COS --> MDB
    S_COS --> BLOB
    S_LO --> MDB
    S_PAY --> STRIPE
    S_PAY --> MDB
    S_AD --> ADMOB
    CRON --> MDB

    %% Change Streams para eventos não-críticos
    MDB -.->|Change Streams<br>ranking, eventos| WS_SESS
```

## Fluxo de Matchmaking (Otimizado com Redis + WS)

```mermaid
sequenceDiagram
    participant P1 as Player 1
    participant API as REST API
    participant WS as WebSocket
    participant REDIS as Redis (Queue)
    participant MM as Matchmaking Service
    participant MDB as MongoDB

    P1->>API: POST /matchmaking/join {elo, universe}
    API->>REDIS: ZADD matchmaking:queue {score=rating, member=playerId}
    API-->>P1: 202 Accepted {queuePosition}

    P1->>WS: SUBSCRIBE /queue/matchmaking/status
    WS-->>P1: positionUpdate(position: 3)

    par Match Finding Loop (Redis-based)
        MM->>REDIS: ZRANGEBYSCORE matchmaking:queue range
        MM->>MM: Match found (diferenca rating < range)
        MM->>REDIS: ZREM (both players)
        MM->>MDB: create game document (status: "matched")
        MM-->>P1: gameFound(gameId, opponent) via WS
        MM-->>P2: gameFound(gameId, opponent) via WS
    end

    Note over P1,MM: Range expansion: 50 → 100 → 200 → 400<br>a cada 15s sem match
```

## 🎮 Gerenciamento de Timer (Server-Side)

**Problema:** Timers controlados pelo cliente são vulneráveis a cheating.

**Solução:** O servidor gerencia o tempo restante de cada jogador:

```java
public class GameTimer {
    private long whiteTimeMs;      // tempo restante do branco
    private long blackTimeMs;      // tempo restante do preto
    private long lastMoveTimestamp; // timestamp server-side da última jogada
    private String currentTurn;     // "white" | "black"

    /**
     * Ao receber uma jogada válida:
     * 1. Calcula tempo decorrido desde a última jogada
     * 2. Subtrai do timer do jogador que moveu
     * 3. Troca o turno
     * 4. Retorna timers atualizados no broadcast
     */
    public TimerSnapshot onMoveReceived() {
        long now = System.currentTimeMillis();
        long elapsed = now - lastMoveTimestamp;

        if ("white".equals(currentTurn)) {
            whiteTimeMs -= elapsed;
            if (whiteTimeMs <= 0) return TimerSnapshot.timeout("black");
        } else {
            blackTimeMs -= elapsed;
            if (blackTimeMs <= 0) return TimerSnapshot.timeout("white");
        }

        lastMoveTimestamp = now;
        currentTurn = "white".equals(currentTurn) ? "black" : "white";
        return TimerSnapshot.active(whiteTimeMs, blackTimeMs, currentTurn);
    }
}
```

**Time Controls suportados:**
| Modalidade | Tempo inicial | Incremento por jogada |
|-----------|--------------|----------------------|
| Bullet | 1 min | 0s |
| Blitz | 5 min | 2s |
| Rápido | 10 min | 5s |
| Clássico | 30 min | 10s |

## 🔄 Reconexão e State Recovery

Jogadores podem perder conexão. Estratégia de recovery:

```mermaid
sequenceDiagram
    participant P1 as Player 1
    participant WS as WebSocket
    participant GS as Game Service
    participant REDIS as Redis
    participant P2 as Player 2

    P1->>WS: move (normal flow)
    WS-->>P1: moveAccepted
    Note over P1: ❌ conexão cai

    WS-->>GS: sessionDisconnected(player1)
    GS->>GS: startDisconnectTimer(30s)
    GS-->>P2: opponentDisconnected (30s countdown)

    Note over P1: Reconecta após 10s
    P1->>WS: CONNECT + JWT
    P1->>WS: SUBSCRIBE /topic/game/{id}
    P1->>WS: RECOVER {gameId}

    GS->>REDIS: GET game:{id}:state
    GS-->>P1: fullStateSync(board, timer, moves)
    GS-->>P2: opponentReconnected
    GS->>GS: cancelDisconnectTimer()
```

## Estrutura de Pacotes (Backend — Spring Boot)

```
com.omnichess.api/
├── ApiApplication.java
├── config/
│   ├── SecurityConfig.java
│   ├── JwtTokenProvider.java
│   ├── JwtAuthFilter.java
│   ├── WebSocketConfig.java
│   ├── MongoConfig.java
│   └── CorsConfig.java
├── common/
│   ├── exception/
│   │   ├── GlobalExceptionHandler.java
│   │   ├── GameException.java
│   │   └── InsufficientFundsException.java
│   └── util/
│       ├── ChessEngine.java        (validação server-side)
│       └── RatingCalculator.java   (Elo/MMR)
├── domain/
│   ├── user/
│   │   ├── controller/UserController.java
│   │   ├── service/UserService.java
│   │   ├── repository/UserRepository.java
│   │   ├── model/User.java
│   │   └── dto/UserDto.java
│   ├── game/
│   │   ├── controller/GameController.java
│   │   ├── service/GameService.java
│   │   ├── service/MatchmakingService.java
│   │   ├── repository/GameRepository.java
│   │   ├── model/Game.java
│   │   ├── model/Move.java
│   │   └── dto/GameDto.java
│   ├── cosmetic/
│   │   ├── controller/CosmeticController.java
│   │   ├── service/CosmeticService.java
│   │   ├── service/GachaService.java
│   │   ├── repository/CosmeticRepository.java
│   │   ├── model/Universe.java
│   │   ├── model/PlayerCosmetic.java
│   │   └── dto/CosmeticDto.java
│   ├── liveops/
│   │   ├── controller/LiveOpsController.java
│   │   ├── service/DailyRewardService.java
│   │   ├── service/BattlePassService.java
│   │   ├── service/EventService.java
│   │   ├── repository/LiveOpsRepository.java
│   │   └── model/BattlePass.java
│   └── payment/
│       ├── controller/PaymentController.java
│       ├── service/PaymentService.java
│       ├── service/AdRewardService.java
│       └── model/Transaction.java
└── websocket/
    ├── GameWebSocketHandler.java
    ├── MoveMessage.java
    └── WebSocketEventListener.java
```

## Armazenamento de Arquivos (Universos)

Cada "Universo/Dimensão" tem seus assets armazenados no Vercel Blob ou S3:

```
/universes/
├── cyberpunk-neon/
│   ├── preview.png
│   ├── board/
│   │   ├── tile-light.webp
│   │   ├── tile-dark.webp
│   │   └── board-texture.webp
│   ├── pieces/
│   │   ├── pawn.webp
│   │   ├── rook.webp
│   │   ├── knight.webp
│   │   ├── bishop.webp
│   │   ├── queen.webp
│   │   └── king.webp
│   ├── effects/
│   │   ├── move-highlight.webp
│   │   ├── capture-effect.webp
│   │   └── check-effect.webp
│   └── audio/
│       ├── bgm.mp3
│       └── move-sfx.mp3
├── grim-dark-fantasy/
├── retro-vaporwave/
├── cosmic-void/
└── ...
```

## Segurança

- **Validação server-side obrigatória**: toda jogada passa pelo Chess Engine no backend
- **JWT stateless** com claims: userId, role, subscription
- **Rate limiting** por IP/userId nos endpoints de API
- **Transações monetárias** com idempotency key (evita duplicação)
- **Audit log** de todas as ações de economia (compra, gacha, resgate)
- **MongoDB Validation** usando Schema Validation para integridade de documentos

## Considerações de Escala

| Estágio | Conexões Simultâneas | Estratégia |
|---------|---------------------|------------|
| MVP (Fase 1-2) | ~100 | Single instance Spring Boot + MongoDB Atlas M2 |
| Crescimento (Fase 3-4) | ~1.000 | Spring Boot cluster + MongoDB Atlas M10 + Redis |
| Escala (Fase 5+) | ~10.000+ | Horizontal scaling + Sharding MongoDB + CDN |
