<template>
  <div id="discover-home">
    <search-bar
      class="header"
      cursor="pointer"
      @click="search"
    >
      <template v-slot:left>
        <header class="discover-home">网易云音乐</header>
      </template>
    </search-bar>
    <app-banner/>
  </div>
</template>

<script>
import AppBanner from '@/components/AppBanner.vue';
import SearchBar from '@/components/SearchBar.vue';
export default {
  components: {
    AppBanner,
    SearchBar
  },

  methods: {
    search() {
      console.log('push');
      this.$router.push('search');
    }
  }
};
</script>

<style scoped>
#discover-home {
  display: grid;
  grid-template-rows: [start app-header-start] 3rem
    [app-header-end app-banner-start] 20rem [app-banner-end];
}

.header {
  width: 100%;
  height: 100%;
  background-color: var(--app-color);
  color: white;
  grid-row: app-header-start / app-header-end;

  display: grid;
  grid-template-columns: [start left-start] 6rem [left-end search-start]
    1fr [search-end right-start] 3rem [right-end end];
  grid-template-rows: 1fr;
  align-items: center;
  justify-items: center;
}

header.discover-home {
  grid-column: left-start / left-end;
}
</style>
