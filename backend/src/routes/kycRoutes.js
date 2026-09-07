const express = require('express');
const router = express.Router();
const kycController = require('../controllers/kycController');
const upload = require('../middleware/upload');

// Fixed Endpoints for KYC
router.post('/', upload.single('document'), kycController.submitKyc);
router.get('/', kycController.getKyc);

module.exports = router;