const { Client } = require('@notionhq/client')

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const NOTION_VERSION = '2022-06-28'

async function api(method, path, body) {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
      'Content-Type': 'application/json',
      'Notion-Version': NOTION_VERSION,
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || JSON.stringify(data))
  return data
}

// ─── Cheat Sheet Sections ────────────────────────────────────────

const CHEAT_SHEET_SECTIONS = [
  {
    title: '📊 Big O — Quick Reference',
    children: [
      { type: 'bulleted_list', text: 'O(1) — acesso array[], HashMap.get(), push/pop' },
      { type: 'bulleted_list', text: 'O(log n) — busca binária, árvore balanceada' },
      { type: 'bulleted_list', text: 'O(n) — percorrer array uma vez, busca linear' },
      { type: 'bulleted_list', text: 'O(n log n) — Merge Sort, TimSort (padrão do Java)' },
      { type: 'bulleted_list', text: 'O(n²) — nested loops, Bubble Sort' },
      { type: 'code', language: 'java', text: '// O(n) — percorrer array\nint sum = 0;\nfor (int n : nums) {\n    sum += n;\n}\n\n// O(n²) — nested loop\nfor (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n        System.out.println(i + j);\n    }\n}' },
      { type: 'divider' },
      { type: 'bulleted_list', text: 'Sempre pergunte: "Quantas vezes meu algoritmo toca cada elemento?"' },
    ]
  },
  {
    title: '☕ Java 21 — Records',
    children: [
      { type: 'code', language: 'java', text: 'public record ProductDTO(\n    String id,\n    String name,\n    BigDecimal price\n) {}' },
      { type: 'bulleted_list', text: 'Já gera: construtor, getters (id(), name(), price()), equals, hashCode, toString' },
      { type: 'bulleted_list', text: 'Imutável — todos os campos são final' },
      { type: 'bulleted_list', text: 'Usar pra DTOs, value objects, respostas de API' },
      { type: 'bulleted_list', text: 'Pode ter métodos estáticos e validadores no construtor compacto' },
    ]
  },
  {
    title: '☕ Java 21 — Streams',
    children: [
      { type: 'code', language: 'java', text: 'List<ProductDTO> result = products.stream()\n    .filter(p -> p.price() > 50)\n    .map(ProductDTO::name)\n    .sorted()\n    .toList();' },
      { type: 'bulleted_list', text: 'filter — mantém quem passa no predicado' },
      { type: 'bulleted_list', text: 'map — transforma cada elemento' },
      { type: 'bulleted_list', text: 'sorted — ordena (precisa de Comparable ou Comparator)' },
      { type: 'bulleted_list', text: 'toList() — coleta em lista imutável (Java 16+)' },
      { type: 'bulleted_list', text: 'collect(Collectors.toList()) — versão anterior' },
    ]
  },
  {
    title: '☕ Java 21 — Optional',
    children: [
      { type: 'code', language: 'java', text: 'Optional.ofNullable(valor)\n    .map(String::toUpperCase)\n    .filter(s -> s.length() > 3)\n    .orElse("default");\n\n// Ou lançar exceção\nOptional.ofNullable(valor)\n    .orElseThrow(() -> new RuntimeException("Valor obrigatório"));' },
      { type: 'bulleted_list', text: 'Optional.of() — se valor for null, NPE na hora' },
      { type: 'bulleted_list', text: 'Optional.ofNullable() — aceita null, vira Optional.empty()' },
      { type: 'bulleted_list', text: 'orElse() — valor padrão (sempre avaliado)' },
      { type: 'bulleted_list', text: 'orElseGet() — supplier (só avaliado se vazio)' },
      { type: 'bulleted_list', text: 'NÃO use Optional em atributos de classe, parâmetros ou serialização' },
    ]
  },
  {
    title: '🧩 Padrões LeetCode',
    children: [
      { type: 'heading_3', text: 'HashMap (Two Sum, Contains Duplicate)' },
      { type: 'code', language: 'java', text: '// Two Sum — O(n)\nMap<Integer, Integer> map = new HashMap<>();\nfor (int i = 0; i < nums.length; i++) {\n    int complement = target - nums[i];\n    if (map.containsKey(complement)) {\n        return new int[]{map.get(complement), i};\n    }\n    map.put(nums[i], i);\n}' },
      { type: 'divider' },
      { type: 'heading_3', text: 'Two Pointers (Palindrome, Reverse)' },
      { type: 'code', language: 'java', text: '// Palindrome — O(n)\nint left = 0, right = s.length() - 1;\nwhile (left < right) {\n    if (s.charAt(left) != s.charAt(right)) return false;\n    left++; right--;\n}\nreturn true;' },
      { type: 'divider' },
      { type: 'heading_3', text: 'Sliding Window (subarray problems)' },
      { type: 'code', language: 'java', text: '// Soma máxima de subarray tamanho k\nint sum = 0;\nfor (int i = 0; i < k; i++) sum += nums[i];\nint max = sum;\nfor (int i = k; i < nums.length; i++) {\n    sum += nums[i] - nums[i - k];\n    max = Math.max(max, sum);\n}' },
    ]
  },
  {
    title: '🗄️ SQL Essencial',
    children: [
      { type: 'code', language: 'sql', text: '-- SELECT básico\nSELECT nome, preco FROM produtos WHERE preco > 50 ORDER BY preco DESC;\n\n-- JOIN\nSELECT p.nome, c.nome AS categoria\nFROM produtos p\nJOIN categorias c ON p.categoria_id = c.id;\n\n-- GROUP BY + HAVING\nSELECT categoria_id, COUNT(*) AS total\nFROM produtos\nGROUP BY categoria_id\nHAVING COUNT(*) > 5;\n\n-- Subquery\nSELECT nome FROM produtos\nWHERE preco > (SELECT AVG(preco) FROM produtos);' },
      { type: 'bulleted_list', text: 'INNER JOIN — só registros que existem em ambas' },
      { type: 'bulleted_list', text: 'LEFT JOIN — tudo da esquerda, NULL onde não tem na direita' },
      { type: 'bulleted_list', text: 'GROUP BY — agrupa pra agregar (COUNT, SUM, AVG, MAX, MIN)' },
      { type: 'bulleted_list', text: 'HAVING — WHERE pra grupos (filtra depois do GROUP BY)' },
    ]
  },
  {
    title: '📝 Rascunhos',
    children: [
      { type: 'bulleted_list', text: ' ' },
      { type: 'bulleted_list', text: ' ' },
      { type: 'bulleted_list', text: ' ' },
      { type: 'bulleted_list', text: ' ' },
    ]
  }
]

