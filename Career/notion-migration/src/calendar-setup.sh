#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "$0")/.." && pwd)"
CLIENT_SECRET="$DIR/client-secret-gcal.json"
TOKEN_FILE="$DIR/gcal-token.json"
GCALCLI="/tmp/gcal-venv/bin/gcalcli"

if [ ! -f "$CLIENT_SECRET" ]; then
  echo "❌ client-secret-gcal.json não encontrado em $CLIENT_SECRET"
  exit 1
fi

echo "=== Google Calendar — Diagnóstico de Eventos ==="

if [ ! -f "$TOKEN_FILE" ]; then
  echo ""
  echo "⚠️  Primeiro acesso — precisa autenticar uma vez."
  echo ""
  echo "Rode o comando abaixo em outro terminal e siga o link:"
  echo ""
  echo "  $GCALCLI --client-secret \"$CLIENT_SECRET\" list"
  echo ""
  echo "Isso vai abrir um navegador. Autorize e cole o código de volta."
  echo "Depois que autenticar, rode este script novamente."
  echo ""
  exit 0
fi

echo "✅ Autenticado!"
echo ""
echo "=== Eventos PRÓXIMOS 3 meses ==="
$GCALCLI --client-secret "$CLIENT_SECRET" agenda "now" "3 months"

echo ""
echo "=== Eventos PASSADOS 6 meses ==="
$GCALCLI --client-secret "$CLIENT_SECRET" agenda "6 months ago" "now"

echo ""
echo "=== Para criar eventos do roadmap ==="
echo "Rode: ./src/calendar-create-events.sh"
