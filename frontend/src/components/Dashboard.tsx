import type { Transaction } from "../types"

interface Props {
    transactions: Transaction[];
}


export default function Dashboard({transactions}: Props) {

    const totalIncome = transactions
        .filter(t => t.category.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount),0);
    
    const totalExpense = transactions
        .filter(t => t.category.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const balance = totalIncome - totalExpense;

   return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '20px', background: '#f9f9f9' }}>
      <h2>Dashboard (Statistici)</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '18px' }}>
        <div>
          <strong>Venituri: </strong>
          <span style={{ color: 'green' }}>{totalIncome} RON</span>
        </div>
        <div>
          <strong>Cheltuieli: </strong>
          <span style={{ color: 'red' }}>{totalExpense} RON</span>
        </div>
        <div>
          <strong>Balanță: </strong>
          <span style={{ fontWeight: 'bold' }}>{balance} RON</span>
        </div>
      </div>
    </div>
  );
}