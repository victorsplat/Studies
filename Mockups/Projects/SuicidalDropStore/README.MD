# Suicidal Drop Store

Backend de e-commerce streetwear focado em **flash drops** (lançamentos sazonais com escassez artificial).

## Tags
`#mockup` `#in-progress` `#java` `#spring-boot` `#ecommerce`

## Objetivo
API REST para loja de streetwear com suporte a picos de concurrencia durante lançamentos, controle de estoque atômico e pipeline de checkout resiliente.

## Contexto
Projeto comercial real de uma marca ativa. Serve como peça central de portfólio para transição de carreira, demonstrando padrões Java/Spring Boot em nível de produção: concorrência, saga pattern, monolito modular.

## Stack Tecnológica
| Camada | Tecnologia |
|--------|-----------|
| Linguagem | Java 21 (Virtual Threads, Records) |
| Framework | Spring Boot 3.5.14 |
| Build | Gradle 8.14.4 |
| Banco | MongoDB Atlas (M0) |
| Auth | JWT HMAC-SHA256 (jjwt 0.12.6) |
| Infra | Railway (backend) + Vercel (frontend) |

## Arquitetura
**Monolito Modular** — 4 pilares de domínio independentes dentro do mesmo deploy:

| Pilar | Domínio | Status |
|-------|---------|--------|
| **Identity** | Auth + Usuários (CLIENT/ADMIN) | ✅ Concluído |
| **Catalog** | Produtos + Variantes | ⏳ Pendente |
| **Inventory** | Estoque atômico (`findAndModify`) | ⏳ Pendente |
| **Order** | Checkout + Saga Pattern | ⏳ Pendente |
| Coupon (bônus) | Cupons de desconto | ⏳ Pendente |

## Status
**Início** — Pilar 1 (Identity) completo: registro/login com JWT, BCrypt, Security Filter Chain. Compilado e empacotado (.jar).

## Conteúdo
- [`ARCHITECTURE.MD`](./ARCHITECTURE.MD) — Decisões arquiteturais
- [`REQUIREMENTS.MD`](./REQUIREMENTS.MD) — Requisitos do sistema
- [`Diagrams/`](./Diagrams/) — Diagramas (pendente)
- [`Schema/`](./Schema/) — Schemas de dados

## Localização
`/home/victorprado/Área de trabalho/Code Projects/SuicidalDropAPI`

## Links
- Repositório local: `~/Code Projects/SuicidalDropAPI`
- Branch: `main`
- Último commit: `d5beb8c` (26/05/2026)
