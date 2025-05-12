const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ errors: [{ msg: 'No token, authorization denied' }] });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ errors: [{ msg: 'Token is not valid' }] });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ errors: [{ msg: 'User not authorized for this action' }] });
    }
    next();
  };
};