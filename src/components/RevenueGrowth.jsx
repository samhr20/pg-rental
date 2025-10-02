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

const Year2022 = [
  { name: 'Jan', Num: 4 },
  { name: 'Feb', Num: 1 },
  { name: 'Mar', Num: 8 },
  { name: 'Apr', Num: 9 },
  { name: 'May', Num: 10 },
  { name: 'June', Num: 20 },
  { name: 'July', Num: 25 },
  { name: 'Aug', Num: 70 },
  { name: 'Sep', Num: 100 },
  { name: 'Oct', Num: 50 },
  { name: 'Nov', Num: 10 },
  { name: 'Dec', Num: 15 }
];

const Year2023 = [
  { name: 'Jan', Num: 8 },
  { name: 'Feb', Num: 10 },
  { name: 'Mar', Num: 8 },
  { name: 'Apr', Num: 9 },
  { name: 'May', Num: 100 },
  { name: 'June', Num: 20 },
  { name: 'July', Num: 25 },
  { name: 'Aug', Num: 70 },
  { name: 'Sep', Num: 100 },
  { name: 'Oct', Num: 50 },
  { name: 'Nov', Num: 10 },
  { name: 'Dec', Num: 15 }
];

const Year2024 = [
  { name: 'Jan', Num: 20 },
  { name: 'Feb', Num: 1 },
  { name: 'Mar', Num: 8 },
  { name: 'Apr', Num: 9 },
  { name: 'May', Num: 100 },
  { name: 'June', Num: 20 },
  { name: 'July', Num: 25 },
  { name: 'Aug', Num: 90 },
  { name: 'Sep', Num: 100 },
  { name: 'Oct', Num: 50 },
  { name: 'Nov', Num: 10 },
  { name: 'Dec', Num: 15 }
];

const Year2025 = [
  { name: 'Jan', Num: 4 },
  { name: 'Feb', Num: 1 },
  { name: 'Mar', Num: 8 },
  { name: 'Apr', Num: 9 },
  { name: 'May', Num: 105 },
  { name: 'June', Num: 20 },
  { name: 'July', Num: 250 },
  { name: 'Aug', Num: 70 },
  { name: 'Sep', Num: 100 },
  { name: 'Oct', Num: 50 },
  { name: 'Nov', Num: 104 },
  { name: 'Dec', Num: 15 }
];

const PartnerPayout = () => {
  const [timeFrame, setTimeFrame] = useState("2025-26");

  const eventHandler = (e) => {
    setTimeFrame(e.target.value);
  };

  const dataToShow =
    timeFrame === "2022-23"
      ? Year2022
      : timeFrame === "2023-24"
      ? Year2023
      : timeFrame === "2024-25"
      ? Year2024
      : Year2025;

  return (
    <div
      style={{ width: "68%", height: 300 }}
      className="bg-white py-8 px-2 pt-3 rounded-[12px] min-w-[35%]"
    >
      <div className="flex justify-between items-center px-7">
        <h4 className="text-[15px] font-semibold mb-3">
          Revenue Growth (In Lac)
        </h4>
        <select value={timeFrame} onChange={eventHandler}>
          <option value="2022-23">2022-23</option>
          <option value="2023-24">2023-24</option>
          <option value="2024-25">2024-25</option>
          <option value="2025-26">2025-26</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={dataToShow}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" className="text-[10px]" />
          <YAxis className="text-[10px]" />
          <Tooltip />
          <Bar dataKey="Num" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PartnerPayout;
