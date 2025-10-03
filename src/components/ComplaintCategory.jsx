import { Cell, Pie, PieChart, ResponsiveContainer, Text, Tooltip } from 'recharts';

const data = [
    { name: 'Group A', value: 700 },
    { name: 'Group B', value: 100 },
    { name: 'Group C', value: 500 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 800 },
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

export default function ComplaintCategory() {
    return (
        <div  className=" bg-white py-8 px-4 pt-3 rounded-[12px] lg:min-w-[20%] h-[300px]">
            <h4 className='lg:text-[15px] font-semibold mb-3 text-center'>Complaints Category Spread</h4>
            <p className='text-[11px] text-center leading-0'>Visual breakdown of complaint types</p>

            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={85}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        <Tooltip />

                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}