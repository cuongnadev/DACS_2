import { PersonalInfo } from "..";

const FamilyMember = ({ relation, member, isEdit, setData }) => {
    const fields = [
        { key: "name", label: "Họ và tên", value: member.name },
        { key: "date", label: "Ngày sinh", value: member.date },
        { key: "ethnic", label: "Dân tộc", value: member.ethnic },
        { key: "education_level", label: "Trình độ học vấn", value: member.education_level },
        { key: "job", label: "Nghề nghiệp", value: member.job },
        { key: "residence", label: "Nơi ở", value: member.residence },
        { key: "email", label: "Email", value: member.email },
        { key: "phone", label: "Điện thoại", value: member.phone },
    ];

    return (
        <table className="family-member">
            <tbody>
                <tr>
                    <td className="profile-details_form-title">{relation}</td>
                </tr>
                {fields.map((field, index) => (
                    <PersonalInfo key={index}
                        dataEdit={isEdit ? [
                            {key: field.key, setData}
                        ] : null}
                        items={[
                            {label: field.label, value: field.value},
                        ]} 
                    />
                ))}
            </tbody>
        </table>
    );
};

export default FamilyMember;
