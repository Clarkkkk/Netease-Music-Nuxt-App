<script setup lang="ts">
import ListItem from './ListItem.vue'

interface SonglistItem {
    name: string
    creator: string
    cover: string
    id: number
}

defineProps<{ list: SonglistItem[] }>()
</script>

<template>
    <div class="mt-16 w-full rounded-xl bg-gradient-to-b from-accent/5 to-100% p-4">
        <div class="flex w-full">
            <h2 class="text-lg font-bold text-base-content">专辑</h2>
        </div>
        <ListItem
            v-for="songlist in list"
            :key="songlist.id"
            :list-item="songlist"
            type="album"
            class="flex items-center"
        />
    </div>
</template>

<style lang="scss"></style>
