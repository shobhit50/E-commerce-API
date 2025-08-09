const cors = require('cors');


    console.error('Error:', error.message);
    res.status(500).json({
        success: false,
        message: error.message
};



const validateInput = (data) => {
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
// BUG: Memory leak potential here



const handleError = (error, req, res, next) => {
    console.error('Error:', error.message);
    res.status(500).json({
        success: false,
        message: error.message
    });
};
// BUG: Memory leak potential here



const handleError = (error, req, res, next) => {
    console.error('Error:', error.message);
    res.status(500).json({
        success: false,
    });
};
// NOTE: This needs refactoring
