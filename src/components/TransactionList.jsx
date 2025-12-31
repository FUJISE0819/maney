function TransactionList({ transactions, onDelete }) {
    return (
        <div>
            <h3>履歴</h3>
            {transactions.length === 0 ? (
                <p style={{ color: '#888', textAlign: 'center' }}>まだ記録がありません</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {transactions.map((t) => (
                        <li key={t.id} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '10px 0',
                            borderBottom: '1px solid #eee'
                        }}>
                            <div>
                                <div style={{ fontWeight: 'bold' }}>{t.description}</div>
                                <div style={{ fontSize: '12px', color: '#888' }}>{t.date}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{
                                    color: 'var(--danger-color)',
                                    fontWeight: 'bold'
                                }}>
                                    {t.amount.toLocaleString()}円
                                </span>
                                <button
                                    onClick={() => onDelete(t.id)}
                                    style={{
                                        backgroundColor: '#eee',
                                        color: '#666',
                                        padding: '5px 10px',
                                        fontSize: '12px'
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default TransactionList
