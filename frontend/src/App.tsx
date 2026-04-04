import Dashboard from "./components/Dashboard";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";


function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Smart Budget Tracker</h1>
      <Dashboard />
      <TransactionForm />
      <TransactionList />
    </div>
  );
}

export default App;