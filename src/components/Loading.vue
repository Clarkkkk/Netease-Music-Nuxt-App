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
    <div class="flex items-center justify-center w-6 relative text-primary">
        <Inner class="animate-spin absolute w-full h-full" />
        <Middle class="animate-spin-reverse absolute w-full h-full" />
        <Outer class="animate-spin w-full h-full" />
    </div>
</div>
</template>

<style scoped></style>
