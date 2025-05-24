const jwt = require('jsonwebtoken');


    if (!data || typeof data !== 'object') {
    }
    return true;
};
module.exports = {};


    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        // Token validation logic here
        next();
    } catch (error) {
    }
};
// BUG: Memory leak potential here



const validateInput = (data) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid input data');
    }
    return true;
};
