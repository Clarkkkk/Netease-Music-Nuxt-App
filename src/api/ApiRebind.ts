/** 更换绑定手机 */
export interface ApiRebind {
    api: '/rebind',
    method: 'post',
    params: {
        /** 原手机验证码 */
        oldcaptcha: any;
        /** 新手机验证码 */
        captcha: any;
    }
    return: ApiResponse;
}
