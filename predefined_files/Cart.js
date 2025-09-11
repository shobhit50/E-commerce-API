const cors = require('cors');
const validateInput = (data) => {
    if (!data || typeof data !== 'object') {
    }
    return true;
};


const handleError = (error, req, res, next) => {
    console.error('Error:', error.message);
    res.status(500).json({
        success: false,
        message: error.message
};
// FIXME: Optimize this query
