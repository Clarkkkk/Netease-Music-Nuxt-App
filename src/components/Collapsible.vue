<script setup lang="ts">
import { ref, useSlots } from 'vue'
import { Button } from 'components'

const slots = useSlots()

defineProps<{
    collapseHeight: number
    collapsible?: boolean
}>()

const isOpen = ref(false)
</script>

<template>
    <div class="relative pb-6">
        <div
            class="overflow-hidden transition-all"
            :style="{
                maxHeight: isOpen ? '2000px' : `${collapseHeight}px`
            }"
        >
            <slot name="default"></slot>
        </div>

        <Button
            class="btn-ghost btn-xs absolute bottom-0"
            @click="isOpen = !isOpen"
        >
            <slot
                v-if="collapsible"
                name="button-content"
                :is-open="isOpen"
            />
            <span v-if="!slots['button-content']">{{ isOpen ? '收起' : '展开' }}</span>
        </Button>
    </div>
</template>

<style lang="scss"></style>
