import {apiFetchData} from '@/app/(back-end)/server/lib/apiHelpers';
import {NextResponse} from "next/server";
import md5 from "md5";
import {createSession} from "@/app/(back-end)/server/lib/session";

export async function POST(req) {
    try {
        const reqBody = await req.json();
        let md5Password = await md5(reqBody.password);
        let md5PasswordConfirm = await md5(reqBody.confirm_password);


        delete reqBody.password
        delete reqBody.confirm_password

        let res = await apiFetchData(`/register/worker`,'POST', {
            password: md5Password,
            confirm_password: md5PasswordConfirm,
            application_name: process.env.NEXT_PUBLIC_APPLICATION_PACKAGE,
            ...reqBody
        });

        if (res) {
            await createSession(res,'session');
            await createSession({user_id: res.user_id, api_key: res.api_key},'sessionTokens');
            return NextResponse.json({ data: res }, { status: 201 });
        } else {
            return NextResponse.json({ data: null }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ data: null, message: error }, { status: 500 });
    }
}

