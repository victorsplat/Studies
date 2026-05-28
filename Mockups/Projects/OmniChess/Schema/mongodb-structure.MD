# MongoDB — Estrutura de Coleções

## Coleções Principais

### `users`
```json
{
  "_id": "ObjectId",
  "email": "string (unique, indexed)",
  "passwordHash": "string",
  "username": "string (unique, indexed)",
  "displayName": "string",
  "avatarUrl": "string",
  "bio": "string (max 500)",
  "rating": 1200,
  "peakRating": 1200,
  "gamesPlayed": 0,
  "gamesWon": 0,
  "gamesDraw": 0,
  "createdAt": "ISODate",
  "lastLoginAt": "ISODate",
  "activeUniverseId": "ObjectId",
  "ownedCosmetics": ["ObjectId"],
  "omniCoins": 0,
  "omniCrystals": 0,
  "luckyValue": 0,
  "dailyStreak": 0,
  "lastDailyClaim": "ISODate",
  "battlePassId": "string",
  "battlePassLevel": 0,
  "role": "player | admin",
  "refreshTokenHash": "string"
}

// Indexes:
// { email: 1 } unique
// { username: 1 } unique
// { rating: -1 }
// { lastLoginAt: -1 }
```

### `games`
```json
{
  "_id": "ObjectId",
  "whitePlayerId": "ObjectId (indexed)",
  "blackPlayerId": "ObjectId (indexed)",
  "winnerId": "ObjectId | null",
  "status": "waiting | active | finished | aborted",
  "result": "white | black | draw | null",
  "moves": [
    {
      "from": "e2",
      "to": "e4",
      "piece": "wp",
      "captured": null,
      "promotion": null,
      "san": "e4",
      "moveNumber": 1,
      "elapsedMs": 2500,
      "timestamp": "ISODate"
    }
  ],
  "pgn": "string (exportável)",
  "timeControl": { "initial": 600, "increment": 5 },
  "whiteTimeMs": 600000,
  "blackTimeMs": 598000,
  "whiteRatingBefore": 1200,
  "blackRatingBefore": 1180,
  "ratingChange": 8,
  "createdAt": "ISODate",
  "finishedAt": "ISODate | null",
  "isRated": true,
  "universeId": "ObjectId"
}

// Indexes:
// { whitePlayerId: 1, createdAt: -1 }
// { blackPlayerId: 1, createdAt: -1 }
// { status: 1 }
// { createdAt: -1 }
```

### `universes`
```json
{
  "_id": "ObjectId",
  "name": "Cyberpunk Neon",
  "description": "...",
  "slug": "cyberpunk-neon (unique)",
  "rarity": "common | rare | legendary",
  "previewUrl": "string",
  "thumbnailUrl": "string",
  "assetUrls": {
    "board": { "light": "...", "dark": "...", "texture": "..." },
    "pieces": {
      "pawn": "...", "rook": "...", "knight": "...",
      "bishop": "...", "queen": "...", "king": "..."
    },
    "effects": {
      "moveHighlight": "...",
      "captureEffect": "...",
      "checkEffect": "..."
    },
    "audio": { "bgm": "...", "moveSfx": "...", "captureSfx": "..." }
  },
  "tags": ["cyberpunk", "neon", "futuristic"],
  "priceCoins": 5000,
  "priceCrystals": 150,
  "gachaAvailable": true,
  "purchasable": true,
  "createdAt": "ISODate",
  "isActive": true,
  "status": "published | draft | retired"
}

// Indexes:
// { slug: 1 } unique
// { rarity: 1 }
// { isActive: 1, status: 1 }
```

### `player_cosmetics`
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (indexed)",
  "universeId": "ObjectId (indexed)",
  "acquiredAt": "ISODate",
  "source": "purchase | gacha | battlepass | daily | event | ad_rental",
  "isEquipped": false,
  "rentalExpiresAt": "ISODate | null",
  "isRental": false
}

// Indexes:
// { userId: 1, universeId: 1 } unique compound
// { userId: 1, isEquipped: 1 }
// { rentalExpiresAt: 1, isRental: 1 } (para TTL/cron)
```

### `battle_passes`
```json
{
  "_id": "ObjectId",
  "seasonId": "season-1 (unique)",
  "name": "Temporada 1: Origem",
  "maxLevel": 50,
  "startDate": "ISODate",
  "endDate": "ISODate",
  "freeRewards": [
    { "level": 1, "type": "coins", "amount": 100 },
    { "level": 5, "type": "cosmetic", "universeId": "..." }
  ],
  "premiumRewards": [
    { "level": 1, "type": "crystals", "amount": 50 },
    { "level": 10, "type": "cosmetic", "universeId": "...", "rarity": "rare" }
  ],
  "premiumPrice": 1990
}
```

### `events`
```json
{
  "_id": "ObjectId",
  "name": "Natal Cósmico",
  "description": "...",
  "startDate": "ISODate",
  "endDate": "ISODate",
  "currencyId": "event-crystal-2026-12",
  "bannerUrl": "...",
  "missions": [
    { "id": "m1", "description": "Jogue 5 partidas", "reward": { "type": "event_currency", "amount": 50 } }
  ],
  "shopItems": [
    { "universeId": "...", "priceEventCurrency": 200, "limit": 1 }
  ]
}

// Indexes:
// { endDate: 1 } (para TTL/expiry)
```

### `transactions`
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (indexed)",
  "type": "purchase | gacha | daily_reward | battlepass | ad_rental | subscription",
  "currencyType": "coins | crystals | event | real_money",
  "amount": 500,
  "description": "Compra do universo Cyberpunk Neon",
  "referenceId": "ObjectId (cosmetic/game/etc)",
  "stripePaymentId": "pi_xxx | null",
  "pixCode": "000201... | null",
  "status": "pending | completed | failed | refunded",
  "idempotencyKey": "uuid (unique)",
  "createdAt": "ISODate"
}

// Indexes:
// { userId: 1, createdAt: -1 }
// { idempotencyKey: 1 } unique
// { stripePaymentId: 1 } sparse
```

### `matchmaking_queue` (usa Redis para performance, com fallback no MongoDB)
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (unique)",
  "rating": 1200,
  "ratingRange": 100,
  "universePreference": "ObjectId | null",
  "joinedAt": "ISODate",
  "status": "searching | matched | cancelled"
}

// Indexes:
// { status: 1, rating: 1 }
```

## Change Streams (Real-time)

O MongoDB Change Streams é usado para disparar eventos WebSocket:

| Coleção | Pipeline | Evento WebSocket |
|---------|----------|-----------------|
| `games` | `{ $match: { operationType: "update", "fullDocument.status": "active" } }` | `game.move` |
| `matchmaking_queue` | `{ $match: { operationType: "update", "fullDocument.status": "matched" } }` | `matchmaking.found` |

## Índices Compostos Recomendados

```javascript
// Performance de matchmaking
db.matchmaking_queue.createIndex(
  { status: 1, rating: 1 },
  { partialFilterExpression: { status: "searching" } }
)

// Histórico do jogador
db.games.createIndex(
  { whitePlayerId: 1, createdAt: -1 },
  { partialFilterExpression: { status: "finished" } }
)
db.games.createIndex(
  { blackPlayerId: 1, createdAt: -1 },
  { partialFilterExpression: { status: "finished" } }
)

// Limpeza de aluguéis expirados (cron job)
db.player_cosmetics.createIndex(
  { rentalExpiresAt: 1 },
  { sparse: true }
)
```
