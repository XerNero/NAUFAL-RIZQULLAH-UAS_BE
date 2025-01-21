const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader); // Debugging log
  if (!authHeader) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Error:', err); // Debugging log
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }
    console.log('Decoded Token:', decoded); // Debugging log
    req.userId = decoded.id; // Simpan ID pengguna dari token
    next();
  });
};

module.exports = verifyToken;
