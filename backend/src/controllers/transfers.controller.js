const transfersService = require('../services/transfers.service');

const createTransfer = async (req, res) => {
  try {
    const senderId = req.headers['x-user-id'] || 'user_demo_123';
    const { recipientId, sourceCurrency, targetCurrency, amount } = req.body;

    if (!recipientId || !sourceCurrency || !targetCurrency || !amount) {
      return res.status(400).json({
        success: false,
        message: 'recipientId, sourceCurrency, targetCurrency, and amount are required'
      });
    }

    const transfer = await transfersService.initiateTransfer({
      senderId,
      recipientId,
      sourceCurrency,
      targetCurrency,
      amount
    });

    res.status(201).json({ success: true, data: transfer });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'user_demo_123';
    const history = await transfersService.getTransferHistory(userId);
    res.status(200).json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTransfer,
  getHistory
};