<template>
  <div id="play-progress-bar">
    <div class="time">
      {{ playTime }}
    </div>
    <div
      class="container"
      ref="container"
      @pointerdown="pointerDown"
      @pointermove="pointerMove"
      @pointerup="pointerUp"
    >
      <div class="groove">
        <div
          class="played-section"
          ref="played"
        ></div>
        <div
          :class="['pointer', {'pointer-down': isPointerDown}, {'waiting': waiting}]"
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
import {createNamespacedHelpers} from 'vuex';
const {mapState, mapMutations} = createNamespacedHelpers('playStatus');
export default {
  data: function() {
    return {
      isPointerDown: false
    };
  },

  computed: {
    ...mapState(['currentTime', 'duration', 'waiting']),
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
      const percentage = Math.max(current / this.duration, 0);
      if (percentage < 0.01) {
        this.$refs.pointer.style.transition = 'none';
      }
      this.$refs.pointer.style.transform =
        `translateX(calc(${percentage} * (70vw - 0.5rem))`;
      this.$refs.played.style.width = `${percentage * 100}%`;
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
      this.rect = this.$refs.container.getBoundingClientRect();
      this.width = this.rect.right - this.rect.left;
      const relativeLeft = event.clientX - this.rect.left;
      this.$refs.pointer.style.transform =
        `translateX(${relativeLeft}px`;
      this.$refs.played.style.width = `${relativeLeft / this.width * 100}%`;
      event.target.setPointerCapture(event.pointerId);
    },

    pointerMove(event) {
      if (this.isPointerDown) {
        let relativeLeft;
        if (event.clientX - this.rect.left > this.width) {
          relativeLeft = this.width;
        } else if (event.clientX - this.rect.left < 0) {
          relativeLeft = 0;
        } else {
          relativeLeft = event.clientX - this.rect.left;
        }
        this.$refs.pointer.style.transform = `translateX(${relativeLeft}px`;
        this.$refs.played.style.width = `${relativeLeft / this.width * 100}%`;
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

.container {
  grid-column: bar;
  height: 1rem;
  display: grid;
  place-items: center;
  cursor: pointer;
  touch-action: none;
}

.groove {
  width: 70vw;
  height: 0.1rem;
  border-radius: 0.1rem;
  background-color: #dddddd80;
  display: grid;
  grid-template-columns: [start] 100% [end];
  grid-template-rows: [start] 100% [end];
  align-items: center;
  align-content: center;
  justify-items: start;
}

.pointer {
  grid-row: start / end;
  grid-column: start / end;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 5px #666666a0;
  cursor: pointer;
  touch-action: none;
  transition:
    height linear 100ms,
    width linear 100ms,
    transform linear 500ms;
}

.played-section {
  grid-row: start / end;
  grid-column: start / end;
  height: 0.1rem;
  background-color: #ffffff80;
}

.pointer.pointer-down {
  height: 1rem;
  width: 1rem;
  transition: none;
  transition:
    height linear 300ms,
    width linear 300ms;
}

.pointer.waiting {
  animation: waiting 1000ms alternate ease infinite;
}

@keyframes waiting {
  from {
    background-color: white;
  }

  to {
    background-color: var(--app-color);
  }
}
</style>
