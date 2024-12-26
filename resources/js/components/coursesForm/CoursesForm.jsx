import React, { useState } from "react";
import { Button, CoursesDetail, DotsIcon } from "..";
import { Dropdown } from "../common/dropdown";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import axios from "axios";

const CoursesForm = ({ title, typeAction, modify, setCreated, courses, isCourse, onShowDSSV }) => {
    const user = usePage().props.auth.user;
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleRegister = (courseId) => {
        Inertia.post(route('sv.courses.register'), { courseId: courseId })
    }

    const handleDelete = (e, id) => {
        e.preventDefault();

        if(isCourse) {
            Inertia.delete(`/admin/courses/${id}`, {
                onSuccess: () => {
                    alert('Delete course successfully!');
                },
                onError: (errors) => {
                    console.error(errors);
                    alert('Failed to delete course.');
                }
            });
        } else {
            Inertia.delete(`/admin/course-classes/${id}`, {
                onSuccess: () => {
                    alert('Delete course class successfully!');
                },
                onError: (errors) => {
                    console.error(errors);
                    alert('Failed to delete course class.');
                }
            });
        }
    }

    const handleCancel = (id) => {
        Inertia.delete(`/sv/courses/cancel/${id}`, {
            onSuccess: () => {
                alert('Student cancel course successfully!');
            },
            onError: (errors) => {
                console.error(errors);
                alert('Failed to cancel course.');
            }
        });
    }

    const handleShowDSSV = async (e, course) => {
        e.preventDefault();
        
        try {
            const response = await axios.get(`/${user.role === "Admin" ? 'admin' : 'gv'}/course-classes/${course.id}`);

            if(response.status === 200) {
                onShowDSSV(e, response.data.students);
            } else {
                onShowDSSV(e, []);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to show list Student.');
        }
    }

    const handleAction = ( course ) => {
        switch (typeAction) {
            case "cancel":
                handleCancel(course.id)
                break;
            case "view":
                setSelectedCourse(course);
                break;
            case "register":
                handleRegister(course.id);
                break;
            default:
                break;
        }
    }

    const renderActionButton = (course) => {
        switch (typeAction) {
            case "view":
                return <Button filled small onClick={() => handleAction(course)}>Xem</Button>;
            case "cancel":
                return <Button filled small onClick={() => handleAction(course)}>Hủy</Button>;
            case "register":
                if(course.num_registered == course.class_size) {
                    return <p className="courses_label">{`HP đã đầy ${course.num_registered}/${course.class_size}`}</p>;
                } else {
                    return <Button filled small onClick={() => handleAction(course)} disable={course.isClash}>Đăng ký</Button>;
                }
            case "more":
                return (
                    <Dropdown className="courses_dropdown">
                        <Dropdown.Trigger className="courses_dropdown-trigger">
                            <DotsIcon width="18px" height="18px" className="courses_more-btn" />
                        </Dropdown.Trigger>
                        <Dropdown.Content width="100px" className="courses_dropdown-content">
                            {user.role === "Admin" ? (
                            <>
                                <Dropdown.Link
                                    className="courses_dropdown-link"
                                    onClick={(e) => handleDelete(e, course.id)}
                                >
                                    <p>Xóa</p>
                                </Dropdown.Link><Dropdown.Link
                                    className="courses_dropdown-link"
                                    onClick={(e) => modify(e, course)}
                                >
                                        <p>Sửa</p>
                                    </Dropdown.Link>
                                </> ) : null}
                            {!isCourse && 
                            <Dropdown.Link
                                className="courses_dropdown-link"
                                onClick={(e) => handleShowDSSV(e, course)}
                            >
                                <p>DSSV</p>
                            </Dropdown.Link> }
                        </Dropdown.Content>
                    </Dropdown>
                );
            default:
                return null;
        }
    }

    return (
        <React.Fragment>
            <div className="courses_form">
                <div className="courses_title flex items-center justify-between">
                    <h3>{title}</h3>
                    {user.role === "Admin" && !isCourse  && <Button 
                        small
                        filled
                        className={"courses_create-btn flex items-center gap-2"}
                        onClick={() => setCreated()}
                    >
                        Thêm lớp học phần
                    </Button>}
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th className="courses_name">{isCourse ? "Tên học phần" : "Tên lớp học phần"}</th>
                            {(!isCourse) ? <th>Sỉ số</th> : null}
                            {(user.role === "Student" || user.role === "Teacher") && (!isCourse) ? <th>SL Đăng ký</th> : null}
                            <th>Số tín chỉ</th>
                            <th>Phòng</th>
                            <th>Thứ/Tiết</th>
                            <th>Tùy chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td className="courses_name">{course.name}</td>
                                {(!isCourse) ? <td>{course.class_size ?? course.course.class_size}</td> : null}
                                {(user.role === "Student" || user.role === "Teacher") && 
                                (!isCourse) ? <td>{`${course.num_registered ?? course.course.num_registered}/${course.class_size ?? course.course.class_size}`}</td> : null}
                                <td className="courses_credits">
                                    {course.credits ?? course.course.credits ?? <DotsIcon width="18px" height="18px"/>}
                                </td>
                                <td className="courses_room">
                                    {course.room ?? course.course_classes.room ?? <DotsIcon width="18px" height="18px"/>}
                                </td>
                                <td className="courses_schedule">
                                    {course.day_of_week && course.period ? `${course.day_of_week}/${course.period}` : <DotsIcon width="18px" height="18px"/>}
                                </td>
                                <td className="courses_action">
                                   { renderActionButton(course) }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedCourse && <CoursesDetail course={selectedCourse} onClose={() => setSelectedCourse(null)} />}
        </React.Fragment>
    );
};

export default CoursesForm;