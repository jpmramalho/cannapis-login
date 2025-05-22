const db = require('../models');
const User = db.user;
const AccessLog = db.accessLog;

// Obter todos os usuários
exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'nome', 'email', 'status', 'data_criacao']
    });
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: err.message || "Erro ao buscar usuários." });
  }
};

// Obter um usuário pelo ID
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByPk(id, {
      attributes: ['id', 'nome', 'email', 'status', 'data_criacao', 'ultimo_acesso']
    });
    
    if (!user) {
      return res.status(404).send({ message: `Usuário com ID ${id} não encontrado.` });
    }
    
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message || `Erro ao buscar usuário com ID ${id}.` });
  }
};

// Atualizar um usuário
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    // Verificar se o usuário existe
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ message: `Usuário com ID ${id} não encontrado.` });
    }

    // Preparar dados para atualização
    const updateData = {
      nome: req.body.nome,
      email: req.body.email,
      status: req.body.status
    };

    // Se a senha foi fornecida, atualizar com hash
    if (req.body.senha) {
      updateData.senha = bcrypt.hashSync(req.body.senha, 8);
    }

    // Atualizar usuário
    await User.update(updateData, { where: { id: id } });
    
    // Buscar usuário atualizado
    const updatedUser = await User.findByPk(id, {
      attributes: ['id', 'nome', 'email', 'status']
    });
    
    res.status(200).send({
      ...updatedUser.dataValues,
      message: "Usuário atualizado com sucesso!"
    });
  } catch (err) {
    res.status(500).send({ message: err.message || `Erro ao atualizar usuário com ID ${id}.` });
  }
};

// Excluir um usuário
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    // Verificar se o usuário existe
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ message: `Usuário com ID ${id} não encontrado.` });
    }

    // Excluir usuário
    await User.destroy({ where: { id: id } });
    
    res.status(200).send({ message: "Usuário excluído com sucesso!" });
  } catch (err) {
    res.status(500).send({ message: err.message || `Erro ao excluir usuário com ID ${id}.` });
  }
};
