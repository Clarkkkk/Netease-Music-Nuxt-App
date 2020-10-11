<template>
  <div id="discover-home">
    <app-search-bar
      class="header"
      cursor="pointer"
      @click="search"
    >
      <template v-slot:left>
        <header class="title">网易云音乐</header>
      </template>
    </app-search-bar>
    <discover-banner/>
  </div>
</template>

<script>
import DiscoverBanner from '@/components/DiscoverBanner.vue';
import AppSearchBar from '@/components/AppSearchBar.vue';
export default {
  components: {
    DiscoverBanner,
    AppSearchBar
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
  grid-template-rows: [start header-start] 3rem
    [header-end banner-start] min(42vw, 20rem) [banner-end];
}

.header {
  width: 100%;
  height: 100%;
  background-color: var(--app-color);
  color: white;
  grid-row: header;

  display: grid;
  grid-template-columns: [start left-start] 6rem [left-end search-start]
    1fr [search-end right-start] 3rem [right-end end];
  grid-template-rows: 1fr;
  align-items: center;
  justify-items: center;
}

.title {
  grid-column: left-start / left-end;
}
</style>
