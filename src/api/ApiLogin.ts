/** 邮箱登录(现在要求验证,暂时绕不过,请使用二维码登录) */
export interface ApiLogin {
    api: '/login',
    method: 'post',
    params: {
        /** 163 网易邮箱 */
        email: any;
        /** 密码 */
        password: any;
        /** md5 加密后的密码,传入后 `password` 将失效 */
        md5Password: any;
    }
    return: ApiResponse;
}
