<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import { ref } from 'vue'

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
    onClick: (e: MouseEvent) => void | Promise<void>
}

const props = defineProps<Props>()

const loading = ref(false)

function clickHandler(e: MouseEvent) {
    if (props.onClick) {
        const result = props.onClick(e)
        if (result instanceof Promise) {
            loading.value = true
            result.finally(() => {
                loading.value = false
            })
        }
    }
}
</script>

<template>
    <button
        :class="['btn']"
        :disabled="disabled || loading"
        @click="clickHandler"
    >
        <span
            v-show="loading"
            class="loading loading-spinner"
        />
        <slot />
    </button>
</template>

<style scoped></style>
