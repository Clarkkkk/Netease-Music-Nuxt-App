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

<style></style>
