# Requirements — OmniChess

---

## Legenda
- `[MVP]` — Essencial para lançamento
- `[FASE2]` — Pós-MVP, segunda prioridade
- `[FASE3]` — Expansão
- `[FUTURO]` — Visão de longo prazo

---

## Funcionais

### 1. Autenticação e Usuários
- [MVP] RF-01: Registrar conta com email + senha
- [MVP] RF-02: Login com JWT (access + refresh token)
- [MVP] RF-03: Perfil de usuário (username, avatar, bio, rating)
- [MVP] RF-04: Recuperação de senha por email
- [FASE2] RF-05: Login social (Google, GitHub)
- [FASE2] RF-06: Troca de username (com cooldown)
- [FASE3] RF-07: Autenticação biométrica (mobile)

### 2. Jogo (Core Gameplay)
- [MVP] RF-08: Partida 1v1 com regras completas de xadrez (FIDE)
- [MVP] RF-09: Tabuleiro renderizado com peças do universo ativo
- [MVP] RF-10: Validação de jogadas SERVER-SIDE (Chess Engine em Java)
- [MVP] RF-11: Detecção de xeque, xeque-mate, afogamento
- [MVP] RF-12: Controle de tempo (clássico, rápido, blitz, bullet)
- [MVP] RF-13: Desistência e oferecimento de empate
- [MVP] RF-14: Histórico de jogadas (PGN exportável)
- [FASE2] RF-15: Análise pós-partida com engine (Stockfish)
- [FASE2] RF-16: Replay de partida (passo a passo)
- [FASE3] RF-17: Partidas classificadas vs partidas casuais

### 3. Matchmaking
- [MVP] RF-18: Fila de matchmaking baseada em rating (Elo)
- [MVP] RF-19: Timer de 60s com expansão gradual de range
- [MVP] RF-20: Cancelamento da fila a qualquer momento
- [FASE2] RF-21: Matchmaking por universo selecionado
- [FASE2] RF-22: Partida contra amigos (convite direto)
- [FASE3] RF-23: Matchmaking por região geográfica

### 4. Universos (Cosméticos)
- [MVP] RF-24: 3 universos gratuitos disponíveis no lançamento
- [MVP] RF-25: Cada universo altera: peças, tabuleiro, efeitos e música
- [MVP] RF-26: Preview do universo antes de comprar
- [MVP] RF-27: Sistema de "universo ativo" por jogador
- [FASE2] RF-28: Aluguel de universo por 24h via anúncio (Rewarded Ad)
- [FASE2] RF-29: Efeitos de movimento e captura animados
- [FASE3] RF-30: Criação de universos customizados (editor)

### 5. Gacha System
- [FASE2] RF-31: Caixas cosméticas (gacha) com 3 raridades (Comum, Raro, Lendário)
- [FASE2] RF-32: Lucky Value (Pity System 0-100): garantia lendária no 100
- [FASE2] RF-33: Histórico de aberturas
- [FASE3] RF-34: Caixas de evento (temporárias)
- [FASE3] RF-35: Trade/sell de itens repetidos

### 6. Live-Ops
- [MVP] RF-36: Daily Login Reward (matriz 7 dias)
- [MVP] RF-37: Moeda virtual (OmniCoins)
- [FASE2] RF-38: Battle Pass sazonal (Free + Premium)
- [FASE2] RF-39: Eventos por tempo limitado (ex: 2x XP weekend)
- [FASE2] RF-40: Moeda de evento com expiração
- [FASE3] RF-41: Ranking (Elo) global e semanal
- [FASE3] RF-42: Reset de temporada com recompensas
- [FUTURO] RF-43: Torneios ao vivo

### 7. Monetização
- [FASE2] RF-44: Loja de universos com OmniCoins (grátis) e OmniCrystals (paga)
- [FASE2] RF-45: Compras via Stripe (cartão) + PIX
- [FASE2] RF-46: Battle Pass Premium (pago)
- [FASE2] RF-47: Rewarded Ads (mobile) para aluguel de universos
- [FASE3] RF-48: Assinatura mensal (OmniCoins + universo exclusivo)
- [FUTURO] RF-49: Criadores de conteúdo: universos vendáveis na marketplace

### 8. Mobile (React Native)
- [FASE2] RF-50: App React Native com mesma funcionalidade do Web
- [FASE2] RF-51: Push notifications (convite de partida, recompensa diária)
- [FASE2] RF-52: Integração com AdMob para Rewarded Ads
- [FASE3] RF-53: Modo offline vs bots
- [FASE3] RF-54: Notificações de eventos e promoções

---

## Não-Funcionais

- [MVP] RNF-01: **Server-Side Validation** — toda jogada validada no backend
- [MVP] RNF-02: **Tempo real** — jogadas refletidas em <500ms para ambos jogadores
- [MVP] RNF-03: **Dark mode first** — UI escura e elegante
- [MVP] RNF-04: **Responsivo** — funciona em mobile Web, tablet e desktop
- [MVP] RNF-05: **Código modular** — Web e Mobile compartilham lógica
- [MVP] RNF-06: **Estateless JWT** — sem sessão no servidor
- [FASE2] RNF-07: **Rate limiting** — 100 req/min por IP, 10 req/s por WebSocket
- [FASE2] RNF-08: **Idempotência** em transações financeiras
- [FASE2] RNF-09: **Reconexão** — jogador pode reconectar em <30s sem perder a partida
- [FASE2] RNF-10: **Logs estruturados** — JSON logging com contexto
- [FASE3] RNF-11: **Disponibilidade 99.9%** — múltiplas instâncias
- [FASE3] RNF-12: **CDN** para assets de universos (carregamento <2s)

---

## Regras de Negócio

- [MVP] RN-01: Cliente NUNCA dita o estado do tabuleiro — toda jogada é validada e persisitida no servidor
- [MVP] RN-02: Rating Elo só é alterado em partidas classificadas
- [MVP] RN-03: Abandono de partida = derrota + penalidade de rating
- [FASE2] RN-04: Moedas de evento expiram 7 dias após fim do evento
- [FASE2] RN-05: Lucky Value reseta ao 100 OU ao obter item lendário
- [FASE2] RN-06: Aluguel por anúncio tem validade de exatamente 24h
- [FASE2] RN-07: Daily login reinicia se pular um dia (perde streak)
- [FASE3] RN-08: Em caso de desconexão, oponente aguarda 30s antes de vencer
- [FASE3] RN-09: Trade de itens só é permitido entre itens de mesma raridade
