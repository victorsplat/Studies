# Interview Prep

> Preparação técnica + comportamental para processos seletivos de Java Júnior.
> Use este guia na semana S11 (Agosto) e durante todo o ciclo S13+.

---

## 1. O Processo Seletivo Típico

| Etapa | O que esperam | Duração |
|-------|---------------|---------|
| **Triagem RH** | Fit cultural, disponibilidade, salário | 15-30min |
| **Teste técnico** | Lógica, Java, Spring, banco | 1-2h |
| **Entrevista técnica** | Arquitetura, decisões, projetos | 45-60min |
| **Entrevista comportamental** | Soft skills, STAR stories | 30-45min |
| **Offer** | Proposta, benefícios, negociação | — |

### 🎯 Dica
Candidate-se mesmo que não atenda 100% dos requisitos. Descrição de vaga é **desejo**, não **obrigação**.

---

## 2. Teste Técnico — Tipos e Exemplos

### Tipos comuns
| Tipo | Como funciona | Dica |
|------|---------------|------|
| **Live coding** | Resolve problema ao vivo compartilhando tela | Pense alto. O processo vale mais que a solução |
| **Desafio assíncrono** | Enviam um problema, você devolve em 24-48h | Entregue algo que rode. Com testes se possível |
| **Quiz técnico** | Múltipla escolha sobre Java/Spring | Revisar Java basics antes |

### Exemplos de Desafios

**Lógica — Fácil**:
```java
// Inverta uma string sem usar StringBuilder.reverse()
public String inverter(String s) {
    char[] chars = s.toCharArray();
    int left = 0, right = chars.length - 1;
    while (left < right) {
        char temp = chars[left];
        chars[left] = chars[right];
        chars[right] = temp;
        left++;
        right--;
    }
    return new String(chars);
}
```

**Lógica — Médio**:
```java
// Encontre o segundo maior número em um array
public int segundoMaior(int[] nums) {
    int maior = Integer.MIN_VALUE;
    int segundo = Integer.MIN_VALUE;
    for (int n : nums) {
        if (n > maior) {
            segundo = maior;
            maior = n;
        } else if (n > segundo && n != maior) {
            segundo = n;
        }
    }
    return segundo;
}
```

**Spring Boot — CRUD**:
```java
// Criar um endpoint POST /produtos que recebe JSON, valida e salva
@PostMapping("/produtos")
public ResponseEntity<ProductDTO> criar(@Valid @RequestBody CreateProductDTO dto) {
    ProductDTO saved = productService.criar(dto);
    return ResponseEntity.status(201).body(saved);
}
```

### 🎯 Dica de estudo
- Antes de começar a aplicar, resolva **10 LeetCode Easy** e **5 desafios de CRUD Spring Boot**
- Tenha um **projeto Spring Boot template** (com PostgreSQL, JPA, testes) pra usar em desafios assíncronos
- Treine live coding: grave você mesmo resolvendo um problema em 30min

---

## 3. Perguntas Técnicas — Java

| Pergunta | Resposta Curta |
|----------|---------------|
| Diferença String vs StringBuilder vs StringBuffer | String é imutável. StringBuilder é mutável sem sincronia. StringBuffer é mutável com sincronia (thread-safe) |
| Pilares da POO? | Encapsulamento (esconder dados), Herança (reuso), Polimorfismo (múltiplas formas), Abstração (esconder complexidade) |
| Abstract class vs Interface (Java 8+)? | Abstract: pode ter estado (atributos) e métodos concretos. Interface: contrato puro, mas pode ter default/static methods |
| O que é SOLID? | S (SRP): uma classe, uma responsabilidade. O (OCP): aberto pra extensão, fechado pra modificação. L (LSP): subtipo substitui base. I (ISP): interfaces específicas. D (DIP): depender de abstrações, não de implementações |
| O que é lambda? | Função anônima que implementa interface funcional. Ex: `(a, b) -> a + b` |
| O que são Virtual Threads? | Threads leves do JVM (Java 21). Milhões por aplicação. `Thread.ofVirtual().start(runnable)` |
| O que é record? | Classe imutável concisa: construtor, getters, equals, hashCode, toString automáticos. `public record ProductDTO(String id, String name) {}` |
| Diferença Checked vs Unchecked Exception? | Checked: obriga try-catch ou throws (IOException). Unchecked: RuntimeException, opcional tratar (NullPointerException) |
| O que é Optional? | Container que pode ou não ter valor. Evita NullPointerException. `Optional.ofNullable(valor).orElse("default")` |
| O que é Stream? | Sequência de operações funcionais em coleções. `list.stream().filter(x -> x > 0).map(String::valueOf).toList()` |

