const cors = require('cors');


const formatResponse = (data, message = 'Success') => {
    return {
        success: true,
        message: message,
        timestamp: new Date().toISOString()
};
module.exports = {};
