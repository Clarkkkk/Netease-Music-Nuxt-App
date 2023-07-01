<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Audio, LoginModal, MiniMusicControl, Nav } from 'components'
import { useLoginInitEffect, useMediaSessionEffect, usePlayStatusEffect } from './services'
import './global.css'

useLoginInitEffect()
usePlayStatusEffect()
useMediaSessionEffect()
</script>

<template>
    <Nav />
    <RouterView
        v-slot="{ Component }"
        class="bg-base-100"
    >
        <KeepAlive
            :max="10"
            :include="['Home', 'PlayingNow']"
        >
            <component :is="Component" />
        </KeepAlive>
    </RouterView>
    <LoginModal />
    <Audio />
    <MiniMusicControl />
</template>

<style lang="scss">
#app {
    min-height: 100vh;
    min-height: 100dvh;
    padding-bottom: 80px;
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
