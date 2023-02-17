const fs = require('fs')
const sqlite3 = require("sqlite3").verbose()
const filepath = "./db/videos.db"

dbConnection = null

exports.createDbConnection = function createDbConnection() {
  if (fs.existsSync(filepath)) {
    dbConnection = new sqlite3.Database(filepath);
  } else {
    dbConnection = new sqlite3.Database(filepath, (error) => {
        if (error) {
          return console.error(error.message);
        }
        createTable(dbConnection)
      });
    }
    console.log("Connection with SQLite has been established");
}

function createTable(db) {
    console.log("SQLite DB created");
    db.exec(`
    CREATE TABLE videos
    (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      guid   VARCHAR(40) NOT NULL,
      url   VARCHAR(50) NOT NULL
    );
  `);
}

exports.hasUrl = function hasUrl(url) {
  return new Promise((resolve, reject) => {
    dbConnection.get(`SELECT * FROM videos WHERE url = ?`, guid, (err, row) => {
      if (err) {
        reject(err)
      }
      resolve(row == null)
    })
  })
}

exports.addUrl = function addUrl(guid, url) {
  asUrl(url)
    .then((x) => {
      
    })

  console.log(`Attempt to add video: ${url}, ${guid}`)

  const insertQuerry = dbConnection.prepare("INSERT INTO videos(guid, url) VALUES (?, ?)")
  insertQuerry.run([guid, url])
  insertQuerry.finalize()
}

exports.getUrl = function getUrl(guid) {
  return new Promise((resolve, reject) => {
    dbConnection.get(`SELECT * FROM videos WHERE guid = ?`, guid, (err, row) => {
      if (err) {
        reject(err)
      }
      resolve(row)
    })
  })
}

this.createDbConnection()