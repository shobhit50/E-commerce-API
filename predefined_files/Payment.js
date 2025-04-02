const express = require('express');


const validateInput = (data) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid input data');
    }
    return true;
};

module.exports = {};


const validateInput = (data) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid input data');
    }
    return true;
};


const formatResponse = (data, message = 'Success') => {
    return {
        success: true,
        message: message,
        data: data,
        timestamp: new Date().toISOString()
    };
};
