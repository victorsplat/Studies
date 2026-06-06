const { Client } = require('@notionhq/client')
const fs = require('fs')
const path = require('path')

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const DATA_SOURCE_ID = '0c6dc40f-5457-4f75-95e9-9276904dcb8d'
const DATABASE_ID = '73be0bb0-0dab-4d34-a80a-7987a955fa54'
const ROUTINE_PATH = path.join(__dirname, '..', 'routine-definition.json')

async function getExistingKeys() {
  const keys = new Set()
  let cursor
  while (true) {
    const res = await notion.dataSources.query({
      data_source_id: DATA_SOURCE_ID,
      start_cursor: cursor,
      page_size: 100
    })
    for (const p of res.results) {
      const nome = p.properties?.Nome?.title?.[0]?.plain_text
      const dia = p.properties?.Dia?.select?.name
      if (nome && dia) keys.add(`${nome}|${dia}`)
    }
    if (!res.has_more) break
    cursor = res.next_cursor
  }
  return keys
}

async function seedBlocks() {
  console.log('Buscando blocos existentes...')
  const existing = await getExistingKeys()
  console.log(`  ${existing.size} blocos já existentes`)

  const routine = JSON.parse(fs.readFileSync(ROUTINE_PATH, 'utf-8'))
  const dayMap = { 'MO': 'Segunda', 'TU': 'Terça', 'WE': 'Quarta', 'TH': 'Quinta', 'FR': 'Sexta', 'SA': 'Sábado', 'SU': 'Domingo' }
  const refDates = { 'MO': '2026-01-05', 'TU': '2026-01-06', 'WE': '2026-01-07', 'TH': '2026-01-08', 'FR': '2026-01-09', 'SA': '2026-01-10', 'SU': '2026-01-11' }

  let created = 0
  for (const periodKey of ['weekdays', 'saturday', 'sunday']) {
    const period = routine[periodKey]
    for (const block of period.blocks) {
      for (const dayCode of period.days) {
        const dayName = dayMap[dayCode]
        const key = `${block.name}|${dayName}`

        if (existing.has(key)) {
          continue
        }

        const refDate = refDates[dayCode]
        const startT = block.start
        const endT = (block.end <= block.start) ? '24:00' : block.end

        const props = {
          'Nome': { title: [{ text: { content: block.name } }] },
          'Início': { date: { start: `${refDate}T${startT}:00` } },
          'Fim': { date: { start: `${refDate}T${endT}:00` } },
          'Dia': { select: { name: dayName } },
          'Tipo': { select: { name: block.type } }
        }
        if (block.tag) props['Tag'] = { select: { name: block.tag } }
        if (block.meta) props['Meta'] = { rich_text: [{ text: { content: block.meta } }] }

        try {
          await notion.pages.create({ parent: { database_id: DATABASE_ID }, properties: props })
          created++
          console.log(`  ✅ ${dayName}: ${block.name}`)
        } catch (e) {
          console.log(`  ❌ ${dayName} ${block.name}: ${e.message}`)
        }
      }
    }
  }
  if (created === 0) {
    console.log('  Nenhum bloco novo pra adicionar.')
  } else {
    console.log(`\n✅ ${created} novos blocos adicionados!`)
  }
}

seedBlocks().catch(console.error)
