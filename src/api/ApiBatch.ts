/** batch 批量请求接口 */
export interface ApiBatch {
    api: '/batch',
    method: 'post',
    return: ApiResponse;
}
