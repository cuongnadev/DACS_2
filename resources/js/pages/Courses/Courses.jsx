import { Button, CoursesCreate, CoursesForm, PlusIcon } from "@/components";
import { PrimaryLayout } from "@/Layouts";
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage } from "@inertiajs/react";
import React, { useState } from "react";

export default function Courses({ courses, courseClassesRegister, semester }) {
    const page = usePage();
    const user = page.props.auth.user;
    const [created, setCreated] = useState(false);
    const [modify, setModify] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.patch(route('sv.courses.confirm'), {
            data: courseClassesRegister.map(item => item.id)
        });
    }

    const handleModify = (e, course) => {
        e.preventDefault();
        
        setModify(course);
    }

    return (
        <PrimaryLayout
            title={`${user.role === "Student" ? "Đăng ký" : "Tạo"} học phần`}
        >
            <Head title="Courses" />
            <div className="courses_container flex flex-col items-start justify-start gap-6">
                {user.role === "Student" && courseClassesRegister.length > 0 &&
                <Button filled small className={'courses_confirm'} onClick={(e) => handleSubmit(e)}>Xác nhận</Button>}
                {user.role === "Student" ? (
                    semester.is_open ? 
                    (<React.Fragment>
                        {/* registered courses */}
                        <CoursesForm 
                            title={"Học phần đã đăng ký"} 
                            courses={courseClassesRegister}
                            typeAction={ "cancel" }
                        />
    
                        {/* available courses */}
                        <CoursesForm 
                            title={"Đăng ký học phần"} 
                            courses={courses}
                            typeAction={ "view" }
                            isCourse={true}
                        />
                    </React.Fragment>
                    ) : (
                        <p>Hiện tại không thể đăng ký!</p>
                    )
                ) : (
                    <React.Fragment>
                            <Button 
                                filled 
                                leftIcon={<PlusIcon width="12px" height="12px" />}
                                className={"courses_create-btn flex items-center gap-2"}
                                onClick={() => setCreated(true)}
                            >
                                Tạo học phần
                            </Button>
                            <CoursesForm 
                                title={"Danh sách học phần"} 
                                courses={courses} 
                                typeAction={ "more" }
                                isCourse={true}
                                modify={(e, id) => handleModify(e, id)}
                            />
                        {created && 
                            <div className="create-courses_container flex items-center justify-center" onClick={() => setCreated(false)}>
                                <CoursesCreate 
                                    onClose={() => setCreated(false)}
                                />
                            </div>
                        }
                        {modify && 
                            <div className="create-courses_container flex items-center justify-center" onClick={() => setModify(null)}>
                                <CoursesCreate 
                                    onClose={() => setModify(null)}
                                    isModify={true}
                                    dataModify={modify}
                                />
                            </div>
                        }
                    </React.Fragment>
                )}
            </div> 
        </PrimaryLayout>
    );
}