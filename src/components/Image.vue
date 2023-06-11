<script setup lang="ts">
import { ref, toRef, watch } from 'vue'

import IconFileRemove from '~icons/solar/file-remove-bold-duotone'

const loadingStatus = ref(true)
const errorStatus = ref(false)
const props = defineProps<{
    src?: string
    srcSet?: string
    webpSrc?: string
    webpSrcSet?: string
    alt?: string
    loading?: 'lazy' | 'eager'
}>()

const srcRef = toRef(props, 'src')

watch(srcRef, (curr, prev) => {
    if (curr !== prev) {
        errorStatus.value = false
    }
})
</script>

<template>
    <picture
        v-show="!!src"
        :class="[
            'transition-all',
            'duration-500',
            'flex',
            'items-center',
            'justify-center',
            'overflow-hidden',
            { 'blur-lg': loadingStatus }
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
            :src="src"
            :srcSet="srcSet"
            :alt="alt"
            :loading="loading"
            class="h-full w-full"
            @load="loadingStatus = false"
            @error="errorStatus = true"
        />
        <IconFileRemove v-else />
    </picture>
</template>

<style scoped></style>
