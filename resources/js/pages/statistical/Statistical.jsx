import { PrimaryLayout } from "@/layouts";
import { Head } from "@inertiajs/react";
import MyBarChart from "./MyBarChart";
import MyPieChart from "./MyPieChart";

const data1 = [
    { name: 'Xuất sắc', value: 40 },
    { name: 'Giỏi', value: 14 },
    { name: 'Khá', value: 30 },
    { name: 'Trung bình', value: 12 },
    { name: 'Yếu', value: 6 },
];

const Statistical = ({ data }) => {
    return (
        <PrimaryLayout title={"Thống kê báo cáo"}>
            <Head title="Statistical" />
            <div className="statistical_container flex flex-col justify-start items-start gap-6">
                <div className="statistical_item flex flex-col gap-4">
                    <div className="statistical_title"><h2>Thống kê học sinh</h2></div>
                    <div className="ststistical_student flex flex-col items-start justify-start gap-4">
                        <div className="flex justify-start items-center gap-4">
                            <MyPieChart data={data1} title={"Tỷ lệ học lực sinh viên"} />
                            <MyPieChart data={data.dataSex} title={"Phân bố giới tính sinh viên"} />
                        </div>
                        <MyBarChart data={data.dataStudentMajor} title={"Phân bổ số lượng học sinh theo chuyên ngành"} />
                    </div>
                </div>

                <div className="statistical_item flex flex-col gap-4">
                    <div className="statistical_title"><h2>Thống kê giảng viên</h2></div>
                    <div className="ststistical_teacher flex flex-col items-start justify-start gap-4">
                        <MyBarChart data={data.dataTeacherMajor} title={"Phân bổ số lượng giảng viên theo chuyên ngành"} />
                    </div>
                </div>
            </div>
        </PrimaryLayout>
    );
};

export default Statistical;
