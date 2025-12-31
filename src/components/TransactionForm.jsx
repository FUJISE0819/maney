
import { useState } from 'react'
import '../index.css'

function TransactionForm({ onAdd }) {
    const [description, setDescription] = useState('食費');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const expenseCategories = [
        "食費", "日用品", "子ども（生活）", "子ども（教育）", "医療",
        "外食", "娯楽", "交通", "ガソリン", "光熱費",
        "車維持費", "住宅ローン", "保険", "大型出費", "特別費", "投資"
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description || !amount) return;

        onAdd({
            description,
            amount: parseInt(amount),
            type: 'expense',
            date
        });

        // Reset logic: keep date, reset amount, reset description to default
        setAmount('');
        // Optional: reset description or keep last? Resetting to default is safer.
        setDescription('食費');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>新しい記録</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                <div>
                    <label>日付</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
            </div>

            <label>項目</label>
            <select
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            >
                {expenseCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>

            <label>金額 (円)</label>
            <input
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min="0"
            />

            <button type="submit" style={{
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                width: '100%'
            }}>
                追加する
            </button>
        </form>
    )
}

export default TransactionForm
