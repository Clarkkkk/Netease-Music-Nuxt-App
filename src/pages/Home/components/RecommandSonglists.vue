<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ApiRecommendResource } from 'api'
import { useAuthStore } from 'stores'
import { post, toHttps } from 'utils'
import ListCover from './ListCover.vue'

interface Songlist {
    name: string
    listenCount: number
    id: number
    picUrl: string
}

const auth = useAuthStore()
const lists = ref<Array<Songlist>>([])

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
                        picUrl: toHttps(item.picUrl)
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
        id="recommand-songlists"
        class="mt-12 w-full"
    >
        <h2 class="text-xl font-bold">推荐歌单</h2>
        <ul
            id="recommand-songlists"
            class="relative flex w-full items-center overflow-x-clip py-4"
        >
            <li
                v-for="list in lists"
                :key="list.id"
                class="mb-6 mr-6 flex flex-col items-center"
            >
                <ListCover
                    :id="list.id"
                    :name="list.name"
                    :pic-url="list.picUrl"
                >
                    <div class="text-sm text-base-content">
                        {{ list.name }}
                    </div>
                </ListCover>
            </li>
        </ul>
    </div>
</template>

<style lang="scss"></style>
