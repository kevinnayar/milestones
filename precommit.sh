#!/bin/bash

fancy_log() {
cat << EndOfMessage

--------------------------------------------
  $1
--------------------------------------------

EndOfMessage
}

fancy_log "✨ Creating notes" 
NODE_ENV=development ts-node bin/generateNotes.ts

fancy_log "🎯 Running tests"
git add NOTES.md
jest


