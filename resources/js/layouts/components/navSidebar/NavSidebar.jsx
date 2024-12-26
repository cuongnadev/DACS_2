import { ActivityIcon, BookMarkIcon, CalendarIcon,  HeartIcon, LogoIcon, PrintIcon, StudentIcon, TeacherIcon, UserIcon } from "@/Components";
import { Link, usePage } from "@inertiajs/react";

const navigationLinkItems = [
    // Admin
    {
        startIcon: <BookMarkIcon width="22px" height="22px"/>,
        label: 'Quản lý Học phần',
        to: route('admin.courses.index'),
        role: ["Admin"]
    },
    {
        startIcon: <BookMarkIcon width="22px" height="22px"/>,
        label: 'Quản lý lớp Học phần',
        to: route('admin.courseClasses.index'),
        role: ["Admin"]
    },
    {
        startIcon: <PrintIcon width="22px" height="22px"/>,
        label: 'Quản lý nhập điểm',
        to: route('admin.scores.index'),
        role: ["Admin"]
    },
    {
        startIcon: <StudentIcon width="22px" height="22px"/>,
        label: 'Quản lý Sinh viên',
        to: route('admin.students.index'),
        role: ["Admin"]
    },
    {
        startIcon: <TeacherIcon width="22px" height="22px"/>,
        label: 'Quản lý Giáo viên',
        to: route('admin.teachers.index'),
        role: ["Admin"]
    },
    {
        startIcon: <ActivityIcon width="22px" height="22px"/>,
        label: 'Thống kê báo cáo',
        to: route('admin.statistical.index'),
        role: ["Admin"]
    },

    // Student
    {
        startIcon: <UserIcon width="22px" height="22px"/>,
        label: 'Lý lịch sinh viên',
        to: route('sv.profile.index'),
        role: ["Student"]
    },
    {
        startIcon: <BookMarkIcon width="22px" height="22px"/>,
        label: 'Đăng ký Học phần',
        to: route('sv.courses.index'),
        role: ["Student"]
    },
    {
        startIcon: <CalendarIcon width="22px" height="22px"/>,
        label: 'Thời khóa biểu',
        to: route('sv.schedule.index'),
        role: ["Student"]
    },
    {
        startIcon: <PrintIcon width="22px" height="22px"/>,
        label: 'Kết quả học tập',
        to: route('sv.scores.index'),
        role: ["Student"]
    },
    {
        startIcon: <TeacherIcon width="22px" height="22px"/>,
        label: 'Giáo viên',
        to: route('sv.teachers.index'),
        role: ["Student"]
    },

    // Teacher
    {
        startIcon: <UserIcon width="22px" height="22px"/>,
        label: 'Lý lịch giảng viên',
        to: route('gv.profile.index'),
        role: ["Teacher"]
    },
    {
        startIcon: <BookMarkIcon width="22px" height="22px"/>,
        label: 'Lớp Học phần',
        to: route('gv.courseClasses.index'),
        role: ["Teacher"]
    },
    {
        startIcon: <CalendarIcon width="22px" height="22px"/>,
        label: 'Thời khóa biểu',
        to: route('gv.schedule.index'),
        role: ["Teacher"]
    },
    {
        startIcon: <PrintIcon width="22px" height="22px"/>,
        label: 'Nhập điểm',
        to: route('gv.scores.index'),
        role: ["Teacher"]
    },
    {
        startIcon: <StudentIcon width="22px" height="22px"/>,
        label: 'Sinh viên',
        to: route('gv.students.index'),
        role: ["Teacher"]
    },
    {
        startIcon: <TeacherIcon width="22px" height="22px"/>,
        label: 'Giáo viên',
        to: route('gv.teachers.index'),
        role: ["Teacher"]
    },
];

const NavSidebar = () => {
    const page = usePage();
    const user = page.props.auth.user;
    const currentUrl = page.url;

    return (
        <div className="navsidebar_container flex flex-col items-center h-screen">
            {/* logo */}
            <Link 
                href={user.role === "Admin" 
                    ? route("admin.students.index") 
                    : user.role === "Student" 
                    ? route("sv.schedule.index") 
                    : route("gv.schedule.index")} 
                className="logo_container flex items-center gap-2"
            >
                <LogoIcon width="40px" height="40px" /> <span>Akademi</span>
            </Link>
            
            {/* navigation link */}
            <nav className="navigation_links flex flex-col items-end gap-2">
                {navigationLinkItems
                    .filter(item => item.role.includes(user.role))
                    .map((item, index) => {
                        const baseCurrentUrl = currentUrl.split('?')[0];
                        
                        return (
                            <Link
                                key={index}
                                href={item.to}
                                className={`navigation_links-item flex items-center justify-start gap-2 py-4 px-6 ${item.to.endsWith(baseCurrentUrl) ? 'active' : ''}`}
                            >
                                <span className="flex items-center justify-center">{item.startIcon}</span>
                                {item.label}
                            </Link>
                        );
                    })}
            </nav>

            {/* footer */}
            <footer className="flex flex-col items-center gap-2">
                <p className="branding_text">Hệ thống quản lý Akademi</p>
                <p className="credits_text flex items-center gap-1">
                    Kết nối giáo viên 
                    <HeartIcon width="12px" height="12px" className="heart_icon"/> sinh viên
                </p>
            </footer>
        </div>
    );
}

export default NavSidebar;