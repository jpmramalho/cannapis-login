require('dotenv').config();

module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "cannapis_login",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
