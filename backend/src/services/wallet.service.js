// Mock wallet store for development/hackathon until DB integration
const wallets = new Map();

/**
 * Get or initialize user wallet
 */
const getWalletByUserId = async (userId) => {
  if (!wallets.has(userId)) {
    wallets.set(userId, {
      userId,
      balances: {
        USD: 1000.0,
        EUR: 500.0,
        INR: 25000.0
      },
      createdAt: new Date()
    });
  }
  return wallets.get(userId);
};

/**
 * Update currency balance for a user
 */
const updateBalance = async (userId, currency, amount) => {
  const wallet = await getWalletByUserId(userId);
  const current = wallet.balances[currency] || 0;
  
  if (current + amount < 0) {
    throw new Error('Insufficient balance');
  }

  wallet.balances[currency] = parseFloat((current + amount).toFixed(2));
  wallets.set(userId, wallet);
  return wallet;
};

module.exports = {
  getWalletByUserId,
  updateBalance
};