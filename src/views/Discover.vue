<template>
  <div id="discover">
    <transition :name="transitionName">
      <keep-alive :include="includeNames">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
const childRoutes = {
  'discover': 'home',
  'discover-search': 'search',
  'discover-recommendation': 'songlist',
  'discover-songlist': 'songlist'
}
export default {
  computed: {
    transitionName() {
      return this.$store.state.routeHistory.transitionName;
    },

    includeNames() {
      let history = [...this.$store.state.routeHistory.history];
      history.forEach((item, i, arr) => {
        if (childRoutes[item]) {
          arr[i] = childRoutes[item];
        }
      });
      return history;
    }
  }
};
</script>

<style>
#discover {
  z-index: 0;
  background-color:white;
  height: 100%;
}
</style>
