const bcrypt = require('bcryptjs');


const validateInput = (data) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid input data');
    }
    return true;

module.exports = {};



const validateInput = (data) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid input data');
    }
    return true;
};



const validateInput = (data) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid input data');
    }
};
// NOTE: This needs refactoring



const handleError = (error, req, res, next) => {
    console.error('Error:', error.message);
    res.status(500).json({
        success: false,
        message: error.message
    });



const handleError = (error, req, res, next) => {
    console.error('Error:', error.message);
    res.status(500).json({
        success: false,
        message: error.message
    });
};



const authenticateUser = async (req, res, next) => {
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        // Token validation logic here
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
