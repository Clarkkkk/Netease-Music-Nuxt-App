/** 登录状态 */
export interface ApiLoginStatus {
    api: '/login/status'
    method: 'post'
    return: {
        data: {
            code: number
            account: {
                id: number
                userName: string
                type: number
                status: number
                whitelistAuthority: number
                createTime: number
                tokenVersion: number
                ban: number
                baoyueVersion: number
                donateVersion: number
                vipType: number
                anonimousUser: boolean
                paidFee: boolean
            }
            profile: {
                userId: number
                userType: number
                nickname: string
                avatarImgId: number
                avatarUrl: string
                backgroundImgId: number
                backgroundUrl: string
                signature: string
                createTime: number
                userName: string
                accountType: number
                shortUserName: string
                birthday: number
                authority: number
                gender: number
                accountStatus: number
                province: number
                city: number
                authStatus: number
                description: null
                detailDescription: null
                defaultAvatar: boolean
                expertTags: null
                experts: null
                djStatus: number
                locationStatus: number
                vipType: number
                followed: boolean
                mutual: boolean
                authenticated: boolean
                lastLoginTime: number
                lastLoginIp: string
                remarkName: null
                viptypeVersion: number
                authenticationTypes: number
                avatarDetail: null
                anchor: boolean
            }
        }
    }
}
