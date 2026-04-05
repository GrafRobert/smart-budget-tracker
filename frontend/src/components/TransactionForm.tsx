import { useState, useEffect } from 'react';
import type { Category, Transaction } from '../types';
import { fetchWithAuth } from '../utils/api'; 

interface Props {
  onTransactionAdded: (newTransaction: Transaction) => void;
}

export default function TransactionForm({ onTransactionAdded }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [categoryId, setCategoryId] = useState('');

 useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchWithAuth('http://127.0.0.1:8000/api/categories/');
        if (response.ok) {
          const data = await response.json();
          
         
          console.log("Date primite de la API Categorii:", data);

         
          const actualCategories = data.results ? data.results : data;

          setCategories(actualCategories);
          if (actualCategories.length > 0) setCategoryId(actualCategories[0].id.toString());
        }
      } catch (error) {
        console.error('Eroare la aducerea categoriilor:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTxData = {
      amount: amount,
      description: description,
      date: date,
      category_id: categoryId
    };

    try {
      const response = await fetchWithAuth('http://127.0.0.1:8000/api/transactions/', {
        method: 'POST',
       
        body: JSON.stringify(newTxData),
      });

      if (response.ok) {
        const createdTransaction = await response.json();
        
        onTransactionAdded(createdTransaction);
        
        setAmount('');
        setDescription('');
        setDate('');
      }
    } catch (error) {
      console.error('Eroare la adăugarea tranzacției:', error);
    }
  };

  return (
    
    <div className="card">
      <h2 className="card-title">Adaugă Tranzacție</h2>
      
    
      <form onSubmit={handleSubmit} className="form-grid">
        <input 
          type="date" 
          className="form-input"
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          className="form-input"
          placeholder="Descriere" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          className="form-input"
          placeholder="Sumă" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          required 
        />
        <select 
          className="form-input"
          value={categoryId} 
          onChange={(e) => setCategoryId(e.target.value)} 
          required
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name} ({cat.type})
            </option>
          ))}
        </select>
        <button type="submit" className="btn-primary">
          Adaugă
        </button>
      </form>
    </div>
  );
}