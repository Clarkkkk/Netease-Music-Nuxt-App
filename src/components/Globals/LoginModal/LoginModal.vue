<script setup lang="ts">
import { computed, watch } from 'vue'
import {
    Dialog,
    DialogCloseTrigger,
    DialogContainer,
    DialogContent,
    DialogTitle
} from '@ark-ui/vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from 'stores'
import { Image } from 'components'
import Loading from '../../Loading.vue'
import { useQrcodeLogin } from './services/useQrcodeLogin'

const { login } = useAuthStore()
const { showLoginModal } = storeToRefs(useAuthStore())
const { qrcodeImg, qrcodeLoginStatus, generateQrcode, resetQrcodeStatus } =
    useQrcodeLogin()

const message = computed(() => {
    if (qrcodeLoginStatus.value === 'wait-scan') {
        return '请使用网易云音乐app扫描二维码'
    } else if (qrcodeLoginStatus.value === 'wait-confirm') {
        return '请在app中确认登录'
    } else {
        return ''
    }
})

function refresh() {
    resetQrcodeStatus()
    generateQrcode()
}

watch(showLoginModal, (val) => {
    if (val === true) {
        generateQrcode()
    } else {
        resetQrcodeStatus()
    }
})

watch(qrcodeLoginStatus, (val) => {
    if (val === 'logged-in') {
        login()
        console.log('login success')
        window.setTimeout(() => {
            // window.location.reload()
        }, 10000)
    }
})
</script>

<template>
<Dialog
    v-model:open="showLoginModal"
    :close-on-outside-click="false"
>
    <Teleport to="body">
        <DialogContainer
            :class="[
                'modal',
                'backdrop-blur-xl',
                { 'modal-open': showLoginModal }
            ]"
        >
            <DialogContent class="modal-box flex flex-col items-center">
                <DialogTitle class="text-xl font-bold">
                    扫码登录
                </DialogTitle>
                <div
                    class="m-5 w-40 h-40 rounded-2xl border-4 border-primary/10 relative overflow-hidden"
                >
                    <Loading
                        v-if="qrcodeLoginStatus === 'initial' && !qrcodeImg"
                        class="w-full h-full"
                    />
                    <Image
                        v-else
                        :src="qrcodeImg"
                        class="w-full h-full rounded-2xl overflow-hidden"
                    />
                    <div
                        v-if="qrcodeLoginStatus === 'expired'"
                        class="w-full h-full flex items-center justify-center absolute top-0 left-0 bg-base-300"
                    >
                        <button
                            class="btn btn-sm"
                            @click="refresh"
                        >
                            点击刷新
                        </button>
                    </div>
                    <div
                        v-if="qrcodeLoginStatus === 'logged-in'"
                        class="w-full h-full flex items-center justify-center absolute top-0 left-0 bg-base-300"
                    >
                        <div class="flex items-center">
                            <i-solar-unread-linear
                                class="rounded-full bg-success w-5 h-5 mr-2 text-neutral-50"
                            />
                            <span>登录成功</span>
                        </div>
                    </div>
                </div>
                <div class="text-info-content h-5 text-sm">
                    {{ message }}
                </div>
                <DialogCloseTrigger class="absolute top-1 right-1">
                    <button class="btn btn-square btn-ghost">
                        <i-fluent:dismiss-32-regular />
                    </button>
                </DialogCloseTrigger>
            </DialogContent>
        </DialogContainer>
    </Teleport>
</Dialog>
</template>

<style scoped></style>
