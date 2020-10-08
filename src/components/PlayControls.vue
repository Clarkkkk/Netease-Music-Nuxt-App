<template>
  <div id="play-controls">
    <!-- oprations -->
    <app-icon icon="like" class="like"/>
    <app-icon icon="comment" class="comments"/>
    <app-icon icon="vertical-dots" class="info"/>

    <!-- progress bar -->
    <div class="progress-bar">
      <div class="time">
        {{ playTime }}
      </div>
      <div class="progress-bar-groove">
        <div
          class="progress-bar-pointer"
          :style="pointerPosition"
        ></div>
      </div>
      <div class="time">
        {{ playDuration }}
      </div>
    </div>

    <!-- controls for playing -->
    <div
      class="mode"
      @click="$store.commit('switchMode')"
    >
      <app-icon v-if="mode==='list-loop'" icon="list-loop" />
      <app-icon v-else-if="mode==='song-loop'" icon="song-loop" />
      <app-icon v-else-if="mode==='random'" icon="random" />
    </div>
    <app-icon
      icon="last-song"
      class="prev"
      @click="$store.commit('lastSong')"
    />
    <div
      class="play"
      @click="$store.commit('playOrPause')"
    >
      <app-icon v-if="playing" icon="pause" />
      <app-icon v-else icon="play"/>
    </div>
    <app-icon
      icon="next-song"
      class="next"
      @click="$store.commit('nextSong')"
    />
    <app-icon
      icon="playlist"
      class="list"
      @click.native="showPlayList=true"
    />
    <transition>
      <play-list
        v-show="true"
        :show.sync="showPlayList"
      />
    </transition>
  </div>
</template>

<script>
import {mapState, mapMutation} from 'vuex';
import PlayList from '@/components/PlayList.vue';
export default {
  data: function() {
    return {
      showPlayList: false
    };
  },

  computed: {
    ...mapState(['mode', 'playing', 'currentTime', 'duration']),
    playTime: function() {
      return this.formatTime(this.currentTime);
    },
    playDuration: function() {
      return this.formatTime(this.duration);
    },
    pointerPosition: function() {
      const time = this.currentTime;
      const duration = this.duration;
      const percentage = isNaN(time / duration) ? 0 : time / duration;
      return `transform: translateX(calc(${percentage} * (70vw - 0.5rem))`;
    }
  },

  components: {
    PlayList,
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
    },
  }
};
</script>

<style scoped>
#play-controls {
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
