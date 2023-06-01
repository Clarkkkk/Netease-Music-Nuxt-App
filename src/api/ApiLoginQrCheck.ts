/** 二维码检测扫码状态接口 */
export interface ApiLoginQrCheck {
    api: '/login/qr/check',
    method: 'post',
    params: {
        key: string
    }
    return: APIBaseResponse & {
        /** 轮询此接口可获取二维码扫码状态,800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies) */
        code: 800 | 801 | 802 | 803;
        message: string;
    }
}
