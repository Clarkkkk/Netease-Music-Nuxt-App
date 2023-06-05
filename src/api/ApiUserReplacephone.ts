/** 用户绑定手机 */
export interface ApiUserReplacephone {
    api: '/user/replacephone'
    method: 'post'
    params: {
        /** 国家地区代码,默认 86 */
        countrycode: any
    }
    return: ApiResponse
}
