import type { Transaction } from "../types"

interface Props {
    transactions: Transaction[];
    onDelete: (id: number) => void;
}

export default function TransactionList({ transactions, onDelete }: Props) {
    return (
    <div className="card">
      <h2 className="card-title">Lista Tranzacții</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Descriere</th>
            <th>Categorie</th>
            <th>Sumă</th>
            <th>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td style={{ fontWeight: 500 }}>{t.description}</td>
              <td>
                <span className="badge">
                  {t.category.name}
                </span>
              </td>
              <td className={t.category.type === 'income' ? 'text-income' : 'text-expense'} style={{ fontWeight: 700 }}>
                {t.category.type === 'income' ? '+' : '-'}{t.amount} RON
              </td>
              <td style={{ textAlign: 'right' }}>
                <button 
                  onClick={() => onDelete(t.id)} 
                  className="btn-danger"
                >
                  Șterge
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {transactions.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '20px' }}>
          Nu există tranzacții înregistrate.
        </p>
      )}
    </div>
  );
}