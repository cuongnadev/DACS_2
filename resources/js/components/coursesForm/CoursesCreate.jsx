import { useForm } from "@inertiajs/react";
import { Button, Input, InputLabel } from "..";

const CoursesCreate = ({ isClassCourses, courses, onClose, isModify, dataModify, teacherId, semester }) => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;

    const { data, setData, post, patch, reset } = useForm({
        nameCourse: isModify ? dataModify.name : '',
        nameCourseClass: (isModify && isClassCourses) ? dataModify.name : '',
        period: (isModify && isClassCourses) ? dataModify.period : '',
        periods: isModify ? dataModify.num_of_periods : '',
        credits: isModify ? dataModify.credits : '',
        room: (isModify && isClassCourses) ? dataModify.room : '',
        classSize: (isModify && isClassCourses) ? dataModify.class_size : '',
        dayOfWeek: (isModify && isClassCourses) ? dataModify.day_of_week : '',
        semester: (isModify && isClassCourses) ? dataModify?.semester : semester?.name,
        course: (isModify && isClassCourses) ? dataModify.course_id : '',
        teacherId: isClassCourses ? teacherId : ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(isClassCourses ? route("admin.courseClasses.add") : route("admin.courses.add"), {
            onSuccess: () => {
                reset();
                onClose();
            },
            onError: (errors) => console.log(errors),
        });
    }

    const handleModify = (e) => {
        e.preventDefault();

        if(isClassCourses) {
            patch(route("admin.courseClasses.modify", dataModify.id), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
                onError: (errors) => console.log(errors),
            });
        } else {
            patch(route("admin.courses.modify", dataModify.id), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
                onError: (errors) => console.log(errors),
            });
        }
    }

    return (
        <div className="courses-create_form flex flex-col items-start justify-start" 
            onClick={(e) => e.stopPropagation()}
        >
            <h3 className="courses_title">
                {isClassCourses ? 
                    isModify ? "Cập nhật lớp học phần" : "Tạo lớp học phần" : 
                    isModify ? "Cập nhật học phần" : "Tạo học phần"}
            </h3>
            {isClassCourses ? 
            (<form className="flex flex-col gap-4" 
                onSubmit={isModify ? (e) => handleModify(e) : (e) => handleSubmit(e)}
            >
                <div className={"form-group"}>
                    <InputLabel className="add_label" htmlFor="course" value="Học phần*" />
                    <select
                        id="course"
                        name="course"
                        value={data.course}
                        className="add_input mt-2"
                        onChange={handleChange}
                        required
                    >
                        <option value="">Chọn học phần</option>
                        {courses.map((course, index) => (
                            <option value={course.id} key={index}>{course.name}</option>
                        ))}
                    </select>
                </div>
                {[
                    { label: "Tên lớp học phần*", id: "nameCourseClass", placeholder: "Nhập tên lớp học phần" },
                    { label: "Phòng*", id: "room", placeholder: "Nhập phòng học" },
                    { label: "Thứ*", id: "dayOfWeek", placeholder: "Nhập ngày học" },
                    { label: "Tiết*", id: "period", placeholder: "Nhập tiết học" },
                    { label: "Sỉ số*", id: "classSize", placeholder: "Nhập sỉ số lớp" },
                    { label: "Học kỳ*", id: "semester", placeholder: data.semester }
                ].map(({ label, id, placeholder }) => (
                    <div className="form-group" key={id}>
                        <InputLabel className="add_label" htmlFor={id} value={label} />
                        <Input
                            id={id}
                            name={id}
                            value={data[id]}
                            className={"add_input mt-2"}
                            autoComplete={id}
                            onChange={handleChange}
                            placeholder={placeholder}
                            required
                        />
                    </div>
                ))}
                <Button filled small className={"courses_create-btn"} >{isModify ? "Cập nhật": "Xác nhận"}</Button>
            </form>
            ) : (
            <form className="flex flex-col gap-4" 
                onSubmit={isModify ? (e) => handleModify(e) :(e) => handleSubmit(e)}
            >
                {[
                    { label: "Tên học phần*", id: "nameCourse", placeholder: "Nhập tên học phần" },
                    { label: "Số tín chỉ*", id: "credits", placeholder: "Nhập số tín chỉ" },
                    { label: "Tổng số tiết*", id: "periods", placeholder: "Nhập số tiết" }
                ].map(({ label, id, placeholder }) => (
                    <div className="form-group" key={id}>
                        <InputLabel className="add_label" htmlFor={id} value={label} />
                        <Input
                            id={id}
                            name={id}
                            value={data[id]}
                            className={"add_input mt-2"}
                            autoComplete={id}
                            onChange={handleChange}
                            placeholder={placeholder}
                            required
                        />
                    </div>
                ))}
                <Button filled small className={"courses_create-btn"} >{isModify ? "Cập nhật": "Xác nhận"}</Button>
            </form>)}
        </div>
    );
};

export default CoursesCreate;