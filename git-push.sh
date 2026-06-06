#!/bin/bash
# Скрипт для коміту та пушу змін Words Game
cd "$(dirname "$0")"

echo "📁 Поточна папка: $(pwd)"
echo "🔍 Статус змін:"
git status

echo ""
read -p "✏️  Введи повідомлення коміту (або Enter для 'Update game files'): " msg
msg=${msg:-"Update game files"}

git add -A
git commit -m "$msg"
git push origin main

echo ""
echo "✅ Готово! Зміни відправлено на GitHub."
