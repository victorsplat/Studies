#!/usr/bin/env bash
set -e

GCALCLI="/tmp/gcal-venv/bin/gcalcli"
CALENDAR_DIR="$(dirname "$0")/.."

if [ ! -f "$CALENDAR_DIR/client-secret-gcal.json" ]; then
  echo "client-secret-gcal.json não encontrado."
  echo "Criando a partir da variável GOOGLE_CALENDAR_CREDENTIALS..."
  if [ -n "$GOOGLE_CALENDAR_CREDENTIALS" ]; then
    echo "$GOOGLE_CALENDAR_CREDENTIALS" > "$CALENDAR_DIR/client-secret-gcal.json"
    echo "Arquivo criado em $CALENDAR_DIR/client-secret-gcal.json"
  else
    echo "ERRO: Defina GOOGLE_CALENDAR_CREDENTIALS com o JSON do client secret"
    echo "Ou coloque manualmente o arquivo em: $CALENDAR_DIR/client-secret-gcal.json"
    exit 1
  fi
fi

echo "=== VERIFICANDO AUTENTICAÇÃO ==="
if ! $GCALCLI --client-secret "$CALENDAR_DIR/client-secret-gcal.json" list 2>&1 > /dev/null; then
  echo ""
  echo "⚠️  Precisa autenticar uma vez."
  echo "Rodando: gcalcli --client-secret client-secret-gcal.json list"
  echo "Siga o link no navegador, autorize, e cole o código."
  echo ""
  $GCALCLI --client-secret "$CALENDAR_DIR/client-secret-gcal.json" list
fi

echo ""
echo "=== EVENTOS PRÓXIMOS 3 MESES ==="
$GCALCLI --client-secret "$CALENDAR_DIR/client-secret-gcal.json" \
  --calendar "$(gcalcli --client-secret "$CALENDAR_DIR/client-secret-gcal.json" list 2>&1 | head -1)" \
  agenda "now" "3 months" 2>&1 || \
$GCALCLI --client-secret "$CALENDAR_DIR/client-secret-gcal.json" agenda "now" "3 months" 2>&1

echo ""
echo "=== EVENTOS ÚLTIMOS 6 MESES ==="
$GCALCLI --client-secret "$CALENDAR_DIR/client-secret-gcal.json" agenda "6 months ago" "now" 2>&1

echo ""
echo "=== DICA ==="
echo "Para mais detalhes: gcalcli --client-secret client-secret-gcal.json --details agenda ..."
echo "Para usar o Google Calendar API diretamente: use a query com --cal <email>"
