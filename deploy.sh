#!/bin/bash

# Script de déploiement pour Railway
echo "🚀 Déploiement sur Railway..."

# Vérifier que nous sommes sur la branche develop
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "develop" ]; then
    echo "❌ Erreur: Vous devez être sur la branche 'develop' pour déployer"
    exit 1
fi

# Vérifier que le code est propre
if ! git diff --quiet; then
    echo "❌ Erreur: Vous avez des changements non commités"
    exit 1
fi

# Push vers Railway
echo "📤 Push vers Railway..."
git push origin develop

echo "✅ Déploiement lancé sur Railway!"
echo "🔗 Vérifiez le statut sur: https://railway.app"
