const { Sequelize } = require('sequelize');
const dbConfig = require('../config/database');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model')(sequelize, Sequelize);
db.accessLog = require('./accessLog.model')(sequelize, Sequelize);

// Definindo relacionamentos
db.user.hasMany(db.accessLog, { foreignKey: 'usuario_id' });
db.accessLog.belongsTo(db.user, { foreignKey: 'usuario_id' });

module.exports = db;
