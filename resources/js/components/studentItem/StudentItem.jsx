import { useState } from "react";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Button, DotsIcon, EmailIcon, Image } from "..";
import { Checkbox } from "../common";
import Dropdown from "../common/dropdown/Dropdown";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";

const StudentItem = ({ child }) => {
    const page = usePage();
    const user = page.props.auth.user;
    
    const [checked, setChecked] = useState(false);

    const handleChecked = () => {
        setChecked(!checked);
    }

    const handleDelete = (e) => {
        Inertia.delete(`/admin/students/${child.id}`, {
            onSuccess: () => {
                alert('Student deleted successfully!');
            },
            onError: (errors) => {
                console.error(errors);
                alert('Failed to delete student.');
            }
        });
    }

    return (
        <tr className={`student_item-container ${checked ? 'checked' : ''}`}>
            <td><Checkbox className='students_checkbox' onChange={handleChecked}/></td>
            <td className="student_header">
                <div className="flex items-center justify-start gap-2">
                    <Image src={child.image_url} className="student_avatar"/>
                    <Tippy content={child.user.name}>
                        <p className="student_name">{child.user.name}</p>
                    </Tippy>
                </div>
            </td>
            <td className="student_id"><p>#{child.student_code}</p></td>
            <td className="student_birth"><p>{child.dob}</p></td>
            <td className="student_phone"><p>{child.phone}</p></td>
            <td className="student_city"><p>{child.pob}</p></td>
            <td className="student_contact">
                <Tippy content={child.user.email}>
                    <Button 
                        rounded 
                        className={"student_contact-btn flex items-center justify-center"} 
                        leftIcon={<EmailIcon width="20px" height="20px" className="student_contact-icon"/>}
                    />
                </Tippy>
            </td>
            <td>
                <span className={`student_grade flex items-center justify-center`}><p>{child.grade}</p></span>
            </td>
            <td className="student_action">
                {user.role === 'Admin' && <Dropdown className="student_dropdown">
                    <Dropdown.Trigger className="student_dropdown-trigger">
                        <Button 
                            rounded 
                            className={"student_more-btn flex items-center justify-center"} 
                            leftIcon={<DotsIcon width="20px" height="20px" className="student_more-icon"/>}
                        />
                    </Dropdown.Trigger>
                    <Dropdown.Content width="100px" className="student_dropdown-content">
                        <Dropdown.Link className="student_dropdown-link" onClick={(e) => handleDelete(e)}>
                            <p>Xóa</p>
                        </Dropdown.Link>
                        {/* <Dropdown.Link className="student_dropdown-link">
                            <p>Sửa</p>
                        </Dropdown.Link> */}
                    </Dropdown.Content>
                </Dropdown>}

                {user.role !== 'Admin' &&
                    <Button 
                        rounded 
                        className={"student_more-btn flex items-center justify-center"} 
                        leftIcon={<DotsIcon width="20px" height="20px" className="student_more-icon"/>}
                        disable={user.role !== 'Admin'}
                    />
                }
            </td>
        </tr>
    );
}

export default StudentItem;