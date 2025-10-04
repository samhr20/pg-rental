import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', Num: 4000 },
  { name: 'Feb', Num: 1000 },
  { name: 'Mar', Num: 2000 },
  { name: 'Apr', Num: 10000 },
  { name: 'May', Num: 100 },
  { name: 'June', Num: 0 },
  { name: 'July', Num: 500 },
  { name: 'Aug', Num: 1500 },
  { name: 'Sep', Num: 300 },
  { name: 'Oct', Num: 20000 },
  { name: 'Nov', Num: 15000 },
  { name: 'Dec', Num: 500 },
];

const BookingTrend = () => {
  return (
    <div className="bg-white flex flex-col gap-[10px] lg:py-8 py-4 px-3 lg:px-[20px] rounded-[14px] w-full h-[270px] min-h-[270px]">
      <h5 className="lg:text-[14px] text-[12px]">Booking Trend</h5>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
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