---

## 4. Perguntas Técnicas — Spring Boot

| Pergunta | Resposta Curta |
|----------|---------------|
| O que é Injeção de Dependência? | Spring gerencia objetos e suas dependências automaticamente. Você declara, Spring injeta |
| @RestController vs @Controller? | @RestController = @Controller + @ResponseBody. Retorna JSON, não view |
| O que é o Security Filter Chain? | Cadeia de filtros que intercepta toda request. Cada filtro faz uma validação (auth, CORS, CSRF) |
| O que é @Transactional? | Gerencia transação: abre antes do método, commita se sucesso, rollback se exceção |
| O que faz @SpringBootApplication? | @Configuration + @EnableAutoConfiguration + @ComponentScan. Ponto de entrada da app |
| O que é o ApplicationContext? | Container do Spring que gerencia todos os beans. Onde os objetos vivem |
| Diferença @Component, @Service, @Repository? | @Service: camada de negócio. @Repository: persistência (traduz exceção JPA pra DataAccessException). @Component: genérico |
| O que faz @Valid? | Ativa validação Jakarta Bean Validation nos campos do DTO. Ex: `@NotBlank`, `@Positive`, `@Email` |

---

## 5. Perguntas Técnicas — Banco de Dados

| Pergunta | Resposta Curta |
|----------|---------------|
| SQL vs NoSQL? | SQL: relacional, schema fixo, ACID, joins. NoSQL: schema flexível, escalável, eventual consistency |
| O que é JOIN? | Combina registros de duas tabelas por chave estrangeira. INNER JOIN (só match), LEFT JOIN (tudo da esquerda) |
| Normalização? | Organizar dados pra reduzir redundância. 1FN (colunas atômicas), 2FN (sem dependência parcial), 3FN (sem dependência transitiva) |
| O que é índice? | Estrutura (B-tree) que acelera busca. Troca: mais rápido SELECT, mais lento INSERT/UPDATE, mais espaço |
| O que é uma migration? | Controle de versão do schema. Cada migration é um arquivo SQL versionado (Flyway: `V1__create_table.sql`) |
| O que é ACID? | Atomicidade (tudo ou nada), Consistência (dados válidos), Isolamento (concorrência segura), Durabilidade (dados persistem) |
| O que é o problema N+1? | 1 query pra buscar entidades + N queries pra buscar relacionamentos de cada uma. Solução: fetch join ou @EntityGraph |

---

## 6. Perguntas Comportamentais — STAR

| Pergunta | História pra Contar | Skill |
|----------|-------------------|-------|
| "Conte uma situação de pressão" | Rush no restaurante, 6 mesas, cozinha atrasou, gerenciei | Pressão |
| "Conte um conflito que resolveu" | Cliente de fotografia queria X com orçamento Y → propus Z | Negociação |
| "Conte algo que liderou" | Como maître, coordenava 5 garçons em evento de 200 pessoas | Liderança |
| "Conte algo que aprendeu sozinho" | Voltei a programar após 6 anos. 3 projetos em 4 meses | Autodidatismo |
| "Conte um erro e o que aprendeu" | [Escolha um real — mostra maturidade] | Resiliência |
| "Por que quer ser dev?" | Sempre gostei de criar. Parei por circunstâncias. Voltei porque é o que quero fazer | Motivação |
| "Onde se vê em 5 anos?" | Pleno Java, mentoreando juniores, contribuindo em decisões de arquitetura | Visão |

