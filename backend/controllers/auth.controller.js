const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const config = require('../config/auth');
const User = db.user;
const AccessLog = db.accessLog;

// Registrar novo usuário
exports.register = async (req, res) => {
  try {
    // Validar requisição
    if (!req.body.nome || !req.body.email || !req.body.senha) {
      return res.status(400).send({ message: "Nome, email e senha são obrigatórios!" });
    }

    // Verificar se o email já existe
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).send({ message: "Email já está em uso!" });
    }

    // Criar novo usuário
    const user = await User.create({
      nome: req.body.nome,
      email: req.body.email,
      senha: bcrypt.hashSync(req.body.senha, 8),
      status: 'ativo'
    });

    // Responder com sucesso
    res.status(201).send({
      id: user.id,
      nome: user.nome,
      email: user.email,
      status: user.status,
      message: "Usuário registrado com sucesso!"
    });
  } catch (err) {
    res.status(500).send({ message: err.message || "Erro ao registrar usuário." });
  }
};

// Login de usuário
exports.login = async (req, res) => {
  try {
    // Validar requisição
    if (!req.body.email || !req.body.senha) {
      return res.status(400).send({ message: "Email e senha são obrigatórios!" });
    }

    // Buscar usuário pelo email
    const user = await User.findOne({ where: { email: req.body.email } });
    
    if (!user) {
      // Registrar tentativa de login mal sucedida
      await AccessLog.create({
        usuario_id: 0, // ID inválido para indicar usuário não encontrado
        ip: req.ip,
        sucesso: false
      });
      
      return res.status(404).send({ message: "Usuário não encontrado." });
    }

    // Verificar se o usuário está ativo
    if (user.status !== 'ativo') {
      await AccessLog.create({
        usuario_id: user.id,
        ip: req.ip,
        sucesso: false
      });
      
      return res.status(403).send({ message: "Conta desativada. Entre em contato com o administrador." });
    }

    // Verificar senha
    const passwordIsValid = bcrypt.compareSync(req.body.senha, user.senha);
    
    if (!passwordIsValid) {
      await AccessLog.create({
        usuario_id: user.id,
        ip: req.ip,
        sucesso: false
      });
      
      return res.status(401).send({ message: "Senha inválida!" });
    }

    // Atualizar último acesso
    await User.update(
      { ultimo_acesso: new Date() },
      { where: { id: user.id } }
    );

    // Registrar login bem-sucedido
    await AccessLog.create({
      usuario_id: user.id,
      ip: req.ip,
      sucesso: true
    });

    // Gerar token JWT
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration
    });

    // Responder com dados do usuário e token
    res.status(200).send({
      id: user.id,
      nome: user.nome,
      email: user.email,
      status: user.status,
      token: token
    });
  } catch (err) {
    res.status(500).send({ message: err.message || "Erro ao fazer login." });
  }
};
