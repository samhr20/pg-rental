import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useData from '../context/DashboardDataContext';


const BookingTrend = () => {
  const { bookingData } = useData()
  return (
    <div className="bg-white flex flex-col gap-[10px] lg:py-8 py-4 px-3 lg:px-[20px] rounded-[14px] w-full h-[270px] min-h-[270px]">
      <h5 className="lg:text-[14px] text-[12px]">Booking Trend</h5>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={bookingData}
            margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" className="text-[10px]" />
            <YAxis className="text-[10px]" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Num"
              stroke="#FF6A00"
              fill="#FF6A00"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BookingTrend;
