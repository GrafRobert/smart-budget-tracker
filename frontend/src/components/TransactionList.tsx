import type { Transaction } from "../types"

interface Props {
    transactions: Transaction[];
}

export default function TransactionList({ transactions }: Props) {
    return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
      <h2>Lista Tranzacții</h2>
      <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #eee' }}>
            <th>Data</th>
            <th>Descriere</th>
            <th>Categorie</th>
            <th>Sumă</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} style={{ borderBottom: '1px solid #eee' }}>
              <td>{t.date}</td>
              <td>{t.description}</td>
              <td>{t.category.name} ({t.category.type === 'income' ? 'Venit' : 'Cheltuială'})</td>
              <td style={{ color: t.category.type === 'income' ? 'green' : 'red', fontWeight: 'bold' }}>
                {t.amount} RON
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}