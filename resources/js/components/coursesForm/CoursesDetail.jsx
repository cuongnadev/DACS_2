import { CoursesForm } from "..";

const CoursesDetail = ({ dateRegisters, course, onClose }) => {
    
    return (
        <div className="courses-detail_container flex items-start justify-center" onClick={() => onClose()}>
            <div className="courses-detail_content" onClick={(e) => e.stopPropagation()}>
                <CoursesForm 
                    title={`Danh sách các lớp học phần: ${course.name}`} 
                    courses={course.course_classes} 
                    typeAction={"register"} 
                    dateRegisters={dateRegisters}
                />
            </div>
        </div>
    );
}

export default CoursesDetail;