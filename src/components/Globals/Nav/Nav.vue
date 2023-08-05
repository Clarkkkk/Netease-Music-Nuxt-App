<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useMediaQuery } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useAuthStore, usePlaylistStore } from 'stores'
import Button from '../../Button.vue'
import { MobileMenu, Profile } from './components'

const auth = useAuthStore()
const { playMode, currentSong } = storeToRefs(usePlaylistStore())
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
    },
    {
        name: 'My music',
        to: 'user-center'
    }
]
const route = useRoute()
const isTop = ref(window.scrollY === 0)
const searchTransition = ref(false)
const lessThan1024 = useMediaQuery('(max-width: 1023px)')
const lessThan768 = useMediaQuery('(max-width: 767px)')

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

async function onInputClick() {
    searchTransition.value = true
    await nextTick()
    router.push(`/search`)
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
            'z-[200]',
            'px-4',
            'duration-500',
            { 'bg-base-100/90': !isTop },
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
            <template v-if="!lessThan1024">
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
            </template>
        </div>
        <div
            v-if="!lessThan768"
            class="flex-fixed"
        >
            <div
                v-if="!route.path.includes('/search')"
                class="relative mr-8"
            >
                <i-solar-magnifer-line-duotone
                    v-view-transition-name="{ 'search-icon': searchTransition }"
                    class="absolute left-2 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-primary"
                />
                <input
                    v-view-transition-name="{ 'search-input': searchTransition }"
                    class="input-primary input input-sm pl-8"
                    @click="onInputClick"
                />
            </div>
            <Button
                v-if="auth.loggedIn"
                :class="[
                    { 'fm-playing': playMode === 'radio' && currentSong?.status === 'playing' },
                    'btn-primary',
                    'btn-sm',
                    'mr-4'
                ]"
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
        <div
            v-else
            class="flex-fixed"
        >
            <Button
                v-if="auth.loggedIn"
                :class="[
                    { 'fm-playing': playMode === 'radio' && currentSong?.status === 'playing' },
                    'btn-primary',
                    'btn-square',
                    'btn-sm',
                    'mr-2'
                ]"
                @click="onRadioClick"
            >
                <template #icon>
                    <i-solar-play-stream-line-duotone class="h-6 w-6" />
                </template>
            </Button>
        </div>

        <MobileMenu v-if="lessThan1024" />
    </nav>
</template>

<style lang="scss">
nav.navbar {
    padding-top: env(safe-area-inset-top);
    transition: background 200ms;
}

button.fm-playing {
    animation: fm-playing 2s infinite !important;
}

@keyframes fm-playing {
    0% {
        box-shadow: 0px 0px 0px 0px hsl(var(--p) / 0.7);
    }

    100% {
        box-shadow: 0px 0px 0px 7px hsl(var(--p) / 0);
    }
}
</style>
