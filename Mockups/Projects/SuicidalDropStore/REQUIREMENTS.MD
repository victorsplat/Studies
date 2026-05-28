# Requirements — Suicidal Drop Store

## Funcionais

### Identity (✅ Concluído)
- [x] RF-01: Registrar usuário (CLIENT) com email, senha, nome
- [x] RF-02: Login com email + senha → retorna JWT
- [x] RF-03: Rotas protegidas via JWT (admin)
- [x] RF-04: Roles: CLIENT e ADMIN

### Catalog (⏳ Pendente — Fase 2)
- [ ] RF-05: CRUD de produtos (admin)
- [ ] RF-06: Produtos com variantes (tamanho, cor)
- [ ] RF-07: Listagem pública com filtros (categoria, preço)
- [ ] RF-08: Slug único por produto

### Inventory (⏳ Pendente — Fase 3)
- [ ] RF-09: Reserva atômica de estoque (`findAndModify`)
- [ ] RF-10: Liberação de estoque em caso de cancelamento
- [ ] RF-11: Consulta de disponibilidade por SKU
- [ ] RF-12: Prevenção de sobre-venda (overselling)

### Order (⏳ Pendente — Fase 4)
- [ ] RF-13: Criar pedido com múltiplos itens
- [ ] RF-14: Pipeline de checkout com Saga coreografado
- [ ] RF-15: Idempotência (evitar duplicação)
- [ ] RF-16: Histórico de pedidos por usuário

### Coupon (⏳ Pendente — Fase 5, bônus)
- [ ] RF-17: Criar cupons de desconto (admin)
- [ ] RF-18: Validar e aplicar cupom no checkout

## Não-Funcionais
- [x] RNF-01: Virtual Threads para I/O concorrente
- [x] RNF-02: Senhas hasheadas com BCrypt
- [x] RNF-03: JWT stateless sem refresh token (fase inicial)
- [x] RNF-04: Tratamento global de exceções (@RestControllerAdvice)
- [ ] RNF-05: Rate limiting
- [ ] RNF-06: Testes de carga (k6/Gatling)
- [ ] RNF-07: Documentação OpenAPI/Swagger
- [ ] RNF-08: Logs estruturados
