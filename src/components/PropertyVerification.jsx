import { useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Text, Tooltip } from 'recharts';
import useData from '../context/DataFetchContext';

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
    const {propertyVerification} = useData()
    const [timeFrame, setTimeFrame] = useState('Monthly')
    const eventHandler = (e) => {
        setTimeFrame(e.target.value)
    }

    const dataToShow = timeFrame === 'Monthly' ? propertyVerification.Monthly : propertyVerification.Weekly;
    return (
        <div className=" flex flex-col justify-between p-[20px] bg-white  rounded-[14px] h-[270px] ">
            <div className='w-[230px] h-[42px] flex justify-between items-center '>
                <h5 className='lg:text-[14px] h-[42px] w-[117px] text-black'>Property Verification Rate</h5>
                <select className='flex flex-row gap-2.5  w-[95px] h-[30px] rounded-[40px]' value={timeFrame} onChange={eventHandler} >
                    <option>Monthly</option>
                    <option>Weekly</option>
                </select>
            </div>
            <ResponsiveContainer className={'w-[170px] h-[170px]'}>
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

                        {dataToShow && dataToShow.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}