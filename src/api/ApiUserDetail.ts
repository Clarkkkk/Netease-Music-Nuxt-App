/** 获取用户详情 */
export interface ApiUserDetail {
    api: '/user/detail',
    method: 'post',
    params: {
        uid: number;
    }
    return: {
        level: number;
        listenSongs: number;
        userPoint: {
            userId: number;
            balance: number;
            updateTime: number;
            version: number;
            status: number;
            blockBalance: number;
        };
        mobileSign: boolean;
        pcSign: boolean;
        profile: {
            privacyItemUnlimit: {
                area: boolean;
                college: boolean;
                gender: boolean;
                age: boolean;
                villageAge: boolean;
            };
            avatarDetail: null;
            description: string;
            accountStatus: number;
            vipType: number;
            userType: number;
            createTime: number;
            avatarImgId: number;
            birthday: number;
            gender: number;
            nickname: string;
            avatarUrl: string;
            province: number;
            city: number;
            defaultAvatar: boolean;
            backgroundImgId: number;
            backgroundUrl: string;
            mutual: boolean;
            followed: boolean;
            remarkName: null;
            authStatus: number;
            detailDescription: string;
            experts: unknown;
            expertTags: null;
            djStatus: number;
            avatarImgIdStr: string;
            backgroundImgIdStr: string;
            userId: number;
            signature: string;
            authority: number;
            followeds: number;
            follows: number;
            blacklist: boolean;
            eventCount: number;
            allSubscribedCount: number;
            playlistBeSubscribedCount: number;
            followTime: null;
            followMe: boolean;
            artistIdentity: any[];
            cCount: number;
            inBlacklist: boolean;
            sDjpCount: number;
            playlistCount: number;
            sCount: number;
            newFollows: number;
        };
        peopleCanSeeMyPlayRecord: boolean;
        bindings: Array<{
            expired: boolean;
            url: string;
            expiresIn: number;
            refreshTime: number;
            bindingTime: number;
            tokenJsonStr: null;
            userId: number;
            id: number;
            type: number;
        }>;
        adValid: boolean;
        code: number;
        newUser: boolean;
        recallUser: boolean;
        createTime: number;
        createDays: number;
        profileVillageInfo: {
            title: string;
            imageUrl: null;
            targetUrl: string;
        };
    };
}
