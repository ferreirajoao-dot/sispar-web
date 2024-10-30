import {apiFetchData} from '@/app/(back-end)/server/lib/apiHelpers';
import {NextResponse} from "next/server";
import md5 from "md5";
import {getApiToken} from "@/app/(back-end)/server/lib/session";

export async function POST(req) {
    try {

        const session = await getApiToken();
        if (!session) {
            return NextResponse.json({ data: null }, { status: 200 });
        }

        const reqBody = await req.json();
        let old_password = md5(reqBody.old_password);
        let password = md5(reqBody.password);

        let res = await apiFetchData(`/user/change-password`,'POST', {
            old_password: old_password,
            password: password
            }, 0, session.api_key);
        if (res) {
            return NextResponse.json({ data: res, ok: true }, { status: 201 });
        } else {
            return NextResponse.json({ data: null, ok: false, message: 'Nao foi possivel alterar sua senha' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ data: null, ok: false, message: error }, { status: 500 });
    }
}

