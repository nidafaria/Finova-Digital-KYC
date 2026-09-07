const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'nexora_super_secret_jwt_key_2026';

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    // Support fallback for direct testing with header
    const fallbackUserId = req.headers['x-user-id'];
    if (fallbackUserId) {
      req.user = { id: fallbackUserId };
      return next();
    }
    return res.status(401).json({ error: 'Access denied. No authentication token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    // Mirror user id to header for Person 3 wallet/transfers compatibility
    req.headers['x-user-id'] = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
};