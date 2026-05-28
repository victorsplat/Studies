# API Endpoints — OmniChess

Toda API REST exposta pelo Spring Boot backend.

---

## Auth

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/api/v1/auth/register` | Criar conta | ❌ |
| POST | `/api/v1/auth/login` | Login → JWT | ❌ |
| POST | `/api/v1/auth/refresh` | Refresh token | ❌ (body: refreshToken) |
| POST | `/api/v1/auth/forgot-password` | Email de recuperação | ❌ |
| POST | `/api/v1/auth/reset-password` | Reset com token | ❌ |
| GET | `/api/v1/auth/me` | Dados do usuário logado | ✅ |

## Users

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| GET | `/api/v1/users/:id` | Perfil público | ❌ |
| PUT | `/api/v1/users/profile` | Atualizar perfil | ✅ |
| PUT | `/api/v1/users/username` | Trocar username | ✅ |
| GET | `/api/v1/users/:id/stats` | Estatísticas | ❌ |
| GET | `/api/v1/users/:id/history` | Histórico de partidas | ❌ |

## Games

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/api/v1/games` | Criar partida (contra amigo) | ✅ |
| GET | `/api/v1/games/:id` | Detalhes da partida | ✅ |
| GET | `/api/v1/games/:id/pgn` | Exportar PGN | ❌ |
| GET | `/api/v1/games/active` | Partidas ativas do jogador | ✅ |

## Matchmaking

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/api/v1/matchmaking/join` | Entrar na fila | ✅ |
| POST | `/api/v1/matchmaking/cancel` | Sair da fila | ✅ |
| GET | `/api/v1/matchmaking/status` | Status da fila | ✅ |

## Universes

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| GET | `/api/v1/universes` | Listar universos disponíveis | ❌ |
| GET | `/api/v1/universes/:slug` | Detalhes do universo | ❌ |
| POST | `/api/v1/universes/:slug/purchase` | Comprar universo | ✅ |
| PUT | `/api/v1/universes/:slug/equip` | Equipar universo | ✅ |
| POST | `/api/v1/universes/:slug/rent` | Alugar por anúncio | ✅ |
| POST | `/api/v1/universes/gacha/open` | Abrir caixa gacha | ✅ |

## Live-Ops

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| GET | `/api/v1/liveops/daily` | Status daily reward | ✅ |
| POST | `/api/v1/liveops/daily/claim` | Resgatar daily | ✅ |
| GET | `/api/v1/liveops/battlepass` | Status do battle pass | ✅ |
| POST | `/api/v1/liveops/battlepass/claim` | Resgatar nível | ✅ |
| POST | `/api/v1/liveops/battlepass/purchase` | Comprar premium | ✅ |
| GET | `/api/v1/liveops/events` | Listar eventos ativos | ❌ |
| GET | `/api/v1/liveops/events/:id` | Detalhes do evento | ✅ |
| POST | `/api/v1/liveops/events/:id/mission` | Completar missão | ✅ |
| POST | `/api/v1/liveops/events/:id/shop` | Comprar na loja do evento | ✅ |
| GET | `/api/v1/liveops/ranking` | Ranking global | ❌ |
| GET | `/api/v1/liveops/ranking/season` | Ranking da temporada | ❌ |

## Payments

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/api/v1/payments/create-intent` | Criar intenção Stripe | ✅ |
| POST | `/api/v1/payments/pix/generate` | Gerar QR Code PIX | ✅ |
| POST | `/api/v1/payments/webhook/stripe` | Webhook Stripe | ❌ (webhook secret) |
| GET | `/api/v1/payments/history` | Histórico de transações | ✅ |

## Admin

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| GET | `/api/v1/admin/users` | Listar usuários | ✅ (admin) |
| PUT | `/api/v1/admin/users/:id/ban` | Banir usuário | ✅ (admin) |
| POST | `/api/v1/admin/universes` | Criar universo | ✅ (admin) |
| PUT | `/api/v1/admin/universes/:slug` | Atualizar universo | ✅ (admin) |
| POST | `/api/v1/admin/events` | Criar evento | ✅ (admin) |
| PUT | `/api/v1/admin/events/:id` | Atualizar evento | ✅ (admin) |
| POST | `/api/v1/admin/battlepass` | Criar temporada | ✅ (admin) |
| GET | `/api/v1/admin/dashboard` | Dashboard de métricas | ✅ (admin) |

## WebSocket

| Rota | Descrição |
|------|-----------|
| `/ws/game/:gameId` | Sala da partida (moves, timer, status) |
| `/ws/matchmaking` | Notificações da fila |
| `/ws/notifications` | Notificações gerais |
