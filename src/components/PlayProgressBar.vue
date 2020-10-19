<template>
  <div id="play-progress-bar">
    <div class="time">
      {{ playTime }}
    </div>
    <div
      class="progress-bar-container"
      ref="container"
      @pointerdown="pointerDown"
      @pointermove="pointerMove"
      @pointerup="pointerUp"
    >
      <div class="progress-bar-groove">
        <div
          class="progress-bar-pointer smooth-move"
          ref="pointer"
        ></div>
      </div>
    </div>
    <div class="time">
      {{ playDuration }}
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
export default {
  data: function() {
    return {
      isPointerDown: false
    };
  },

  computed: {
    ...mapState(['currentTime', 'duration']),
    playTime: function() {
      return this.formatTime(this.currentTime);
    },
    playDuration: function() {
      return this.formatTime(this.duration);
    }
  },

  mounted() {
    this.$nextTick()
      .then(() => {
        this.rect = this.$refs.container.getBoundingClientRect();
      });
  },

  watch: {
    currentTime(current) {
      if (this.isPointerDown) {
        return;
      }
      const percentage =
        isNaN(current / this.duration) ? 0 : current / this.duration;
      this.$refs.pointer.style.transform =
        `translateX(calc(${percentage} * (70vw - 0.5rem))`;
    }
  },

  methods: {
    ...mapMutations(['seek']),
    formatTime(time) {
      if (isNaN(time)) {
        return '-- : --';
      }
      const timeInt = Math.floor(time);
      const second = timeInt % 60;
      const minute = (timeInt - second) / 60;
      const formatSecond = second < 10 ? '0' + second : second;
      const formatMinute = minute < 10 ? '0' + minute : minute;
      return formatMinute + ':' + formatSecond;
    },

    pointerDown(event) {
      this.isPointerDown = true;
      this.$refs.pointer.classList.remove('smooth-move');
      this.rect = this.$refs.container.getBoundingClientRect();
      const relativeLeft = event.clientX - this.rect.left;
      this.$refs.pointer.style.transform =
        `translateX(${relativeLeft}px`;
      event.target.setPointerCapture(event.pointerId);
    },

    pointerMove(event) {
      if (this.isPointerDown) {
        const relativeLeft = event.clientX - this.rect.left;
        this.$refs.pointer.style.transform =
          `translateX(${relativeLeft}px`;
      }
    },

    pointerUp(event) {
      this.isPointerDown = false;
      this.$refs.pointer.classList.add('smooth-move');
      const percentage =
        (event.clientX - this.rect.left) / (this.rect.right - this.rect.left);
      this.seek(this.duration * percentage);
    }
  }
};
</script>

<style scoped>
#play-progress-bar {
  grid-area: progress-bar;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns:
    [start current-start] minmax(3rem, 15vw) [current-end bar-start]
    1fr [bar-end duration-start] minmax(3rem, 15vw) [duration-end end];
  grid-template-rows: 1fr;
  place-items: center;
  user-select: none;
}

.progress-bar-container {
  grid-column: bar;
  height: 1rem;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.progress-bar-groove {
  width: 70vw;
  height: 0.1rem;
  border-radius: 0.1rem;
  background-color: #888;
  height: 0.1rem;
  display: grid;
  align-items: center;
  align-content: center;
}

.progress-bar-pointer {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 4px #666;
  cursor: pointer;
  transition:
    height linear 100ms,
    width linear 100ms;
}

.smooth-move {
  transition: transform linear 200ms;
}

.progress-bar-pointer:hover, .progress-bar-pointer:focus {
  height: 1rem;
  width: 1rem;
}

@keyframes progress {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(70vw - 0.5rem));
  }
}
</style>