// ─── Progress Tracker Initial Tasks ─────────────────────────────

const INITIAL_TASKS = [
  { task: 'Variáveis, tipos, if/else, for/while', nivel: 'L1', tipo: 'SoloLearn' },
  { task: 'Funções, parâmetros, retorno', nivel: 'L1', tipo: 'SoloLearn' },
  { task: 'Mini programa (calculadora)', nivel: 'L1', tipo: 'SoloLearn' },
  { task: 'Revisar YouTube (Guanabara)', nivel: 'L1', tipo: 'Teoria' },
  { task: 'Percorrer array, acessar, modificar', nivel: 'L2', tipo: 'SoloLearn' },
  { task: 'Manipulação de strings', nivel: 'L2', tipo: 'SoloLearn' },
  { task: 'Maior elemento, soma, inverter array', nivel: 'L2', tipo: 'LeetCode' },
  { task: 'TwoSum (tentativa inicial)', nivel: 'L2', tipo: 'LeetCode' },
  { task: 'HashMap: chave-valor, put, get, contains', nivel: 'L3', tipo: 'SoloLearn' },
  { task: 'HashSet: quando usar', nivel: 'L3', tipo: 'SoloLearn' },
  { task: 'TwoSum com HashMap (otimizado)', nivel: 'L3', tipo: 'LeetCode' },
  { task: 'Palindrome Number', nivel: 'L4', tipo: 'LeetCode' },
  { task: 'Valid Parentheses', nivel: 'L4', tipo: 'LeetCode' },
  { task: 'Roman to Integer', nivel: 'L4', tipo: 'LeetCode' },
  { task: 'Revisão geral L1-L4', nivel: 'L4', tipo: 'Teoria' },
]

// ─── Block Builder ───────────────────────────────────────────────

function textBlock(text, annotation) {
  return { type: 'text', text: { content: text }, annotations: annotation || {} }
}

function toggleBlock(title, children) {
  return {
    type: 'toggle',
    toggle: {
      rich_text: [textBlock(title, { bold: true })],
      children: children.map(b => buildBlock(b))
    }
  }
}

