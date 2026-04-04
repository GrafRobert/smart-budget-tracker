import { useState, useEffect } from 'react'
import type { Category, Transaction } from '../types'


interface Props {
    onTransactionAdded: (newTransaction: Transaction) => void;
}


export default function TransactionForm({ onTransactionAdded}: Props) {

    const [categories, setCategories] = useState<Category[]>([]);

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [categoryId, setCategoryId] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try{
                const response = await fetch('http://127.0.0.1:8000/api/categories/');
                if(response.ok){
                    const data = await response.json();
                    setCategories(data);
                    if(data.length > 0) setCategoryId(data[0].id.toString());
                }
            }catch(error){
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
      const response = await fetch('http://127.0.0.1:8000/api/transactions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
    }

    return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
      <h2>Adaugă Tranzacție</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Descriere" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          placeholder="Sumă" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          required 
        />
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name} ({cat.type})
            </option>
          ))}
        </select>
        <button type="submit" style={{ background: '#007bff', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' }}>
          Adaugă
        </button>
      </form>
    </div>
  );
}