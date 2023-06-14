<script setup lang="ts">
import { type ButtonHTMLAttributes } from 'vue'
import { ref } from 'vue'

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
    disabled?: boolean
    onClick?: (e: MouseEvent) => void | Promise<void>
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
        <slot />
        <span
            v-if="loading"
            :class="['loading', 'loading-spinner', 'text-primary/70', { 'loading-sm': ($attrs.class as string).includes('btn-sm') }]"
        />
        <slot
            v-else
            name="icon"
        />
    </button>
</template>

<style scoped></style>
