/** 垃圾桶 */
export interface ApiFmTrash {
    api: '/fm_trash',
    method: 'post',
    params: {
        /** 歌曲 id */
        id: any;
    }
    return: ApiResponse;
}
