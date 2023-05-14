/** 获取专辑内容 */
export interface ApiAlbum {
    api: '/album',
    method: 'post',
    params: {
        /** 专辑 id */
        id: any;
    }
    return: ApiResponse;
}
