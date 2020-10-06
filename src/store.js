import Vue from 'vue';
import Vuex from 'vuex';
import arrayMove from '@/functions/arrayMove.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    playing: false,
    playingID:
      (window.localStorage.getItem('playingID') === null) ?
        '' : window.localStorage.getItem('playingID'),
    playingIndex:
      (parseInt(window.localStorage.getItem('playingIndex')) === null) ?
        -1 : parseInt(window.localStorage.getItem('playingIndex')),
    playingList:
      (JSON.parse(window.localStorage.getItem('playingList')) === null) ?
        [] : JSON.parse(window.localStorage.getItem('playingList')),
    mode:
      (window.localStorage.getItem('mode') === null) ?
        'list-loop' : window.localStorage.getItem('mode'),
    player: {},
    duration: 0,
    currentTime: 0
  },

  mutations: {
    played(state) {
      state.playing = true;
    },

    paused(state) {
      state.playing = false;
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
      const next = state.playingIndex + 1;
      state.playingIndex = next < state.playingList.length ? next : 0;
      state.playingID = state.playingList[state.playingIndex];
      window.localStorage.setItem('playingIndex', state.playingIndex);
      window.localStorage.setItem('playingID', state.playingID);
    },

    lastSong(state) {
      const prev = state.playingIndex - 1;
      state.playingIndex = prev < 0 ? state.playingList.length - 1 : prev;
      state.playingID = state.playingList[state.playingIndex];
      window.localStorage.setItem('playingIndex', state.playingIndex);
      window.localStorage.setItem('playingID', state.playingID);
    },

    addToPlay(state, id) {
      const index = state.playingList.indexOf(id);
      if (index === -1) {
        state.playingList.splice(state.playingIndex, 0, id);
        state.playingIndex++;
        console.log(state.playingList);
        state.playingID = state.playingList[state.playingIndex];
      } else if (index !== state.playingIndex) {
        state.playingList = arrayMove(index, state.playingIndex + 1, state.playingList);
        state.playingIndex = state.playingList.indexOf(state.playingID) + 1;
        state.playingID = state.playingList[state.playingIndex];
        console.log(state.playingList);
        console.log(state.playingID);
      }
      window.localStorage.setItem('playingIndex', state.playingIndex);
      window.localStorage.setItem('playingID', state.playingID);
      window.localStorage.setItem('playingList', JSON.stringify(state.playingList));
    },

    addToPlayNext(state, id) {
      const index = state.playingList.indexOf(id);
      if (index === -1) {
        state.playingList.splice(state.playingIndex, 0, id);
      } else if (index !== state.playingIndex) {
        state.playingList = arrayMove(index, state.playingIndex + 1, state.playingList);
      }
      window.localStorage.setItem('playingList', JSON.stringify(state.playingList));
    },

    playTheList(state, list) {
      state.playingList = list;
      state.playingIndex = 0;
      state.playingID = state.playingList[state.playingIndex];
      window.localStorage.setItem('playingIndex', state.playingIndex);
      window.localStorage.setItem('playingID', state.playingID);
      window.localStorage.setItem('playingList', JSON.stringify(state.playingList));
    },

    playSongOfList(state, id) {
      state.playingIndex = state.playingList.indexOf(id);
      state.playingID = state.playingList[state.playingIndex];
      window.localStorage.setItem('playingIndex', state.playingIndex);
      window.localStorage.setItem('playingID', state.playingID);
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
      window.localStorage.setItem('mode', state.mode);
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
