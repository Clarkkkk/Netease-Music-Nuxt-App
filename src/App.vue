<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { LoginModal, Nav } from 'components'
import type { ApiLoginStatus } from './api/ApiLoginStatus'
import { post } from './utils/request'
import { useAuthStore, useProfileStore } from './stores'
import './global.css'

const { openLogin, login, logout } = useAuthStore()
const { updateProfile } = useProfileStore()

onMounted(() => onInit())

function onInit() {
    post<ApiLoginStatus>('/login/status')
        .then(({ data }) => {
            console.log(data)
            if (data.profile) {
                login(data.profile.userId)
                updateProfile(data.profile.userId)
            } else {
                logout()
            }
        })
        .catch(() => {
            logout()
        })
}
</script>

<template>
<Nav />
<RouterView class="bg-base-100" />
<button @click="openLogin">
    log in
</button>
<LoginModal />
</template>

<style></style>
