/** 分享文本、歌曲、歌单、mv、电台、电台节目到动态 */
export interface ApiShareResource {
    api: '/share/resource',
    method: 'post',
    params: {
        /** 资源类型，默认歌曲 song，可传 `song`,`playlist`,`mv`,`djradio`,`djprogram` */
        type: any;
        /** 内容，140 字限制，支持 emoji，@用户名（`/user/follows`接口获取的用户名，用户名后和内容应该有空格），图片暂不支持 */
        msg: any;
    }
    return: ApiResponse;
}
