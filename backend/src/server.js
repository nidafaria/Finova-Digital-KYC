const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Route Handlers
const authRoutes = require('./routes/auth.routes');
const kycRoutes = require('./routes/kycRoutes');
const beneficiaryRoutes = require('./routes/beneficiaryRoutes');
const walletRoutes = require('./routes/wallet.routes');
const transferRoutes = require('./routes/transfers.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Health Checks
app.get('/', (req, res) => {
  res.json({ message: 'Nexora Unified Backend Core running successfully!' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'Nexora Unified Core' });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/kyc', kycRoutes);
app.use('/api/beneficiaries', beneficiaryRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/transfers', transferRoutes);

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