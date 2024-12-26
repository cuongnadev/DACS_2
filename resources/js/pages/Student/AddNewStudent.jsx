import { Button, Input, InputLabel, PhotoInput } from "@/Components";
import { PrimaryLayout } from "@/Layouts";
import { Head, useForm } from "@inertiajs/react";

const AddNewStudent = () => {
    const { data, setData, post, processing, errors, reset } = useForm(
        {
            imageUrl: '',
            name: '',
            personalEmail: '',
            dob: '',
            pob: '',
            sex: '',
            phone: '',
            danToc: '',
            tonGiao: '',
            cccd: '',
            cccdDate: '',
            address: '',
            major: '',
            khoa: '',
            startDate: '',
            endDate: '',
            grade: '',
        }
    );

    const handlePhotoSelect = (file) => {
        setData("imageUrl", file);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/students/add', {
            onSuccess: () => reset(),
            onError: (errors) => console.log(errors),
        })
    }

    return (
        <PrimaryLayout title={"Thêm sinh viên"}>
            <Head title="New Student"/>
            <form className="add_student-container" onSubmit={handleSubmit}>
                {/* form details */}
                <div className="add_form flex flex-col items-start justify-start">
                    <h3 className="add_title">Thông tin cá nhân</h3>
                    <div className="add_form-inputs flex items-start justify-start gap-4">
                        <div className="add_form-input-col flex flex-col items-start gap-4">
                            {/* image */}
                            <div className="add_form-input-row flex items-start gap-5">
                                <div className="add_form-input-item">
                                    <InputLabel className="add_label" htmlFor="avatar" value="Ảnh đại diện*"/>
                                    <PhotoInput className={"mt-2"} onFileSelect={handlePhotoSelect}/>
                                </div>
                            </div>
                        </div>
                        <div className="add_form-input-col flex flex-col items-start gap-4">
                            {/* name & email */}
                            <div className="add_form-input-row flex items-start gap-5">
                                <div className="add_form-input-item">
                                    <InputLabel className="add_label" htmlFor="name" value="Họ và tên*" />

                                    <Input
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className={"add_input mt-2"}
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="add_form-input-item">
                                    <InputLabel className="add_label" htmlFor="email" value="Email cá nhân*" />

                                    <Input
                                        id="email"
                                        name="email"
                                        value={data.personalEmail}
                                        className={"add_input mt-2"}
                                        autoComplete="email"
                                        onChange={(e) => setData('personalEmail', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* dob & pob */}
                            <div className="add_form-input-row flex items-start gap-5">
                                <div className="add_form-input-item">
                                    <InputLabel className="add_label" htmlFor="dob" value="Ngày sinh*" />

                                    <Input
                                        id="dob"
                                        name="dob"
                                        value={data.dob}
                                        type="date"
                                        className={"add_input mt-2"}
                                        autoComplete="dob"
                                        onChange={(e) => setData('dob', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="add_form-input-item">
                                    <InputLabel className="add_label" htmlFor="pob" value="Nơi sinh*" />

                                    <Input
                                        id="pob"
                                        name="pob"
                                        value={data.pob}
                                        className={"add_input mt-2"}
                                        autoComplete="pob"
                                        onChange={(e) => setData('pob', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* sex & phone */}
                            <div className="add_form-input-row flex items-start gap-5">
                                <div className="add_form-input-item">
                                    <InputLabel className="add_label" htmlFor="sex" value="Giới tính* (Nam, Nữ, Khác)" />

                                    <Input
                                        id="sex"
                                        name="sex"
                                        value={data.sex}
                                        className={"add_input mt-2"}
                                        autoComplete="sex"
                                        onChange={(e) => setData('sex', e.target.value)}
                                    />
                                </div>
                                <div className="add_form-input-item">
                                    <InputLabel className="add_label" htmlFor="phone" value="Điện thoại*" />

                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={data.phone}
                                        className={"add_input mt-2"}
                                        autoComplete="tel"
                                        onChange={(e) => setData('phone', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* dân tộc & tôn giáo */}
                            <div className="add_form-input-row flex items-start gap-5">
                                <div className="add_form-input-item">
                                    <InputLabel className="add_label" htmlFor="danToc" value="Dân tộc*" />

                                    <Input
                                        id="danToc"
                                        name="danToc"
                                        value={data.danToc}
                                        className={"add_input mt-2"}
                                        autoComplete="danToc"
                                        onChange={(e) => setData('danToc', e.target.value)}
                                    />
                                </div>
                                <div className="add_form-input-item">
                                    <InputLabel className="add_label" htmlFor="tonGiao" value="Tôn giáo*" />

                                    <Input
                                        id="tonGiao"
                                        name="tonGiao"
                                        value={data.tonGiao}
                                        className={"add_input mt-2"}
                                        autoComplete="tonGiao"
                                        onChange={(e) => setData('tonGiao', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* cccd */}
                            <div className="add_form-input-row flex items-start gap-5">
                                <div className="add_form-input-item">
                                    <InputLabel className="add_label" htmlFor="cccd" value="CCCD*" />

                                    <Input
                                        id="cccd"
                                        name="cccd"
                                        value={data.cccd}
                                        className={"add_input mt-2"}
                                        autoComplete="cccd"
                                        onChange={(e) => setData('cccd', e.target.value)}
                                    />
                                </div>
                                <div className="add_form-input-item">
                                    <InputLabel className="add_label" htmlFor="cccdDate" value="Ngày cấp*" />

                                    <Input
                                        id="cccdDate"
                                        name="cccdDate"
                                        type="date"
                                        value={data.cccdDate}
                                        className={"add_input mt-2"}
                                        autoComplete="cccdDate"
                                        onChange={(e) => setData('cccdDate', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* address */}
                            <div className="add_form-input-row flex items-start gap-5">
                                <div className="add_form-input-item">
                                    <InputLabel className="add_label" htmlFor="address" value="Địa chỉ*" />

                                    <textarea
                                        id="address"
                                        name="address"
                                        value={data.address}
                                        className={"add_input textarea mt-2"}
                                        autoComplete="address"
                                        onChange={(e) => setData('address', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* form school */}
                <div className="add_form flex flex-col items-start justify-start">
                    <h3 className="add_title">Thông tin trường học</h3>
                    <div className="add_form-inputs flex flex-col items-start gap-4">
                        {/* major & khoa */}
                        <div className="add_form-input-row flex items-start gap-5">
                            <div className="add_form-input-item">
                                <InputLabel className="add_label" htmlFor="major" value="Chuyên ngành*" />

                                <Input
                                    id="major"
                                    name="major"
                                    value={data.major}
                                    className={"add_input mt-2"}
                                    autoComplete="major"
                                    onChange={(e) => setData('major', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="add_form-input-item">
                                <InputLabel className="add_label" htmlFor="khoa" value="Khoa*" />

                                <Input
                                    id="khoa"
                                    name="khoa"
                                    value={data.khoa}
                                    className={"add_input mt-2"}
                                    autoComplete="khoa"
                                    onChange={(e) => setData('khoa', e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* start & end */}
                        <div className="add_form-input-row flex items-start gap-5">
                           <div className="flex items-center gap-2">
                                <div className="add_form-input-item">
                                    <InputLabel className="add_label" htmlFor="startDate" value="Start Date*" />
    
                                    <Input
                                        id="startDate"
                                        name="startDate"
                                        type="date"
                                        value={data.startDate}
                                        className={"add_input small mt-2"}
                                        autoComplete="startDate"
                                        onChange={(e) => setData('startDate', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="add_form-input-item">
                                    <InputLabel className="add_label" htmlFor="endDate" value="End Date*" />
    
                                    <Input
                                        id="endDate"
                                        name="endDate"
                                        type="date"
                                        value={data.endDate}
                                        className={"add_input small mt-2"}
                                        autoComplete="endDate"
                                        onChange={(e) => setData('endDate', e.target.value)}
                                        required
                                    />
                                </div>
                           </div>
                            <div className="add_form-input-item">
                                <InputLabel className="add_label" htmlFor="grade" value="Lớp*" />

                                <Input
                                    id="grade"
                                    name="grade"
                                    value={data.grade}
                                    className={"add_input small mt-2"}
                                    autoComplete="grade"
                                    onChange={(e) => setData('grade', e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* submit */}
                <div className="add_submit flex items-center justify-end">
                    <Button small filled >Submit</Button>
                </div>
            </form>
        </PrimaryLayout>
    );
}

export default AddNewStudent;