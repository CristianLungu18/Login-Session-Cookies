const Sequelize = require("sequelize");
require("dotenv").config();

const db = new Sequelize("testlogin", "root", "admin", {
  port: "3306",
  dialect: "mysql",
  host: "localhost",
  timezone: "+03:00",
});

module.exports = db;
