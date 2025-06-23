import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import React, { useEffect, useMemo, useState } from "react";
import { Select } from "antd";
import { useGetUserGrowthQuery } from "../../page/redux/api/metaDataApi";

const UserGrowthChart = () => {
    const [year, setYears] = useState(new Date().getFullYear());
  const{data: userGrowth} = useGetUserGrowthQuery(year)
  const currentYear = new Date().getFullYear();


const items = [
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' }
];

  const handleYearChange = (value) => {
    setYears(value); 
  };


 const { monthlyData, maxUsers } = useMemo(() => {
  const rawData = userGrowth?.data?.chartData || [];

  const maxUsers = Math.max(...rawData.map(item => item.totalUser), 0) + 10;

  return {
    monthlyData: rawData.map(item => ({
      name: item.month,
      totalUser: item.totalUser
    })),
    maxUsers,
  };
}, [userGrowth]);

const yearOptions = (userGrowth?.data?.yearsDropdown || []).map(year => ({
  value: year,
  label: `${year}`,
}));



  return (
    <div
      style={{
        width: "100%",
        height: "450px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="flex justify-between items-center">
        <h3
          style={{
            textAlign: "left",
            marginBottom: "15px",
            color: "#333",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          📈 User Growth
        </h3>
        <Select
  value={year}
  onChange={handleYearChange}
  style={{ width: 120 }}
  options={yearOptions}
/>


      </div>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={monthlyData}
          margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#212121" stopOpacity={1} />
              <stop offset="95%" stopColor="#212121" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
          <XAxis
            dataKey="name"
            stroke="#333"
            tick={{ fontSize: 12, fontWeight: 500 }}
          />
          <YAxis
            stroke="#333"
            domain={[0, maxUsers]}
            tick={{ fontSize: 12, fontWeight: 500 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "8px",
            }}
            cursor={{ fill: "#212121" }}
          />
          <Legend wrapperStyle={{ fontSize: "13px", fontWeight: "bold" }} />
          <Bar
            dataKey="totalUser"
            fill="url(#colorUv)"
            barSize={75}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserGrowthChart;
