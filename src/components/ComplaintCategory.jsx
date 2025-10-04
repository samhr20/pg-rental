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
        <div className="bg-white p-[20px] flex flex-col justify-between rounded-[14px] w-full h-[270px] min-h-[270px]">
            <div className='w-full flex flex-col gap-1.5'>
                <h5 className='lg:text-[14px] text-[12px] leading-[150%] tracking-[0%] text-center'>Complaints Category Spread</h5>
                <p className='text-[10px] text-[#838383] leading-[150%] tracking-[0%] text-center'>Visual breakdown of complaint types</p>
            </div>

            <div className="flex-1 flex items-center justify-center">
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
        </div>
    );
}