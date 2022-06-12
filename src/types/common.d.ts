interface ApiType {
    api: string;
    method: 'get' | 'post';
    params?: Record<string, unknown>;
    return?: Record<string, unknown> | Array<Record<string, unknown>> | string | number;
}

interface ApiGetType extends ApiType {
    method: 'get'
}

interface ApiPostType extends ApiType {
    method: 'post'
}

interface ApiResponseType {
    errcode: number;
    data?: Record<string, unknown>;
}

type ApiError<T extends ApiResponseType = ApiResponseType> = T
