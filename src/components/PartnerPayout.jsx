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
        <div  className=" bg-white flex flex-col justify-between p-5 rounded-[14px] lg:min-w-[250px] h-[270px] ">
            <div className='flex justify-between items-center w-full h-[42]'>
                <h5 className='lg:text-[14px] leading-[100%] tracling-[0%] w-[105px] h-[42px] '>Partner Payout Timeline</h5>
                <select className='flex flex-col gap-2.5 w-[95px] h-[30px] rounded-[40px] px-2 pt-0.5' value={timeFrame} onChange={eventHandler} >
                    <option><p className='text-[12px]'>Monthly</p></option>
                    <option><p className='text-[12px]'>Weekly</p></option>
                </select>
            </div>
            <ResponsiveContainer className={'w-[210px] h-[170px]'}>
                <BarChart
                    width={500}
                    height={300}
                    data={dataToShow}
                    margin={{
                        top: 20,
                        right:0,
                        left: -25,
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
