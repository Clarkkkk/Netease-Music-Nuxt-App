<template>
  <div id="profile">
    <div class="card">
      <img class="avatar" :src="avtSrc">
      <span class="nickname">{{ nickname }}</span>
      <span class="level">{{ level }}</span>
      <span class="listen-songs">{{ listenSongs }}</span>
    </div>
  </div>
</template>

<script>
import fetchJSON from '@/functions/fetchJSON.js';
export default {
  data: function() {
    return {
      nickname: '',
      level: '',
      listenSongs: '',
      avtSrc: '',
      bgSrc: ''
    };
  },
  created() {
    fetchJSON('/user/detail', {uid: this.$store.state.userID})
      .then((res) => {
        this.nickname = res.profile.nickname;
        this.level = res.level;
        this.listenSongs = res.listenSongs;
        this.avtSrc = res.profile.avatarUrl;
        this.bgSrc = res.profile.backgroundUrl;
      });
  }
};
</script>

<style scoped>

</style>
