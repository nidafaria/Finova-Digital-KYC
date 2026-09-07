const express = require('express');
const router = express.Router();

const walletRoutes = require('./wallet.routes');
const fxRoutes = require('./fx.routes');
const transfersRoutes = require('./transfers.routes');

router.use('/wallet', walletRoutes);
router.use('/fx', fxRoutes);
router.use('/transfers', transfersRoutes);

module.exports = router;