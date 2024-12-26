import { ScheduleRow } from "@/components";
import { PrimaryLayout } from "@/Layouts";
import { Head } from "@inertiajs/react";

export default function Schedule({ schedules }) {
    const rowspanTracker = {};

    const toDay = new Date();
    const dayIndex = toDay.getDay();
    const dayOfWeek = ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const toDayName = dayOfWeek[dayIndex];

    return (
        <PrimaryLayout title={"Lịch học theo tuần"}>
            <Head title="Schedule" />
            <div className="schedule_container flex flex-col items-start gap-6">
                <div className="schedule_header">
                    <h3>Thời khóa biểu - Hôm nay là {toDayName}</h3>
                </div>
                <div className="schedule_table">
                    <table >
                        <thead>
                            <tr>
                                <th>Tiết</th>
                                <th>Thứ 2</th>
                                <th>Thứ 3</th>
                                <th>Thứ 4</th>
                                <th>Thứ 5</th>
                                <th>Thứ 6</th>
                                <th>Thứ 7</th>
                                <th>CN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 10 }, (_, i) => (
                                <ScheduleRow
                                    key={i + 1}
                                    period={i + 1}
                                    dayData={schedules}
                                    rowspanTracker={rowspanTracker}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="schedule_note flex items-start gap-4">
                    {["Sáng", "Chiều"].map((timeOfDay, index) => (
                        <div key={index}>
                            <p className="schedule_note-label">{timeOfDay}</p>
                            {Array.from({ length: 5}, (_, i) => {
                                const period = i + 1 + index * 5;
                                const hour = index === 0 ? 7 + i : 13 + i;
                                return (
                                    <p key={period} className="schedule_note-item">
                                        Tiết {period}: {String(hour).padStart(2, 0)}h{index === 0 ? "30" : "00"}
                                    </p>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </PrimaryLayout>
    );
}