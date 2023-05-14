/** banner */
export interface ApiBanner {
    api: '/banner',
    method: 'post',
    params: {
        /** 资源类型,对应以下类型,默认为 0 即 PC */
        type: any;
    }
    return: ApiResponse;
}
