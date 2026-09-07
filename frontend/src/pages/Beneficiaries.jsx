export default function Transactions() {
  const transactions = [
    { id: 'TXN-9021', name: 'John Doe', from: '50,000 INR', to: '$590.00 USD', rate: '0.0118', fee: '250 INR', date: 'Sep 7, 2026', status: 'COMPLETED' },
    { id: 'TXN-8812', name: 'Sarah Jenkins', from: '25,000 INR', to: '£232.50 GBP', rate: '0.0093', fee: '125 INR', date: 'Sep 6, 2026', status: 'COMPLETED' },
    { id: 'TXN-7640', name: 'Marco Rossi', from: '10,000 INR', to: '€108.00 EUR', rate: '0.0108', fee: '50 INR', date: 'Sep 4, 2026', status: 'COMPLETED' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Audit Ledger</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Immutable record of cross-border conversions and balance settlements</p>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Recipient</th>
                <th>Debited</th>
                <th>Credited</th>
                <th>Applied FX</th>
                <th>Service Fee</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td style={{ fontWeight: 600 }}><code>{tx.id}</code></td>
                  <td>{tx.name}</td>
                  <td>{tx.from}</td>
                  <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{tx.to}</td>
                  <td>{tx.rate}</td>
                  <td>{tx.fee}</td>
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