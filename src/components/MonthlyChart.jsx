import { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8',
    '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57',
    '#f05050', '#50f050', '#5050f0', '#f0a050', '#a050f0', '#50f0a0'
];

function MonthlyChart({ transactions }) {
    const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7));

    const monthlyData = useMemo(() => {
        // Filter by month and expense type
        const filtered = transactions.filter(t =>
            t.type === 'expense' && t.date.startsWith(currentMonth)
        );

        // Aggregate by description (category)
        const aggregated = filtered.reduce((acc, t) => {
            acc[t.description] = (acc[t.description] || 0) + t.amount;
            return acc;
        }, {});

        // Transform to array for Recharts
        return Object.entries(aggregated)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value); // Sort by highest expense
    }, [transactions, currentMonth]);

    const totalExpense = monthlyData.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3>月別レポート</h3>
                <input
                    type="month"
                    value={currentMonth}
                    onChange={(e) => setCurrentMonth(e.target.value)}
                    style={{ width: 'auto', marginBottom: 0 }}
                />
            </div>

            {monthlyData.length > 0 ? (
                <div style={{ height: '300px', width: '100%' }}>
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                        <strong>合計支出: {totalExpense.toLocaleString()}円</strong>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={monthlyData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {monthlyData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value.toLocaleString()}円`} />
                            <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <p style={{ textAlign: 'center', color: '#888' }}>データがありません</p>
            )}
        </div>
    );
}

export default MonthlyChart;