function buildBlock(block) {
  switch (block.type) {
    case 'bulleted_list':
      return {
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: [textBlock(block.text)]
        }
      }
    case 'code':
      return {
        type: 'code',
        code: {
          rich_text: [textBlock(block.text)],
          language: block.language
        }
      }
    case 'heading_3':
      return {
        type: 'heading_3',
        heading_3: {
          rich_text: [textBlock(block.text)]
        }
      }
    case 'divider':
      return { type: 'divider', divider: {} }
    default:
      return null
  }
}

function buildCheatSheetBlocks() {
  return CHEAT_SHEET_SECTIONS.map(s => toggleBlock(s.title, s.children))
}

// ─── Main ────────────────────────────────────────────────────────

// Fallback parent page IDs — o script tenta cada um até encontrar um que aceite children
const PARENT_CANDIDATES = [
  process.env.NOTION_PARENT_PAGE_ID,    // explícito via env
  '37ed3abb-4d61-817b-a495-e3d2003ea28d', // Quick Note (página avulsa)
]

async function findOrCreateParent() {
  // Try explicit env var first
  if (process.env.NOTION_PARENT_PAGE_ID) {
    return process.env.NOTION_PARENT_PAGE_ID
  }
  // Fallback: use first candidate that exists
  return PARENT_CANDIDATES[1]
}

async function main() {
  console.log('=== Notion — Study Tools Setup ===\n')

  const parentPageId = await findOrCreateParent()
  console.log(`📁 Página pai: ${parentPageId}\n`)

  // 2. Create Cheat Sheet
  console.log('🧠 Criando Cheat Sheet...')
  const cheatSheetBlocks = buildCheatSheetBlocks()
  try {
    const cheatSheet = await notion.pages.create({
      parent: { type: 'page_id', page_id: parentPageId },
      properties: {
        title: {
          title: [{ type: 'text', text: { content: '🧠 Cheat Sheet' } }]
        }
      },
      children: cheatSheetBlocks
    })
    console.log(`  ✅ Criada: ${cheatSheet.url}\n`)
  } catch (err) {
    console.error(`  ❌ Erro: ${err.body?.message || err.message}\n`)
  }

  // 3. Create Progress Tracker database via raw API
  console.log('✅ Criando Progress Tracker...')
  try {
    const tracker = await api('POST', '/databases', {
      parent: { type: 'page_id', page_id: parentPageId },
      title: [{ type: 'text', text: { content: '✅ Progress Tracker' } }],
      properties: {
        'Task': { title: {} },
        'Nível': {
          select: {
            options: [
              { name: 'L1', color: 'blue' },
              { name: 'L2', color: 'green' },
              { name: 'L3', color: 'yellow' },
              { name: 'L4', color: 'orange' },
            ]
          }
        },
        'Status': {
          select: {
            options: [
              { name: 'To Do', color: 'gray' },
              { name: 'Doing', color: 'blue' },
              { name: 'Done', color: 'green' },
            ]
          }
        },
        'Tipo': {
          select: {
            options: [
              { name: 'SoloLearn', color: 'purple' },
              { name: 'LeetCode', color: 'red' },
              { name: 'Teoria', color: 'brown' },
            ]
          }
        },
        'Link': { url: {} }
      }
    })
    console.log(`  ✅ Database criado: ${tracker.url}\n`)

    // 4. Seed initial tasks via raw API
    console.log('🌱 Populando tasks iniciais...')
    let seeded = 0
    for (const t of INITIAL_TASKS) {
      await api('POST', '/pages', {
        parent: { type: 'database_id', database_id: tracker.id },
        properties: {
          'Task': {
            title: [{ type: 'text', text: { content: t.task } }]
          },
          'Nível': {
            select: { name: t.nivel }
          },
          'Status': {
            select: { name: 'To Do' }
          },
          'Tipo': {
            select: { name: t.tipo }
          }
        }
      })
      seeded++
      process.stdout.write('.')
    }
    console.log(`\n  ✅ ${seeded} tasks adicionadas!\n`)
  } catch (err) {
    console.error(`  ❌ Erro: ${err.message}\n`)
  }

  console.log('🎉 Setup completo!')
}

main().catch(err => {
  console.error('Fatal:', err.message)
  process.exit(1)
})
