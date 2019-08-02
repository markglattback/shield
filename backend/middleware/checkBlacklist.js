let _cache;

module.exports = function checkBlacklist(cache) {
  return function _checkBlacklist(req, res, next) {
    if (_cache) {
      cache = _cache;
    }

    const { user } = req;
    if (!user) return next();

    const { token } = req.cookies;
    if (!token) return next();
    
    const blacklist = cache.get('blacklist');
    
    if (blacklist.includes(user.id)) {
      req.user = null;
      res.clearCookie('token');
    }

    return next();
  };
};
