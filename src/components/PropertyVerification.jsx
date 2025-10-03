import { useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Text, Tooltip } from 'recharts';

const Monthly = [
    { name: 'Monthly', value: 700 },
];
const Weekly = [
    { name: 'Weekly', value: 400 },
];

const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6A00'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor='middle' dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default function PropertyVerification() {
    const [timeFrame, setTimeFrame] = useState('Monthly')
    const eventHandler = (e) => {
        setTimeFrame(e.target.value)
    }
    const dataToShow = timeFrame === 'Monthly' ? Monthly : Weekly;
    return (
        <div className=" bg-white py-8 px-4 pt-3 rounded-[12px] w-full h-[300px] lg:min-w-[30%]">
            <div className='flex justify-between items-center '>
                <h4 className='lg:text-[15px] font-semibold mb-3 text-center'>Property Verification Rate</h4>
                <select value={timeFrame} onChange={eventHandler} >
                    <option>Monthly</option>
                    <option>Weekly</option>
                </select>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                        data={dataToShow}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={85}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        <Tooltip />

                        {dataToShow.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}