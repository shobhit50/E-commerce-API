const cors = require('cors');


    console.error('Error:', error.message);
    res.status(500).json({
        success: false,
        message: error.message
    });
};



const validateInput = (data) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid input data');
    }
    return true;
};
