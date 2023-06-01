/** 手机登录(现在要求验证,暂时绕不过,请使用二维码登录) */
export interface ApiLoginCellphone {
    api: '/login/cellphone',
    method: 'post',
    params: {
        /** 手机号码 */
        phone: any;
        /** 密码 */
        password: any;
        /** 国家码，用于国外手机号登录，例如美国传入：`1` */
        countrycode: any;
        /** md5 加密后的密码,传入后 `password` 参数将失效 */
        md5Password: any;
        /** 验证码,使用 [`/captcha/sent`](#发送验证码)接口传入手机号获取验证码,调用此接口传入验证码,可使用验证码登录,传入后 `password` 参数将失效 */
        captcha: any;
    }
    return: ApiResponse;
}
