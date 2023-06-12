<script setup lang="ts">
import { Tippy } from 'vue-tippy'
import { storeToRefs } from 'pinia'
import { useAuthStore, useProfileStore } from 'stores'
import Button from '../../../Button.vue'
const { profile } = storeToRefs(useProfileStore())
const { logout } = useAuthStore()

async function onLogout() {
    await logout()
    window.location.reload()
}
</script>

<template>
    <div id="nav-profile">
        <Tippy
            max-width="none"
            interactive
            :delay="[0, 300]"
        >
            <button class="btn-ghost btn">
                <img
                    v-if="!!profile"
                    :src="profile.profile.avatarUrl"
                    class="h-8 w-8 rounded-full object-cover"
                />
                <i-solar-user-bold-duotone
                    v-else
                    class="h-6 w-6"
                />
            </button>

            <template #content>
                <div class="card glass flex h-auto w-80 flex-col items-center !shadow-2xl">
                    <figure class="h-48 w-full bg-base-200">
                        <img
                            v-if="!!profile"
                            :src="profile.profile.backgroundUrl"
                            class="h-full w-full object-cover"
                        />
                        <i-solar-gallery-bold-duotone
                            v-else
                            class="h-8 w-8"
                        />
                    </figure>
                    <div class="avatar -mb-8 flex -translate-y-1/2 justify-center">
                        <div class="w-20 rounded-full">
                            <img
                                v-if="!!profile"
                                :src="profile.profile.avatarUrl"
                                class="h-full w-full object-cover"
                            />
                            <i-solar-user-circle-bold-duotone
                                v-else
                                class="h-full w-full"
                            />
                        </div>
                    </div>
                    <div class="flex w-full flex-col items-center px-4 pb-4">
                        <div class="text-lg font-bold">
                            {{ profile?.profile.nickname || '' }}
                        </div>
                        <Button
                            class="btn-primary btn-outline btn mt-8 w-full"
                            @click="onLogout"
                        >
                            退出登录
                        </Button>
                    </div>
                </div>
            </template>
        </Tippy>
    </div>
</template>

<style>
#nav-profile .tippy-box[data-state='hidden'] {
    opacity: 0;
    transform: scale(0.9);
    transform-origin: top right;
}

#nav-profile .tippy-box {
    background-color: hsl(var(--b1));
}
</style>
