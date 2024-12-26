import React from "react";

const ViewScores = ({ scoreData }) => {
    return (
        <div className="view-scores_container flex flex-col items-start justify-start gap-6">
            {/* summary score */}
            <div className="scores_box-container summary flex flex-col items-center justify-start gap-4">
                <h3 className="scores_title">Điểm tổng kết</h3>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Học kỳ</th>
                            <th>Số TC-ĐK</th>
                            <th>Điểm T4</th>
                            <th>Điểm T10</th>
                            <th>Điểm HB</th>
                            <th>TC TL HK</th>
                            <th>Xếp loại</th>
                            <th>Điểm T4 TL</th>
                            <th>Điểm T10 TL</th>
                            <th>TC tích lũy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scoreData.map((score, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{score.semester}</td>
                                <td>{score.credits}</td>
                                <td>{score.t4Score}</td>
                                <td>{score.t10Score}</td>
                                <td>{score.t10Score}</td>
                                <td>{score.tctlhk}</td>
                                <td>{score.rank}</td>
                                <td>{score.t4tl}</td>
                                <td>{score.t10tl}</td>
                                <td>{score.tctl}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* courses score */}
            <div className="scores_box-container courses flex flex-col items-center justify-start gap-4">
                <h3 className="scores_title">Điểm các học phần</h3>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th className="name">Tên lớp học phần</th>
                            <th>Số TC</th>
                            <th>Điểm CC</th>
                            <th>Điểm bài tập</th>
                            <th>Điểm giữa kỳ</th>
                            <th>Điểm cuối kỳ</th>
                            <th>Điểm T10</th>
                            <th>Điểm chữ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scoreData.map((score, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td colSpan={9} className="label">{score.semester}</td>
                                </tr>
                                {score.courses.map((course, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className="name">{course.course_class.name}</td>
                                        <td>{course.course_class.course.credits}</td>
                                        <td>{course.attendance}</td>
                                        <td>{course.assignment}</td>
                                        <td>{course.mid_term}</td>
                                        <td>{course.final}</td>
                                        <td>{course.t10Score}</td>
                                        <td>{course.grade}</td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewScores;