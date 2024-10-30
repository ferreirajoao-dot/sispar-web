import {NextResponse} from "next/server";
import {deleteSession} from "@/app/(back-end)/server/lib/session";

export async function GET(req) {
    try {
        deleteSession('sessionTokens');
        deleteSession('session');
        return NextResponse.json({ data: null, message: 'success' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ data: null, message: error }, { status: 500 });
    }
}

