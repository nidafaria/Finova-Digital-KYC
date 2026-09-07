const fs = require('fs');
const path = require('path');

const kycFilePath = path.join(__dirname, '../../data/kyc.json');

// Helper to read KYC data
const readKycData = () => {
  if (!fs.existsSync(kycFilePath)) return [];
  const fileData = fs.readFileSync(kycFilePath, 'utf-8');
  return JSON.parse(fileData || '[]');
};

// Helper to write KYC data
const writeKycData = (data) => {
  fs.writeFileSync(kycFilePath, JSON.stringify(data, null, 2));
};

// Submit or Update KYC
exports.submitKyc = (req, res) => {
  try {
    const { userId, documentType, documentNumber } = req.body;
    
    if (!userId || !documentType || !documentNumber) {
      return res.status(400).json({ error: 'Missing required fields: userId, documentType, documentNumber' });
    }

    const documentPath = req.file ? `/uploads/${req.file.filename}` : '';

    const kycList = readKycData();
    
    // Check if KYC already exists for this user
    const existingIndex = kycList.findIndex(k => String(k.userId) === String(userId));

    const kycRecord = {
      id: existingIndex >= 0 ? kycList[existingIndex].id : Date.now(),
      userId: String(userId),
      documentType,
      documentNumber,
      documentPath,
      status: 'VERIFIED', // Simulated default as per requirements
      createdAt: existingIndex >= 0 ? kycList[existingIndex].createdAt : new Date().toISOString()
    };

    if (existingIndex >= 0) {
      kycList[existingIndex] = kycRecord;
    } else {
      kycList.push(kycRecord);
    }

    writeKycData(kycList);

    return res.status(201).json({
      message: 'KYC submitted and verified successfully',
      kyc: kycRecord
    });
  } catch (error) {
    console.error('Error submitting KYC:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get KYC by userId (Query param ?userId=X or header/mock)
exports.getKyc = (req, res) => {
  try {
    const userId = req.query.userId || req.headers['user-id'];

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required (provide ?userId=...)' });
    }

    const kycList = readKycData();
    const userKyc = kycList.find(k => String(k.userId) === String(userId));

    if (!userKyc) {
      return res.status(404).json({ message: 'No KYC record found for this user', status: 'PENDING' });
    }

    return res.status(200).json(userKyc);
  } catch (error) {
    console.error('Error fetching KYC:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};