<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <audio-player/>
  </div>
</template>

<script>
import AudioPlayer from '@/components/AudioPlayer.vue';
export default {
  components: {
    AudioPlayer
  }
};
</script>

<style>
body {
  margin: 0;
  overflow-x: hidden;
  font-size: 14px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  --app-color: #e91a3d;
}
</style>
