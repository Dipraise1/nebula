"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

type PieChartComponentProps = {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  totalSupply: number;
};

export default function PieChartComponent({ data, totalSupply }: PieChartComponentProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
          stroke="transparent"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => [
            `${value.toLocaleString()} $NAI (${(value / totalSupply * 100).toFixed(1)}%)`, 
            'Allocation'
          ]}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
} 