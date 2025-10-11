export const applicationStyling = {
  dashboard_Card_style: "bg-white min-w-[920px] h-[270px] rounded-[14px] p-[20px] flex flex-col gap-2.5",
  sidebar_main_wrapper_style: "group flex items-center justify-between cursor-pointer w-[232px] h-[32px] p-[10px] rounded-[10px] mb-2.5 gap-[14px] transition-colors duration-200"
}


import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import useData from '../context/DataFetchContext';
import { revenueGrowth2024DataSchema, revenueGrowthDataSchema } from '../helpers/user_enum';

const RevenueGrowth = () => {
  const { revenueGrowth } = useData()
  const [timeFrame, setTimeFrame] = useState("2025-26");

  const eventHandler = (e) => {
    setTimeFrame(e.target.value);
  };

  const dataToShow =
    timeFrame === "2024-25"
      ? revenueGrowth[revenueGrowthDataSchema.Year2024]
      : revenueGrowth[revenueGrowthDataSchema.Year2025];

  return (
    <div
      className={applicationStyling.dashboard_Card_style}  >
      <div className="w-[770px] h-[30px] flex justify-between items-center">
        <h5 className="text-[14px] text-black w-[174px] h-[21px]">
          Revenue Growth (In Lac)
        </h5>
        <select value={timeFrame} onChange={eventHandler}>
          <option value="2024-25">2024-25</option>
          <option value="2025-26">2025-26</option>
        </select>
      </div>
      <ResponsiveContainer className={'w-[770px] h-[170px]'}>
        <BarChart
          data={dataToShow}
          margin={{
            top: 20,
            right: 0,
            left: -28,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={`${revenueGrowth2024DataSchema.name}`} className="text-[10px]" />
          <YAxis className="text-[10px]" />
          <Tooltip />
          <Bar dataKey={`${revenueGrowth2024DataSchema.Num}`} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueGrowth;
