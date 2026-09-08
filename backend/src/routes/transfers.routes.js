const express = require('express');
const router = express.Router();
const transfersController = require('../controllers/transfers.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);

<<<<<<< Updated upstream
// POST /api/transfers - Initiate transfer
router.post('/', transfersController.createTransfer);

// GET /api/transfers/history - Retrieve transaction ledger
=======
router.post('/', transfersController.createTransfer);
>>>>>>> Stashed changes
router.get('/history', transfersController.getHistory);

module.exports = router;
