<template>
  <div id="playing-controls">
    <!-- oprations -->
    <svg-icon icon="like" class="like"/>
    <svg-icon icon="comment" class="comments"/>
    <svg-icon icon="vertical-dots" class="info"/>

    <!-- progress bar -->
    <div class="progress-bar">
      <div class="time">
        {{ currentTime }}
      </div>
      <div class="progress-bar-groove">
        <div
          class="progress-bar-pointer"
          :style="pointerPosition"
        ></div>
      </div>
      <div class="time">
        {{ duration }}
      </div>
    </div>

    <!-- controls for playing -->
    <div
      class="mode"
      @click="$store.commit('switchMode')"
    >
      <svg-icon v-if="mode==='list-loop'" icon="list-loop" />
      <svg-icon v-else-if="mode==='song-loop'" icon="song-loop" />
      <svg-icon v-else-if="mode==='random'" icon="random" />
    </div>
    <svg-icon
      icon="last-song"
      class="prev"
      @click="$store.commit('lastSong')"
    />
    <div
      class="play"
      @click="$store.commit('playOrPause')"
    >
      <svg-icon v-if="playing" icon="pause" />
      <svg-icon v-else icon="play"/>
    </div>
    <svg-icon
      icon="next-song"
      class="next"
      @click="$store.commit('nextSong')"
    />
    <svg-icon icon="playlist" class="list"/>
  </div>
</template>

<script>
export default {
  props: [],
  data: function() {
    return {
      
    };
  },
  computed: {
    mode: function() {
      return this.$store.state.mode;
    },
    playing: function() {
      return this.$store.state.playing;
    },
    currentTime: function() {
      return this.formatTime(this.$store.state.currentTime);
    },
    duration: function() {
      return this.formatTime(this.$store.state.duration);
    },
    pointerPosition: function() {
      const time = this.$store.state.currentTime;
      const duration = this.$store.state.duration;
      const percentage = isNaN(time / duration) ? 0 : time / duration;
      return `transform: translateX(calc(${percentage} * (70vw - 0.5rem))`;
    }
  },
  methods: {
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
    }
  }
};
</script>

<style scoped>
#playing-controls {
  grid-row: controls-start / controls-end;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns:
    [start] 1fr [mode-start] minmax(4rem, 1fr) [mode-end prev-start] minmax(4rem, 1fr)
    [prev-end play-start] minmax(4rem, 1fr) [play-end next-start]
    minmax(4rem, 1fr) [next-end list-start] minmax(4rem, 1fr) [list-end] 1fr [end];
  grid-template-rows:
    [start operation-start] 3rem [operation-end bar-start]
    2rem [bar-end control-start] 1fr [control-end end];
  place-items: center;
}

/* operations */
.like {
  grid-column: mode-start / prev-end;
  grid-row: operation-start / operation-end;
  width: 1.8rem;
  height: 1.8rem;
  font-size: 1.8rem;
  cursor: pointer;
}

.comments {
  grid-column: play-start / play-end;
  grid-row: operation-start / operation-end;
  width: 1.8rem;
  height: 1.8rem;
  font-size: 1.8rem;
  cursor: pointer;
}

.info {
  grid-column: next-start / list-end;
  grid-row: operation-start / operation-end;
  width: 1.8rem;
  height: 1.8rem;
  font-size: 1.8rem;
  cursor: pointer;
}
/* operations */

/* progress-bar */
.progress-bar {
  grid-row: bar-start / bar-end;
  grid-column: start / end;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns:
    [start current-start] minmax(3rem, 15vw) [current-end groove-start]
    1fr [groove-end duration-start] minmax(3rem, 15vw) [duration-end end];
  grid-template-rows: 1fr;
  place-items: center;
}

.time {
  user-select: none;
}

.progress-bar-groove {
  grid-column: groove-start / groove-end;
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
  transition: transform linear 200ms;
}

@keyframes progress {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(70vw - 0.5rem));
  }
}
/* progress-bar */

/* controls */
.mode {
  grid-column: mode-start / mode-end;
  grid-row: control-start / control-end;
  width: 1.8rem;
  height: 1.8rem;
  font-size: 1.8rem;
  cursor: pointer;
}

.prev {
  grid-column: prev-start / prev-end;
  grid-row: control-start / control-end;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 2.5rem;
  cursor: pointer;
}

.play {
  grid-column: play-start / play-end;
  grid-row: control-start / control-end;
  width: 4rem;
  height: 4rem;
  font-size: 4rem;
  cursor: pointer;
}

.next {
  grid-column: next-start / next-end;
  grid-row: control-start / control-end;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 2.5rem;
  cursor: pointer;
}

.list {
  grid-column: list-start / list-end;
  grid-row: control-start / control-end;
  width: 1.9rem;
  height: 1.9rem;
  font-size: 1.9rem;
  cursor: pointer;
}
/* controls */
</style>
