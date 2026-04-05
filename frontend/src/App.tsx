import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import type { Transaction } from "./types";
import Dashboard from "./components/Dashboard";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { fetchWithAuth } from './utils/api'; 

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  if (!token) return null; 

  return (
    <header className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
      <h2 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.5rem', fontWeight: 800 }}>Smart Budget</h2>
      <button onClick={handleLogout} className="btn-danger">
        Deconectare
      </button>
    </header>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const MainDashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetchWithAuth('http://127.0.0.1:8000/api/transactions/');
        if (response.ok) {
          const data = await response.json();
          setTransactions(data);
        }
      } catch (error) {
        console.error('Eroare la preluarea datelor:', error);
      }
    };
    fetchTransactions();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetchWithAuth(`http://127.0.0.1:8000/api/transactions/${id}/`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTransactions(transactions.filter((t) => t.id !== id));
      }
    } catch (error) {
      console.error('Eroare la ștergerea tranzacției:', error);
    }
  };

  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <Dashboard transactions={transactions} />
      <TransactionForm onTransactionAdded={(newTx) => setTransactions([...transactions, newTx])} />
      <TransactionList transactions={transactions} onDelete={handleDelete} />
    </div>
  );
};

export default function App() {
  return (
    <div className="app-container"> 
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <MainDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}