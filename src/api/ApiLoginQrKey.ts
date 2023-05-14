/** 二维码 key 生成接口 */
export interface ApiLoginQrKey {
    api: '/login/qr/key',
    method: 'post',
    return: ApiResponse;
}
