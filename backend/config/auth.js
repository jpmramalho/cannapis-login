const jwt = require('jsonwebtoken');

module.exports = {
  secret: "cannapis-login-secret-key",
  jwtExpiration: 3600,           // 1 hora
  jwtRefreshExpiration: 86400,   // 24 horas
};
