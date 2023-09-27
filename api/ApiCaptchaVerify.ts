/** 验证验证码 */
export interface ApiCaptchaVerify {
    api: '/captcha/verify'
    method: 'post'
    params: {
        /** 手机号码 */
        phone: any
        /** 验证码 */
        captcha: any
        /** 国家区号,默认 86 即中国 */
        ctcode: any
    }
    return: ApiResponse
}
