const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;  
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization revoked' });
    }
  
    try {
      console.log("here1");
      const decoded = jwt.verify(token, 'shivasaineelam');
      console.log("here2");
      req.user = decoded;  
      next();
    } catch (error) {
      res.status(400).json({ message: 'Invalid token' });
    }
  };

  module.exports=authMiddleware;
  
  