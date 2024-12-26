import { useForm } from "@inertiajs/react";
import { Button, Input } from "..";
import axios from "axios";
import { useEffect, useState } from "react";
import { exportScore } from "@/utils";


const EnterScores = ({ courseClassData }) => {
    const[isEnabled, setIsEnabled] = useState(courseClassData.course_class.is_enabled);
    const[isLocked, setIsLocked] = useState(courseClassData.course_class.is_locked);
    
    
    const { data, setData } = useForm({
        attendance: courseClassData.scoresData.map((element) => element.attendance || ""),
        assignment: courseClassData.scoresData.map((element) => element.assignment || ""),
        midTerm: courseClassData.scoresData.map((element) => element.mid_term || ""),
        final: courseClassData.scoresData.map((element) => element.final || ""),
    });

    useEffect(() => {
        setIsEnabled(courseClassData.course_class.is_enabled);
        setIsLocked(courseClassData.course_class.is_locked);

        setData({
            attendance: courseClassData.scoresData.map((element) => element.attendance || ""),
            assignment: courseClassData.scoresData.map((element) => element.assignment || ""),
            midTerm: courseClassData.scoresData.map((element) => element.mid_term || ""),
            final: courseClassData.scoresData.map((element) => element.final || ""),
        });
    }, [courseClassData]);

    const handleChange = (e, key, label) => {
        const updatedField = [...data[label]];
        updatedField[key] = e.target.value;
        setData(label, updatedField);
    }

    const handleStore = async (e) => {
        e.preventDefault();

        const response = await axios.patch(`/gv/scores/update/${courseClassData.course_class.id}`, data, {
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })

        if (response.status === 200) {
            alert(response.data.message);
        } else {
            alert('Đã xảy ra lỗi. Vui lòng thử lại!');
        }
    }

    const handleConfirm = async (e) => {
        e.preventDefault();
        
        const response = await axios.patch(`/gv/scores/confirm/${courseClassData.course_class.id}`, data, {
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })

        if (response.status === 200) {
            alert(response.data.message);
            setIsEnabled(!courseClassData.course_class.is_enabled);
        } else {
            alert('Đã xảy ra lỗi. Vui lòng thử lại!');
        }
    }

    return (
        <div className="enter-scores_container flex flex-col justify-start gap-6">
            <div className="scores_box-container enter-scores_table flex flex-col items-center justify-start gap-4">
                <h3 className="scores_title">{courseClassData.course_class.name}</h3>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã sinh viên</th>
                            <th>Họ và tên</th>
                            <th>Điểm CC</th>
                            <th>Điểm bài tập</th>
                            <th>Điểm giữa kỳ</th>
                            <th>Điểm cuối kỳ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseClassData.scoresData.map((element, key) => (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{element.student.student_code}</td>
                                <td className="name">{element.student.user.name}</td>
                                <td>
                                    <Input 
                                        id="attendance"
                                        name="attendance"
                                        value={data.attendance[key]}
                                        className={`enter-scores_input ${isLocked && "disabled"}`}
                                        autoComplete="attendance"
                                        onChange={(e) => handleChange(e, key, "attendance")}
                                        disabled={isLocked}
                                    />
                                </td>
                                <td>
                                    <Input 
                                        id="assignment"
                                        name="assignment"
                                        value={data.assignment[key]}
                                        className={`enter-scores_input ${isLocked && "disabled"}`}
                                        autoComplete="assignment"
                                        onChange={(e) => handleChange(e, key, "assignment")}
                                        disabled={isLocked}
                                    />
                                </td>
                                <td>
                                    <Input 
                                        id="midTerm"
                                        name="midTerm"
                                        value={data.midTerm[key]}
                                        className={`enter-scores_input ${isLocked && "disabled"}`}
                                        autoComplete="midTerm"
                                        onChange={(e) => handleChange(e, key, "midTerm")}
                                        disabled={isLocked}
                                    />
                                </td>
                                <td>
                                    <Input 
                                        id="final"
                                        name="final"
                                        value={data.final[key]}
                                        className={`enter-scores_input ${(!isEnabled || isLocked) && "disabled"}`}
                                        autoComplete="final"
                                        onChange={(e) => handleChange(e, key, "final")}
                                        disabled={!isEnabled || isLocked}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-end gap-4">
                <Button className={"enter-scores_btn"} outline onClick={() => exportScore(courseClassData.scoresData, courseClassData.course_class.name)}>Xuất điểm</Button>
                {!isLocked && <Button className={"enter-scores_btn"} outline onClick={(e) => handleStore(e)}>Lưu Điểm</Button>}
                {!!isEnabled && <Button className={"enter-scores_btn"} filled onClick={(e) => handleConfirm(e)}>XN Điểm</Button>}
            </div>
        </div>
    );
}

export default EnterScores;