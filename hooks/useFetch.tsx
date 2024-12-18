import useSWR from "swr";

export async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
): Promise<JSON> {
    const res = await fetch(input, init)
    return res.json()
}

type fetchOpts = {
    url: string,
    params?: { [key: string]: any };
}

function useFetch<T>({ url, params }: fetchOpts) {
    const qParams = params &&
        Object.keys(params)
            .map((k) => {
                return `${k}=${params[k]}`;
            })
            .join("&")

    const { data, error, isLoading, mutate } = useSWR<T>(`${url}${qParams && `?${qParams}`}`, fetcher, {shouldRetryOnError:false})

    // console.log('url', `${url}${qParams && `$${qParams}`}`)
    return {
        data: data,
        isLoading,
        isError: error,
        mutate
    }
}

export default useFetch;