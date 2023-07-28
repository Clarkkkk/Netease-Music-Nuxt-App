<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useMediaQuery } from '@vueuse/core'
import { useAnimation, useDeviceType, useIsHovering } from 'services'
import { usePlaylistStore } from 'stores'
import { DefaultCover, Image } from 'components'
import { wait } from 'utils'
import Lyrics from './Lyrics.vue'

const { isHovering, onMouseEnter, onMouseLeave } = useIsHovering()
const { isMobile } = useDeviceType()
const playlist = usePlaylistStore()
const showLyrics = useMediaQuery('(max-width: 1023px)')
const isInverse = ref(false)
const inverse = useAnimation()
const restore = useAnimation()

onBeforeRouteLeave(async () => {
    if (isInverse.value) {
        isInverse.value = false
        await wait(100)
    }
})
</script>

<template>
    <div
        v-if="playlist.currentSong?.cover"
        class="playing-cover-container relative aspect-square w-5/6 md:h-96 md:w-96"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <Image
            v-view-transition-name="'playing-cover-shadow'"
            :src="playlist.currentSong?.cover"
            :class="[
                'absolute',
                'left-0',
                'top-0',
                'rounded-3xl',
                (isHovering && !isMobile) || isInverse ? 'blur-3xl' : 'blur-xl'
            ]"
            :size="400"
        />
        <div
            :class="[
                'cover-container',
                'relative',
                'w-full',
                'h-full',
                { inverse: isInverse },
                { 'inverse-animate': inverse.animating.value },
                { 'restore-animate': restore.animating.value }
            ]"
            @click="
                () => {
                    if (!isInverse) {
                        inverse.startAnimation()
                    } else {
                        restore.startAnimation()
                    }
                    isInverse = !isInverse
                }
            "
        >
            <div
                :class="[
                    'cover-container-inner',
                    'relative',
                    'h-full',
                    'w-full',
                    'transition-all',
                    'duration-500',
                    { 'scale-105': isHovering && !isMobile }
                ]"
                @animationend="
                    (e) => {
                        if (e.animationName === 'flip' || e.animationName === 'flip-reverse') {
                            inverse.onAnimationEnd()
                            restore.onAnimationEnd()
                        }
                    }
                "
            >
                <Image
                    v-view-transition-name="'playing-cover'"
                    :src="playlist.currentSong?.cover"
                    class="playing-cover absolute left-0 top-0 z-10 rounded-3xl"
                    :size="400"
                />
                <div
                    :class="[
                        'cover-back',
                        'absolute',
                        'left-0',
                        'top-0',
                        'h-full',
                        'w-full',
                        'rounded-3xl',
                        'bg-base-100'
                    ]"
                >
                    <Lyrics v-if="showLyrics" />
                </div>
            </div>
        </div>
    </div>
    <div
        v-else
        class="relative w-5/6 overflow-hidden rounded-3xl transition-all duration-500 hover:shadow-2xl md:h-96 md:w-96"
    >
        <DefaultCover
            v-view-transition-name="'playing-cover'"
            class="opacity-90"
        />
    </div>
</template>

<style lang="scss">
.playing-cover-container {
    perspective: 2500px;
    z-index: 1;
    cursor: pointer;

    .cover-container {
        transform-style: preserve-3d;
        transform-origin: 50% 100%;
        rotate: y 0deg;

        --ease-function: cubic-bezier(0, 0.87, 0.14, 0.99);

        .cover-container-inner {
            transform-style: preserve-3d;
        }

        .playing-cover {
            backface-visibility: hidden;
        }

        &.inverse {
            rotate: y 180deg;
        }

        &.inverse-animate {
            animation: flip-z 750ms var(--ease-function),
                flip-z 750ms var(--ease-function) reverse 750ms;

            .cover-container-inner {
                animation: flip 1500ms var(--ease-function), scale 750ms var(--ease-function),
                    scale 750ms var(--ease-function) reverse 750ms;
            }
        }

        &.restore-animate {
            animation: flip-z 750ms var(--ease-function),
                flip-z 750ms var(--ease-function) reverse 750ms;

            .cover-container-inner {
                animation: flip-reverse 1500ms var(--ease-function),
                    scale 750ms var(--ease-function), scale 750ms var(--ease-function) reverse 750ms;
            }
        }
    }

    .cover-back {
        z-index: 100;
        rotate: y 180deg;
        backface-visibility: hidden;
        container-type: size;
    }
}

@keyframes flip {
    0% {
        rotate: y 0deg;
    }

    100% {
        rotate: y 180deg;
    }
}

@keyframes flip-reverse {
    0% {
        rotate: y 180deg;
    }

    100% {
        rotate: y 360deg;
    }
}

@keyframes flip-z {
    0% {
        rotate: 10 10 0 0deg;
    }

    100% {
        rotate: 10 10 0 -20deg;
    }
}

@keyframes scale {
    0% {
        scale: 1;
    }

    100% {
        scale: 1.3;
    }
}
</style>
