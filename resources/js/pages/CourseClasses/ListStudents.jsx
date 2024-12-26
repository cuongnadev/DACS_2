import { Checkbox, StudentItem } from "@/components";

const TitlesList = [
    "Họ và tên",
    "Mã sinh viên",
    "Ngày sinh",
    "Số điện thoại",
    "Nơi sinh",
    "Email",
    "Lớp",
    "Chức năng",
];

export default function ListStudents ({ data }) {

    return (
        <div className="students_list flex flex-col gap-8" 
            onClick={(e) => e.stopPropagation()}
        >
            <table className="students_table">
                <thead>
                    <tr>
                        <th>
                            <Checkbox className="students_checkbox all" />
                        </th>
                        {TitlesList.map((title, index) => (
                            <th key={index}>{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 &&
                        data.map((student) => (
                            <StudentItem
                                key={student.id}
                                child={student}
                            />
                        ))}
                </tbody>
            </table>
        </div>
    );
}