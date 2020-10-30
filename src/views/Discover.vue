<template>
  <div id="discover">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    transitionName() {
      return this.$store.state.routeHistory.transitionName;
    }
  }
}
</script>

<style>
#discover {
  z-index: 0;
  background-color:white;
  height: calc(100vh - 2.5rem);
}
</style>
