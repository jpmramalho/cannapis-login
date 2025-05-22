const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth');

// Rotas de autenticação
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Rotas de usuários (protegidas por token)
router.get('/users', verifyToken, userController.findAll);
router.get('/users/:id', verifyToken, userController.findOne);
router.put('/users/:id', verifyToken, userController.update);
router.delete('/users/:id', verifyToken, userController.delete);

module.exports = router;
