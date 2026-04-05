import type { Transaction } from "../types"

interface Props {
    transactions: Transaction[];
}

export default function Dashboard({transactions}: Props) {

    const totalIncome = transactions
        .filter(t => t.category.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0);
    
    const totalExpense = transactions
        .filter(t => t.category.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const balance = totalIncome - totalExpense;

   return (
    <div className="card">
      <h2 className="card-title">Dashboard (Statistici)</h2>
      
      <div className="dashboard-grid">

        <div className="stat-box">
          <span className="stat-label">Venituri</span>
          <div className="stat-value text-income">
            {totalIncome} RON
          </div>
        </div>


        <div className="stat-box">
          <span className="stat-label">Cheltuieli</span>
          <div className="stat-value text-expense">
            {totalExpense} RON
          </div>
        </div>


        <div className="stat-box">
          <span className="stat-label">Balanță</span>
          <div className="stat-value" style={{ color: balance >= 0 ? 'var(--text-main)' : 'var(--expense)' }}>
            {balance} RON
          </div>
        </div>
      </div>
    </div>
  );
}