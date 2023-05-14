/** 获取音乐 url */
export interface ApiSongUrl {
    api: '/song/url',
    method: 'post',
    params: {
        /** 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推 */
        br: any;
    }
    return: ApiResponse;
}
