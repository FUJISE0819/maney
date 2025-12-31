function Summary({ transactions }) {
    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);

    return (
        <div className="card" style={{ marginBottom: '20px', textAlign: 'center' }}>
            <h4>総支出</h4>
            <p style={{ color: 'var(--danger-color)', fontSize: '24px', fontWeight: 'bold' }}>
                {expense.toLocaleString()}円
            </p>
        </div>
    )
}

export default Summary
