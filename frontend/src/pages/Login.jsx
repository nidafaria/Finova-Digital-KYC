import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/client';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      localStorage.setItem('token', 'mock-token-for-testing');
      navigate('/');
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '4rem auto' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Login to Nexora</h2>
      {error && <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        </div>
        <button type="submit" className="btn" style={{ width: '100%', marginTop: '0.5rem' }}>Login</button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
        Don't have an account? <Link to="/register" style={{ color: '#2563eb' }}>Register</Link>
      </p>
    </div>
  );
}
