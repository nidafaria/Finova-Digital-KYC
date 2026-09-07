import { useState } from 'react';

export default function SendMoney() {
  const [sourceCurrency, setSourceCurrency] = useState('INR');
  const [destCurrency, setDestCurrency] = useState('USD');
  const [amount, setAmount] = useState(50000);
  const [quote, setQuote] = useState(null);

  const handleGetQuote = () => {
    const rate = 0.0118;
    const fee = amount * 0.005;
    setQuote({
      rate,
      fee,
      totalToDebit: Number(amount),
      recipientAmount: (amount - fee) * rate,
    });
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
      <div className="card">
        <h2 className="card-title">Transfer Funds</h2>
        <p className="card-subtitle">Real-time mock FX calculation with zero hidden rates</p>

        <div className="form-group">
          <label>Beneficiary</label>
          <select>
            <option>John Doe — Bank of America (••• 4921)</option>
            <option>Sarah Jenkins — Barclays UK (••• 8820)</option>
          </select>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Source Currency</label>
            <select value={sourceCurrency} onChange={(e) => setSourceCurrency(e.target.value)}>
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Target Currency</label>
            <select value={destCurrency} onChange={(e) => setDestCurrency(e.target.value)}>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Transfer Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <button onClick={handleGetQuote} className="btn btn-primary" style={{ width: '100%' }}>
          Calculate FX Breakdown
        </button>

        {quote && (
          <div className="fx-quote-box">
            <div className="fx-row">
              <span>Exchange Rate</span>
              <strong>1 {sourceCurrency} = {quote.rate} {destCurrency}</strong>
            </div>
            <div className="fx-row">
              <span>Standard Transfer Fee (0.5%)</span>
              <span>{quote.fee} {sourceCurrency}</span>
            </div>
            <div className="fx-row fx-total">
              <span>Recipient Gets</span>
              <span>${quote.recipientAmount.toFixed(2)} {destCurrency}</span>
            </div>

            <button
              onClick={() => alert('Transfer initiated!')}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1rem', background: '#10b981' }}
            >
              Confirm & Execute Transfer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}