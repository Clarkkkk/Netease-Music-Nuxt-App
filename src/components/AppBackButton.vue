<template>
  <div class="app-back-button" @tap="back" @click="back">
    <app-icon icon="go-back" />
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      const lastRoute = this.$store.getters['routeHistory/lastRoute'];
      if (lastRoute) {
        this.$router.push({
          name: lastRoute,
          params: {
            back: true
          }
        });
      } else {
        this.$router.push({
          name: 'discover',
          params: {
            back: true
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.app-back-button {
  grid-column: back;
  grid-row: start / end;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  font-size: 1.5rem;
  display: grid;
  align-items: center;
  justify-items: center;
}
</style>
