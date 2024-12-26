import { Pagination, TeacherItem, Toolbar } from '@/components';
import { PrimaryLayout } from '@/layouts';
import { Inertia } from '@inertiajs/inertia';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

export default function Teacher({ teachers }) {
    const user = usePage().props.auth.user;
    const baseUrl = user.role === "Admin" ? "/admin/teachers" : user.role === "Teacher" ? "/gv/teachers" : "/sv/teachers";
    const [filteredTeachers, setFilteredTeachers] = useState(teachers.data);
    const [teacherTotal, setTeacherTotal] = useState(teachers.total);
    const [teacherCurrentPage, setTeacherCurrentPage] = useState(teachers.current_page);
    const [teacherLastPage, setTeacherLastPage] = useState(teachers.last_page);
    
    const handlePageChange = async (page) => {
        try {
            const response = await axios.get(`${baseUrl}?page=${page}`);

            const { teachers } = response.data;
            setFilteredTeachers(teachers.data);
            setTeacherTotal(teachers.total);
            setTeacherCurrentPage(page);

            window.history.pushState(null, "", `${baseUrl}?page=${page}`);
        } catch (error) {
            console.error("Error fetching teachers:", error);
        }
    };

    const handleSearchValue = (valueTeachers) => {
        if(valueTeachers.total > 0) {
            setFilteredTeachers(valueTeachers.data);
            setTeacherTotal(valueTeachers.total);
            setTeacherCurrentPage(valueTeachers.current_page);
            window.history.pushState(null, "", `${baseUrl}?page=1`);
        } else {
            setFilteredTeachers(teachers.data);
            setTeacherTotal(teachers.total);
            setTeacherCurrentPage(1);
            window.history.pushState(null, "", `${baseUrl}?page=1`);
        }
    }

    return (
        <PrimaryLayout title={"Danh sách giáo viên"}>
            <Head title="Teachers" />
            <div className='teachers_container flex flex-col justify-start gap-8'>
                <Toolbar role={usePage().props.auth.user.role} pageType={"Teacher"} onSearch={handleSearchValue}/>

                {/* Danh sách giáo viên */}
                <div className='teachers_list'>
                    {filteredTeachers.length > 0 ? (
                        filteredTeachers.map((teacher) => (
                            <TeacherItem key={teacher.id} teacher={teacher} />
                        ))
                    ) : (
                        <p>No teachers found.</p>
                    )}
                </div>

                {/* Pagination */}
                {teacherTotal > teachers.per_page && 
                <Pagination
                    className={"teachers_pagination"}
                    currentPage={teacherCurrentPage}
                    totalPage={teacherLastPage}
                    onPageChange={handlePageChange}
                />}
            </div>
        </PrimaryLayout>
    );
}
