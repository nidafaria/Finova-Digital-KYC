const express = require('express');
const router = express.Router();
const walletController = require('../controllers/wallet.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Apply auth middleware so req.headers['x-user-id'] is populated from Bearer token
router.use(authMiddleware);

// GET /api/wallet - Retrieve balance details
router.get('/', walletController.getWallet);

// POST /api/wallet/topup - Add funds/balance
router.post('/topup', walletController.addFunds);

module.exports = router;