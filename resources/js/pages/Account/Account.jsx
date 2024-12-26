import UpdatePasswordForm from './UpdatePasswordForm';
import UpdateAccountInformation from './UpdateAccountInformationForm';
import { Head } from '@inertiajs/react';
import { PrimaryLayout } from '@/Layouts';

export default function Account({ mustVerifyEmail, status }) {
    return (
        <PrimaryLayout title={"Thông tin tài khoản"}>
            <Head title="Account" />

            <div className="account-container pb-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="p-4 sm:p-8 bg-whit shadow sm:rounded-lg">
                        <UpdateAccountInformation
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-whit shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </PrimaryLayout>
    );
}
