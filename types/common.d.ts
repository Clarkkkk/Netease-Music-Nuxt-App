interface ApiResponseType {
    errcode: number
    data?: Record<string, unknown>
}

type ApiError<T extends ApiResponseType = ApiResponseType> = T

interface APIBaseResponse {
    code: number
    cookie?: string
}

type ApiResponse<T = unknown> = {
    code: number // The Http Response Code
    data: APIBaseResponse & T // API Response body
}

type ApiResponseWithoutData = APIBaseResponse & T

interface ApiType {
    api: string
    method: 'get' | 'post'
    params?: Record<string, unknown>
    return?: any
}

interface ApiGetType extends ApiType {
    method: 'get'
}

interface ApiPostType extends ApiType {
    method: 'post'
}

interface Song {
    id: number
    artistId: number
    albumId: number
    name: string
    subName: string
    artist: string
    album: string
    cover: string
    sourceid?: number
    timestamp: number
    url: string
    status: 'not-playing' | 'waiting-to-play' | 'playing' | 'play-failed' | 'updating'
}
