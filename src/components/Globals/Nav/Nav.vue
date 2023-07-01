<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
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
const searchTransition = ref(false)

watch(
    route,
    (val) => {
        if (val.path.includes('/search')) {
            searchTransition.value = false
        }
    },
    { immediate: true }
)

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

async function onSearch(keyword: string) {
    searchTransition.value = true
    router.push(`/search?keyword=${keyword}`)
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
            <div
                v-if="!route.path.includes('/search')"
                class="relative mr-8"
            >
                <i-solar-magnifer-line-duotone
                    v-view-transition-name="searchTransition ? 'search-icon' : ''"
                    class="absolute left-2 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-primary"
                />
                <input
                    v-view-transition-name="searchTransition ? 'search-input' : ''"
                    class="input-primary input input-sm pl-8"
                    @keydown.enter="(e) => onSearch((e.target as HTMLInputElement).value)"
                />
            </div>
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
