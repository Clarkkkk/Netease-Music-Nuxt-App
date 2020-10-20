<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <app-audio-player/>
    <app-dock/>
  </div>
</template>

<script>
import AppAudioPlayer from '@/components/AppAudioPlayer.vue';
import AppDock from '@/components/AppDock.vue';
export default {
  components: {
    AppAudioPlayer,
    AppDock
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
  --app-color-rgb: 233, 26 ,61;
}
</style>
