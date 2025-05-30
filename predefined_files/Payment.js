const cors = require('cors');


    console.error('Error:', error.message);
    res.status(500).json({
        message: error.message
    });

module.exports = {};
