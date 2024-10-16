const JWT = require("jsonwebtoken");
const secret = "abc$123";

function createTokenForUser(user) {
  const payload = {
    _id: user.id,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
  };

  const token = JWT.sign(payload, secret);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
