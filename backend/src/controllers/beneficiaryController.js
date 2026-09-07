const fs = require('fs');
const path = require('path');

const beneficiaryFilePath = path.join(__dirname, '../../data/beneficiaries.json');

// Helper to read beneficiaries
const readBeneficiaryData = () => {
  if (!fs.existsSync(beneficiaryFilePath)) return [];
  const fileData = fs.readFileSync(beneficiaryFilePath, 'utf-8');
  return JSON.parse(fileData || '[]');
};

// Helper to write beneficiaries
const writeBeneficiaryData = (data) => {
  fs.writeFileSync(beneficiaryFilePath, JSON.stringify(data, null, 2));
};

// Add Beneficiary
exports.addBeneficiary = (req, res) => {
  try {
    const { userId, name, country, bankName, accountNumber, swiftCode, currency } = req.body;

    if (!userId || !name || !country || !bankName || !accountNumber || !swiftCode || !currency) {
      return res.status(400).json({ error: 'Missing required beneficiary fields' });
    }

    // Validate supported currencies
    const supportedCurrencies = ['INR', 'USD', 'EUR', 'GBP'];
    if (!supportedCurrencies.includes(currency)) {
      return res.status(400).json({ error: `Unsupported currency. Supported: ${supportedCurrencies.join(', ')}` });
    }

    const beneficiaries = readBeneficiaryData();

    const newBeneficiary = {
      id: Date.now(),
      userId: String(userId),
      name,
      country,
      bankName,
      accountNumber,
      swiftCode,
      currency,
      createdAt: new Date().toISOString()
    };

    beneficiaries.push(newBeneficiary);
    writeBeneficiaryData(beneficiaries);

    return res.status(201).json({
      message: 'Beneficiary added successfully',
      beneficiary: newBeneficiary
    });
  } catch (error) {
    console.error('Error adding beneficiary:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get Beneficiaries for a user (?userId=X or header)
exports.getBeneficiaries = (req, res) => {
  try {
    const userId = req.query.userId || req.headers['user-id'];

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required (provide ?userId=...)' });
    }

    const beneficiaries = readBeneficiaryData();
    // A user must only be able to access their own beneficiaries
    const userBeneficiaries = beneficiaries.filter(b => String(b.userId) === String(userId));

    return res.status(200).json(userBeneficiaries);
  } catch (error) {
    console.error('Error fetching beneficiaries:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete Beneficiary by ID
exports.deleteBeneficiary = (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.query.userId || req.headers['user-id'];

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required to delete a beneficiary' });
    }

    const beneficiaries = readBeneficiaryData();
    const index = beneficiaries.findIndex(b => String(b.id) === String(id) && String(b.userId) === String(userId));

    if (index === -1) {
      return res.status(404).json({ error: 'Beneficiary not found or unauthorized' });
    }

    const deleted = beneficiaries.splice(index, 1);
    writeBeneficiaryData(beneficiaries);

    return res.status(200).json({
      message: 'Beneficiary deleted successfully',
      beneficiary: deleted[0]
    });
  } catch (error) {
    console.error('Error deleting beneficiary:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};