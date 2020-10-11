<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <app-audio-player/>
  </div>
</template>

<script>
import AppAudioPlayer from '@/components/AppAudioPlayer.vue';
export default {
  components: {
    AppAudioPlayer
  }
};
</script>

<style>
body {
  margin: 0;
  overflow: hidden;
  font-size: 14px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
  --app-color: #e91a3d;
}
</style>
