<script setup lang="ts">
import { ref } from 'vue'
import { provide } from './context'

const visible = ref(false)

function open() {
    visible.value = true
}

function close() {
    visible.value = false
}

provide({ visible, open, close })
</script>

<template>
    <slot
        :visible="visible"
        :open="open"
        :close="close"
    />
</template>

<style lang="scss"></style>
