const jwt = require('jsonwebtoken'); // JSON Web Token for authentication

const isAuth = (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    try {
        const verified = jwt.verify(token, 'your-secret-key');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

module.exports = isAuth;