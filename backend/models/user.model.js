module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("usuario", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true
    },
    senha: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    data_criacao: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    ultimo_acesso: {
      type: Sequelize.DATE,
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM('ativo', 'inativo'),
      defaultValue: 'ativo'
    }
  }, {
    timestamps: false,
    tableName: 'usuarios'
  });

  return User;
};
