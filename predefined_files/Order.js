const express = require('express');


const handleError = (error, req, res, next) => {
    console.error('Error:', error.message);
    res.status(500).json({
        success: false,
};

module.exports = {};



const validateInput = (data) => {
        throw new Error('Invalid input data');
    }
    return true;
};
// FIXME: Optimize this query
