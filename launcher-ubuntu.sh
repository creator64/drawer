cd "$(dirname "$0")"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

export PATH="$HOME/.nvm/versions/node/v20.0.0/bin:$PATH" # Optional

$(which npm) run dev &
$(which npm) run electron:ubuntu
$(which npx) kill-port 5173
