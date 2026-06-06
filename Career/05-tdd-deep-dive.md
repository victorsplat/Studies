# TDD Deep Dive

> Guia conceitual + prático para internalizar TDD de vez.
> Dual-stack: Vitest (MELI) + JUnit 5 / Mockito (SuicidalDropAPI).
> Do ★★ ao ★★★★ em 2 meses.

---

## 1. Por que TDD é seu gap #1

| Fato | Dado |
|------|------|
| Seu nível hoje | ★★ — entende o ciclo, não internalizou |
| Vagas Jr que pedem testes | 55% (Glassdoor 2026) |
| Diferencial competitivo | Saber TDD separa Jr que "entrega" de Jr que "entrega com qualidade" |
| Código sem teste | Quando quebra, você descobre em produção |
| Código com TDD | Quando quebra, você descobre em 5 segundos |

TDD não é sobre testes. É sobre **design de código**. Escrever o teste antes força você a pensar na API antes da implementação — resultado: código mais limpo, mais modular, mais fácil de manter.

---

## 2. O Ciclo TDD — Red-Green-Refactor

```
🔴  RED      → Escreva o teste que FAIL (antes do código)
🟢  GREEN    → Escreva o código MÍNIMO pra passar
🔵  REFACTOR → Melhore o código com os testes verdes
```

### Exemplo passo a passo (Java)

**Requisito**: Um método que soma dois números.

**🔴 RED** — escreva o teste primeiro:
```java
@Test
void deveSomarDoisNumeros() {
    Calculadora calc = new Calculadora();
    int resultado = calc.somar(2, 3);
    assertEquals(5, resultado);
}
```
Compila? Não. A classe `Calculadora` não existe. **RED**.

**🟢 GREEN** — código mínimo pra compilar e passar:
```java
public class Calculadora {
    public int somar(int a, int b) {
        return 0; // apenas pra compilar
    }
}
```
O teste falha porque retorna 0 ao invés de 5. **Ainda RED**.

Agora o código real:
```java
public class Calculadora {
    public int somar(int a, int b) {
        return a + b;
    }
}
```
Teste passa? Sim. **GREEN**.

**🔵 REFACTOR** — não tem o que refatorar aqui, está simples. Mas se houvesse duplicação, extrairia um método. Se houvesse nome confuso, renomearia. Os testes garantem que você não quebrou nada.

### A regra de ouro
> Nunca escreva código de produção sem antes ter um teste falhando.
> Se o teste não falhou antes de passar, você não fez TDD.

---

## 3. TDD no MELI (Vitest + Testing Library)

### Setup
```json
// package.json (já deve estar no MELI)
{
  "devDependencies": {
    "vitest": "^2.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "jsdom": "^24.0.0"
  }
}
```

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vite/react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
```

```ts
// src/test/setup.ts
import '@testing-library/jest-dom'
```

### Exemplo 1: Gallery Component

**🔴 RED**:
```tsx
import { render, screen } from '@testing-library/react'
import { Gallery } from './Gallery'

describe('Gallery', () => {
  it('renderiza imagens com alt text', () => {
    const images = [
      { src: '/foto1.jpg', alt: 'Foto 1' },
      { src: '/foto2.jpg', alt: 'Foto 2' },
    ]
    render(<Gallery images={images} />)
    expect(screen.getByAltText('Foto 1')).toBeInTheDocument()
    expect(screen.getByAltText('Foto 2')).toBeInTheDocument()
  })
})
```

**🟢 GREEN**:
```tsx
export function Gallery({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <div>
      {images.map((img) => (
        <img key={img.src} src={img.src} alt={img.alt} />
      ))}
    </div>
  )
}
```

### Exemplo 2: ThemeToggle

**🔴 RED**:
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeToggle } from './ThemeToggle'
import { ThemeProvider } from './ThemeContext'

describe('ThemeToggle', () => {
  it('alterna tema ao clicar', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )
    const button = screen.getByRole('button', { name: /toggle theme/i })
    const initialTheme = document.documentElement.getAttribute('data-theme')

    fireEvent.click(button)
    const newTheme = document.documentElement.getAttribute('data-theme')

    expect(newTheme).not.toBe(initialTheme)
  })
})
```

### Padrão Testing Library
```
render(<Component />)  → renderiza o componente
screen.getByText()      → busca por texto visível
screen.getByRole()      → busca por role acessível
fireEvent.click()       → dispara evento
expect(...).toBeInTheDocument() → assert
```

---

## 4. TDD no SuicidalDropAPI (JUnit 5 + Mockito)

### Setup
```kotlin
// build.gradle.kts
testImplementation("org.springframework.boot:spring-boot-starter-test")
testImplementation("org.mockito:mockito-core")
testImplementation("org.testcontainers:testcontainers:1.20.0")
testImplementation("org.testcontainers:mongodb:1.20.0")
```

### Exemplo 1: ProductService.findByCategory()

**🔴 RED**:
```java
@Test
void findByCategory_quandoCategoriaExiste_retornaProdutos() {
    // given
    String category = "electronics";
    when(productRepository.findByCategory(category))
        .thenReturn(List.of(
            new Product("1", "Mouse", category, 50.0),
            new Product("2", "Keyboard", category, 100.0)
        ));

    // when
    List<ProductDTO> result = productService.findByCategory(category);

    // then
    assertEquals(2, result.size());
    assertEquals("Mouse", result.get(0).name());
    verify(productRepository).findByCategory(category);
}
```

