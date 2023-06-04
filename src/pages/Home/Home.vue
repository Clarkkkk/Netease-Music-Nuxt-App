<script setup lang="ts">
// import { useRouter } from 'vue-router'
// import { storeToRefs } from 'pinia'
// import { useAuthStore } from '../../stores'
// import
// const router = useRouter()
// const { loggedIn } = storeToRefs(useAuthStore())
// function search(event) {
//     // do not need to blur, otherwise the search bar in search page won't
//     // get focused by the first tap in iOS Safari
//     router.push('search')
// }

// function tap(to: string) {
//     console.log(to)
//     if (to.includes('songlist') || loggedIn) {
//         router.push(to)
//     } else {
//         if (window.confirm('该功能需要登录，是否前往登录？')) {
//             router.push({ name: 'login' })
//         }
//     }
// }

//   function formatNum(num: number) {
//     if (num >= 10000) {
//       return Math.floor(num / 10000) + '万';
//     } else {
//       return num;
//     }
//   }
</script>

<template>
    <div id="home"></div>
</template>

<style scoped></style>
