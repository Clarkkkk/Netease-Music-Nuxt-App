/** 音乐是否可用 */
export interface ApiCheckMusic {
    api: '/check/music',
    method: 'post',
    params: {
        /** 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推 */
        br: any;
    }
    return: ApiResponse;
}
