import Vue from 'vue';
import Vuex from 'vuex';
import arrayMove from '@/functions/arrayMove.js';
import {getItem, setItem} from '@/functions/storage.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    playIndex: getItem('playIndex') ? -1 : parseInt(getItem('playIndex')),
    playList: getItem('playList') ? [] : JSON.parse(getItem('playList')),
    mode: getItem('mode') ? 'list-loop' : getItem('mode'),
    player: {},
    playing: false,
    waiting: false,
    duration: 0,
    currentTime: 0
  },

  getters: {
    playID: function(state) {
      return state.playList[state.playIndex].id;
    }
  },

  mutations: {
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

    setPlayer(state, player) {
      state.player = player;
      state.duration = player.duration;
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
        state.playIndex = index < state.playIndex ? state.playIndex : state.playIndex + 1;
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
        state.player.pause();
      } else {
        state.player.play();
      }
    }
  }
});

export default store;
