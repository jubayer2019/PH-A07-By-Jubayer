"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { BarChart2 } from "lucide-react";

export default function StatsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const savedTimeline = JSON.parse(localStorage.getItem("friend_timeline") || "[]");
    
    const counts = savedTimeline.reduce((acc, entry) => {
      acc[entry.type] = (acc[entry.type] || 0) + 1;
      return acc;
    }, {});

    const chartData = [
      { name: "Call", value: counts["Call"] || 0 },
      { name: "Text", value: counts["Text"] || 0 },
      { name: "Video", value: counts["Video"] || 0 },
    ].filter(d => d.value > 0);

    setData(chartData);
  }, []);

  const COLORS = ["#2D4F3F", "#A855F7", "#4ADE80"];

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-black tracking-tight mb-12 text-[#1A1A1A]">Friendship Analytics</h1>

      <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-[#1A1A1A] mb-12">By Interaction Type</h2>
        
        {data.length > 0 ? (
          <div className="flex flex-col items-center">
            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={100}
                    outerRadius={140}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              {data.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                  <span className="text-sm font-bold text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 opacity-20">
            <BarChart2 className="w-24 h-24 mb-4" />
            <p className="text-xl font-bold">No data to display yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
