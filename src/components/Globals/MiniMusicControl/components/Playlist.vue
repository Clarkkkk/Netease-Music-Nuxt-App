<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlaylistStore } from 'stores'
import Button from '../../../Button.vue'
import ContextMenu from '../../../ContextMenu/ContextMenu.vue'
import ContextMenuItem from '../../../ContextMenu/ContextMenuItem.vue'

const { playlist, currentSong } = storeToRefs(usePlaylistStore())
const { switchToThisSong, removeSong } = usePlaylistStore()
</script>

<template>
    <div>
        <ContextMenu
            placement="top-end"
            size="large"
        >
            <template #default>
                <Button class="btn-ghost btn-square btn-sm ml-3 p-0">
                    <i-solar-plaaylist-minimalistic-bold-duotone class="h-5 w-5" />
                </Button>
            </template>

            <template #menu>
                <ul>
                    <ContextMenuItem
                        v-for="song in playlist"
                        :key="song.id"
                        class="flex flex-nowrap items-center overflow-hidden whitespace-nowrap"
                        @click="switchToThisSong(song)"
                    >
                        <i-solar-play-bold
                            v-if="song === currentSong"
                            class="h-3 w-3 flex-fixed overflow-hidden text-primary"
                        />
                        <span class="text-ellipsis text-sm">
                            {{ song.name }}
                        </span>
                        <span
                            class="flex-auto overflow-hidden text-ellipsis text-left text-xs text-base-content/60"
                        >
                            {{ song.artist }}
                        </span>
                        <Button
                            class="btn-ghost btn-square btn-sm"
                            @click.stop="removeSong(song)"
                        >
                            <template #icon>
                                <i-fluent-dismiss-32-regular class="h-3 w-3" />
                            </template>
                        </Button>
                    </ContextMenuItem>
                </ul>
            </template>
        </ContextMenu>
    </div>
</template>

<style scoped></style>
