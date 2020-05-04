const fs = require('fs')
const path = require('path')
const file = path.resolve(__dirname, '../../data.db') //数据库文件的路径
const exists = fs.existsSync(file)
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(file)
// INSERT INTO tb_file (id,name,type) VALUES ("001", 'Paul', "video");
db.run(
  "CREATE TABLE IF NOT EXISTS tb_file(id TEXT PRIMARY KEY NOT NULL,name TEXT NOT NULL,type TEXT NOT NULL,cTime TEXT DEFAULT (datetime('now','localtime')),mTime TEXT DEFAULT NULL,dTime TEXT DEFAULT NULL)"
  // function () {
  //   db.run("insert into test values('hello,world')", function () {
  //     db.all('select * from test', function (err, res) {
  //       if (!err) console.log(JSON.stringify(res))
  //       else console.log(err)
  //     })
  //   })
  // }
)

db.run('drop table tb_router')

db.run(
  "CREATE TABLE IF NOT EXISTS tb_router(id TEXT PRIMARY KEY NOT NULL,time TEXT DEFAULT (datetime('now','localtime')),path TEXT DEFAULT NULL,method TEXT DEFAULT NULL)"
)

module.exports = db
