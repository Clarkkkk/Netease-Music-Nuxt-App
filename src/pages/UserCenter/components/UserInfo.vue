<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProfileStore } from 'stores'
import { Image } from 'components'

const { profile } = storeToRefs(useProfileStore())
</script>

<template>
    <div class="flex h-40 items-center justify-between px-4">
        <template v-if="profile">
            <div class="flex items-center">
                <Image
                    :src="profile.profile.avatarUrl"
                    class="h-20 w-20 rounded-full"
                />
                <div class="ml-4">
                    <div>
                        <span class="text-xl font-bold">
                            {{ profile.profile.nickname }}
                        </span>
                        <span class="badge badge-primary badge-sm ml-2">
                            {{ `LV ${profile.level}` }}
                        </span>
                    </div>
                    <div
                        v-if="profile.profile.signature"
                        class="mt-2 text-sm text-base-content"
                    >
                        {{ profile.profile.signature }}
                    </div>
                </div>
            </div>
            <div class="text-end">
                <div class="text-sm">
                    注册于
                    <span class="font-bold text-secondary">
                        {{ new Date(profile.createTime).toLocaleDateString() }}
                    </span>
                    ，距今
                    <span class="font-bold text-secondary">
                        {{ profile.createDays }}
                    </span>
                    天
                </div>
                <div class="mt-2 text-sm">
                    已收听
                    <span class="font-bold text-secondary">
                        {{ profile.listenSongs }}
                    </span>
                    首歌
                </div>
            </div>
        </template>
    </div>
</template>

<style lang="scss"></style>
