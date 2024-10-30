import {apiFetchData} from '@/app/(back-end)/server/lib/apiHelpers';
import {NextResponse} from "next/server";
import {
    createSession,
    decryptApplicationData,
    updateApplicationData
} from "@/app/(back-end)/server/lib/session";

export async function GET() {
    try {
        let res = await apiFetchData('/user/application', 'GET', null);

        if (res) {

            let appData = await decryptApplicationData();
            if(appData) {
                await updateApplicationData(res,'application');
            } else {
                await createSession(res,'application');
            }

            return NextResponse.json({ data: res }, { status: 200 });
        } else {
            return NextResponse.json({ data: null }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 });
    }
}

