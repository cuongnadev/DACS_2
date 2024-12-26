import { Image, Search } from "@/Components";
import Dropdown from "@/components/common/dropdown/Dropdown";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

const Header = ({title, search}) => {
    const page = usePage();
    const user = page.props.auth.user;

    const [avatarUrl, setAvatarUrl] = useState(null);

    const getUrlImage = async () => {
        try {
            const response = await axios.get(route('account.getImage'));

            if (response.status === 200) {
                return response.data.url;
            }
        } catch (e) {
            console.error(e);
            return null;
        }
    };

    useEffect(() => {
        const fetchAvatar = async () => {
            const url = await getUrlImage();
            setAvatarUrl(url);
        };

        fetchAvatar();
    }, [user.id]);
    
    return (
        <header className="header_container flex items-center justify-between">
            {/* title */}
            <h2 className="header_title">{title}</h2>
            
            {/* actions */}
            <div className="header_actions flex items-center">
                {search && <Search />}

                {/* profile */}
                <div className="header_actions-profile flex items-center gap-2">
                    <div className="header_actions-user flex flex-col items-end gap-1">
                        <p className="header_actions-name">{user.name}</p>
                        <p className="header_actions-role">
                            {user.role === "Admin" ? user.role : 
                            user.role === "Student" ? "Sinh viên" : "Giáo viên"}
                        </p>
                    </div>
                    <div className="relative">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <figure><Image src={avatarUrl} className="header_actions-avatar"/></figure>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route('account.index')} method="get" as="button">
                                    Tài khoản
                                </Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Đăng xuất
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;