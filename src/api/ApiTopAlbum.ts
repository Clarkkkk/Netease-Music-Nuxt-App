/** 新碟上架 */
export interface ApiTopAlbum {
    api: '/top/album',
    method: 'post',
    params: {
        /** ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本 */
        area: any;
    }
    return: ApiResponse;
}
