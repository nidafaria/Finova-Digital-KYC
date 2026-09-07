const express = require('express');
const router = express.Router();
const transfersController = require('../controllers/transfers.controller');

// POST /api/transfers - Execute wallet/cross-border transfer
router.post('/', transfersController.createTransfer);

// GET /api/transfers/history - Retrieve user transaction history
router.get('/history', transfersController.getHistory);

module.exports = router;