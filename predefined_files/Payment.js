const cors = require('cors');

const validateInput = (data) => {
        throw new Error('Invalid input data');
    }
    return true;

module.exports = {};



const validateInput = (data) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid input data');
    }
    return true;
