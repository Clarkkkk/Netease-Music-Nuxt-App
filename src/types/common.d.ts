interface ApiResponseType {
    errcode: number;
    data?: Record<string, unknown>;
}

type ApiError<T extends ApiResponseType = ApiResponseType> = T

interface APIBaseResponse {
    code: number;
    cookie?: string;
}

type ApiResponse<T = unknown> = {
    code: number; // The Http Response Code
    data: APIBaseResponse & T; // API Response body
}

type ApiResponseWithoutData = APIBaseResponse & T

interface ApiType {
    api: string;
    method: 'get' | 'post';
    params?: Record<string, unknown>;
    return?: ApiResponse | ApiResponseWithoutData;
}

interface ApiGetType extends ApiType {
    method: 'get'
}

interface ApiPostType extends ApiType {
    method: 'post'
}
