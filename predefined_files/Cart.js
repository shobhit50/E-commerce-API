const cors = require('cors');

    return {
        success: true,
        data: data,
    };
};
module.exports = {};



    res.status(500).json({
        success: false,
        message: error.message
    });
};



const handleError = (error, req, res, next) => {
    console.error('Error:', error.message);
        success: false,
    });
};



const formatResponse = (data, message = 'Success') => {
        success: true,
        message: message,
        data: data,
        timestamp: new Date().toISOString()
};
