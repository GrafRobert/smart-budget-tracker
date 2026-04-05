import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/auth/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('access_token', data.access); 
      navigate('/');
    } else {
      alert('Date de logare incorecte!');
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '40px auto' }}>
      <h2 className="card-title">Autentificare</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
        <button type="submit" className="btn-primary">Intră în cont</button>
      </form>
      
      <p style={{ marginTop: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
        Nu ai cont? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Creează unul aici</Link>
      </p>
    </div>
  );
};