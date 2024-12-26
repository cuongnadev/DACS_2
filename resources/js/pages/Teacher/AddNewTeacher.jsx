import { Button, Input, InputLabel, PhotoInput } from "@/Components";
import { PrimaryLayout } from "@/Layouts";
import { Head, useForm } from "@inertiajs/react";

const AddNewTeacher = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        sex: '',
        personalEmail: '',
        phone: '',
        address: '',
        imageUrl: '',
        dob: '',
        pob: '',
        university: '',
        degree: '',
        startDate: '',
        endDate: '',
        city: '',
        major: '',
        khoa: '',
    }); 

    const handlePhotoSelect = (file) => {
        setData("imageUrl", file);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/teachers/add', {
            onSuccess: () => reset(),
            onError: (errors) => console.log(errors),
        })
    }

    return (
        <PrimaryLayout title={"Thêm giáo viên"}>
            <Head title="New Teacher"/>
            <form className="add_teacher-container" onSubmit={handleSubmit}>
                {/* form details */}
                <div className="add_form flex flex-col items-start justify-start">
                    <h3 className="add_title">Thông tin cá nhân</h3>
                    <div className="add_form-inputs flex flex-col items-start gap-4">
                        {/* name */}
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
                                <InputLabel className="add_label" htmlFor="sex" value="Giới tính* (Nam, Nữ, Khác)" />

                                <Input
                                    id="sex"
                                    name="sex"
                                    value={data.sex}
                                    className={"add_input mt-2"}
                                    autoComplete="sex"
                                    onChange={(e) => setData('sex', e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* email & phone */}
                        <div className="add_form-input-row flex items-start gap-5">
                            <div className="add_form-input-item">
                                <InputLabel className="add_label" htmlFor="email" value="Email*" />

                                <Input
                                    id="email"
                                    name="email"
                                    value={data.personalEmail}
                                    className={"add_input mt-2"}
                                    autoComplete="email"
                                    onChange={(e) => setData('email', e.target.value)}
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

                        {/* address & image */}
                        <div className="add_form-input-row flex items-start gap-5">
                            <div className="add_form-input-item">
                                <InputLabel className="add_label" htmlFor="address" value="Địa chỉ*" />
                                <textarea 
                                    id="address"
                                    name="address"
                                    value={data.address}
                                    className="add_input textarea mt-2"
                                    autoComplete="address"
                                    onChange={(e) => setData('address', e.target.value)} 
                                    required
                                />
                            </div>
                            <div className="add_form-input-item">
                                <InputLabel className="add_label" htmlFor="photo" value="Ảnh đại diện*" />
                                <PhotoInput className={"mt-2"} onFileSelect={handlePhotoSelect} />
                            </div>
                        </div>

                        {/* dob & pob */}
                        <div className="add_form-input-row flex items-start gap-5">
                            <div className="add_form-input-item">
                                <InputLabel className="add_label" htmlFor="dob" value="Ngày sinh*" />

                                <Input
                                    id="dob"
                                    name="dob"
                                    type="date"
                                    value={data.dob}
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
                    </div>
                </div>

                {/* form education */}
                <div className="add_form flex flex-col items-start justify-start">
                    <h3 className="add_title">Thông tin trường</h3>
                    <div className="add_form-inputs flex flex-col items-start gap-4">
                        {/* university & degree */}
                        <div className="add_form-input-row flex items-start gap-5">
                            <div className="add_form-input-item">
                                <InputLabel className="add_label" htmlFor="university" value="Trường*" />

                                <Input
                                    id="university"
                                    name="university"
                                    value={data.university}
                                    className={"add_input mt-2"}
                                    autoComplete="university"
                                    onChange={(e) => setData('university', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="add_form-input-item">
                                <InputLabel className="add_label" htmlFor="degree" value="Bằng cấp*" />

                                <Input
                                    id="degree"
                                    name="degree"
                                    value={data.degree}
                                    className={"add_input mt-2"}
                                    autoComplete="degree"
                                    onChange={(e) => setData('degree', e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* start / end date & city*/}
                        <div className="add_form-input-row flex items-start gap-5">
                            <div className="flex items-center gap-2">
                                <div className="add_form-input-item">
                                    <InputLabel className="add_label" htmlFor="startDate" value="Ngày bắt đầu*" />
    
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
                                    <InputLabel className="add_label" htmlFor="endDate" value="Ngày kết thúc*" />
    
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
                                <InputLabel className="add_label" htmlFor="city" value="Thành phố*" />

                                <Input
                                    id="city"
                                    name="city"
                                    value={data.city}
                                    className={"add_input mt-2"}
                                    autoComplete="city"
                                    onChange={(e) => setData('city', e.target.value)}
                                    required
                                />
                            </div>
                        </div>

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
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* submit */}
                <div className="add_submit flex items-center justify-end">
                    <Button small filled>Submit</Button>
                </div>
            </form>
        </PrimaryLayout>
    );
}

export default AddNewTeacher;