#!/usr/bin/env bash

COMMAND_LIST=("task start-docker" "task start-dev" "task start-ngrok" "task start-frontend")

# Get the current directory
CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

for command in "${COMMAND_LIST[@]}"; do
    osascript << EOF
        tell application "Terminal"
            activate
            tell application "System Events" to keystroke "t" using command down
            delay 1
            do script "cd '${CURRENT_DIR}' && ${command}" in front tab of window 1
        end tell
EOF
done
