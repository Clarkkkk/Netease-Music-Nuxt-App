<script setup lang="ts">
import { useIsHovering } from 'services'
import { Image } from 'components'

interface ListCoverProps {
    name: string
    picUrl: string
    id: number
}

defineProps<ListCoverProps>()

const { isHovering, onMouseEnter, onMouseLeave } = useIsHovering()
</script>

<template>
    <div
        :class="[
            'list-cover',
            'relative',
            'h-36',
            'w-36',
            'transition-all',
            'duration-500',
            { '-translate-y-2': isHovering }
        ]"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <Image
            :src="picUrl"
            :class="[
                'absolute',
                'w-full',
                'h-full',
                'left-0',
                'top-0',
                'rounded-lg',
                isHovering ? 'opacity-50' : 'opacity-0',
                isHovering ? 'blur-xl' : '',
                isHovering ? 'top-4' : 'top-0'
            ]"
        />
        <Image
            :src="picUrl"
            :class="['relative', 'rounded-lg', isHovering ? 'shadow-2xl' : '']"
        />
        <div :class="['absolute', 'w-full', 'bottom-0', 'rounded-b-lg', 'overflow-hidden']">
            <div
                :class="[
                    'p-2',
                    'w-full',
                    'rounded-b-lg',
                    'backdrop-blur-lg',
                    'bg-base-100/60',
                    'transition-all',
                    'duration-500',
                    isHovering ? 'translate-y-0' : 'translate-y-full'
                ]"
            >
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
