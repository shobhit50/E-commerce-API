const dotenv = require('dotenv');


const authenticateUser = async (req, res, next) => {
    try {
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

