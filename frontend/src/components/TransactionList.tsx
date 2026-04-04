import type { Transaction } from "../types"

interface Props {
    transactions: Transaction[];
    onDelete: (id: number) => void;
}

export default function TransactionList({ transactions, onDelete }: Props) {
   return (
    <div className="card">
      <h2 className="card-title">Istoric Tranzacții</h2>
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
              <td><strong>{t.description}</strong></td>
              <td>
                <span className="badge">
                  {t.category.name}
                </span>
              </td>
              <td className={t.category.type === 'income' ? 'text-income' : 'text-expense'} style={{ fontWeight: 'bold' }}>
                {t.category.type === 'income' ? '+' : '-'}{t.amount} RON
              </td>
              <td>
                <button onClick={() => onDelete(t.id)} className="btn-danger">
                  Șterge
                </button>
              </td>
            </tr>
          ))}
          {transactions.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>
                Nu există nicio tranzacție momentan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}