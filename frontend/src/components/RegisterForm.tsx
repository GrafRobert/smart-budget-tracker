import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/auth/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.status === 201) {
      alert('Cont creat cu succes! Acum te poți loga.');
      navigate('/login');
    } else {
      alert('A apărut o eroare. Verifică datele.');
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '40px auto' }}>
      <h2 className="card-title">Creare Cont Nou</h2>
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label className="stat-label">Username</label>
          <input 
            type="text" 
            className="form-input"
            style={{ width: '100%', boxSizing: 'border-box' }}
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label className="stat-label">Email</label>
          <input 
            type="email" 
            className="form-input"
            style={{ width: '100%', boxSizing: 'border-box' }}
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label className="stat-label">Parolă</label>
          <input 
            type="password" 
            className="form-input"
            style={{ width: '100%', boxSizing: 'border-box' }}
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn-primary">Înregistrează-te</button>
      </form>
      
      <p style={{ marginTop: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
        Ai deja cont? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Loghează-te aici</Link>
      </p>
    </div>
  );
};