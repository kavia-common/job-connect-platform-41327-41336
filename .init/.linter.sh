#!/bin/bash
cd /home/kavia/workspace/code-generation/job-connect-platform-41327-41336/career_platform_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

