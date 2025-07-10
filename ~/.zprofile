# Load zshrc in non-login shells
if [[ -f ~/.zshrc ]]; then
  source ~/.zshrc
fi

# Make sure Node.js environment is accessible
# Uncomment and adjust the paths below based on your Node.js installation method

# For nvm users:
# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# For fnm users:
# eval "$(fnm env --use-on-cd)"

# For Homebrew node installations:
# export PATH="/usr/local/opt/node@16/bin:$PATH" 