import Vue from 'vue';
import Vuex from 'vuex';
import moveAfter from '@/functions/moveAfter.js';
import {getItem, setItem} from '@/functions/storage.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    login: getItem('login') ? JSON.parse(getItem('login')) : false,
    userID: getItem('userID') ? getItem('userID') : '',
    cookie: getItem('cookie') ? getItem('cookie') : '',

    playIndex: getItem('playIndex') ? parseInt(getItem('playIndex')) : -1,
    playCover: getItem('playCover') ? getItem('playCover') : '',
    playList: getItem('playList') ? JSON.parse(getItem('playList')) : [],
    mode: getItem('mode') ? getItem('mode') : 'list-loop',
    player: {},
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
    },

    playName: function(state) {
      if (state.playIndex >= 0) {
        return state.playList[state.playIndex].name;
      } else {
        return '';
      }
    },

    playArtist: function(state) {
      if (state.playIndex >= 0) {
        return state.playList[state.playIndex].artist;
      } else {
        return '';
      }
    }
  },

  mutations: {
    login(state, res) {
      state.login = true;
      state.cookie = res.cookie;
      state.userID = res.profile.userId;
      setItem('login', JSON.stringify(state.login));
      setItem('cookie', state.cookie);
      setItem('userID', state.userID);
    },

    logout(state) {
      state.login = false;
      state.cookie = '';
      state.userID = '';
      setItem('login', JSON.stringify(state.login));
      setItem('cookie', state.cookie);
      setItem('userID', state.userID);
    },

    setPlayer(state, player) {
      state.player = player;
      state.duration = player.duration;
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

    seek(state, time) {
      state.player.currentTime = time;
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

    coverChange(state, url) {
      state.playCover = url;
      setItem('playCover', state.playCover);
    },

    nextSong(state) {
      console.log('next');
      const next = state.playIndex + 1;
      state.playIndex = next < state.playList.length ? next : 0;
      console.log(state.playIndex);
      console.log(state.playList);
      setItem('playIndex', state.playIndex);
    },

    lastSong(state) {
      const prev = state.playIndex - 1;
      state.playIndex = prev < 0 ? state.playList.length - 1 : prev;
      setItem('playIndex', state.playIndex);
    },

    addToPlay(state, obj) {
      let contain = false;
      let index = 0;
      while (index < state.playList.length) {
        if (state.playList[index].id === obj.id) {
          contain = true;
          break;
        }
        index++;
      }
      console.log(state);
      if (!contain) {
        state.playList.splice(state.playIndex + 1, 0, obj);
        state.playIndex++;
        console.log('!contain');
        // console.log(state.playList);
      } else if (index !== state.playIndex) {
        state.playList = moveAfter(index, state.playIndex, state.playList);
        (index > state.playIndex) && state.playIndex++;
        console.log('contain');
        // console.log(state.playList);
      }
      setItem('playIndex', state.playIndex);
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
        state.playList = moveAfter(index, state.playIndex, state.playList);
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
      console.log('play song of list');
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
      console.log(state);
      if (state.playing) {
        state.player.pause();
      } else {
        state.player.play();
      }
    },

    clear(state) {
      state.playIndex = -1;
      state.playCover = '';
      state.playing = false;
      state.waiting = false;
      state.duration = 0;
      state.currentTime = 0;
      while (state.playList.length > 0) {
        state.playList.pop();
      }
      setItem('playIndex', state.playIndex);
      setItem('playList', JSON.stringify(state.playList));
      setItem('playCover', state.playCover);
    }
  }
});

export default store;
