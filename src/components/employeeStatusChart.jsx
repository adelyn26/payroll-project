import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#00C49F', '#FF8042'];

const EmployeeStatusChart = ({ activeCount, inactiveCount }) => {
    const data = [
        { name: 'Active Employee', value: activeCount },
        { name: 'Inactive Employee', value: inactiveCount }
    ];

    return (
        <div style={{ textAlign: 'center' }}>
            <PieChart width={300} height={300}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default EmployeeStatusChart;
