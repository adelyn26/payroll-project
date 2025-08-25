import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';


const DepartmentPieChart = ({ data }) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    console.log('department:', data)
    return (
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
                dataKey="value"
            >
                {data.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    );
};


export default DepartmentPieChart;
