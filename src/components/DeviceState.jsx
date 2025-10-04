import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ["#6366F1", "#06B6D4", "#F59E0B", "#EF4444", "#10B981", "#8B5CF6"];

export default function DeviceState({ stats }) {
  const deviceCount = stats.reduce((acc, item) => {
    const deviceName =
      item.device.charAt(0).toUpperCase() + item.device.slice(1).toLowerCase();
  
    if (!acc[deviceName]) {
      acc[deviceName] = 0;
    }
    acc[deviceName]++;
    return acc;
  }, {});
  

  const result = Object.keys(deviceCount).map((device) => ({
    device,
    count: deviceCount[device],
  }));
  

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl shadow-xl p-6 text-white">
      <h2 className="text-lg font-semibold mb-4 text-center text-gray-200 tracking-wide uppercase">
        Device Usage Overview
      </h2>

      <div className="w-full h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={result}
              dataKey="count"
              nameKey="device" // <-- ensures case-sensitive label
              cx="50%"
              cy="50%"
              outerRadius={110}
              innerRadius={60}
              paddingAngle={2}
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {result.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#1E1E2E"
                  strokeWidth={2}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#2A2A3B",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
              }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#fff" }}
            />

            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ color: "#ccc", fontSize: "0.85rem" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
