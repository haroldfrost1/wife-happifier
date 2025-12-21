#!/bin/sh

# Create/Overwrite the env-config.js file
cat <<EOF > /usr/share/nginx/html/env-config.js
window._env_ = {
  API_URL: "${API_URL:-http://localhost:3000}",
};
EOF

# Execute the passed command (e.g., nginx)
exec "$@"
