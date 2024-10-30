import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secretKey = process.env.NEXT_SESSION_TOKEN
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('180d')
        .sign(encodedKey)
}
export function sessionShouldBeRenewed(session) {
    const expirationThreshold = 5 * 24 * 60 * 60 * 1000; // 5 dias em milissegundos
    const timeToExpiration = new Date(session.expires) - new Date();
    return timeToExpiration < expirationThreshold;
}

export async function decryptUserSession() {
    try {
        const cookieStore = cookies();
        let aux = cookieStore.get('session');
        if(aux) {
            const sessionCookie = aux.value;

            const { payload } = await jwtVerify(sessionCookie, encodedKey, {
                algorithms: ['HS256'],
            })
            return payload
        } else {
            return null
        }

    } catch (error) {
        return null;
    }
}

export async function decryptApplicationData() {
    try {
        const cookieStore = cookies();
        let aux = cookieStore.get('application');
        if(aux) {
            const sessionCookie = aux.value
            const { payload } = await jwtVerify(sessionCookie, encodedKey, {
                algorithms: ['HS256'],
            })
            return payload
        } else {
            return null;
        }

    } catch (error) {
        return null;
    }
}

export async function getApiToken() {
    try {
        const cookieStore = cookies();
        let aux = cookieStore.get('sessionTokens');
        if(aux) {
            const sessionCookie = aux.value
            const { payload } = await jwtVerify(sessionCookie, encodedKey, {
                algorithms: ['HS256'],
            })
            return payload
        } else {
            return null
        }
    } catch (error) {
    }
}

export async function createSession(data, name) {
    const expiresAt = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)

    let simplifiedData = data;
    if(name === 'session') {
        simplifiedData = {profile: data.profile, user_id: data.user_id}
    }
    const session = await encrypt({ ...simplifiedData, expiresAt })

    cookies().set(name, session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}


export async function updateUserSession(data,name) {
    const session = cookies().get(name).value
    const payload = await decryptUserSession(session)

    if (!session || !payload) {
        return null
    }

    let simplifiedData = {profile: data.profile, user_id: data.user_id}

    const expiresAt = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000);
    const newData = await encrypt({ ...simplifiedData, expiresAt })

    cookies().set(name, newData, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function updateApplicationData(data,name) {
    const session = cookies().get(name).value
    const payload = await decryptApplicationData(session)

    if (!session || !payload) {
        return null
    }

    const expiresAt = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000);
    const newData = await encrypt({ ...data, expiresAt })

    cookies().set(name, newData, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}


export async function updateUserToken(data,name) {
    const session = cookies().get(name).value
    const payload = await getApiToken()

    if (!session || !payload) {
        return null
    }

    const expiresAt = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000);

    payload.expiresAt  = expiresAt;
    const newData = await encrypt(payload)

    cookies().set(name, newData, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export function deleteSession(name) {
    cookies().delete(name)
}
