<script setup lang="ts">
import type { ApiPlaylistDetail } from 'api'
import { Image } from 'components'
import { toHttps } from 'utils'

interface InfoProps {
    info: ApiPlaylistDetail['return']['playlist'] | null
}

defineProps<InfoProps>()
</script>

<template>
    <div>
        <div class="flex flex-col md:flex-row">
            <Image
                :src="info?.coverImgUrl"
                class="h-56 w-56 flex-fixed rounded-xl"
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
    </div>
</template>

<style scoped></style>
