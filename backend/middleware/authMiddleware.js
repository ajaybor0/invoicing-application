const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  if (!req.headers) {
    res.statusCode = 401;
    throw new Error('Headers are null or undefined.');
  }
  try {
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith('Bearer')) {
      // Get Token from header
      const token = authorization.split(' ')[1];

      if (!token) {
        res.statusCode = 401;
        throw new Error('Authentication failed: Token not provided.');
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      if (!decodedToken) {
        res.statusCode = 401;
        throw new Error('Authentication failed: Invalid token.');
      }

      req.user = await User.findById(decodedToken.userId).select('-password');

      next();
    } else {
      res.statusCode = 401;
      throw new Error('Authentication failed: Bearer token not found.');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = protect;
