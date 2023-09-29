import type { AsyncData } from 'nuxt/app'
import { useAsyncData } from 'nuxt/app'
import type { MultiWatchSources } from 'nuxt/dist/app/composables/asyncData'

type RequestArguments<T extends ApiType> = T['params'] extends Record<string, unknown> | FormData
    ? [api: T['api'], params: T['params']]
    : [api: T['api']]

export function get<Type extends ApiGetType>(
    ...[api, params]: RequestArguments<Type>
): Promise<Type['return']> {
    const fullApi = '/api' + api

    return $fetch(fullApi, {
        params,
        method: 'get',
        headers: {
            referer: 'https://carllllo.work/'
        }
    })
}

export function post<Type extends ApiPostType>(
    ...[api, params]: RequestArguments<Type>
): Promise<Type['return']> {
    const fullApi = '/api' + api

    return $fetch(fullApi, {
        body: params,
        method: 'post',
        headers: {
            referer: 'https://carllllo.work/'
        }
    })
}

type usePageDataParams<T extends ApiPostType> = {
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
}: usePageDataParams<Type>): AsyncData<Type['return'], any> {
    const fullApi = '/api' + api

    return useAsyncData(
        key || fullApi,
        () => {
            return $fetch(fullApi, {
                body: params,
                method: 'post',
                headers: {
                    referer: 'https://carllllo.work/'
                }
            })
        },
        {
            transform,
            watch
        }
    )
}
