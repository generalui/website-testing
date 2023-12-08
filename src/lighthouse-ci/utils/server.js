const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const { createServer } = require('@lhci/server');

console.log('Starting server...');
createServer({
  port: process.env.LHCI_SERVER_PORT || 9001,
  storage: {
    storageMethod: 'sql',
    sqlDialect: 'sqlite',
    sqlDatabasePath: './tests/lighthouse-ci/db.sql',
  },
}).then(({ port }) => console.log('LHCI listening on port', port));
