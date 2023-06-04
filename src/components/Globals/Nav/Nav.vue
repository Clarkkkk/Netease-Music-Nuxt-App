<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from 'stores'
import Button from '../../Button.vue'
import { Profile } from './components'

const auth = useAuthStore()
</script>

<template>
    <nav class="navbar bg-base-100 px-4">
        <RouterLink
            class="flex items-center text-2xl font-thin text-primary"
            to="/"
        >
            <i-solar-vinyl-line-duotone class="mr-2 h-8 w-8" />
            <span>Music</span>
        </RouterLink>
        <div class="w-full flex-auto" />
        <div class="flex-initial flex-shrink-0">
            <Button
                v-if="!auth.loggedIn"
                class="btn-ghost"
                @click="auth.openLogin"
            >
                登录
            </Button>
            <Profile v-else />
        </div>
    </nav>
</template>

<style></style>
