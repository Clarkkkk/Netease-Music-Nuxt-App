/** 发送验证码 */
export interface ApiCaptchaSent {
    api: '/captcha/sent',
    method: 'post',
    params: {
        /** 手机号码 */
        phone: any;
        /** 国家区号,默认 86 即中国 */
        ctcode: any;
    }
    return: ApiResponse;
}
