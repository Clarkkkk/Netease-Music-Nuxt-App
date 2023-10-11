<script setup lang="ts">
import { ref } from 'vue'
import type { ApiRecommendResource } from 'api'
import { toHttps, usePageData } from 'utils'
import ListItem from './ListItem.vue'

interface Songlist {
    name: string
    picUrl: string
    id: number
    count: number
    creator: string
    creatorAvatar: string
}

const lists = ref<Array<Songlist>>([])

const { data } = await usePageData<ApiRecommendResource>({
    api: '/recommend/resource',
    transform(input) {
        return {
            code: input.code,
            featureFirst: input.featureFirst,
            recommend: input.recommend.map((item) => {
                return {
                    name: item.name,
                    id: item.id,
                    picUrl: item.picUrl,
                    creator: {
                        nickname: item.creator.nickname,
                        avatarUrl: item.creator.avatarUrl
                    },
                    playcount: item.playcount
                }
            })
        } as unknown as ApiRecommendResource['return']
    }
})

lists.value = data.value.recommend.slice(data.value.featureFirst ? 1 : 0).map((item) => {
    return {
        name: item.name,
        listenCount: item.playcount,
        id: item.id,
        picUrl: toHttps(item.picUrl),
        creator: item.creator.nickname,
        creatorAvatar: toHttps(item.creator.avatarUrl),
        count: item.playcount
    }
})
</script>

<template>
    <div
        id="recommend-songlists"
        class="mt-8 w-full px-6 contain-[layout_style]"
    >
        <h2 class="border-l-4 border-primary px-2 text-lg/5 font-bold">推荐歌单</h2>
        <ul
            id="recommand-songlists"
            class="relative flex w-full flex-wrap items-center py-4"
        >
            <ListItem
                v-for="list in lists.slice(0, 6)"
                :id="list.id"
                :key="list.id"
                :name="list.name"
                :pic-url="list.picUrl"
                :creator="list.creator"
                :creator-avatar="list.creatorAvatar"
                :count="list.count"
            >
                <div class="text-sm text-base-content">
                    {{ list.name }}
                </div>
            </ListItem>
        </ul>
    </div>
</template>

<style lang="scss">
#recommend-songlists {
    height: 388px;
}

@media (max-width: 640px) {
    #recommend-songlists {
        height: 724px;
    }
}
</style>
