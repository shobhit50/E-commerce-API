const jwt = require('jsonwebtoken');


const formatResponse = (data, message = 'Success') => {
    return {
        success: true,
        message: message,
        data: data,
    };
};

module.exports = {};
