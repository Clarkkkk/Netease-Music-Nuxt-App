<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Audio, LoginModal, Nav } from 'components'
import { useLoginInitEffect, usePlayStatusEffect } from './services'
import './global.css'

useLoginInitEffect()
usePlayStatusEffect()
</script>

<template>
    <Nav />
    <RouterView class="bg-base-100" />
    <LoginModal />
    <Audio />
</template>

<style lang="scss">
#app {
    height: 100vh;
    height: 100dvh;
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
</style>
