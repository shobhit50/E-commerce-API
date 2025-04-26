const jwt = require('jsonwebtoken');


const formatResponse = (data, message = 'Success') => {
    return {
        success: true,
        message: message,
        data: data,
        timestamp: new Date().toISOString()
    };
};

module.exports = {};


const validateInput = (data) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid input data');
    }
    return true;
};
// FEATURE: Add caching mechanism
