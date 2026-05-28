# Architecture — Suicidal Drop Store

## Decisões Arquiteturais

| Decisão | Escolha | Alternativas | Justificativa |
|---------|---------|-------------|---------------|
| Padrão arquitetural | Monolito Modular | Microsserviços | Simplicidade operacional + isolamento lógico por pacote |
| Linguagem | Java 21 | Kotlin, Go | Virtual Threads para concorrência, Records para DTOs |
| Banco | MongoDB | PostgreSQL | Documentos flexíveis para variantes de produto, esquema evolutivo |
| Controle de concorrência | `findAndModify` + otimista | Pessimistic locks, filas | Operação atômica no MongoDB, sem lock de tabela |
| Saga pattern | Coreografada (eventos) | Orquestrada | Menor acoplamento entre domínios |
| Build | Gradle | Maven | Scripts concisos, melhor performance |
| Autenticação | JWT HMAC-SHA256 | OAuth2, Session | Stateless, sem banco de sessão, simples |

## Pilares e Fluxos

### Identity
```
POST /api/v1/auth/register  → UserService → BCrypt → MongoDB → JWT
POST /api/v1/auth/login     → UserService → verify → JWT
```

### Catalog (planejado)
```
GET    /api/v1/products          → ProductRepository → MongoDB
GET    /api/v1/products/{slug}   → ProductRepository → MongoDB
POST   /api/v1/products          → ProductService → MongoDB (admin)
PUT    /api/v1/products/{id}     → ProductService → MongoDB (admin)
DELETE /api/v1/products/{id}     → ProductService → MongoDB (admin)
```

### Inventory (planejado)
```
PUT /api/v1/inventory/{sku}/reserve  → findAndModify (atomic) → -quantity
PUT /api/v1/inventory/{sku}/release  → findAndModify (atomic) → +quantity
```

### Order (planejado)
```
POST /api/v1/orders → OrderService → Saga:
  1. Inventory.reserve()
  2. Payment.process()
  3. Se falha: Inventory.release()
```

## Segurança
```
Request → SecurityFilterChain → JwtAuthenticationFilter
  → jwtTokenProvider.validate(token) → SecurityContextHolder
  → Controller (se válido) / 401 (se inválido)
```

## Observações
- Senhas com BCrypt (Spring Security)
- 3 profiles: dev (MongoDB local), prod (MongoDB Atlas variáveis de ambiente)
- Frontend Next.js 14 separado (outro repositório)
- Targets: Railway (API) + Vercel (frontend)
- Planejado: load/chaos testing com foco nos picos de drop
