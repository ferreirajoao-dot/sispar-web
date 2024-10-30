export async function apiFetchData(endpoint, method = 'GET', body = null, revalidate = 0, key) {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_API_CRAFTY}${endpoint}`;
    const headers = {
        ...JSON.parse(`${process.env.NEXT_PUBLIC_HEADER_CRAFTY}`)
    };

    const options = {
        method: method,
        headers: headers,
    };

    //Se vai cachear ou nao esse request
    if(revalidate > 0) {
        options.revalidate = { next: { revalidate: revalidate } };
    } else {
        options.cache = 'no-store';
    }

    if (method !== 'GET' && body) {
        options.body = JSON.stringify(body);
    }

    if(key) {
        options.headers[`X-Api-Key`] = key;
    }

    try {

        const response = await fetch(url, options);

        if (response.ok) {
            return await response.json();
        } else if (response.status === 403) {
            throw 'Token Expired';
        } else {
            const errorData = await response.json();
            throw `${errorData?.message || 'Não Foi possível concluir a solicitação'}`;
        }

        // Pode não haver conteúdo para retornar em DELETE por exemplo, então verifique se é necessário
    } catch (error) {
        throw error
    }
}
