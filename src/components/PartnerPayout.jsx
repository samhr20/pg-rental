import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useData from '../context/DataFetchContext';
import { partnerPayoutDataMonthlySchema, partnerPayoutDataSchema } from '../helpers/user_enum';



const PartnerPayout = () => {
    const [timeFrame, setTimeFrame] = useState('Monthly')
    const { partnerPayout } = useData()
    const eventHandler = (e) => {
        setTimeFrame(e.target.value)
    }
    const dataToShow = timeFrame === 'Monthly' ? partnerPayout[partnerPayoutDataSchema.MonthlyData] : partnerPayout[partnerPayoutDataSchema.WeeklyData];

    return (
        <div className=" bg-white flex flex-col justify-between p-5 rounded-[14px] lg:min-w-[250px] h-[270px] ">
            <div className='flex justify-between items-center w-full h-[42]'>
                <h5 className='lg:text-[14px] leading-[100%] tracling-[0%] w-[105px] h-[42px] '>Partner Payout Timeline</h5>
                <select className='flex text-[12px] flex-col gap-2.5 w-[95px] h-[30px] rounded-[40px] px-2 pt-0.5' value={timeFrame} onChange={eventHandler} >
                    <option>Monthly</option>
                    <option>Weekly</option>
                </select>
            </div>
            <ResponsiveContainer className={'w-[210px] h-[170px]'}>
                <BarChart
                    width={500}
                    height={300}
                    data={dataToShow}
                    margin={{
                        top: 20,
                        right: 0,
                        left: -25,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" className='text-[10px]' />
                    <YAxis className='text-[10px]' />
                    <Tooltip />
                    <Bar dataKey={`${partnerPayoutDataMonthlySchema.Num}`} stackId="a" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </  div>
    );
};

export default PartnerPayout;
