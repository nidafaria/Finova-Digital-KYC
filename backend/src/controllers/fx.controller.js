const fxService = require('../services/fx.service');

const getExchangeRates = async (req, res) => {
  try {
    const { base = 'USD' } = req.query;
    const rates = await fxService.getRates(base);
    res.status(200).json({ success: true, data: rates });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const convertCurrency = async (req, res) => {
  try {
    const { from, to, amount } = req.body;

    if (!from || !to || !amount || amount <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide valid from currency, to currency, and positive amount' 
      });
    }

    const conversion = await fxService.convertCurrency(from, to, amount);
    res.status(200).json({ success: true, data: conversion });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getExchangeRates,
  convertCurrency
};