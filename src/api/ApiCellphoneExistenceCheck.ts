/** 检测手机号码是否已注册 */
export interface ApiCellphoneExistenceCheck {
    api: '/cellphone/existence/check'
    method: 'post'
    params: {
        /** 国家码，用于国外手机号，例如美国传入：`1` ,默认 86 即中国 */
        countrycode: any
    }
    return: ApiResponse
}
