<script setup lang="ts">
import type { ComputedRef, StyleValue } from 'vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Image } from 'components'
import { minmax, toHttps } from 'utils'

const props = defineProps<{ img: string; position: number; id: number }>()

const router = useRouter()
const elementRef = ref<HTMLDivElement | null>(null)
const positionPercentage = computed(() => {
    if (!elementRef.value) return 0

    return minmax(
        (elementRef.value.offsetLeft + elementRef.value.clientWidth / 2 - props.position) /
            (elementRef.value.clientWidth * 1),
        { min: -1, max: 1 }
    )
})

const transformStyle: ComputedRef<StyleValue> = computed(() => {
    if (!elementRef.value) return {}
    const relativePosition =
        (elementRef.value.offsetLeft + elementRef.value.clientWidth / 2 - props.position) /
        elementRef.value.clientWidth

    let zIndex = 0
    if (Math.abs(relativePosition) < 0.01) {
        zIndex = 200
    } else if (relativePosition < 0) {
        zIndex = 1
    } else {
        zIndex = Math.max(Math.floor(100 - relativePosition), 1)
    }
    return {
        zIndex,
        transform: `perspective(300px) translateX(${positionPercentage.value * 70}px) translateY(${
            Math.abs(positionPercentage.value) < 0.1 ? '-10px' : '0'
        }) rotateY(${positionPercentage.value * -75}deg) scale(${minmax(
            1 - Math.abs(positionPercentage.value),
            { min: 0.7, max: 1 }
        )})`
    }
})

function onClick() {
    if (!elementRef.value) return
    const relativePosition =
        (elementRef.value.offsetLeft + elementRef.value.clientWidth / 2 - props.position) /
        elementRef.value.clientWidth

    if (Math.abs(relativePosition) < 0.1) {
        router.push(`/album/${props.id}`)
    }
}
</script>

<template>
    <div
        ref="elementRef"
        class="album-container h-8 w-8"
        @click="onClick"
    >
        <!-- use nested container to avoid quirk behaviours in chromium: https://stackoverflow.com/questions/75104680/css-scroll-snap-children-with-transform-on-hover-causes-janky-effect-in-chromi -->
        <div
            class="relative flex h-8 w-8 flex-fixed cursor-pointer items-center justify-center duration-300 hover:scale-110 active:scale-100"
            :style="transformStyle"
        >
            <Image
                :src="toHttps(img)"
                :class="[
                    'playing-cover-shadow',
                    'absolute',
                    'h-48',
                    'w-48',
                    'flex-fixed',
                    'transition-all',
                    'duration-500',
                    'opacity-50',
                    { blur: true }
                ]"
                loading="lazy"
                :size="300"
            />
            <Image
                :src="toHttps(img)"
                :class="[
                    'playing-cover-bottom-shadow',
                    'absolute',
                    'h-48',
                    'w-48',
                    'flex-fixed',
                    'transition-all',
                    'duration-500',
                    'content-visible'
                ]"
                loading="lazy"
                :size="300"
            />
            <Image
                :src="toHttps(img)"
                class="relative z-10 h-48 w-48 flex-fixed content-visible"
                loading="lazy"
                :size="300"
            />
        </div>
    </div>
</template>

<style lang="scss">
.album-container {
    scroll-snap-align: center;
    scroll-snap-stop: always;

    .playing-cover-shadow {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .playing-cover-bottom-shadow {
        bottom: -272px;
        left: 50%;
        transform: translateX(-50%) rotate(180deg);

        picture {
            background-image: linear-gradient(180deg, #ffffffff 75%, #ffffffc0 100%);
        }

        img {
            mix-blend-mode: screen;
        }
    }
}

@media (prefers-color-scheme: dark) {
    .album-container {
        .playing-cover-bottom-shadow {
            picture {
                background-image: linear-gradient(180deg, #000000 55%, #000000c0 100%);
            }

            img {
                mix-blend-mode: overlay;
            }
        }
    }
}
</style>
