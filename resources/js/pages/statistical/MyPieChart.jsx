import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const COLORS = ["#4d44b5", "#fb7d5b", "#fcc43e", "#4cbc9a", "#ff4550"];

const MyPieChart = ({ title, data }) => (
    <div className="pie-chart_container flex flex-col-reverse gap-2">
        <h2 className="pie-chart_title">{title}</h2>
        <PieChart width={600} height={280}>
            <Pie
                data={data}
                cx="32%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
            >
                {data.map((_, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                    />
                ))}
            </Pie>
            <Tooltip 
                content={({ payload }) => {
                    const name = payload?.[0]?.payload?.name;
                    const value = payload?.[0]?.payload?.value;
                    return (
                        <div className="pie-chart_tooltip">
                            <p>{`${name}: ${value}`}</p>
                        </div>
                    );
                }}
            />
            <Legend layout="vertical" align="right" verticalAlign="bottom" />
        </PieChart>
    </div>
);

export default MyPieChart;
