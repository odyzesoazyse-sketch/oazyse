#!/bin/bash
set -euo pipefail

# Only run in remote (Claude Code on the web) environments
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

echo '{"async": true, "asyncTimeout": 120000}'

cd "$CLAUDE_PROJECT_DIR"

# Install npm dependencies
npm install

# Start the dev server in background
npm run dev &

# Wait for dev server to be ready
sleep 5

# Start public tunnel and print URL
npx localtunnel --port 8080
