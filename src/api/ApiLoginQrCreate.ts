/** 二维码生成接口 */
export interface ApiLoginQrCreate {
    api: '/login/qr/create',
    method: 'post',
    params: {
        key: string;
        qrimg?: boolean;
    }
    return: ApiResponse<{
        qrimg: string;
    }>;
}
