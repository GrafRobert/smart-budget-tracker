import { useState, useEffect } from "react";
import type { Transaction } from "./types";
import Dashboard from "./components/Dashboard";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import './index.css';

function App() {

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/transactions/');
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
      const response = await fetch(`http://127.0.0.1:8000/api/transactions/${id}/`, {
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
    <div className="app-container">
      <h1 className="title">Smart Budget Tracker</h1>
      <Dashboard transactions={transactions} />
      <TransactionForm 
      onTransactionAdded={(newTx) => setTransactions([...transactions, newTx])} 
      />
      <TransactionList 
      transactions={transactions} onDelete={handleDelete} 
      />
    </div>
  );
}

export default App;