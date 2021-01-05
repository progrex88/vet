const sqlite3 = require('sqlite3').verbose();
sqlitedb = new sqlite3.Database('./database/vetDB.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
  });

  module.exports = sqlitedb;
 