### 🎯 Formato STAR
| Letra | O que é | Exemplo (Pressão) |
|-------|---------|-------------------|
| **S**ituação | Contexto breve | "Trabalhava como maître em restaurante lotado (200 pessoas)" |
| **T**arefa | O que precisava ser feito | "Precisava coordenar 5 garçons e garantir que todos fossem atendidos" |
| **A**ção | O que VOCÊ fez (use EU) | "Organizei as mesas por zona, deleguei cada garçon pra uma área, e fiquei na central pra apagar incêndio" |
| **R**esultado | O que aconteceu | "Serviço fluiu, 0 reclamações, cliente elogiou a gerência" |

---

## 7. Suas 3 STAR Stories Principais

### STAR #1 — Resiliência

| | |
|---|---------|
| **S** | Fui expulso de casa aos 16 anos |
| **T** | Precisava me sustentar sozinho sem formação, sem experiência, sem rede de apoio |
| **A** | Arrumei emprego em restaurante. Comecei como garçom, aprendi rápido, fui promovido a maître e depois sommelier. Cada função exigiu aprender do zero enquanto trabalhava |
| **R** | Me sustentei sozinho, desenvolvi liderança e precisão, e descobri que consigo aprender qualquer coisa quando preciso |

### STAR #2 — Autodidatismo

| | |
|---|---------|
| **S** | Após 6 anos sem programar, decidi voltar pra tecnologia em 2026 |
| **T** | Precisava recuperar o tempo perdido e construir um portfolio competitivo |
| **A** | Estudei 4 meses enquanto trabalhava (seg-sex, 5h-17h). Usei deslocamentos pra conteúdo passivo e noites/fins de semana pra código ativo. Construí 3 projetos: portfolio Next.js no ar, API Java com JWT e MongoDB, API de restaurante 100% TDD |
| **R** | Hoje tenho 3 projetos reais, stack Java moderna, e tô aplicando pra vagas. O mais importante: descobri que disciplina vence talento |

### STAR #3 — Negociação

| | |
|---|---------|
| **S** | Cliente de fotografia queria um ensaio completo mas o orçamento era metade do valor |
| **T** | Precisava fechar o job sem perder o cliente e sem trabalhar de graça |
| **A** | Propus um pacote reduzido: menos horas de ensaio, entregas em digital (sem álbum físico), edição básica |
| **R** | Cliente fechou, gostou do resultado, e me contratou pra mais 2 jobs depois |

---

## 8. Checklist Pré-Entrevista

- [ ] Pesquisei a empresa (missão, stack, cultura, produto)?
- [ ] Li a descrição da vaga de novo?
- [ ] Preparei 2 perguntas pra fazer no final?
- [ ] Testei microfone, câmera, internet?
- [ ] Tenho água por perto?
- [ ] Li `05-tdd-deep-dive.md` e `06-portfolio-pitch.md` nos últimos 3 dias?
- [ ] Decorei os números do MELI Lighthouse?
- [ ] Sei explicar a diferença entre MongoDB e PostgreSQL com meus projetos?
- [ ] Tenho 2 STAR stories prontas (Resiliência + Autodidatismo)?
- [ ] Respirei fundo e lembrei: **tenho 3 projetos reais. A maioria dos candidatos tem 0**.

---

## 9. Perguntas pra Você Fazer no Final

> "Tem alguma pergunta pra gente?" — **SEMPRE tenha. É sua chance de mostrar interesse.**

- "Como é o dia a dia do time de desenvolvimento?"
- "Qual a stack principal hoje e pra qual stack vocês estão migrando?"
- "Como funciona o processo de code review?"
- "Tem programa de mentoria pra devs juniores?"
- "Qual o maior desafio técnico que o time enfrenta hoje?"
- "Como é medido o sucesso de um dev júnior nos primeiros 3 meses?"
- "Existe plano de carreira estruturado?"

### 🎯 Escolha 2 perguntas que combinem com a vaga. Não pergunte sobre salário na primeira entrevista.

---

## 10. Após a Entrevista

- Em 24h, envie um e-mail/LinkedIn agradecendo e reforçando interesse
- Anote o que perguntaram que você NÃO sabia
- Anote o que você respondeu bem
- Identifique padrões: a cada 3 entrevistas, ajuste este guia
- Se for rejeitado, peça feedback (nem todas dão, mas quando dão é ouro)

### 🎯 Ciclo de melhoria
```
Entrevista → Anota o que errou → Estuda o gap → Próxima entrevista
```
