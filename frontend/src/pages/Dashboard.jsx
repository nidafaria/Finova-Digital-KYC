import { Link } from 'react-router-dom';

export default function Dashboard() {
  const wallets = [
    { currency: 'INR', symbol: '₹', balance: '1,00,000' },
    { currency: 'USD', symbol: '$', balance: '500.00' },
    { currency: 'EUR', symbol: '€', balance: '300.00' },
    { currency: 'GBP', symbol: '£', balance: '200.00' },
  ];

  const transactions = [
    { id: 'TXN-9021', name: 'John Doe', sent: '₹50,000', received: '$590.00', status: 'Completed', date: 'Today' },
    { id: 'TXN-8812', name: 'Sarah Jenkins', sent: '₹25,000', received: '£232.50', status: 'Completed', date: 'Yesterday' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Account Overview</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Global multi-currency wallet overview</p>
        </div>
        <Link to="/send" className="btn btn-primary">+ Send Money</Link>
      </div>

      <div className="balance-grid">
        {wallets.map((w) => (
          <div key={w.currency} className="balance-card">
            <span className="currency-label">{w.currency} Balance</span>
            <div className="currency-amount">{w.symbol}{w.balance}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="card-title">Recent Transactions</h2>
        <p className="card-subtitle">Real-time logs of converted remittances</p>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Recipient</th>
                <th>Amount Sent</th>
                <th>Delivered</th>
                <th>Status</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td style={{ fontWeight: 600 }}>{tx.id}</td>
                  <td>{tx.name}</td>
                  <td>{tx.sent}</td>
                  <td style={{ fontWeight: 600 }}>{tx.received}</td>
                  <td>
                    <span style={{ background: '#dcfce7', color: '#166534', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {tx.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}