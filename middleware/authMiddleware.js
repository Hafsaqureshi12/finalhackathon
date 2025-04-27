const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', ''); // Extract token from header

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(req.user);
        req.user = decoded;  // This will add the user information to req.user
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};


module.exports = verifyToken;
