<script>
import {mapState, mapGetters} from 'vuex';
export default {
  data: function() {
    return {
      active: true,
      leave: false,
    };
  },

  computed: {
    ...mapState(['radio']),
    ...mapGetters(['currentSong']),
    ...mapState('playStatus', ['playing', 'duration', 'currentTime']),
    playID() {
      return this.currentSong.id ? this.currentSong.id : 0;
    },
    picUrl() {
      return this.currentSong.cover ?
        this.currentSong.cover : require('@/assets/default-cover.png');
    }
  },

  watch: {
    currentTime: function(time) {
      if (!this.active) {
        return;
      }
      if (this.duration) {
        this.progress(time / this.duration);
      } else {
        this.progress(0);
      }
    }
  },


  activated() {
    console.log('avtive');
    this.active = true;
    this.leave = false;
  },

  deactivated() {
    console.log('not avtive');
    this.active = false;
  },

  methods: {
    progress(percentage) {
      const style = this.$refs.indicator.style;
      const length = this.$refs.indicator.getTotalLength();
      const currentLength = length * percentage;
      style.strokeDasharray = `${currentLength} ${length}`;
    },

    click() {
      this.leave = true;
      setTimeout(() => {
        if (this.radio) {
          this.$router.push({name: 'radio', params: {indicator: true}});
        } else {
          this.$router.push({name: 'play', params: {indicator: true}});
        }
      }, 100);
    }
  }
};
</script>

<template>
  <transition name="indicator">
    <div id="play-indicator" @click="click" v-if="!leave" v-show="playID">
      <img
        :class="['cover', {'rolling': playing}]"
        :src="picUrl"
        ref="cover"
      />
      <svg viewBox="0 0 100 100" class="svg">
        <circle cx="50" cy="50" r="42" class="groove"/>
        <circle cx="50" cy="50" r="42" ref="indicator" class="indicator"/>
      </svg>
    </div>
  </transition>
</template>

<style scoped>
#play-indicator {
  height: 70%;
  width: 70%;
  display: grid;
  place-items: center;
  grid-template-rows: 100%;
  grid-template-columns: 100%;
  cursor: pointer;

}

.cover {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  border-radius: 50%;
  height: 75%;
  width: 75%;
  animation: 30s linear infinite rolling;
  animation-play-state: paused;
}

.cover.rolling {
  animation-play-state: running;
}

.indicator-leave-active {
  z-index: 10;
  transition: transform 200ms ease-in;
}

.indicator-leave-to {
  transform: translateX(-2vw) translateY(15vw);
}

@keyframes rolling {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.svg {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
}

.indicator {
  fill: none;
  stroke: #fff;
  stroke-width: 5;
  stroke-dasharray: 0 1000;
  stroke-linecap: round;
  transform-origin: center;
  transform: rotate(-90deg);
}

.groove {
  fill: none;
  stroke: #88888880;
  stroke-width: 3;
  stroke-linecap: round;
  transform-origin: center;
  transform: rotate(-90deg);
}
</style>
