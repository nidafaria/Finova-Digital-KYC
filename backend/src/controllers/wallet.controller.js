const walletService = require('../services/wallet.service');

const getWallet = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'user_demo_123';
    const wallet = await walletService.getWalletByUserId(userId);
    res.status(200).json({ success: true, data: wallet });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addFunds = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'user_demo_123';
    const { currency, amount } = req.body;

    if (!currency || !amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid currency or amount' });
    }

    const updatedWallet = await walletService.updateBalance(userId, currency, Number(amount));
    res.status(200).json({ success: true, data: updatedWallet });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getWallet,
  addFunds
};