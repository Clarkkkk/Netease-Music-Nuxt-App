<template>
  <div
    id="play-cover"
    :class="{'rolling': playing}"
  >
    <img
      alt="专辑图片"
      class="cover"
      :src="picUrl"
      @dragstart="dragPrevent"
    >
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
export default {
  computed: {
    ...mapState('playStatus', ['playing']),
    ...mapGetters('commonPlay', ['playID', 'playCover']),
    picUrl() {
      return this.playCover ? this.playCover.replace('http:', 'https:') : require('@/assets/default-cover.png');
    }
  },

  methods: {
    dragPrevent(event) {
      event.preventDefault();
    }
  }
};
</script>

<style scoped>
#play-cover {
  grid-row: cover;
  background-color: #ffffff30;
  width: 64vmin;
  height: 64vmin;
  border-radius: 32vmin;
  display: grid;
  align-items: center;
  justify-items: center;
  box-shadow: 0 0 20px #00000020;
  animation: 30s linear infinite rolling;
  animation-play-state: paused;
  user-select: none;
}

.cover {
  object-fit: cover;
  height: 60vmin;
  width: 60vmin;
  border-radius: 30vmin;
  box-shadow: 0 0 10px #00000040;
}

#play-cover.rolling {
  animation-play-state: running;
}

@keyframes rolling {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
