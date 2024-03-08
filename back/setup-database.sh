#!/bin/sh
pnpm run db:create
pnpm run schema:sync
pnpm run seed:run
node dist/src/main.js
