import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MonthlyData = [
    {
        name: 'Jan',
        Num: 4000

    },
    {
        name: 'Feb',
        Num: 1000

    },
    {
        name: 'Mar',
        Num: 2000

    },
    {
        name: 'Apr',
        Num: 10000

    },
    {
        name: 'May',
        Num: 100

    },
    {
        name: 'June',
        Num: 0

    },
    {
        name: 'July',
        Num: 500
    },
    {
        name: 'Aug',
        Num: 1500
    },
    {
        name: 'Sep',
        Num: 300
    },
    {
        name: 'Oct',
        Num: 20000
    },
    {
        name: 'Nov',
        Num: 15000
    },
    {
        name: 'Dec',
        Num: 500
    },
];
const WeeklyData = [
    {
        name: 'Mon',
        Num: 1000

    },
    {
        name: 'Tue',
        Num: 200

    },
    {
        name: 'Wed',
        Num: 500

    },
    {
        name: 'Thu',
        Num: 100

    },
    {
        name: 'Fri',
        Num: 1000

    },
    {
        name: 'Sat',
        Num: 500

    },
    {
        name: 'Sun',
        Num: 5000
    },
];

const PartnerPayout = () => {
    const [timeFrame, setTimeFrame] = useState('Monthly')
    const eventHandler = (e) => {
        setTimeFrame(e.target.value)
    }
    const dataToShow = timeFrame === 'Monthly' ? MonthlyData : WeeklyData ;
    return (
        <div style={{ width: '35%', height: 300 }} className=" bg-white py-8 px-2 pt-3 rounded-[12px] min-w-[35%]">
            <div className='flex justify-between items-center px-7'>
                <h4 className='text-[15px] font-semibold mb-3 '>Partner Payout Timeline</h4>
                <select value={timeFrame} onChange={eventHandler} >
                    <option>Monthly</option>
                    <option>Weekly</option>
                </select>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={dataToShow}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" className='text-[10px]' />
                    <YAxis className='text-[10px]' />
                    <Tooltip />
                    <Bar dataKey="Num" stackId="a" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </  div>
    );
};

export default PartnerPayout;
