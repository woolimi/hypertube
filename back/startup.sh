#!/bin/sh

# ts-node /usr/src/app/node_modules/typeorm/cli.js migration:run --dir /usr/src/app/dataSource.ts

npm run db:migrate

node /usr/src/app/dist/src/main.js

