/** 签到 */
export interface ApiDailySignin {
    api: '/daily_signin',
    method: 'post',
    params: {
        /** 签到类型 , 默认 0, 其中 0 为安卓端签到 ,1 为 web/PC 签到 */
        type: any;
    }
    return: ApiResponse;
}
