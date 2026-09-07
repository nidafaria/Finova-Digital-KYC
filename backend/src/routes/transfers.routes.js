const express = require('express');
const router = express.Router();
const transfersController = require('../controllers/transfers.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Apply auth middleware to protect all transfer operations
router.use(authMiddleware);

// POST /api/transfers - Initiate transfer
router.post('/', transfersController.createTransfer);

// GET /api/transfers/history - Retrieve transaction ledger
router.get('/history', transfersController.getHistory);

module.exports = router;
