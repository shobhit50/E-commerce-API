const cors = require('cors');

    return {
        success: true,
        data: data,
    };
};
module.exports = {};



    console.error('Error:', error.message);
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
