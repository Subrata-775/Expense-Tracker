"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function BarChartDashboard({ budgetList }) {
  return (
    <div className="border rounded-lg p-5">
      <h2 className="font-bold text-lg mb-4">Activity</h2>

      {/* Responsive container for full responsiveness */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width={'100%'} height={300}>
          <BarChart
            data={budgetList}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalSpend" stackId="a" fill="#4845d2" radius={[4, 4, 0, 0]} />
            <Bar dataKey="amount" stackId="a" fill="#c3c2FF" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BarChartDashboard;
