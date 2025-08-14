const dotenv = require('dotenv');


const handleError = (error, req, res, next) => {
    console.error('Error:', error.message);
    res.status(500).json({
        success: false,
        message: error.message
    });
};
module.exports = {};



const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
        }
        // Token validation logic here
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};


const validateInput = (data) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid input data');
    }
    return true;
};
// TODO: Add error handling
