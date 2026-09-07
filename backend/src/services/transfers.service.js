const walletService = require('./wallet.service');
const fxService = require('./fx.service');

// In-memory store for transfer history
const transfers = [];

/**
 * Initiate a transfer between accounts or currencies
 */
const initiateTransfer = async ({ senderId, recipientId, sourceCurrency, targetCurrency, amount }) => {
  const numericAmount = Number(amount);
  
  if (numericAmount <= 0) {
    throw new Error('Transfer amount must be greater than zero');
  }

  // 1. Calculate FX if currencies differ
  let destinationAmount = numericAmount;
  let fxRate = 1.0;

  if (sourceCurrency !== targetCurrency) {
    const conversion = await fxService.convertCurrency(sourceCurrency, targetCurrency, numericAmount);
    destinationAmount = conversion.convertedAmount;
    fxRate = conversion.rate;
  }

  // 2. Deduct from sender
  await walletService.updateBalance(senderId, sourceCurrency, -numericAmount);

  // 3. Credit recipient
  await walletService.updateBalance(recipientId, targetCurrency, destinationAmount);

  // 4. Record transaction record
  const record = {
    id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    senderId,
    recipientId,
    sourceCurrency,
    targetCurrency,
    sentAmount: numericAmount,
    receivedAmount: destinationAmount,
    rate: fxRate,
    status: 'COMPLETED',
    createdAt: new Date().toISOString()
  };

  transfers.unshift(record);
  return record;
};

/**
 * Get transfer history for a user
 */
const getTransferHistory = async (userId) => {
  return transfers.filter(tx => tx.senderId === userId || tx.recipientId === userId);
};

module.exports = {
  initiateTransfer,
  getTransferHistory
};