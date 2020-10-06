<template>
  <div class="back-button" @click="back">
    <svg-icon icon="go-back" />
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.back-button {
  grid-column: back-start / back-end;
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
