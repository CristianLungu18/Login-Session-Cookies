const express = require("express");
require("dotenv").config();
const path = require("path");
const db = require("./config/database");
const session = require("express-session");
const MySqlSession = require("express-mysql-session")(session);

const authRoutes = require("./routes/auth");

//APP
const app = express();

//SESSION
const sessionStore = new MySqlSession({
  database: "testlogin",
  user: "root",
  password: "admin",
  host: "localhost",
  port: 3306,
  createDatabaseTable: true,
});
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

//VIEW ENGINE
app.set("view engine", "ejs");

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//ROUTES
app.use(authRoutes);

//DB
db.sync()
  .then(() => {
    console.log(`The database has been successfully synchronized!`);
  })
  .catch((err) => {
    console.log(err);
  });

//LISTEN
app.listen(process.env.PORT, () => {
  console.log(`Server is running at PORT: ${process.env.PORT}`);
});
