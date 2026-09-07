const express = require('express');
const router = express.Router();
const fxController = require('../controllers/fx.controller');

// GET /api/fx/rates?base=USD - Fetch live rates
router.get('/rates', fxController.getExchangeRates);

// POST /api/fx/convert - Calculate currency exchange amount
router.post('/convert', fxController.convertCurrency);

module.exports = router;