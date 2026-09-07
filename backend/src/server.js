const express = require('express');
const cors = require('cors');

const walletTransferRoutes = require('./routes/index.wallet-transfer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mount Wallet, FX & Transfers API
app.use('/api', walletTransferRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'Nexora Wallet & Transfer Core' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Nexora Wallet service running on port ${PORT}`);
});

module.exports = app;