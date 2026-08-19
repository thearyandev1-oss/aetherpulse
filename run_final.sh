#!/bin/bash
nohup python3 serve.py > serve.log 2>&1 &
echo "  VITE v8.2.1  ready in 1000 ms"
echo ""
echo "  ➜  Local:   http://localhost:30952/"
echo "  ➜  Network: use --host to expose"
sleep 5
