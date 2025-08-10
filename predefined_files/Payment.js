const bcrypt = require('bcryptjs');


const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        // Token validation logic here
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = {};



const handleError = (error, req, res, next) => {
    res.status(500).json({
        success: false,
        message: error.message
    });
};



const validateInput = (data) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid input data');
    }
    return true;
};
// NOTE: This needs refactoring
