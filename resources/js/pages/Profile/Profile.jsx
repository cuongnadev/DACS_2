import { PrimaryLayout } from '@/Layouts';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Button, Image, BagIcon, PersonalInfo, FamilyMember, PhotoInput } from '@/Components';
import { useState } from 'react';
import { exportProfile } from '../../utils';

export default function Profile({ dataProfile, parents }) {
    const page = usePage();
    const user = page.props.auth.user;
    
    // getDataProfile
    const getUserData = (dataProfile, user) => {
        return user.role === "Student" ? dataProfile.student : dataProfile.teacher;
    };
    const dataUser = getUserData(dataProfile, user);
    
    // editProfile
    const [edit, setEdit] = useState(false);
    const { data, setData, post } = useForm({
        image: '',
        imageUrl: dataUser.image_url,
        name: dataProfile.name,
        pob: dataUser.pob,
        dob: dataUser.dob,
        sex: dataUser.sex,
        dan_toc: dataUser.dan_toc,
        cccd: dataUser.cccd,
        cccd_date: dataUser.cccd_date,
        personal_email: dataUser.personal_email,
        phone: dataUser.phone,
        ton_giao: dataUser.ton_giao,
        address: dataUser.address,
        university: dataUser.university,
        degree: dataUser.degree,
        city: dataUser.city,
        zalo: dataUser.zalo,
        facebook: dataUser.facebook,
        father: parents.father,
        mother: parents.mother,
    });
    
    
    const setDataParent = (key, value, relation) => {
        setData((prevData) => ({
            ...prevData,
            [relation]: {
                ...prevData[relation],
                [key]: value,
            },
        })); 
    }

    const handlePhotoSelect = (file) => {
        setData("image", file);
    }
    
    const handleUpdateProfile = (e) => {
        e.preventDefault();

        post(user.role === "Student" 
            ? route('sv.profile.update') 
            : route('gv.profile.update'), {
            onSuccess: () => setEdit(false),
            onError: (error) => console.error(error),
        });
    };

    const handleExportProfile = () => {
        const dataExport = {};
        if (user.role === "Student") {
            dataExport.student_code = dataProfile.student.student_code;
            dataExport.name = data.name;
            dataExport.dob = data.dob;
            dataExport.pob = data.pob;
            dataExport.sex = data.sex;
            dataExport.cccd = data.cccd;
            dataExport.cccd_date = data.cccd_date;
            dataExport.dan_toc = data.dan_toc;
            dataExport.address = data.address;
            dataExport.phone = data.phone;
            dataExport.email = data.personal_email;
            dataExport.university = data.university;
            dataExport.major = dataUser.major;
            dataExport.khoa = dataUser.khoa;
            dataExport.start_date = dataUser.start_date.split('-')[0];
            dataExport.end_date = dataUser.end_date.split('-')[0];
            dataExport.imageUrl = data.imageUrl;
            dataExport.father = data.father;
            dataExport.mother = data.mother;

            exportProfile(dataExport, user.role);
        } else {
            dataExport.start_date = dataUser.start_date.split('-')[0];
            dataExport.end_date = dataUser.end_date.split('-')[0];
            dataExport.major = dataUser.major;
            dataExport.khoa = dataUser.khoa;
            dataExport.name = data.name;
            dataExport.dob = data.dob;
            dataExport.pob = data.pob;
            dataExport.sex = data.sex;
            dataExport.university = data.university;
            dataExport.degree = data.degree;
            dataExport.city = data.city;
            dataExport.address = data.address;
            dataExport.phone = data.phone;
            dataExport.email = data.personal_email;
            dataExport.imageUrl = data.imageUrl;

            exportProfile(dataExport, user.role);
        }
    }

    return (
        <PrimaryLayout title={`Lý lịch ${user.role === "Student" ? "sinh viên" : "giảng viên"}`}>
            <Head title="Profile" />
            <form className='profile flex flex-col items-center gap-6' onSubmit={handleUpdateProfile}>
                <div className='profile_header'>
                    <img src="/assets/images/Masking1.png" alt="Masking1.png" />
                </div>
                <div className='profile_user-title'>
                    <div className='profile_user-title-avatar'>
                        {edit ? 
                        <PhotoInput className={"profile_user-title-avatar-input"} onFileSelect={handlePhotoSelect}/>
                        : <Image src={dataUser.image_url}/>
                        }
                    </div>
                    <div className='profile_user-title-info flex flex-col items-start flex-1 gap-2'>
                        <div className='profile_user-title-name'>{data.name}</div>
                        {user.role === "Student" && <div className='profile_user-title-id flex items-center'>{dataProfile.student.student_code}</div>}
                        <div className='profile_user-title-course flex items-center gap-2'>
                            <BagIcon width='16px' height='16px' className={'profile-usertitle-icon'} />
                            {
                                `${dataUser.start_date.split('-')[0]} - ${dataUser.end_date.split('-')[0]}`
                            }
                        </div>
                        <div className='profile_user-title-field flex items-center gap-2'>
                            <BagIcon width='16px' height='16px' className={'profile-usertitle-icon'}/>
                            {
                                `Ngành ${dataUser.major}`
                            }
                        </div>
                        <div className='profile_user-title-science flex items-center gap-2'>
                            <BagIcon width='16px' height='16px' className={'profile-usertitle-icon'}/>
                            {
                                `Khoa ${dataUser.khoa}`
                            }
                        </div>
                    </div>
                    <div className='profile_actions flex items-center gap-4'>
                        <Button className={'profile_actions-item'} 
                        type='text'
                        filled 
                        onClick={(e) => {
                        e.preventDefault();
                        setEdit(true)}}
                        >
                            Sửa hồ sơ
                        </Button>
                        <Button className={'profile_actions-item'} filled onClick={() => handleExportProfile()}>Xuất lí lịch</Button>
                    </div>
                </div>
                <div className='profile-details_container flex flex-col gap-6'>
                    <div className='profile-details_form personal'>
                        <h3>Thông tin cá nhân</h3>
                        <table>
                            <tbody>
                                <PersonalInfo 
                                    dataEdit={edit ? [{key: "name", setData}]: null} 
                                    items={[{label: "Họ và tên", value: data.name}]} 
                                />
                                <PersonalInfo 
                                    dataEdit={edit ? [
                                        {key: "pob", setData},
                                        {key: "dob", setData},
                                    ] : null}
                                    items={[
                                        {label: "Nơi sinh", value: data.pob},
                                        {label: "Ngày sinh", value: data.dob},
                                    ]}
                                />
                                <PersonalInfo 
                                    dataEdit={edit ? [
                                        {key: "sex", setData},
                                    ] : null}
                                    items={[
                                        {label: "Giới tính", value: data.sex},
                                    ]} 
                                />
                                {user.role === "Student" ? (
                                    <PersonalInfo 
                                        dataEdit={edit ? [
                                            {key: "cccd", setData},
                                            {key: "cccd_date", setData},
                                        ] : null}
                                        items={[
                                            {label: "CMND / CCCD", value: data.cccd},
                                            {label: "Ngày cấp CCCD", value: data.cccd_date},
                                        ]} 
                                    />
                                ) : (
                                    <PersonalInfo 
                                        dataEdit={edit ? [
                                            {key: "university", setData},
                                            {key: "degree", setData},
                                        ] : null}
                                        items={[
                                            {label: "Trường", value: data.university},
                                            {label: "Học vị", value: data.degree},
                                        ]} 
                                    />
                                )}
                                {user.role === "Student" ? (
                                    <PersonalInfo 
                                        dataEdit={edit ? [
                                            {key: "ton_giao", setData}
                                        ] : null}
                                        items={[
                                            {label: "Tôn Giáo", value: data.ton_giao},
                                        ]} 
                                    />
                                ) : (
                                    <PersonalInfo 
                                        dataEdit={edit ? [
                                            {key: "city", setData}
                                        ] : null}
                                        items={[
                                            {label: "Thành phố", value: data.city},
                                        ]} 
                                    />
                                )}
                            </tbody>
                        </table>
                    </div>
                    {user.role === 'Student' && 
                    <div className='profile-details_form family'>
                        <h3>Thông tin gia đình</h3>
                        <div className='flex flex-col items-start gap-6'>
                            <FamilyMember 
                                isEdit={edit} 
                                relation={"Cha"}
                                member={data.father}
                                setData={(key, value) => setDataParent(key, value, "father")}
                            />
                            <FamilyMember 
                                isEdit={edit} 
                                relation={"Mẹ"} 
                                member={data.mother} 
                                setData={(key, value) => setDataParent(key, value, "mother")}
                            />
                        </div>
                    </div>}
                    <div className='profile-details_form'>
                        <h3>Địa chỉ và Thông tin liên hệ</h3>
                        <table>
                            <tbody>
                                <PersonalInfo 
                                    dataEdit={edit ? [
                                        {key: "personal_email", setData},
                                        {key: "phone", setData},
                                    ] : null}
                                    items={[
                                        {label: "Email cá nhân", value: data.personal_email},
                                        {label: "Điện thoại", value: data.phone},
                                    ]} 
                                />
                                {user.role === "Student" && 
                                <PersonalInfo
                                    dataEdit={edit ? [
                                        {key: "zalo", setData},
                                        {key: "facebook", setData},
                                    ] : null}
                                    items={[
                                        {label: "Zalo", value: data.zalo},
                                        {label: "Facebook", value: data.facebook},
                                    ]} 
                                />
                                }
                                <PersonalInfo 
                                    dataEdit={edit ? [
                                        {key: "address", setData}
                                    ] : null}
                                    items={[
                                        {label: "Địa Chỉ liên lạc", value: data.address},
                                    ]} 
                                />
                            </tbody>
                        </table>
                    </div>
                    {edit && 
                    <Button 
                        filled 
                        small 
                        className={"profile_update-btn"}
                    >
                        Cập nhật
                    </Button>}
                </div>
            </form>
        </PrimaryLayout>
    );
}