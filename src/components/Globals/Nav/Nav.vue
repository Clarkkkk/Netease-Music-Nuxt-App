<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore, usePlaylistStore } from 'stores'
import Button from '../../Button.vue'
import { Profile } from './components'

const auth = useAuthStore()
const { playMode } = storeToRefs(usePlaylistStore())
const { switchToRadio } = usePlaylistStore()
const router = useRouter()
const navRoutes = [
    {
        name: 'Home',
        to: '/'
    },
    {
        name: 'Playing',
        to: '/playing'
    }
]
const route = useRoute()
const isTop = ref(window.scrollY === 0)

onMounted(() => {
    window.addEventListener(
        'scroll',
        () => {
            isTop.value = window.scrollY === 0
        },
        { passive: true }
    )
})

function isActiveRoute(to: string) {
    if (to === '/') {
        return to === route.path
    } else {
        return route.path.includes(to)
    }
}

async function onRadioClick() {
    if (playMode.value !== 'radio') {
        await switchToRadio()
    } else {
        router.push('/playing')
    }
}
</script>

<template>
    <nav
        :class="[
            'navbar',
            'fixed',
            'top-0',
            'z-10',
            'px-4',
            'duration-500',
            { 'bg-base-100/80': !isTop },
            { 'backdrop-blur-2xl': !isTop }
        ]"
    >
        <RouterLink
            class="mr-4 flex items-center text-2xl font-bold text-primary"
            to="/"
        >
            <i-solar-vinyl-bold-duotone class="mr-3 h-9 w-9" />
            <span>Music</span>
        </RouterLink>
        <div class="mx-4 w-full flex-auto">
            <RouterLink
                v-for="item in navRoutes"
                :key="item.name"
                :class="[
                    'link',
                    'px-4',
                    {
                        'link-primary': isActiveRoute(item.to),
                        'font-bold': isActiveRoute(item.to)
                    }
                ]"
                :to="item.to"
            >
                <span>{{ item.name }}</span>
            </RouterLink>
        </div>
        <div class="flex-fixed">
            <Button
                v-if="auth.loggedIn"
                class="btn-primary btn-sm mr-4"
                @click="onRadioClick"
            >
                <i-solar-play-stream-line-duotone class="h-6 w-6" />
                私人FM
            </Button>
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

<style>
.navbar {
    transition: background 200ms;
}
</style>
