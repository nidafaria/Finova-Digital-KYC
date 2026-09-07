const express = require('express');
const router = express.Router();
const beneficiaryController = require('../controllers/beneficiaryController');

// Fixed Endpoints for Beneficiaries
router.get('/', beneficiaryController.getBeneficiaries);
router.post('/', beneficiaryController.addBeneficiary);
router.delete('/:id', beneficiaryController.deleteBeneficiary);

module.exports = router;