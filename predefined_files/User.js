const jwt = require('jsonwebtoken');


const handleError = (error, req, res, next) => {
    console.error('Error:', error.message);
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
