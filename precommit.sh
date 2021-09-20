#!/bin/bash

fancy_log() {
cat << EndOfMessage

  ---------------------------------
    $1
  ---------------------------------

EndOfMessage
}

fancy_log "✨ Creating notes" 
NODE_ENV=development ts-node bin/generateNotes.ts
git add NOTES.md

fancy_log "🎯 Running tests"
jest


