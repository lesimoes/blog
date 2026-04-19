#!/bin/bash

# Script para limpar o cache do Next.js e outros arquivos temporários

echo "🧹 Limpando cache do Next.js..."

# Remove a pasta .next (cache de build)
if [ -d ".next" ]; then
  rm -rf .next
  echo "✅ Pasta .next removida"
else
  echo "ℹ️  Pasta .next não encontrada"
fi

# Remove node_modules/.cache se existir
if [ -d "node_modules/.cache" ]; then
  rm -rf node_modules/.cache
  echo "✅ Cache do node_modules removido"
fi

# Remove .contentlayer se existir (cache do contentlayer)
if [ -d ".contentlayer" ]; then
  rm -rf .contentlayer
  echo "✅ Cache do contentlayer removido"
fi

echo ""
echo "✨ Limpeza concluída! Agora você pode rodar 'npm run dev' novamente."

