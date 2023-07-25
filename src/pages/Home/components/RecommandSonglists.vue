<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { ApiRecommendResource } from 'api'
import { useAuthStore } from 'stores'
import { post, toHttps } from 'utils'
import ListItem from './ListItem.vue'

interface Songlist {
    name: string
    picUrl: string
    id: number
    count: number
    creator: string
    creatorAvatar: string
}

const auth = useAuthStore()
const lists = ref<Array<Songlist>>([])
const router = useRouter()

watch(
    auth,
    (val) => {
        if (val.loggedIn) {
            post<ApiRecommendResource>('/recommend/resource').then((res) => {
                lists.value = res.recommend.slice(res.featureFirst ? 1 : 0).map((item) => {
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
            })
        }
    },
    { immediate: true }
)
</script>

<template>
    <div
        id="recommend-songlists"
        class="mt-8 w-full contain-content md:mt-12"
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
                @click="router.push(`/songlist/${list.id}`)"
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
</style>
