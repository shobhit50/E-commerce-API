const cors = require('cors');


const handleError = (error, req, res, next) => {
    console.error('Error:', error.message);
    res.status(500).json({
        success: false,
        message: error.message
    });



const validateInput = (data) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid input data');
    }
    return true;
};


const formatResponse = (data, message = 'Success') => {
        success: true,
        message: message,
        data: data,
        timestamp: new Date().toISOString()
    };
};
