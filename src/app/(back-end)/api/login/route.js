import {apiFetchData} from '@/app/(back-end)/server/lib/apiHelpers';
import {NextResponse} from "next/server";
import md5 from "md5";
import {createSession} from "@/app/(back-end)/server/lib/session";

export async function POST(req) {
    try {
        const reqBody = await req.json();
        let md5Password = md5(reqBody?.password);
        let loginType = reqBody.login?.indexOf('@') > -1 ? 'email' : 'cpf';

        let res = await apiFetchData(`/access/login`,'POST', {
            [loginType]: loginType === 'cpf' ? reqBody.login.replace(/\D/ig, '') : reqBody.login,
            password: md5Password,
            application_name: process.env.NEXT_PUBLIC_APPLICATION_PACKAGE,
            fcm_token: reqBody.fcm_token});
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

