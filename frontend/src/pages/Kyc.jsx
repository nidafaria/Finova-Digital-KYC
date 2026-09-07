import { useState } from 'react';

export default function Kyc() {
  const [docType, setDocType] = useState('PASSPORT');
  const [docNumber, setDocNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
      <div className="card">
        <h2 className="card-title">Identity Verification (KYC)</h2>
        <p className="card-subtitle">Required by global financial regulators for international remittance</p>

        {submitted ? (
          <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-block', background: '#10b981', color: 'white', borderRadius: '50%', width: '40px', height: '40px', lineHeight: '40px', fontSize: '1.2rem', marginBottom: '0.75rem' }}>✓</div>
            <h3 style={{ color: '#065f46', marginBottom: '0.25rem' }}>Verification Complete</h3>
            <p style={{ color: '#047857', fontSize: '0.9rem' }}>Your {docType} ({docNumber}) has been approved.</p>
            <button onClick={() => setSubmitted(false)} className="btn btn-secondary" style={{ marginTop: '1rem' }}>Re-upload</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Document Classification</label>
              <select value={docType} onChange={(e) => setDocType(e.target.value)}>
                <option value="PASSPORT">International Passport</option>
                <option value="NATIONAL_ID">National Identity Card / Aadhaar</option>
                <option value="DRIVING_LICENSE">Driver's License</option>
              </select>
            </div>

            <div className="form-group">
              <label>Document Identification Number</label>
              <input
                type="text"
                required
                placeholder="e.g. A92817263"
                value={docNumber}
                onChange={(e) => setDocNumber(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Supporting Document File</label>
              <input type="file" required style={{ border: '1px dashed var(--border)', padding: '1.5rem', background: '#f8fafc' }} />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Submit for Instant Verification
            </button>
          </form>
        )}
      </div>
    </div>
  );
}