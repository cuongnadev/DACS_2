import { usePage } from "@inertiajs/react";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Button, CallIcon, DotsIcon, EmailIcon, Image } from "..";
import Dropdown from "../common/dropdown/Dropdown";
import { Inertia } from "@inertiajs/inertia";

const TeacherItem = ({teacher}) => {
    const page = usePage();
    const user = page.props.auth.user;

    const handleDelete = (e) => {
        e.preventDefault();

        Inertia.delete(`/admin/teachers/${teacher.id}`, {
            onSuccess: () => {
                alert('Teacher deleted successfully!');
            },
            onError: (errors) => {
                console.error(errors);
                alert('Failed to delete teacher.');
            }
        });
    }

    return (
        <div className="teacher-item_box flex flex-col items-center gap-4">
            {/* avatar */}
            <Image className="teacher-item_avatar" src={teacher.image_url}/>

            {/* info (name, major) */}
            <div className="teacher-item_info flex flex-col items-center gap-1">
                <h3 className="teacher-item_name">{teacher.user.name}</h3> 
                <p className="teacher-item_major">{teacher.major}</p>
            </div>

            {/* contact */}
            <div className="teacher-item_contacts flex items-center gap-2">
                <Tippy content={teacher.phone}>
                    <Button className={'teacher-item_contact-btn'} rounded filled leftIcon={<CallIcon width="18px" height="18px"/>}/>
                </Tippy>
                <Tippy content={teacher.user.email}>
                    <Button className={'teacher-item_contact-btn'} rounded filled leftIcon={<EmailIcon width="18px" height="18px"/>}/>
                </Tippy>
            </div>

            {/* more action */}
            {user.role === "Admin" && <Dropdown className="teacher-item_dropdown">
                <Dropdown.Trigger className="teacher-item_dropdown-trigger">
                    <Button className={"teacher-item_more-btn"} rounded leftIcon={<DotsIcon width="16px" height="16px"/>} />
                </Dropdown.Trigger>
                <Dropdown.Content width="100px" className="teacher-item_dropdown-content">
                    <Dropdown.Link className="teacher-item_dropdown-link" onClick={(e) => handleDelete(e)}>
                        <p>Xóa</p>
                    </Dropdown.Link>
                    {/* <Dropdown.Link className="teacher-item_dropdown-link">
                        <p>Sửa</p>
                    </Dropdown.Link> */}
                </Dropdown.Content>
            </Dropdown>}

            {user.role !== 'Admin' &&
                <Button className={"teacher-item_more-btn disabled"} rounded leftIcon={<DotsIcon width="16px" height="16px"/>} disable/>
            }
        </div>
    );
}

export default TeacherItem;