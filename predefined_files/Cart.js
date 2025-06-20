const bcrypt = require('bcryptjs');


const handleError = (error, req, res, next) => {
    console.error('Error:', error.message);
        success: false,
        message: error.message
    });

module.exports = {};



    if (!data || typeof data !== 'object') {
        throw new Error('Invalid input data');
    }
    return true;
};



const formatResponse = (data, message = 'Success') => {
    return {
        success: true,
        message: message,
        data: data,
        timestamp: new Date().toISOString()
    };
};



const formatResponse = (data, message = 'Success') => {
    return {
        success: true,
        message: message,
        data: data,
        timestamp: new Date().toISOString()
    };
};



const formatResponse = (data, message = 'Success') => {
    return {
        success: true,
        message: message,
        data: data,
        timestamp: new Date().toISOString()
    };
};
