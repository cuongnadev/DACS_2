import { Pagination, StudentItem, Toolbar } from "@/Components";
import { PrimaryLayout } from "@/Layouts";
import { Head, usePage } from "@inertiajs/react";
import { Checkbox } from "@/components/common";
import { useState } from "react";
import axios from "axios";

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

const Student = ({ students, years, selectedYear }) => {
    const user = usePage().props.auth.user;
    const baseUrl =
        user.role === "Admin"
            ? "/admin/students"
            : user.role === "Teacher"
            ? "/gv/students"
            : "/sv/students";
    const [currentYear, setCurrentYear] = useState(years[0]);
    const [filteredStudents, setFilteredStudents] = useState(students.data);
    const [studentTotal, setStudentTotal] = useState(students.total);
    const [studentCurrentPage, setStudentCurrentPage] = useState(students.current_page);
    const [studentLastPage, setStudentLastPage] = useState(students.last_page);

    const handleSearch = (valueStudents) => {
        if (valueStudents.total > 0) {
            setFilteredStudents(valueStudents.data);
            setStudentTotal(valueStudents.total);
            setStudentCurrentPage(valueStudents.current_page);
            window.history.pushState(null, "", `${baseUrl}?page=1`);
        } else {
            setFilteredStudents(students.data);
            setStudentTotal(students.total);
            setStudentCurrentPage(1);
            window.history.pushState(null, "", `${baseUrl}?page=1`);
        }
    };

    const handleSorted = (students, year) => {
        setFilteredStudents(students.data);
        setStudentTotal(students.total);
        setStudentCurrentPage(students.current_page);
        setStudentLastPage(students.last_page);
        window.history.pushState(null, "", `${baseUrl}?page=${students.current_page}`);

        setCurrentYear(year);
    };

    const handlePageChange = async (page) => {
        try {
            const response = await axios.get(`${baseUrl}?page=${page}&year=${currentYear}`);

            const { students } = response.data;
            setFilteredStudents(students.data);
            setStudentTotal(students.total);
            setStudentCurrentPage(page);

            window.history.pushState(null, "", `${baseUrl}?page=${page}`);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    return (
        <PrimaryLayout title={"Danh sách sinh viên"}>
            <Head title="Students" />
            <div className="students_container flex flex-col justify-start gap-8">
                <Toolbar
                    role={usePage().props.auth.user.role}
                    pageType={"Student"}
                    onSearch={handleSearch}
                    onSorted={handleSorted}
                    initialYears={years}
                    initialSelectedYear={selectedYear}
                />
                <div className="students_list flex flex-col gap-8">
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
                            {filteredStudents.length > 0 &&
                                filteredStudents.map((student) => (
                                    <StudentItem
                                        key={student.id}
                                        child={student}
                                    />
                                ))}
                        </tbody>
                    </table>

                    {studentTotal > students.per_page && (
                        <Pagination
                            className={"students_pagination"}
                            currentPage={studentCurrentPage}
                            totalPage={studentLastPage}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
        </PrimaryLayout>
    );
};

export default Student;
