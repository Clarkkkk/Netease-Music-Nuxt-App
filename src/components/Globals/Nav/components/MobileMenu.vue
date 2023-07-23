<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore, useProfileStore } from 'stores'
import { Button, Drawer, DrawerBackground, DrawerContent, DrawerTrigger, Image } from 'components'
import { wait } from 'utils'

const { profile } = storeToRefs(useProfileStore())
const { logout } = useAuthStore()
const router = useRouter()
const navRoutes = [
    {
        name: 'Home',
        to: '/'
    },
    {
        name: 'Search',
        to: '/search'
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

function isActiveRoute(to: string) {
    if (to === '/') {
        return to === route.path
    } else {
        return route.path.includes(to)
    }
}

async function onLogout() {
    await logout()
    window.location.reload()
}

async function onRouteClick(to: string, close: () => void) {
    close()
    if (!isActiveRoute(to)) {
        await wait(200)
        router.push(to)
    }
}
</script>

<template>
    <Drawer>
        <template #default="drawerProps">
            <DrawerTrigger class="btn-ghost btn-square">
                <i-solar-hamburger-menu-line-duotone class="h-6 w-6" />
            </DrawerTrigger>

            <DrawerBackground>
                <DrawerContent class="mobile-menu flex flex-col">
                    <div class="flex justify-between p-2">
                        <div></div>
                        <Button
                            class="btn-ghost btn-square"
                            @click="drawerProps.close()"
                        >
                            <i-fluent-dismiss-32-regular />
                        </Button>
                    </div>
                    <template v-if="profile">
                        <div class="flex items-center px-6">
                            <Image
                                :src="profile.profile.avatarUrl"
                                class="h-14 w-14 rounded-full"
                            />
                            <div class="ml-4">
                                <div>
                                    <span class="text-lg font-bold">
                                        {{ profile.profile.nickname }}
                                    </span>
                                    <span class="badge badge-primary badge-sm ml-2">
                                        {{ `LV ${profile.level}` }}
                                    </span>
                                </div>
                                <div
                                    v-if="profile.profile.signature"
                                    class="text-sm text-base-content"
                                >
                                    {{ profile.profile.signature }}
                                </div>
                            </div>
                        </div>
                        <div class="menu-divider my-6"></div>
                    </template>

                    <div class="relative h-full p-2">
                        <div class="flex flex-col">
                            <Button
                                v-for="item in navRoutes"
                                :key="item.name"
                                :class="[
                                    'btn-ghost',
                                    'justify-start',
                                    {
                                        'bg-primary/10': isActiveRoute(item.to),
                                        'font-bold': isActiveRoute(item.to),
                                        'text-primary': isActiveRoute(item.to)
                                    }
                                ]"
                                @click="onRouteClick(item.to, drawerProps.close)"
                            >
                                <span>{{ item.name }}</span>
                            </Button>
                        </div>

                        <Button
                            class="logout-btn btn-primary btn-outline btn absolute bottom-4 mt-8"
                            @click="onLogout"
                        >
                            退出登录
                        </Button>
                    </div>
                </DrawerContent>
            </DrawerBackground>
        </template>
    </Drawer>
</template>

<style lang="scss">
.mobile-menu {
    padding-bottom: env(safe-area-inset-bottom);

    .menu-divider {
        width: 100%;
        height: 1px;
        @apply bg-base-content/5;
    }

    .logout-btn {
        width: calc(100% - 16px);
    }
}
</style>
