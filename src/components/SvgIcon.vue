<template>
  <svg class="svg-icon">
    <use v-bind:href="`#${icon}`" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    icon: {
      required: true,
      type: String
    }
  }
};
</script>

<style>
.svg-icon {
  height: 1em;
  width: 1em;
  fill: currentColor !important;
}

.svg-icon:hover {
  filter: drop-shadow( 0 0 2px #ddd);
}

.svg-icon:active {
  filter: drop-shadow( 0 0 2px #bbb);
}
</style>
