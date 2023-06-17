<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import { inject } from 'vue'
import Button from '../Button.vue'

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
    onClick: (e: MouseEvent) => void | Promise<void>
}

const provided = inject<{ hideMenu: () => void }>('ContextMenu')
const props = defineProps<Props>()
async function clickHandler(e: MouseEvent) {
    await props.onClick(e)
    provided?.hideMenu()
}
</script>

<template>
    <Button
        class="btn-ghost btn-sm btn w-full justify-start pr-0 font-normal"
        @click="clickHandler"
    >
        <slot></slot>
    </Button>
</template>

<style scoped></style>
