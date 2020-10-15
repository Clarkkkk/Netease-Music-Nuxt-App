<template>
  <div id="account">
    <div v-if="!$store.state.login" class="header">
      <span>未登录</span>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {

  }
};
</script>

<style scoped>
#account {
  display: grid;
  grid-template-rows:
    [header-start] 3rem [header-end login-start]
    25rem [login-end];
  grid-template-columns:
    [start] 1fr [login-start]
    minmax(min-content, 20rem) [login-end] 1fr [end];
  place-items: center;
}

.header {
  grid-row: header;
  grid-column: start / end;
  width: 100%;
  height: 100%;
  background-color: var(--app-color);
  display: grid;
  font-size: 1.2rem;
  color: white;
  font-weight: bold;
  place-items: center;
  user-select: none;
}
</style>
