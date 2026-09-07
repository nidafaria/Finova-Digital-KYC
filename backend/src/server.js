const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Person 2 Routes (KYC & Beneficiaries)
const kycRoutes = require('./routes/kycRoutes');
const beneficiaryRoutes = require('./routes/beneficiaryRoutes');
const authRoutes = require('./routes/auth.routes');

// Person 3 Routes (Wallet, FX & Transfers)
const walletTransferRoutes = require('./routes/index.wallet-transfer');

const app = express();
const PORT = process.env.PORT || 5000;

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded KYC verification documents statically
app.use('/uploads', express.static('uploads'));

// Health Check Endpoints
app.get('/', (req, res) => {
  res.json({ message: 'Nexora Unified Backend Core (KYC, Beneficiaries, Wallet & Transfers) running successfully!' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'Nexora Unified Core' });
});

// Mount Person 2 Routes
app.use('/api/auth', authRoutes);
app.use('/api/kyc', kycRoutes);
app.use('/api/beneficiaries', beneficiaryRoutes);

// Mount Person 3 Routes (/api/wallet, /api/fx, /api/transfers)
app.use('/api', walletTransferRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Nexora Unified Backend running on port ${PORT}`);
});

module.exports = app;