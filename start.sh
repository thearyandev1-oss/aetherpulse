#!/bin/bash
export PATH="/usr/bin:/bin:$PATH"
pkill -9 -f node || true
npm run dev
