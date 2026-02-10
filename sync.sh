#!/bin/bash

# Script per fare pull e poi push del progetto
# Uso: ./sync.sh [branch_name]
# Se non specifichi il branch, usa quello corrente

set -e  # Esce se c'è un errore

# Colori per output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Determina il branch
BRANCH=${1:-$(git branch --show-current)}

echo -e "${YELLOW}🔄 Sincronizzazione del progetto...${NC}"
echo -e "${YELLOW}Branch: ${BRANCH}${NC}"
echo ""

# Configura git per questo progetto (se non già configurato)
if ! git config pull.rebase &>/dev/null; then
    echo -e "${YELLOW}⚙️  Configuro git per gestire i branch divergenti (merge)...${NC}"
    git config pull.rebase false
fi

# Step 1: Pull
echo -e "${YELLOW}📥 Eseguo git pull...${NC}"
if git pull --no-rebase origin "$BRANCH"; then
    echo -e "${GREEN}✅ Pull completato con successo!${NC}"
else
    echo -e "${RED}❌ Errore durante il pull!${NC}"
    echo -e "${YELLOW}💡 Potrebbero esserci conflitti da risolvere manualmente.${NC}"
    exit 1
fi

echo ""

# Step 2: Push
echo -e "${YELLOW}📤 Eseguo git push...${NC}"
if git push origin "$BRANCH"; then
    echo -e "${GREEN}✅ Push completato con successo!${NC}"
else
    echo -e "${RED}❌ Errore durante il push!${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 Sincronizzazione completata!${NC}"
