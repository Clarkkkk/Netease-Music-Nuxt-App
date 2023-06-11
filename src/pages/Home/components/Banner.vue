<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import type { ApiBanner } from 'api'
import { ONE_SECOND } from 'common'
import { Image } from 'components'
import { post } from 'utils'

const pics = ref<ApiBanner['return']['banners']>([])
const currentIndex = ref(0)
const intervalId = ref(0)

const lastIndex = computed(() => {
    if (pics.value.length === 0) {
        return -1
    } else {
        return (currentIndex.value - 1 + pics.value.length) % pics.value.length
    }
})

const nextIndex = computed(() => {
    if (pics.value.length === 0) {
        return -1
    } else {
        return (currentIndex.value + 1) % pics.value.length
    }
})

function moveCurrentIndex() {
    currentIndex.value = (currentIndex.value + 1) % pics.value.length
}

onMounted(() => {
    post<ApiBanner>('/banner', { type: 0 })
        .then((res) => {
            pics.value = res.banners
            return nextTick()
        })
        .then(() => {
            intervalId.value = window.setInterval(() => {
                moveCurrentIndex()
            }, 8 * ONE_SECOND)
        })
})

onUnmounted(() => {
    clearInterval(intervalId.value)
})
</script>

<template>
    <div
        id="home-banner"
        class="relative"
    >
        <Image
            v-for="(pic, index) in pics"
            :key="pic.imageUrl"
            :class="[
                'banner-image',
                'absolute',
                'top-1/2',
                'left-1/2',
                'rounded-2xl',
                'transition-all',
                'shadow-lg',
                { current: index === currentIndex },
                { last: index === lastIndex },
                { next: index === nextIndex }
            ]"
            :src="pic.imageUrl"
        />
    </div>
</template>

<style lang="scss">
#home-banner {
    width: 100%;
    height: 300px;

    .banner-image {
        width: 80%;
        max-width: 840px;
        max-height: 300px;
        transform: translateX(-50%) translateY(-50%) scale(0.5);
        opacity: 0;
        z-index: -1;
        pointer-events: none;

        &.last {
            opacity: 1;
            transform: translateX(-65%) translateY(-50%) scale(0.8);
            filter: blur(10px);
            z-index: 0;
        }

        &.current {
            opacity: 1;
            transform: translateX(-50%) translateY(-50%) scale(1);
            z-index: 10;
            pointer-events: all;
            cursor: pointer;

            img {
                transition: transform 800ms;
            }

            &:hover {
                img {
                    transform: scale(1.1);
                }
            }
        }

        &.next {
            opacity: 1;
            transform: translateX(calc(-35%)) translateY(-50%) scale(0.8);
            filter: blur(10px);
            z-index: 0;
        }
    }
}
</style>
