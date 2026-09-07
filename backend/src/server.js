const express = require('express');
const cors = require('cors');
require('dotenv').config();

const kycRoutes = require('./routes/kycRoutes');
const beneficiaryRoutes = require('./routes/beneficiaryRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically (for KYC documents)
app.use('/uploads', express.static('uploads'));

// API Routes (Fixed Endpoints)
app.use('/api/kyc', kycRoutes);
app.use('/api/beneficiaries', beneficiaryRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Nexora Backend API (Teammate 2 - KYC & Beneficiaries) is running successfully!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});