const jwt = require('jsonwebtoken');

function getUser(req, res, next) {
  console.log(req.method);
  console.log(req.headers);
  const { token } = req.cookies;
  if (!token) return next();

  const user = jwt.verify(token, process.env.SECRET);

  if (!user) return next();

  req.user = user;
  return next();
}

module.exports = getUser;
