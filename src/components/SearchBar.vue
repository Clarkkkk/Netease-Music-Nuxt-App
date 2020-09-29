<template>
  <div id="search-bar">
    <slot name="left"></slot>
    <div
      class="search-bar-input-area"
    >
      <input
        type="search"
        class="search-bar-input"
        ref="input"
        v-bind="$attrs"
        :value="value"
        v-on="inputListeners"
      >
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="search-bar-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
        <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
      </svg>
    </div>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  name: 'search-bar',
  inheritAttrs: false,
  props: ['value', 'focus'],
  computed: {
    inputListeners: function() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        input: function(event) {
          vm.$emit('input', event.target.value);
        }
      });
    }
  },
  mounted: function() {
    if (this.focus === 'true') {
      this.$refs.input.focus();
    }
  }
};
</script>

<style>
#search-bar {
  width: 100%;
  height: 100%;
  background-color: var(--app-color);
  color: white;
}

.search-bar-input-area {
  grid-column: search-start / search-end;
  height: 2rem;
  width: 98%;
  border-radius: 2rem;
  background-color: #00000030;
  display: grid;
  grid-template-columns:
    [start input-start] 1fr [input-end icon-start] 3rem [icon-end end];
  align-items: center;
  justify-items: center;
}

.search-bar-input {
  grid-column: input-start / input-end;
  margin: 0;
  border: none;
  padding: 0 1.2rem;
  background-color: transparent;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
  color: white;
}

.search-bar-input[cursor="pointer"] {
  cursor: pointer;
}

.search-bar-input:focus, .search-bar-input:active {
  border: none;
  outline: none;
}

.search-bar-icon {
  grid-column: icon-start / icon-end;
  color: #ffffff80;
}
</style>
