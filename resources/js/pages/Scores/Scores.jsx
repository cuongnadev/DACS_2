import { Button, EnterScores, ViewScores } from '@/components';
import { PrimaryLayout } from '@/Layouts';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';

export default function Scores({ courseClassesData, studentData, teacherData }) {
    const page = usePage();
    const user = page.props.auth.user;
    const [selectedClass, setSelectedClass] = useState(null);
    const [teachers, setTeachers] = useState(teacherData);

    const handleClassClick =  (classData) => {
        setSelectedClass(classData);
    }

    const handleIsEnabled = async (e, courseClass) => {
        e.preventDefault();

        try {
            const response = await axios.patch(`/admin/course-classes/enabled/${courseClass.id}`, null, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })

            if (response.status === 200) {
                alert(response.data.success);

                setTeachers(teachers => teachers.map(teacher => ({
                    ...teacher,
                    course_classes: teacher.course_classes.map(cls => 
                        cls.id === courseClass.id ? { ...cls, is_enabled: !cls.is_enabled } : cls
                    ),
                })));
            } else {
                alert('Đã xảy ra lỗi. Vui lòng thử lại!');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again.');
        }
    };    

    const handleIsLocked = async (e, courseClass) => {
        e.preventDefault();

        try {
            const response = await axios.patch(`/admin/course-classes/locked/${courseClass.id}`, null, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })

            if (response.status === 200) {
                alert(response.data.success);

                setTeachers(teachers => teachers.map(teacher => ({
                        ...teacher,
                        course_classes: teacher.course_classes.map(
                            cls => cls.id === courseClass.id ? {...cls, is_enabled: false, is_locked: !cls.is_locked} : cls
                        ),
                    })));
            } else {
                alert('Đã xảy ra lỗi. Vui lòng thử lại!');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again.');
        }
    }

    return (
        <PrimaryLayout title={user.role === "Student" ? "Kết quả học tập" : user.role === "Teacher" ? "Nhập điểm" : "Quản lý nhập điểm"}>
            <Head title="Scores" />
            <div className='scores_container'>
                {user.role === 'Student' ? ( 
                    <ViewScores scoreData={Object.values(studentData)} /> 
                ) : user.role === 'Teacher' ? ( 
                    <div className='scores_content flex flex-col items-start gap-6'>
                        <div className='scores_box-container flex flex-col items-start gap-4'>
                            <h3 className='scores_title'>Các lớp học phần</h3>
                            <div className='scores_class-items'>
                                {courseClassesData.map(( courseClassData ) => (
                                    <div key={courseClassData.course_classes_id} className='scores_class-item flex items-center justify-between gap-6'>
                                        <div className='flex items-center gap-6'>
                                            <p>#{courseClassData.course_classes_id}</p>
                                            <p className='name'>{courseClassData.course_class.name}</p>
                                            <p>{courseClassData.scoresData.length}</p>
                                        </div>
                                        <Button
                                            className={'scores_class-btn'}
                                            outline={selectedClass?.course_classes_id !== courseClassData.course_classes_id}
                                            filled={selectedClass?.course_classes_id === courseClassData.course_classes_id}
                                            onClick={() => handleClassClick(courseClassData)}
                                        >
                                            Nhập điểm
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {selectedClass && <EnterScores courseClassData={selectedClass}/>}
                    </div>
                ) : (
                    <div className='scores_content flex flex-col items-start gap-6'>
                        {teachers.map(( teacher ) => (
                            <div className='scores_box-container flex flex-col items-start gap-4' key={teacher.id}>
                                <h3 className='scores_title'>{teacher.name}</h3>
                                <div className='scores_class-items'>
                                    {teacher.course_classes.map(( courseClass ) => (
                                        <div key={courseClass.id} className='scores_class-item flex items-center justify-between gap-6'>
                                            <div className='flex items-center gap-6'>
                                                <p>#{courseClass.id}</p>
                                                <p className='name'>{courseClass.name}</p>
                                            </div>
                                            <div className='flex items-center gap-4'>
                                                <Button
                                                    className={'scores_class-btn'}
                                                    outline={!courseClass.is_enabled}
                                                    filled={!!courseClass.is_enabled} 
                                                    disable={!!courseClass.is_locked}
                                                    onClick={(e) => handleIsEnabled(e, courseClass)}
                                                >
                                                    {courseClass.is_enabled ? "Đóng XN" : "Mở XN"}
                                                </Button>
                                                <Button
                                                    className={'scores_class-btn'}
                                                    outline={!courseClass.is_locked}
                                                    filled={!!courseClass.is_locked}
                                                    onClick={(e) => handleIsLocked(e, courseClass)}
                                                >
                                                    {courseClass.is_locked ? "Mở điểm" : "Khóa điểm"}
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </PrimaryLayout>
    );
}