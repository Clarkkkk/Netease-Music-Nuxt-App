<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ApiPlaylistDetail } from 'api'
import { FastAverageColor } from 'fast-average-color'
import { Image } from 'components'
import { toHttps } from 'utils'

interface InfoProps {
    info: ApiPlaylistDetail['return']['playlist'] | null
}

defineProps<InfoProps>()

const modal = ref<InstanceType<typeof Image> | null>(null)
const mainColor = ref('')

const gradient = computed(() => {
    return `linear-gradient(to bottom, rgba(${mainColor.value},0.2), rgba(${mainColor.value},0))`
})

function onImageLoad(img: HTMLImageElement) {
    const colorExtractor = new FastAverageColor()
    const color = colorExtractor.getColor(img, { algorithm: 'dominant' })
    mainColor.value = color.value.slice(0, 3).join(',')
}
</script>

<template>
    <div class="flex flex-col md:flex-row">
        <div
            :style="{ backgroundImage: mainColor ? gradient : '', opacity: mainColor ? 1 : 0 }"
            class="fixed left-0 top-0 h-96 w-screen transition-all duration-500"
        ></div>
        <Image
            ref="modal"
            :src="info?.coverImgUrl"
            class="songlist-cover h-56 w-56 flex-fixed rounded-xl"
            crossorigin="anonymous"
            @load="onImageLoad"
        />
        <div class="relative ml-6">
            <h1 class="text-2xl font-bold text-base-content">
                {{ info?.name }}
            </h1>
            <div class="mt-2 flex items-center">
                <span
                    v-for="(tag, index) in info?.tags || []"
                    :key="tag"
                    :class="[
                        'badge',
                        'badge-sm',
                        'mr-2',
                        { 'badge-secondary': index % 3 === 0 },
                        { 'badge-primary': index % 3 === 1 },
                        { 'badge-accent': index % 3 === 2 }
                    ]"
                >
                    {{ tag }}
                </span>
                <div
                    v-if="info"
                    class="badge badge-ghost badge-sm"
                >
                    {{ '已有' }}
                    <span class="mx-1 font-bold text-primary">
                        {{ info.subscribedCount }}
                    </span>
                    {{ '人听过' }}
                </div>
            </div>
            <div class="mt-4 flex items-center">
                <Image
                    v-if="info?.creator.avatarUrl"
                    :src="toHttps(info?.creator.avatarUrl)"
                    class="mr-2 h-6 w-6 rounded-full"
                />
                <i-solar-user-bold-duotone
                    v-else
                    class="mr-2 h-6 w-6 text-primary"
                />
                <span class="text-base-content">
                    {{ info?.creator.nickname }}
                </span>
            </div>
            <div class="mt-8 text-sm text-base-content/80">
                {{ info?.description }}
            </div>
        </div>
    </div>
</template>

<style></style>
