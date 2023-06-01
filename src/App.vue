<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { LoginModal } from 'components'
import type { ApiLoginStatus } from './api/ApiLoginStatus'
import { post } from './utils/request'
import { useAuthStore } from './stores'
import './global.css'

const { openLogin, login, logout } = useAuthStore()

onMounted(() => onInit())

function onInit() {
    post<ApiLoginStatus>('/login/status')
        .then((res) => {
            if (res.profile) {
                login()
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
<RouterView class="bg-base-100" />
<button @click="openLogin">
    log in
</button>
<LoginModal />
</template>

<style></style>
