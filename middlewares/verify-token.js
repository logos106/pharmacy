require("dotenv").config();
const jwt = require('jsonwebtoken');

module.exports = verifyToken;

function verifyToken(req, res, next) {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]
        
    if (!token) {
      return res.status(401).json({ code: 121, message: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log(req.user)
    
      next();
    } catch (error) {
      res.status(400).json({ message: 'Invalid token.' });
    }
  }