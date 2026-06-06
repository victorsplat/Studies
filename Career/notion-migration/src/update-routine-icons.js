const { Client } = require('@notionhq/client')
const notion = new Client({ auth: process.env.NOTION_TOKEN })

const DATA_SOURCE_ID = '0c6dc40f-5457-4f75-95e9-9276904dcb8d'

const TYPE_ICONS = {
  '📚 Estudo': '📚',
  '💼 Trabalho': '💼',
  '🚌 Deslocamento': '🚌',
  '🍽️ Refeição': '🍽️',
  '🛌 Sono': '😴',
  '🎸 Lazer': '🎸',
}

async function updateIcons() {
  console.log('Buscando páginas do database Rotina...')
  let hasMore = true
  let cursor = undefined
  let updated = 0

  while (hasMore) {
    const response = await notion.dataSources.query({
      data_source_id: DATA_SOURCE_ID,
      start_cursor: cursor,
      page_size: 100
    })

    for (const page of response.results) {
      const tipoProp = page.properties['Tipo']
      const tipo = tipoProp?.select?.name
      const icon = TYPE_ICONS[tipo]

      if (!icon) {
        continue
      }

      try {
        await notion.pages.update({
          page_id: page.id,
          icon: { emoji: icon }
        })
        updated++
        process.stdout.write('.')
      } catch (e) {
        console.log(`\n❌ ${page.id}: ${e.message}`)
      }
    }

    hasMore = response.has_more
    cursor = response.next_cursor
  }

  console.log(`\n✅ ${updated} páginas com ícone atualizado!`)
}

updateIcons().catch(console.error)
