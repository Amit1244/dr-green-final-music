import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ReferForm from "@/app/components/forms/refer-form";
import DashboardNav from "@/app/components/dashboard/dashboard-nav";
import Link from "next/link";
import Image from "next/image";
import { getAlpha2Code } from "@/data/countryCodes";
import GetContent from "@/lib/wp/get-content";
import CalendlyClient from "@/app/components/dashboard/calendly/calendly-client";

export const dynamic = "force-dynamic";

export default async function Eligibility() {
    const session = await getServerSession(options);

    const countryCodeAlpha2 = await getAlpha2Code(
        session.user.dappUser.shippings[0].countryCode
    );

    const query = `
{
    globalContent {
        consentForm {
            textArea
        }
    }
}
    `;
    const consentForm = (await GetContent(query)).globalContent.consentForm
        .textArea;

    // const formSubmitted = session?.user?.dappUser?.medicalRecord !== null ? session?.user?.dappUser?.medicalRecord?.createdAt : true;
    const formSubmitted = session?.user?.dappUser?.medicalRecord?.createdAt;
    const eligibile = session?.user?.dappUser?.adminApproval == "VERIFIED";
    const isKycDone = session?.user?.dappUser?.isKYCVerified;

    return (
        <>
            <div className="block md:hidden mb-10">
                <Link
                    href="/dashboard"
                    className="text-xl font-semibold flex items-center gap-2"
                >
                    <Image
                        src="/images/icons/back-arrow.svg"
                        alt="Back Arrow"
                        width="31"
                        height="18"
                    />
                    Back
                </Link>
            </div>
            <div className="md:grid grid-cols-8 gap-8" id="popupRoot">
                <div className="col-span-2 relative hidden md:block">
                    <DashboardNav />
                </div>
                {
                    isKycDone ? (
                        <div className="rounded-[20px] border-2 border-white p-8 xl:p-20 col-span-6">
                            <p className="text-2xl md:text-[28px] font-semibold mb-8">
                                My Eligibility - Your trusted source for Medical
                                Flower
                            </p>
                            {!formSubmitted ? (
                                <div>
                                    {!eligibile ? (
                                        <div>
                                            <h2 className="text-lg font-semibold mb-2">
                                                First Name: {session?.user?.dappUser?.firstName || ""}
                                            </h2>
                                            <h2 className="text-lg font-semibold mb-2">
                                                Last Name: {session?.user?.dappUser?.lastName || ""}
                                            </h2>
                                            <h2 className="text-lg font-semibold mb-2">
                                                Date of Birth: {session?.user?.dappUser?.medicalRecord?.dob || ""}
                                            </h2>
                                            <h2 className="text-lg font-semibold mb-2">
                                                Gender: {session?.user?.dappUser?.medicalRecord?.gender || ""}
                                            </h2>
                                            <h2 className="text-lg font-semibold mb-2">
                                                Email Address: {session?.user?.dappUser?.email || ""}
                                            </h2>
                                            <p className="text-[#0aba90]">
                                                You are already eligible.
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="text-orange-500 mb-4">
                                                {"Submission made at: " +
                                                    new Date(
                                                        formSubmitted
                                                    ).toUTCString()}
                                            </p>
                                            {session?.user?.scheduledAppointmentAt ? (
                                                <p className="text-orange-500">
                                                    Please check your email for the
                                                    details of your Zoom meeting.
                                                </p>
                                            ) : (
                                                <CalendlyClient
                                                    user={session?.user?.dappUser}
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <p className="text-red-500 mb-8">
                                        Please ensure all details are correct, as you
                                        cannot change this once submitted.
                                    </p>
                                    <ReferForm
                                        userId={session?.user?._id}
                                        clientId={session?.user?.dappUser?.id}
                                        userDetails={session?.user?.dappUser}
                                        countryCode={countryCodeAlpha2}
                                        consentForm={consentForm}
                                    />
                                </div>
                            )}
                        </div>
                    )
                        :
                        (
                            <div className="rounded-[20px] border-2 flex justify-center items-center text-red-600 text-[30px] border-white p-8 xl:p-20 col-span-6">
                                You are not varified!
                            </div>
                        )
                }
            </div>
        </>
    );
}
