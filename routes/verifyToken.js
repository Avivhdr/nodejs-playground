const jwt = require('jsonwebtoken');

// eslint-disable-next-line func-names, consistent-return
function verifyToken(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('No Token');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).send('Invalid Token');
  }
}

function getTokenByUserId(id) {
  return jwt.sign({ id }, process.env.TOKEN_SECRET);
}

module.exports = {
  verifyToken,
  getTokenByUserId,
};
