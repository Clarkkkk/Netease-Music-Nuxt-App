<template>
  <svg class="app-icon">
    <use v-bind:href="`#${icon}`" />
  </svg>
</template>

<script>
export default {
  name: 'AppIcon',
  props: {
    icon: {
      required: true,
      type: String
    }
  }
};
</script>

<style>
.app-icon {
  height: 1em;
  width: 1em;
  fill: currentColor !important;
  -webkit-tap-highlight-color: transparent;
}

.app-icon:hover, .app-icon:foucs {
  filter: drop-shadow( 0 0 2px #ddd);
}

.app-icon:active {
  filter: drop-shadow( 0 0 2px #bbb);
}
</style>
