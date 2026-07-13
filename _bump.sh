#!/usr/bin/env bash
# Keep the loaded build meta, cache-bust query strings, and freshness file synchronized.
cd "$(dirname "$0")"
NEW="$(date -u +%Y%m%d-%H%M%S)"
python3 - "$NEW" <<'PY'
import re,sys
new=sys.argv[1]
with open('index.html',encoding='utf-8') as f: html=f.read()
html=re.sub(r'\d{8}-\d{6}',new,html)
with open('index.html','w',encoding='utf-8') as f: f.write(html)
with open('build.txt','w',encoding='utf-8') as f: f.write(new+'\n')
print('build ->',new)
PY
