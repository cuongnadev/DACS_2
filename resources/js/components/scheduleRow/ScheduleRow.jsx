import { usePage } from "@inertiajs/react";

const ScheduleRow = ({ period, dayData, rowspanTracker }) => {
    const user = usePage().props.auth.user;
    
    return (
        <tr>
            <td className="schedule_period-label">{`Tiết ${period}`}</td>
            {["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"].map((day) => {
                if (rowspanTracker[day] > 0) {
                    rowspanTracker[day]--;
                    return null;
                }

                const cellData = dayData.find(
                    (item) => item.day == day && item.period == period
                );

                if (cellData) {
                    if (cellData.rowspan > 1) {
                        rowspanTracker[day] = cellData.rowspan - 1;
                    }
                    
                    return (
                        <td
                            key={day}
                            rowSpan={cellData.rowspan}
                            className="schedule_cell"
                        >
                            <h2 className="schedule_subject">{user.role === "Student" ?  cellData.name : cellData.course_class.name}</h2>
                            <div className="schedule_room">{user.role === "Student" ? cellData.room : cellData.course_class.room}</div>
                        </td>
                    );
                } else {
                    return <td key={day} className="schedule_empty-cell"></td>;
                }
            })}
        </tr>
    );
};

export default ScheduleRow;
