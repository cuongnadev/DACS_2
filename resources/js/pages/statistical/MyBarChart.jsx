import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const MyBarChart = ({ title, data }) => (
    <div className="bar-chart_container flex flex-col-reverse gap-2">
        <h2 className="bar-chart_title">{title}</h2>
        <BarChart width={1200} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
                content={({ payload }) => {
                    const fullName = payload?.[0]?.payload?.fullName;
                    const value = payload?.[0]?.payload?.value;
                    return (
                        <div className="bar-chart_tooltip">
                            <h4>{fullName}</h4>
                            <p>Số lượng: {value}</p>
                        </div>
                    );
                }}
            />
            <Bar dataKey="value" fill="#4d44b5" />
        </BarChart>
    </div>
);

export default MyBarChart;
