const { Client } = require('@notionhq/client')
const fs = require('fs')
const path = require('path')

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const PARENT_PAGE_ID = '5cd719c8-74b3-455f-88a5-10376d02c2da' // Personal Home

const ROUTINE_PATH = path.join(__dirname, '..', 'routine-definition.json')

async function createDatabase() {
  console.log('Criando Database Rotina...')

  const db = await notion.databases.create({
    parent: { type: 'page_id', page_id: PARENT_PAGE_ID },
    title: [{ type: 'text', text: { content: 'Rotina' } }],
    initial_data_source: {
      properties: {
        'Nome': { title: {} },
        'Início': { date: {} },
        'Fim': { date: {} },
        'Dia': {
          select: {
            options: [
              { name: 'Segunda', color: 'blue' },
              { name: 'Terça', color: 'blue' },
              { name: 'Quarta', color: 'blue' },
              { name: 'Quinta', color: 'blue' },
              { name: 'Sexta', color: 'blue' },
              { name: 'Sábado', color: 'purple' },
              { name: 'Domingo', color: 'red' }
            ]
          }
        },
        'Tipo': {
          select: {
            options: [
              { name: '📚 Estudo', color: 'green' },
              { name: '💼 Trabalho', color: 'yellow' },
              { name: '🚌 Deslocamento', color: 'gray' },
              { name: '🍽️ Refeição', color: 'brown' },
              { name: '🛌 Sono', color: 'orange' },
              { name: '🎸 Lazer', color: 'pink' }
            ]
          }
        },
        'Tag': {
          select: {
            options: [
              { name: '🔴 Ativo', color: 'red' },
              { name: '🟢 Passivo', color: 'green' },
              { name: '⏰ Alarme', color: 'yellow' }
            ]
          }
        },
        'Meta': { rich_text: {} }
      }
    }
  })

  console.log('✅ Database Rotina criado! ID: ' + db.id)
  return db.id
}

async function seedBlocks(databaseId) {
  console.log('\nPopulando blocos da rotina...')

  const routine = JSON.parse(fs.readFileSync(ROUTINE_PATH, 'utf-8'))

  // Map days codes to Portuguese names
  const dayMap = {
    'MO': 'Segunda', 'TU': 'Terça', 'WE': 'Quarta',
    'TH': 'Quinta', 'FR': 'Sexta', 'SA': 'Sábado', 'SU': 'Domingo'
  }

  for (const periodKey in routine) {
    if (periodKey === 'name' || periodKey === 'description') continue
    const period = routine[periodKey]
    const days = period.days

    for (const block of period.blocks) {
      const name = block.name
      const start = block.start
      const end = block.end
      const type = block.type
      const tag = block.tag || null
      const meta = block.meta || null

      for (const dayCode of days) {
        const dayName = dayMap[dayCode]

        // For start/end dates, we use a fixed date and only set time
        // Notion date property with time only is not directly supported,
        // so we use a fixed reference date (Monday of reference week)
        const refDate = dayCode === 'MO' ? '2026-01-05' :
                        dayCode === 'TU' ? '2026-01-06' :
                        dayCode === 'WE' ? '2026-01-07' :
                        dayCode === 'TH' ? '2026-01-08' :
                        dayCode === 'FR' ? '2026-01-09' :
                        dayCode === 'SA' ? '2026-01-10' : '2026-01-11'

        // Handle overnight events
        const startTime = start
        const endTime = end <= start ? '24:00' : end

        const props = {
          'Nome': { title: [{ text: { content: name } }] },
          'Início': { date: { start: `${refDate}T${startTime}:00` } },
          'Fim': { date: { start: `${refDate}T${endTime}:00` } },
          'Dia': { select: { name: dayName } },
          'Tipo': { select: { name: type } }
        }

        if (tag) {
          props['Tag'] = { select: { name: tag } }
        }

        if (meta) {
          props['Meta'] = { rich_text: [{ text: { content: meta } }] }
        }

        try {
          await notion.pages.create({
            parent: { database_id: databaseId },
            properties: props
          })
        } catch (e) {
          console.log(`  ❌ ${dayName}: ${name} — ${e.message}`)
        }
      }
    }
  }

  console.log('\n✅ Todos os blocos criados!')
}

async function main() {
  console.log('🚀 Setup da Rotina no Notion')
  console.log('='.repeat(40))

  const dbId = await createDatabase()
  await seedBlocks(dbId)

  console.log('\n' + '='.repeat(40))
  console.log('✅ Setup completo!')
  console.log(`Database ID: ${dbId}`)
  console.log(`URL: https://notion.so/${dbId.replace(/-/g, '')}`)
}

main().catch(console.error)
