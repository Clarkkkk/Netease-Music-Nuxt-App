<script setup lang="ts">
import Inner from './assets/inner.svg'
import Middle from './assets/middle.svg'
import Outer from './assets/outer.svg'

const props = defineProps<{
    fullscreen?: boolean
}>()
</script>

<template>
<div
    :class="[
        'w-full',
        'h-full',
        'flex',
        'items-center',
        'justify-center',
        'top-0',
        'left-0',
        'transition-all',
        {
            fixed: !!props.fullscreen,
            'backdrop-blur-xl': !!props.fullscreen
        }
    ]"
>
    <div class="relative flex w-6 items-center justify-center text-primary">
        <Inner class="absolute h-full w-full animate-spin" />
        <Middle class="absolute h-full w-full animate-spin-reverse" />
        <Outer class="h-full w-full animate-spin" />
    </div>
</div>
</template>

<style scoped></style>
