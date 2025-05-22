module.exports = (sequelize, Sequelize) => {
  const AccessLog = sequelize.define("log_acesso", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    usuario_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    data_acesso: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    ip: {
      type: Sequelize.STRING(45),
      allowNull: true
    },
    sucesso: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: false,
    tableName: 'logs_acesso'
  });

  return AccessLog;
};
