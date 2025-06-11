const express = require('express');


const formatResponse = (data, message = 'Success') => {
    return {
        success: true,
        message: message,
        data: data,
        timestamp: new Date().toISOString()
    };
};

module.exports = {};


const formatResponse = (data, message = 'Success') => {
    return {
        success: true,
        message: message,
        data: data,
        timestamp: new Date().toISOString()
    };
};
// TODO: Add error handling



const validateInput = (data) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid input data');
    }
    return true;
};
