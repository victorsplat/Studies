const { Client } = require('@notionhq/client')

const notion = new Client({ auth: process.env.NOTION_TOKEN })

async function listWithChildren(blockId, depth = 0) {
  const indent = '  '.repeat(depth)
  try {
    const response = await notion.blocks.children.list({ block_id: blockId })
    for (const block of response.results) {
      const type = block.type
      let title = ''
      if (block[type]?.title) {
        title = block[type].title.map(t => t.plain_text).join('')
      } else if (block[type]?.rich_text) {
        title = block[type].rich_text.map(t => t.plain_text).join('')
      } else if (block.child_page?.title) {
        title = block.child_page.title
      } else if (block.child_database?.title) {
        title = block.child_database.title
      }

      const blockType = block.type === 'child_page' ? '📄 Page'
        : block.type === 'child_database' ? '🗄️ Database'
        : block.type === 'column_list' ? '📐 Columns'
        : block.type

      console.log(`${indent}• [${blockType}] "${title}" (id: ${block.id})`)

      if (block.has_children && !['child_page', 'child_database'].includes(block.type)) {
        await listWithChildren(block.id, depth + 1)
      }
    }
  } catch (err) {
    if (err.code === 'object_not_found') {
      console.log(`${indent}  (block não encontrado ou sem acesso)`)
    } else if (err.code === 'validation_error') {
      console.log(`${indent}  (erro de validação ao listar)`)
    } else {
      console.log(`${indent}  (erro: ${err.message})`)
    }
  }
}

async function listDatabases() {
  try {
    const response = await notion.search({
      filter: { property: 'object', value: 'database' },
      sort: { direction: 'ascending', timestamp: 'last_edited_time' }
    })
    if (response.results.length === 0) {
      console.log('(Nenhum database encontrado com acesso)')
      return
    }
    console.log('\n=== DATABASES ===')
    for (const db of response.results) {
      const title = db.title?.map(t => t.plain_text).join('') || '(sem título)'
      console.log(`• [🗄️ Database] "${title}" (id: ${db.id})`)

      try {
        const props = await notion.databases.retrieve({ database_id: db.id })
        console.log(`  Properties:`)
        for (const [key, val] of Object.entries(props.properties)) {
          console.log(`    - ${key} (${val.type})`)
        }
      } catch (e) {
        console.log(`  (erro ao ler properties: ${e.message})`)
      }
    }
  } catch (err) {
    console.log(`Erro ao listar databases: ${err.message}`)
  }
}

async function main() {
  console.log('=== PÁGINAS ===')

  try {
    const response = await notion.search({
      filter: { property: 'object', value: 'page' },
      sort: { direction: 'ascending', timestamp: 'last_edited_time' }
    })

    if (response.results.length === 0) {
      console.log('(Nenhuma página encontrada)')
      console.log('\n⚠️  NENHUM RESULTADO. Isso pode significar:')
      console.log('   1. A integração "AGENTStudies CLI" não foi conectada a nenhuma página no Notion')
      console.log('   2. Token inválido')
      console.log('\n   → No Notion, abra a página principal, clique em "..." → Add connections')
      console.log('   → Selecione "AGENTStudies CLI"')
      console.log('   → Rode este script novamente')
      return
    }

    for (const page of response.results) {
      let title = '(sem título)'
      if (page.properties?.title?.title) {
        title = page.properties.title.title.map(t => t.plain_text).join('')
      } else {
        for (const [key, prop] of Object.entries(page.properties || {})) {
          if (prop.type === 'title' && prop.title?.length > 0) {
            title = prop.title.map(t => t.plain_text).join('')
            break
          }
        }
      }

      const url = page.url || ''
      console.log(`\n📄 "${title}"`)
      console.log(`   ID: ${page.id}`)
      console.log(`   URL: ${url}`)
      console.log(`   Criado: ${page.created_time}`)
      console.log(`   Editado: ${page.last_edited_time}`)
      console.log(`   Arquived: ${page.archived}`)

      if (page.has_children) {
        console.log(`   Conteúdo:`)
        await listWithChildren(page.id, 1)
      }
    }

    await listDatabases()

    console.log('\n=== RESUMO ===')
    console.log(`Total de páginas: ${response.results.length}`)

  } catch (err) {
    console.error(`Erro: ${err.message}`)
    if (err.body) console.error(`Detalhes: ${err.body}`)
  }
}

main()
