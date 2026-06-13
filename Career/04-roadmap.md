# Study Roadmap

> Roadmap semanal por metas objetivas — sem horários fixos.
> Cada semana tem UM entregável concreto. O resto é bônus.
> Nova rotina: Ter-Sáb (cafeteria 7h30-16h30) + Dom/Seg (estudo intensivo).
> Estudo ativo: ~39h/semana.
> Hoje: **13 de Junho de 2026**.
> Status: Monitor quebrado (TV temporária), LeetCode/SoloLearn no celular.

---

## 📌 Legenda dos Entregáveis

| Nível | Significado |
|-------|-------------|
| 🟢 Mínimo | Faz diferença real no portfolio/gaps |
| 🟡 Desejável | Acelera progresso |
| 🔴 Stretch | Se sobrar tempo ou energia |
| 📱 Fazível no celular | SoloLearn / LeetCode / teoria |
| 💻 Precisa de PC | Código / testes / projetos |

---

## Fase 🟢 LÓGICA + ED (Sem Monitor — Celular)

### L1 | Lógica Básica | 📱 SoloLearn

| | Meta | Entregável |
|---|------|------------|
| 🟢 | Variáveis, tipos, if/else, for, while | 10 exercícios no SoloLearn |
| 🟡 | Funções, parâmetros, retorno | 5 exercícios |
| 🔴 | Pequeno programa do zero (calculadora) | Código funcionando |

**Passivo**: Revisar conceitos de lógica no YouTube (Guanabara)

---

### L2 | Arrays + Strings | 📱 SoloLearn + LeetCode

| | Meta | Entregável |
|---|------|------------|
| 🟢 | Percorrer array, acessar, modificar | 8 exercícios SoloLearn |
| 🟢 | Manipulação de strings | 5 exercícios SoloLearn |
| 🟡 | Maior elemento, soma, inverter array | 3 problemas |
| 🔴 | LeetCode Warm-up: TwoSum (tentar, sem pressão) | 1 submissão |

**Passivo**: Entender complexidade O(n) vs O(n²)

---

### L3 | Maps + Hashmaps | 📱 SoloLearn + LeetCode

| | Meta | Entregável |
|---|------|------------|
| 🟢 | HashMap: chave-valor, put, get, contains | 5 exercícios |
| 🟡 | HashSet: quando usar | 3 exercícios |
| 🔴 | TwoSum com HashMap (solução otimizada) | 1 LeetCode Easy |

**Passivo**: Estudar HashMap internamente (collisions, load factor)

---

### L4 | Revisão + LeetCode Intro | 📱 LeetCode

| | Meta | Entregável |
|---|------|------------|
| 🟢 | TwoSum, Palindrome Number | 2 LeetCode Easy |
| 🟡 | Valid Parentheses, Roman to Integer | 2 LeetCode Easy |
| 🔴 | Analisar complexidade das soluções | Big O de cada uma |

**Passivo**: Revisar tudo que aprendeu até aqui

---

## Fase 🔴 CÓDIGO (Quando Monitor Chegar)

### C1 | MELI Tests Intensivo | 💻 Meli-Portfolio

| | Meta | Entregável |
|---|------|------------|
| 🟢 | Configurar Vitest + Testing Library | `vitest` rodando com 1 teste |
| 🟢 | Testar Gallery + ThemeToggle | 2 componentes testados |
| 🟡 | Testar páginas (Home, About, Gallery) | Renderização + interação |
| 🔴 | Cobertura >40% no front | Relatório de cobertura |

---

### C2 | SuicidalDrop Controller + TDD | 💻 SuicidalDropAPI

| | Meta | Entregável |
|---|------|------------|
| 🟢 | ProductController (GET, POST, PUT, DELETE) | CRUD funcionando |
| 🟢 | Testar ProductService com Mockito | Regras de negócio testadas |
| 🟡 | Testar ProductRepository | Queries testadas |

---

### C3 | Inventory (Pilar 3) | 💻 SuicidalDropAPI

| | Meta | Entregável |
|---|------|------------|
| 🟢 | findAndModify + reserva atômica | Estoque funcionando |
| 🟢 | Teste de concorrência (100+ threads) | Teste com CyclicBarrier |
| 🟡 | Prevenção de oversell | Teste de borda |

---

### C4 | JPA + PostgreSQL + Setup Restaurante | 💻 RestauranteAPI

| | Meta | Entregável |
|---|------|------------|
| 🟢 | Spring Boot + PostgreSQL + JPA rodando | Health check ok |
| 🟢 | Entidades: Cardápio, Mesas, Pedidos | Modelo relacional |
| 🟡 | Docker Compose com PostgreSQL | Ambiente reproduzível |

---

### C5 | RestauranteAPI — TDD Completo | 💻 RestauranteAPI

| | Meta | Entregável |
|---|------|------------|
| 🟢 | TDD em todos os endpoints | Controller → Service → Repository |
| 🟢 | @RestControllerAdvice com testes | Erros tratados globalmente |
| 🔴 | Testcontainers com PostgreSQL real | Teste de integração |

---

### C6 | LinkedIn + Currículo + Apps | 💻 Job Prep

| | Meta | Entregável |
|---|------|------------|
| 🟢 | LinkedIn: foto, headline, sobre, projetos | Perfil completo |
| 🟢 | Currículo PDF | Versão final |
| 🟡 | 10 aplicações enviadas | Confitec, SysMap, etc |

---

## Timeline Resumida

```
SEM MONITOR (agora):
  L1 ── Lógica básica ───────── SoloLearn
  L2 ── Arrays + Strings ────── SoloLearn + LeetCode
  L3 ── Maps + Hashmaps ─────── SoloLearn + LeetCode
  L4 ── LeetCode Intro ──────── LeetCode Easy

MONITOR CHEGA:
  C1 ── MELI Tests ──────────── 1 semana
  C2 ── Suicidal Controller ─── 1 semana
  C3 ── Inventory (Pilar 3) ─── 1 semana
  C4 ── JPA + Restaurante Setup  1 semana
  C5 ── Restaurante TDD ──────── 1 semana
  C6 ── LinkedIn + Apps ──────── 1 semana

META: Setembro (aplicações) → Outubro (oferta)
```

## Metas Macro

| Período | Técnico | Job |
|---------|---------|-----|
| **Sem monitor** | Lógica + ED ★→★★ via SoloLearn/LeetCode | — |
| **Mês 1 pós-monitor** | MELI Tests + Suicidal TDD + JPA | LinkedIn pronto |
| **Mês 2 pós-monitor** | RestauranteAPI completa | 10+ aplicações |
| **Setembro+** | Fechar gaps de entrevista | 30+ apps, 3+ entrevistas |
| **Outubro** | Estabilizar | Oferta |

## Notas

- **Nova rotina**: Ter-Sáb (café 7h30-16h30, estudo 17h-22h) + Dom/Seg (estudo 9h-18h) = ~39h/semana
- **Sem monitor**: Foco total em SoloLearn + LeetCode Warm-ups + teoria (Testing Library, TDD, SQL)
- **Celular**: SoloLearn app + LeetCode app + ChatGPT/Gemini pra explicar conceitos
- **Monitor chega**: Código intensivo, cada semana do roadmap = 3-4 dias de execução
- **Se atrasar, não acumula**: se L1 não fechar, o entregável vira passivo e segue pra L2
- **Oferta até Outubro**: agressivo mas factível com a nova rotina
