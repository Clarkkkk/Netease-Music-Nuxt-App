<script setup lang="ts">
import Button from '../Button.vue'
import { ContextMenu, ContextMenuItem } from '../ContextMenu'

async function onNextClick(): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 5000)
    })
}
</script>

<template>
    <ContextMenu>
        <template #default>
            <Button class="btn-ghost btn-square btn-sm">
                <template #icon>
                    <i-solar-menu-dots-bold />
                </template>
            </Button>
        </template>

        <template #menu>
            <ContextMenuItem @click="onNextClick">
                <i-solar-play-line-duotone class="h-5 w-5" />
                <span>立即播放</span>
            </ContextMenuItem>
            <ContextMenuItem @click="onNextClick">
                <i-solar-play-circle-line-duotone class="h-5 w-5" />
                <span>下一首播放</span>
            </ContextMenuItem>
            <ContextMenuItem @click="onNextClick">
                <i-solar-list-heart-minimalistic-line-duotone class="h-5 w-5" />
                <span>收藏到歌单</span>
            </ContextMenuItem>
            <ContextMenuItem @click="onNextClick">
                <i-solar-vinyl-line-duotone class="h-5 w-5" />
                <span>查看专辑</span>
            </ContextMenuItem>
        </template>
    </ContextMenu>
</template>

<style scoped></style>
