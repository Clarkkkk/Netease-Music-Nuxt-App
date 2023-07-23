<script setup lang="ts">
import { useDrawerContext } from './context'

const { close, visible } = useDrawerContext()
</script>

<template>
    <Teleport to="body">
        <Transition name="drawer">
            <div
                v-if="visible"
                :class="[
                    'drawer-background',
                    'fixed',
                    'left-0',
                    'top-0',
                    'h-screen',
                    'w-screen',
                    'bg-base-content/30',
                    'backdrop-blur-2xl',
                    'transition-all'
                ]"
                @click.self="close"
            >
                <slot></slot>
            </div>
        </Transition>
    </Teleport>
</template>

<style lang="scss">
.drawer-background {
    z-index: 2000;
}

.drawer-enter-from,
.drawer-leave-to {
    opacity: 0;
}
</style>
