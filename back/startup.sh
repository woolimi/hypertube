#!/bin/sh

# ts-node /usr/src/app/node_modules/typeorm/cli.js migration:run --dir /usr/src/app/dataSource.ts

pnpm run db:migrate
# node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d ./dataSource.js

node /usr/src/app/dist/src/main.js

