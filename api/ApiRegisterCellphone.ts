/** 注册(修改密码) */
export interface ApiRegisterCellphone {
    api: '/register/cellphone'
    method: 'post'
    params: {
        /** 验证码 */
        captcha: any
        /** 国家码，用于国外手机号，例如美国传入：`1` ,默认 86 即中国 */
        countrycode: any
    }
    return: ApiResponse
}