**🟢 GREEN**:
```java
public List<ProductDTO> findByCategory(String category) {
    return productRepository.findByCategory(category)
        .stream()
        .map(ProductMapper::toDTO)
        .toList();
}
```

### Exemplo 2: ProductController POST

**🔴 RED**:
```java
@WebMvcTest(ProductController.class)
class ProductControllerTest {

    @MockBean
    private ProductService productService;

    @Autowired
    private MockMvc mockMvc;

    @Test
    void createProduct_quandoValido_retorna201() throws Exception {
        var dto = new CreateProductDTO("Mouse", "electronics", 50.0);
        when(productService.create(any())).thenReturn(new ProductDTO("1", "Mouse", "electronics", 50.0));

        mockMvc.perform(post("/api/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                        "name": "Mouse",
                        "category": "electronics",
                        "price": 50.0
                    }
                """))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.name").value("Mouse"));
    }
}
```

### Exemplo 3: Regra de negócio (preço negativo)

**🔴 RED**:
```java
@Test
void createProduct_quandoPrecoNegativo_retornaBadRequest() {
    assertThrows(InvalidPriceException.class, () -> {
        productService.create(new CreateProductDTO("Mouse", "electronics", -10.0));
    });
}
```

**🟢 GREEN**:
```java
public ProductDTO create(CreateProductDTO dto) {
    if (dto.price() < 0) {
        throw new InvalidPriceException("Price must be positive");
    }
    // ... cria produto
}
```

### Padrão given-when-then (Mockito)
```
given  → when(mock.metodo(args)).thenReturn(valor)
when   → resultado = service.metodoReal(args)
then   → assertEquals(expected, resultado)
then   → verify(mock).metodo(args)  // confirmou que chamou?
```

---

## 5. TDD em Spring Boot com PostgreSQL (RestauranteAPI — preview)

### Testcontainers com PostgreSQL
```java
@Testcontainers
@SpringBootTest
class PedidoRepositoryTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16")
        .withDatabaseName("testdb")
        .withUsername("test")
        .withPassword("test");

    @DynamicPropertySource
    static void configure(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private PedidoRepository pedidoRepository;

    @Test
    void deveSalvarEPedidoComItens() {
        Pedido pedido = new Pedido();
        pedido.addItem(new Item("Pizza", 35.0, 2));
        pedido = pedidoRepository.save(pedido);

        Optional<Pedido> found = pedidoRepository.findById(pedido.getId());
        assertTrue(found.isPresent());
        assertEquals(1, found.get().getItens().size());
    }
}
```

### DataJpaTest
```java
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class CardapioRepositoryTest {

    @Autowired
    private CardapioRepository cardapioRepository;

    @Test
    void findByCategoria_quandoExiste_retornaItens() {
        cardapioRepository.save(new CardapioItem("Pizza", "salgados", 35.0));

        List<CardapioItem> result = cardapioRepository.findByCategoria("salgados");

        assertFalse(result.isEmpty());
        assertEquals("Pizza", result.get(0).getNome());
    }
}
```

---

## 6. Anti-patterns (o que NÃO fazer)

| Anti-pattern | Problema | Faça isso |
|-------------|----------|-----------|
| Testar getters/setters | Testa o compilador, não o código | Teste comportamento, não dados |
| Testes que dependem de ordem | @TestMethodOrder(MethodName) vaza estado | Cada teste deve ser independente |
| Mockar tudo | Teste vazio que só repete implementação | Mock só dependências externas (banco, API) |
| Cobertura como meta única | 100% de cobertura com testes que não testam nada | Qualidade > quantidade |
| Teste gigante que testa 10 coisas | Quando quebra, não sabe o que quebrou | Um assert por conceito |
| Escrever teste depois do código | Você testa o que sabe que funciona | TDD é teste ANTES |
| Ignorar refactor | Código fica podre, teste vira âncora | Refatore com confiança (testes garantem) |

---

## 7. Checklist Diário

Antes de escrever qualquer código de produção:

- [ ] Escrevi o teste **antes** do código?
- [ ] O teste falhou primeiro (🔴 RED)?
- [ ] Escrevi o código **mínimo** pra passar (🟢 GREEN)?
- [ ] Refatorei sem quebrar os testes (🔵 REFACTOR)?
- [ ] O teste testa **comportamento**, não implementação?
- [ ] Se eu mudar a implementação, o teste ainda funciona?

---

## 8. Metas de Progressão

| Nível | O que significa | Marco |
|-------|----------------|-------|
| ★★ | Entendo TDD, escrevo com ajuda | **Você hoje** |
| ★★★ | Escrevo teste antes do código, mas ainda pulo às vezes | **Final de Junho** (MELI + Suicidal) |
| ★★★★ | TDD é natural. Código já nasce testado. | **Final de Julho** (RestauranteAPI 100% TDD) |
| ★★★★★ | TDD guia o design. Testes são documentação viva. | Quando ensinar alguém |
