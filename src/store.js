import Vue from 'vue';
import Vuex from 'vuex';
import arrayMove from '@/functions/arrayMove.js';
import {getItem, setItem} from '@/functions/storage.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    playIndex: getItem('playIndex') ? parseInt(getItem('playIndex')) : -1,
    playList: getItem('playList') ? JSON.parse(getItem('playList')) : [],
    mode: getItem('mode') ? getItem('mode') : 'list-loop',
    player: {},
    play: false,
    playing: false,
    waiting: false,
    duration: 0,
    currentTime: 0
  },

  getters: {
    playID: function(state) {
      if (state.playIndex >= 0) {
        return state.playList[state.playIndex].id;
      } else {
        return 0;
      }
    }
  },

  mutations: {
    setPlayer(state, player) {
      state.player = player;
      state.duration = player.duration;
    },

    play(state) {
      if (state.playing) {
        state.player.play();
      }
    },

    played(state) {
      state.playing = true;
    },

    paused(state) {
      state.playing = false;
    },

    waiting(state, isWaiting) {
      if (isWaiting) {
        state.waiting = true;
      } else {
        state.waiting = false;
      }
    },

    ended(state) {
      const next = state.playIndex + 1;
      state.playIndex = next < state.playList.length ? next : 0;
      setItem('playIndex', state.playIndex);
    },

    durationChange(state, duration) {
      state.duration = isNaN(duration) ? 0 : duration;
    },

    timeUpdate(state, time) {
      state.currentTime = time;
    },

    nextSong(state) {
      const next = state.playIndex + 1;
      state.playIndex = next < state.playList.length ? next : 0;
      setItem('playIndex', state.playIndex);
    },

    lastSong(state) {
      const prev = state.playIndex - 1;
      state.playIndex = prev < 0 ? state.playList.length - 1 : prev;
      setItem('playIndex', state.playIndex);
    },

    addToPlay(state, obj) {
      let contain = false;
      let index;
      for (index = 0; index < state.playList.length; index++) {
        if (state.playList[index].id === obj.id) {
          contain = true;
          break;
        }
      }
      if (!contain) {
        state.playList.splice(state.playIndex, 0, obj);
        state.playIndex++;
        console.log(state.playList);
      } else if (index !== state.playIndex) {
        state.playList = arrayMove(index, state.playIndex + 1, state.playList);
        (index > state.playIndex) && state.playIndex++;
        console.log(state.playList);
      }
      setItem('playIndex', state.playIndex);
      // setItem('playID', state.playID);
      setItem('playList', JSON.stringify(state.playList));
    },

    addToPlayNext(state, obj) {
      let contain = false;
      let index;
      for (index = 0; index < state.playList.length; index++) {
        if (state.playList[index].id === obj.id) {
          contain = true;
          break;
        }
      }
      if (!contain) {
        state.playList.splice(state.playIndex, 0, obj);
      } else if (index !== state.playIndex) {
        state.playList = arrayMove(index, state.playIndex + 1, state.playList);
      }
      setItem('playList', JSON.stringify(state.playList));
    },

    playTheList(state, list) {
      state.playList = list;
      state.playIndex = 0;
      setItem('playIndex', state.playIndex);
      setItem('playList', JSON.stringify(state.playList));
    },

    playSongOfList(state, obj) {
      state.playIndex = state.playList.indexOf(obj);
      setItem('playIndex', state.playIndex);
    },

    switchMode(state) {
      switch (state.mode) {
      case 'list-loop':
        state.mode = 'song-loop';
        break;
      case 'song-loop':
        state.mode = 'random';
        break;
      case 'random':
        state.mode = 'list-loop';
        break;
      }
      setItem('mode', state.mode);
    },

    playOrPause(state) {
      if (state.playing) {
        state.play = false;
      } else {
        state.play = true;
      }
    }
  }
});

export default store;
