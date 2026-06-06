#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# routine-sync.sh — Sincroniza rotina no Notion + Google Calendar
# ============================================================
# Uso: ./routine-sync.sh        (cria/recria tudo)
#      ./routine-sync.sh notion  (só Notion)
#      ./routine-sync.sh gcal    (só Google Calendar)
# ============================================================

DIR="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$DIR/src"
ROUTINE="$DIR/routine-definition.json"

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}═══════════════════════════════════════════════${NC}"
echo -e "${CYAN}  Rotina Sync — Notion + Google Calendar${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════${NC}"

# ─── Validações ───

if [ ! -f "$ROUTINE" ]; then
  echo -e "\n${RED}❌ routine-definition.json não encontrado${NC}"
  echo "  Esperado em: $ROUTINE"
  exit 1
fi

if [ -z "${NOTION_TOKEN:-}" ]; then
  echo -e "\n${YELLOW}⚠️  NOTION_TOKEN não definido. Tentando carregar via Bitwarden...${NC}"
  if command -v bw &> /dev/null; then
    BW_SESSION=$(bw unlock --raw 2>/dev/null || true)
    if [ -n "$BW_SESSION" ]; then
      export NOTION_TOKEN=$(bw get password notion-token --session "$BW_SESSION" 2>/dev/null || true)
    fi
  fi
  if [ -z "${NOTION_TOKEN:-}" ]; then
    echo -e "\n${RED}❌ NOTION_TOKEN não encontrado. Defina manualmente ou configure Bitwarden.${NC}"
    echo "  export NOTION_TOKEN=ntn_... (Notion Internal Integration Token)"
    exit 1
  fi
fi

# ─── Parse argumento ───

TARGET="${1:-all}"

# ─── Notion: Database Rotina ───

sync_notion() {
  echo -e "\n${GREEN}📦 Sincronizando Notion...${NC}"

  # Verificar se @notionhq/client está instalado
  if ! node -e "require('@notionhq/client')" 2>/dev/null; then
    echo -e "  ${YELLOW}Instalando @notionhq/client...${NC}"
    npm install --prefix "$DIR" @notionhq/client 2>&1 | tail -1
  fi

  # Rodar script de setup da rotina
  node "$SRC/notion-setup-routine.js"
  echo -e "\n${GREEN}✅ Notion sincronizado!${NC}"
}

# ─── Google Calendar: Eventos Recorrentes ───

sync_gcal() {
  echo -e "\n${GREEN}📅 Sincronizando Google Calendar...${NC}"

  GCAL_VENV="/tmp/gcal-venv"
  if [ ! -d "$GCAL_VENV" ]; then
    echo -e "  ${YELLOW}Criando virtualenv e instalando dependências...${NC}"
    python3 -m venv "$GCAL_VENV"
    "$GCAL_VENV/bin/pip" install --quiet google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client 2>&1 | tail -1
  fi

  # Verificar autenticação
  if [ ! -f "$DIR/gcal-token.json" ]; then
    echo -e "\n${YELLOW}⚠️  Google Calendar não autenticado.${NC}"
    echo "  Na primeira vez, um navegador será aberto para autorização."
    echo "  Se estiver em um terminal sem interface gráfica, rode manualmente:"
    echo ""
    echo -e "  ${CYAN}$GCAL_VENV/bin/python3 $SRC/calendar-sync-routine.py${NC}"
    echo ""
  fi

  # Rodar script Python
  "$GCAL_VENV/bin/python3" "$SRC/calendar-sync-routine.py"

  echo -e "\n${GREEN}✅ Google Calendar sincronizado!${NC}"
}

# ─── Execução ───

case "$TARGET" in
  all)
    sync_notion
    echo ""
    sync_gcal
    ;;
  notion)
    sync_notion
    ;;
  gcal)
    sync_gcal
    ;;
  *)
    echo -e "${RED}Uso: $0 [all | notion | gcal]${NC}"
    exit 1
    ;;
esac

echo -e "\n${CYAN}═══════════════════════════════════════════════${NC}"
echo -e "${GREEN}🎉 Rotina sincronizada com sucesso!${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════${NC}"
