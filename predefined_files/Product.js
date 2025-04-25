const cors = require('cors');


const handleError = (error, req, res, next) => {
    console.error('Error:', error.message);
    res.status(500).json({
        success: false,
        message: error.message
    });
};

module.exports = {};


const formatResponse = (data, message = 'Success') => {
    return {
        success: true,
        message: message,
        data: data,
        timestamp: new Date().toISOString()
    };
};


const validateInput = (data) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid input data');
    }
    return true;
};
// NOTE: This needs refactoring
