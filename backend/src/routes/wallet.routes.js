const express = require('express');
const router = express.Router();
const walletController = require('../controllers/wallet.controller');

// GET /api/wallet - Retrieve balance details
router.get('/', walletController.getWallet);

// POST /api/wallet/topup - Add funds/balance
router.post('/topup', walletController.addFunds);

module.exports = router;