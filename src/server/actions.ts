'use server'

const URL_API = process.env.NEXT_PUBLIC_API_URL

export const getActionsOptions = async ({ url, method, cache, body }: { url: string, method: string, cache: RequestCache, body?: any }) => {
    try {
        const res = await fetch(
            `${URL_API}${url}`,
            {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                cache: cache,
                body
            }
        );
        if (res.status === 200) {
            const data = await res.json()
            return {
                data: data,
                status: res.status
            }
        }
        throw new Error('Falha ao consultar dados')

    } catch (err) {
        console.log(err);
    }
}