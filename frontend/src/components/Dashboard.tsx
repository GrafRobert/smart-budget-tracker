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
    <div className="card">
      <h2 className="card-title">Dashboard</h2>
      <div className="dashboard-grid">
        <div className="stat-box">
          <span className="stat-label">Venituri</span>
          <span className="stat-value text-income">{totalIncome} RON</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Cheltuieli</span>
          <span className="stat-value text-expense">{totalExpense} RON</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Balanță</span>
          <span className="stat-value">{balance} RON</span>
        </div>
      </div>
    </div>
  );
}