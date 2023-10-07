<script setup lang="ts">
import { computed, ref, toRef, useAttrs, watch } from 'vue'

const loadingStatus = ref(true)
const errorStatus = ref(false)
const img = ref<HTMLImageElement>()
const props = defineProps<{
    src?: string
    srcSet?: string
    webpSrc?: string
    webpSrcSet?: string
    alt?: string
    loading?: 'lazy' | 'eager'
    size?: number
    crossorigin?: 'anonymous' | 'use-credentials'
    blurBeforeLoaded?: boolean
    onLoad?: (img: HTMLImageElement) => void
}>()

const calculatedSize = computed(() => {
    if (process.server) {
        return Math.floor(props.size || 0)
    } else {
        return Math.floor(props.size ? props.size * window.devicePixelRatio : 0)
    }
})

const srcRef = toRef(props, 'src')
const attrs = useAttrs()

// workaround for webkit, see: https://stackoverflow.com/questions/8705249/css-border-radius-not-trimming-image-on-webkit
const roundedClass = computed(() => {
    return ((attrs.class || '') as string).split(' ').filter((item) => item.includes('rounded'))
})

watch(srcRef, (curr, prev) => {
    if (curr !== prev) {
        errorStatus.value = false
    }
})

defineExpose({
    img
})
</script>

<template>
    <div class="picture transition-all duration-500 contain-content content-auto">
        <picture
            v-show="!!src"
            class="picture"
            :class="[
                'transition-all',
                'duration-500',
                'h-full',
                'w-full',
                'flex',
                'items-center',
                'justify-center',
                'overflow-hidden',
                roundedClass,
                { 'blur-lg': loadingStatus && !!blurBeforeLoaded }
            ]"
        >
            <source
                v-if="webpSrc && webpSrcSet"
                :src="webpSrc"
                :srcSet="webpSrcSet"
                type="image/webp"
            />
            <img
                v-if="!errorStatus"
                ref="img"
                :src="`${src}${size ? `?param=${calculatedSize}y${calculatedSize}` : ''}`"
                :srcSet="srcSet"
                :alt="alt || src"
                :loading="loading"
                :crossorigin="crossorigin"
                class="h-full w-full"
                @load="
                    (e) => {
                        loadingStatus = false
                        onLoad && onLoad(e.target as HTMLImageElement)
                    }
                "
                @error="errorStatus = true"
            />
            <i-solar-file-remove-bold-duotone v-else />
        </picture>
    </div>
</template>

<style lang="scss"></style>
