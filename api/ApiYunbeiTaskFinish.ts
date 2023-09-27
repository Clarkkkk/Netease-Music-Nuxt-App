/** 云贝完成任务 */
export interface ApiYunbeiTaskFinish {
    api: '/yunbei/task/finish'
    method: 'post'
    params: {
        /** 任务 depositCode */
        depositCode: any
    }
    return: ApiResponse
}
