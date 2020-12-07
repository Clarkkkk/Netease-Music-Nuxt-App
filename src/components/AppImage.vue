<template>
  <img
    class="app-image fade-in"
    :src="picSrc"
    :alt="picAlt"
    loading="lazy"
    @error="reload"
  >
</template>

<script>
  /*
const options = {
  root: null,
  rootMargin: '0 0 50% 0',
  threshold: 0.0
};
const callback = (entries, observer) => {
  entries.forEach((entry) => {
    console.log(entry);
    const vm = entry.element.vm;
    if (vm) {
      vm.toLoad = true;
      observer.unobserve(entry.element);
    }
  });
};
const observer = new IntersectionObserver(callback, options);
*/
export default {
  props: ['src', 'alt', 'width', 'height'],
  data() {
    return {
      picSrc: '',
      reloadTimes: 0
    };
  },
  computed: {
    picAlt() {
      return this.alt ? this.alt : '图片';
    }
  },

  created() {
    const width = this.width;
    const height = this.height ? this.height : this.width;
    this.picSrc = this.src.replace('http:', 'https:') +
      (width && height ? `?param=${width}y${height}` : '');
  },

  methods: {
    reload() {
      console.log('reload');
      console.log(this.reloadTimes);
      const src = this.picSrc;
      this.picSrc = '';
      if (this.reloadTimes < 5) {
        setTimeout(() => {
          this.picSrc = src;
        }, 300 * this.reloadTimes);
      } else {
        this.reloadTimes = 0;
      }
    }
  }
};
</script>

<style scoped>

</style>
