#!/bin/bash
cd /home/kavia/workspace/code-generation/crushvibe-38973-e56cefca/crushvibe_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

