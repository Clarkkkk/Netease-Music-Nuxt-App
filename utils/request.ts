import type { AsyncData } from 'nuxt/app'
import { useAsyncData, useRequestHeaders } from 'nuxt/app'
import type { MultiWatchSources } from 'nuxt/dist/app/composables/asyncData'

type RequestArguments<T extends ApiType> = T['params'] extends Record<string, unknown> | FormData
    ? [api: T['api'], params: T['params']]
    : [api: T['api']]

const requestUrl = process.env.NODE_ENV === 'development' ? '/api' : 'http://127.0.0.1:3000'

export function get<Type extends ApiGetType>(
    ...[api, params]: RequestArguments<Type>
): Promise<Type['return']> {
    const fullApi = requestUrl + api

    return $fetch(fullApi, {
        params,
        method: 'get',
        headers: {
            referer: 'https://carllllo.work/'
        } as HeadersInit
    }) as Promise<Type['return']>
}

export function post<Type extends ApiPostType>(
    ...[api, params]: RequestArguments<Type>
): Promise<Type['return']> {
    const fullApi = requestUrl + api

    return $fetch(fullApi, {
        body: params,
        method: 'post',
        headers: {
            referer: 'https://carllllo.work/'
        } as HeadersInit
    })
}

export function useRequest() {
    const cookie = useRequestHeaders(['cookie']).cookie

    return function post<Type extends ApiPostType>(
        ...[api, params]: RequestArguments<Type>
    ): Promise<Type['return']> {
        const fullApi = requestUrl + api
        return $fetch(fullApi, {
            body: params,
            method: 'post',
            headers: {
                cookie,
                referer: 'https://carllllo.work/'
            } as HeadersInit
        })
    }
}

type UsePageDataParams<T extends ApiPostType> = {
    api: T['api']
    params?: T['params']
    key?: string
    transform?: (input: T['return']) => T['return']
    watch?: MultiWatchSources
}

export function usePageData<Type extends ApiPostType>({
    api,
    params,
    key,
    transform,
    watch
}: UsePageDataParams<Type>): AsyncData<Type['return'], any> {
    const fullApi = requestUrl + api
    const cookie = useRequestHeaders(['cookie']).cookie

    return useAsyncData(
        key || fullApi,
        () => {
            return $fetch(fullApi, {
                body: params,
                method: 'post',
                headers: {
                    cookie,
                    referer: 'https://carllllo.work/'
                } as HeadersInit
            })
        },
        {
            transform,
            watch
        }
    )
}
