<script setup lang="ts">
import { ref } from 'vue'

import IconFileRemove from '~icons/solar/file-remove-line-duotone'

const loadingStatus = ref(true)
const errorStatus = ref(false)
defineProps<{
    src: string
    srcSet?: string
    webpSrc?: string
    webpSrcSet?: string
    alt?: string
    loading?: 'lazy' | 'eager'
}>()
</script>

<template>
    <picture
        v-show="src"
        :class="[
            'transition-all',
            'flex',
            'items-center',
            'justify-center',
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
            @loadstart="loadingStatus = true"
            @load="loadingStatus = false"
            @error="errorStatus = true"
        />
        <IconFileRemove v-else />
    </picture>
</template>

<style scoped></style>
