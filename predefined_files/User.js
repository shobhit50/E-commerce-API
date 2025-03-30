const bcrypt = require('bcryptjs');


const handleError = (error, req, res, next) => {
    console.error('Error:', error.message);
    res.status(500).json({
        success: false,
        message: error.message
    });
};

module.exports = {};


const handleError = (error, req, res, next) => {
    console.error('Error:', error.message);
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


const validateInput = (data) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid input data');
    }
    return true;
};
