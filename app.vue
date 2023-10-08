<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { LoginModal, MiniMusicControl, Nav } from 'components'
import { useLoginInitEffect } from './services'

useLoginInitEffect()
const route = useRoute()
</script>

<template>
    <div>
        <ClientOnly>
            <Nav />
            <component :is="route.path.includes('/playing') ? '' : MiniMusicControl" />
        </ClientOnly>

        <LoginModal />
        <NuxtPage />
    </div>
</template>

<style lang="scss">
@import './global.css';

#app {
    min-height: 100vh;
    min-height: 100dvh;
    padding-top: env(safe-area-inset-top);
    padding-bottom: 80px;
}

html::view-transition-group(*) {
    animation-duration: 0.5s;
    animation-timing-function: ease;
    /** reduce animation glitch */
    animation-delay: 50ms;
}

* {
    // Firefox
    scrollbar-width: thin;

    &::-webkit-scrollbar {
        width: 8px;
        height: 4px;
    }

    &::-webkit-scrollbar-thumb {
        position: absolute;
        top: 0;
        right: 0;
        min-height: 20px;
        border-radius: 8px;
        background-clip: content-box;
        box-shadow: 0 0 0 8px hsl(var(--b2)) inset;
    }

    &::-webkit-scrollbar-thumb:hover {
        box-shadow: 0 0 0 8px hsl(var(--b3)) inset;
    }

    &::-webkit-scrollbar-corner {
        background: transparent;
    }
}

.btn {
    animation: none !important;
}
</style>
