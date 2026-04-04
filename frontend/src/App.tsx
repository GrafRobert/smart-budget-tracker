import { useState, useEffect } from "react";
import type { Transaction } from "./types";
import Dashboard from "./components/Dashboard";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";


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



  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Smart Budget Tracker</h1>
      

      <Dashboard transactions={transactions} />
      <TransactionForm />
      <TransactionList transactions={transactions} />
    </div>
  );
}

export default App;