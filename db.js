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

function hasUrl(url) {
  querry = `SELECT *
            FROM videos
            WHERE url = ?`;
  
  let result = dbConnection.get(querry, url, (err, row) => {
    if (err) {
      return console.error(err.message)
    }
    return row
  })

  return result != null
}

exports.addUrl = function addUrl(guid, url) {

  if (hasUrl(url)) {
    console.log(`This url already exists`)
    return
  }

  console.log(`Attempt to add video: ${url}, ${guid}`)

  const insertQuerry = dbConnection.prepare("INSERT INTO videos(guid, url) VALUES (?, ?)")
  insertQuerry.run([guid, url])
  insertQuerry.finalize()
}

exports.getUrl = function getUrl(guid) {
  console.log(`Attempt to get video: ${guid}`)
  querry = `SELECT *
            FROM videos
            WHERE guid = ?`

  let result = dbConnection.get(querry, guid, (err, row) => {
    if (err) {
      return console.error(err.message)
    }
    return row
  })

  return result
}

this.createDbConnection()