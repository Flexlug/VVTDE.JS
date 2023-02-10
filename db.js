const fs = require('fs')
const sqlite3 = require("sqlite3").verbose()
const filepath = "./db/urls.db"

function createDbConnection() {
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath);
  } else {
      const db = new sqlite3.Database(filepath, (error) => {
        if (error) {
          return console.error(error.message);
        }
        createTable(db)
      });
    }
    console.log("Connection with SQLite has been established");
    return db;
}

function createTable(db) {
    console.log("SQLite DB created");
    db.exec(`
    CREATE TABLE urls
    (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      guid   VARCHAR(40) NOT NULL,
      url   VARCHAR(50) NOT NULL
    );
  `);
}

module.exports = createDbConnection()