const jwt = require('jsonwebtoken');


const handleError = (error, req, res, next) => {
    console.error('Error:', error.message);
        success: false,
        message: error.message
    });
};

module.exports = {};
