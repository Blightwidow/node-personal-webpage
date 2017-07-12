#!/bin/bash
set -e

readonly SYSTEM=$(uname -s)
EXTRA_STEPS=()

linux() {
  [[ $SYSTEM == 'Linux' ]]
}

mac() {
  [[ $SYSTEM == 'Darwin' ]]
}

installed() {
  hash "$1" 2>/dev/null
}

install_node() {
  if ! installed npm; then
    if linux; then
    	sudo apt-get install -y npm
    elif mac && installed brew; then
      brew install npm
    fi
  fi
	npm install
}

report() {
  if [[ ${#EXTRA_STEPS[@]} -gt 0 ]]; then
    node ./tools/messages.js install-steps
    for i in "${!EXTRA_STEPS[@]}"; do
      echo "  $((i+1)). ${EXTRA_STEPS[$i]}"
    done
  fi
}

main() {
  install_node
  report
}

main
