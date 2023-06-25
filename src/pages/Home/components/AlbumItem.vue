<script setup lang="ts">
import { useIsHovering } from 'services'
import { Image } from 'components'

interface AlbumItemProps {
    name: string
    subName: string
    artist: string
    artistPicUrl: string
    id: number
    picUrl: string
    createTime: number
}

defineProps<AlbumItemProps>()

const { isHovering, onMouseEnter, onMouseLeave } = useIsHovering()
</script>

<template>
    <li
        :key="id"
        :class="[
            'mb-8',
            'mr-6',
            'rounded',
            'transition-all',
            'duration-500',
            'cursor-pointer',
            { '-translate-y-1': isHovering }
        ]"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <Image
            :class="[
                'absolute',
                'z-0',
                'h-full',
                'w-full',
                'rounded',
                isHovering ? 'opacity-50' : 'opacity-0',
                isHovering ? 'blur-2xl' : 'blur'
            ]"
            :src="picUrl"
        />

        <div class="absolute h-full w-full overflow-hidden rounded">
            <Image
                :src="picUrl"
                class="h-full w-full blur-xl"
            />
        </div>
        <Image
            :src="picUrl"
            class="relative flex-fixed rounded-t"
        />
        <div class="relative w-full rounded-b bg-base-100/90 p-2 text-sm text-base-content md:p-4">
            <div
                class="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold text-base-content/90"
            >
                {{ name }}
            </div>
            <div class="mt-1 text-xs text-base-content/90">
                {{ artist }}
            </div>
        </div>
    </li>
</template>

<style scoped></style>
