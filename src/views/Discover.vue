<template>
  <div id="discover">
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style>
.v-enter, .v-leave-to {
  opacity: 0;
};

.v-enter-to, .v-leave {
  opacity: 1;
}

.v-leave-active, .v-enter-active {
  transition: opacity 200ms;
}
</style>
