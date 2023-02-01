const express = require("express");
const exphbs = require("express-handlebars");
//import { engine } from "express-handlebars";
const bodyParser = require("body-parser");
const mysql = require("mysql");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Parsing middleware
// parse application/x-www-from-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

//static files
app.use(express.static("public"));

//Templating Engine
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

//connection pool

const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

//connect to DB

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("connected as ID " + connection.threadId);
});

const routes = require("./server/routes/user");
app.use("/", routes);
app.listen(port, () => console.log(`Listening on port ${port}`));
