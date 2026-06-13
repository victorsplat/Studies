const { Client } = require('@notionhq/client')
const notion = new Client({ auth: process.env.NOTION_TOKEN })
const DATA_SOURCE_ID = '0c6dc40f-5457-4f75-95e9-9276904dcb8d'
const DATABASE_ID = '73be0bb0-0dab-4d34-a80a-7987a955fa54'

async function cleanup() {
  console.log('Limpando blocos antigos da Rotina...')
  let cursor
  let deleted = 0

  while (true) {
    const res = await notion.dataSources.query({
      data_source_id: DATA_SOURCE_ID,
      start_cursor: cursor,
      page_size: 100
    })

    for (const page of res.results) {
      await notion.pages.update({
        page_id: page.id,
        archived: true
      })
      deleted++
    }

    if (!res.has_more) break
    cursor = res.next_cursor
  }

  console.log(`${deleted} blocos arquivados!`)
}

cleanup().catch(console.error)
