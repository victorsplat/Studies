#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "$0")/.." && pwd)"
CLIENT_SECRET="$DIR/client-secret-gcal.json"
GCALCLI="/tmp/gcal-venv/bin/gcalcli"

if [ ! -f "$CLIENT_SECRET" ]; then
  echo "❌ client-secret-gcal.json não encontrado"
  exit 1
fi

echo "=== Criando eventos das 12 semanas no Google Calendar ==="

WEEKS=(
  "S1 — Setup + MELI Tests|2026-06-06|2026-06-14|Configurar Vitest + Testing Library no MELI. Testar Gallery e ThemeToggle."
  "S2 — MELI Tests Profundidade|2026-06-15|2026-06-21|Testar páginas e rotas. Testar authStore e galleryStore."
  "S3 — TDD + SQL|2026-06-22|2026-06-28|3 testes TDD no SuicidalDrop. SQL: modelagem relacional, JOINs."
  "S4 — Spring Data JPA + PostgreSQL|2026-06-29|2026-07-05|Spring Boot + PostgreSQL. Migrar entidade do Mongo pra JPA."
  "S5 — SuicidalDrop Catalog TDD|2026-07-06|2026-07-12|Testar ProductController. Mockito + Testcontainers."
  "S6 — Setup RestauranteAPI|2026-07-13|2026-07-19|Spring Boot + PostgreSQL + JPA. Domain model."
  "S7 — RestauranteAPI TDD|2026-07-20|2026-07-26|TDD em todos endpoints. 5+ testes passando."
  "S8 — RestauranteAPI Completo|2026-07-27|2026-08-02|Security JWT. Swagger. Deploy."
  "S9 — Estruturas de Dados I|2026-08-03|2026-08-09|Arrays, Lists, Stacks, Queues. Maps, Sets."
  "S10 — Algoritmos|2026-08-10|2026-08-16|Sort, Busca binária. Two Pointers, Sliding Window."
  "S11 — LinkedIn + Currículo|2026-08-17|2026-08-23|LinkedIn completo. Currículo PDF."
  "S12 — Portfólio + Apps|2026-08-24|2026-08-30|READMEs dos 3 projetos. 10 aplicações."
)

for WEEK in "${WEEKS[@]}"; do
  IFS='|' read -r TITLE START END DESC <<< "$WEEK"
  echo ""
  echo "Criando: $TITLE"
  echo "  Data: $START → $END"
  echo "  Desc: $DESC"

  if $GCALCLI --client-secret "$CLIENT_SECRET" quick-add "$TITLE ($START - $END)" 2>&1; then
    echo "  ✅ $TITLE"
  else
    echo "  ⚠️  Tentando método alternativo..."
    $GCALCLI --client-secret "$CLIENT_SECRET" add \
      --title "$TITLE" \
      --start "$START" \
      --end "$END" \
      --description "$DESC" \
      --duration 1440 2>&1 || echo "  ❌ Falhou (pode criar manualmente)"
  fi
done

echo ""
echo "🎉 Eventos criados! Verifique no Google Calendar."
