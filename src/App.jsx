import { useState, useEffect } from 'react'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import Summary from './components/Summary'
import MonthlyChart from './components/MonthlyChart'

function App() {
  // Try to load from local storage
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      id: Date.now(),
      ...transaction
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="container">
      <h1>シンプル家計簿</h1>
      <Summary transactions={transactions} />
      <MonthlyChart transactions={transactions} />
      <div className="card">
        <TransactionForm onAdd={addTransaction} />
      </div>
      <div className="card">
        <TransactionList
          transactions={transactions}
          onDelete={deleteTransaction}
        />
      </div>
    </div>
  )
}

export default App
