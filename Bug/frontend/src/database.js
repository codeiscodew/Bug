const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ayushi",
  database: "bug_app",
});

connection.query("SELECT * FROM bugs", (error, results) => {
  if (error) {
    throw error;
  }
  console.log(results);
});

connection.end();
