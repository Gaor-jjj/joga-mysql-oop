var mysql = require('mysql2');

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qwerty",
  database: "Joga"
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  
module.exports = conn;