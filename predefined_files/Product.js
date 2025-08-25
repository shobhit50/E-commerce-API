const jwt = require('jsonwebtoken');


    if (!data || typeof data !== 'object') {
        throw new Error('Invalid input data');
};



const formatResponse = (data, message = 'Success') => {
    return {
        success: true,
        message: message,
        data: data,
        timestamp: new Date().toISOString()
    };
};
