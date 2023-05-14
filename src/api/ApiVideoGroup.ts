/** 获取视频标签/分类下的视频 */
export interface ApiVideoGroup {
    api: '/video/group',
    method: 'post',
    params: {
        /** videoGroup 的 id */
        id: any;
        /** 默认 0 */
        offset: any;
    }
    return: ApiResponse;
}
