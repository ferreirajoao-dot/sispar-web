import {apiFetchData} from "@/app/(back-end)/server/lib/apiHelpers";
import {
    decryptApplicationData,
    decryptUserSession,
    deleteSession,
    getApiToken,
    sessionShouldBeRenewed,
    updateUserSession, updateUserToken
} from "@/app/(back-end)/server/lib/session";
import {NextResponse} from "next/server";
import {redirect} from "next/navigation";


export async function GET() {
    try {

        const session = await getApiToken();
        if (!session) {
            return NextResponse.json({ data: null }, { status: 200 });
        }

        let res = await apiFetchData(`/user/${session.user_id}/full`,'GET', null,3600, session.api_key);

        if (res && !res.error) {
            if (session) {
                await updateUserSession(res, 'session');
                await updateUserToken(res, 'sessionTokens');
            }
            return NextResponse.json({ data: res }, { status: 200 });
        } else {
            if(res.status === 403) {
                deleteSession('session');
                redirect('/login');
                return NextResponse.json({ data: null }, { status: 403 });
            } else {
                return NextResponse.json({ data: null }, { status: 500 });
            }
        }

    } catch (error) {
        console.error('Failed to fetch user:', error);
        if(error === 'Token Expired') {
            return NextResponse.json({ data: error }, { status: 403 });
        } else {
            return NextResponse.json({ data: null }, { status: 500 });
        }
    }
}
