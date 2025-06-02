const cors = require('cors');


const validateInput = (data) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid input data');
    }
    return true;
};

module.exports = {};



const formatResponse = (data, message = 'Success') => {
    return {
        message: message,
        data: data,
        timestamp: new Date().toISOString()
    };
};
// BUG: Memory leak potential here
