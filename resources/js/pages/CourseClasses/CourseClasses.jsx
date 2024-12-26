import { Button, CoursesCreate, CoursesForm } from "@/components";
import { PrimaryLayout } from "@/Layouts";
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import ListStudents from "./ListStudents";

export default function CourseClasses({ courses, teachers, semester }) { 
    const user = usePage().props.auth.user;
    const [created, setCreated] = useState({ teacherId: null, status: false });
    const [modify, setModify] = useState(null);
    const [showListStudent, setShowListStudent] = useState(null);

    const handleCreate = (teacherId) => {
        setCreated({ teacherId, status: true });
    };

    const handleModify = (e, course) => {
        e.preventDefault();
        
        setModify(course);
    }

    const handleNewSemester = () => {
        Inertia.post(route('admin.semester.store'));
    };
    
    const hanldeOpenDKTC = () => {
        Inertia.patch(route('admin.semester.update'));
    };

    const handleShowDSSV = (e, data) => {
        e.preventDefault();
        
        setShowListStudent(data);
    };

    return (
        <PrimaryLayout
            title={"Lớp học phần"}
        >
            <Head title="CourseClasses" />
            <div className="courses_container flex flex-col items-start justify-start gap-6">
                {user.role === "Admin" && 
                    <div className="flex gap-4 justify-end">
                        <Button filled
                        onClick={() => handleNewSemester()}
                        >
                            Học kì mới
                        </Button>
                        <Button filled disable={semester ? false : true}
                            onClick={() => hanldeOpenDKTC()}
                        >
                            {`${semester ? semester.is_open ? 'Đóng' : 'Mở' : 'Mở'} ĐKTC`}
                        </Button>
                    </div>
                }
                <React.Fragment>
                    {teachers.map((teacher) => (
                        <CoursesForm 
                            key={teacher.id}
                            title={teacher.user.name} 
                            courses={teacher.course_classes}
                            typeAction={ "more" }
                            modify={(e, id) => handleModify(e, id)}
                            setCreated={() => handleCreate(teacher.id)}
                            onShowDSSV={(e, data) => handleShowDSSV(e, data)}
                        />
                    ))}
                    {created.status && 
                        <div className="create-courses_container flex items-center justify-center" onClick={() => setCreated(false)}>
                            <CoursesCreate 
                                isClassCourses={true} 
                                teacherId={created.teacherId}
                                courses={courses} 
                                onClose={() => setCreated(false)}
                                semester={semester}
                            />
                        </div>
                    }
                    {modify && 
                        <div className="create-courses_container flex items-center justify-center" onClick={() => setModify(null)}>
                            <CoursesCreate 
                                isClassCourses={true}
                                courses={courses}
                                onClose={() => setModify(null)}
                                isModify={true}
                                dataModify={modify}
                            />
                        </div>
                    }
                    {showListStudent && 
                        <div className="list-students_container flex justify-center items-center" 
                            onClick={() => setShowListStudent(null)}
                        >
                            <ListStudents data={showListStudent} />
                        </div>
                    }
                </React.Fragment>
            </div> 
        </PrimaryLayout>
    );
}