import moveAfter from '@/functions/moveAfter.js';
import {getItem, setItem} from '@/functions/storage.js';

export default {
  namespaced: true,
  state: {
    playIndex: getItem('playIndex') ? parseInt(getItem('playIndex')) : -1,
    playList: getItem('playList') ? JSON.parse(getItem('playList')) : [],
    mode: getItem('mode') ? getItem('mode') : 'list-loop'
  },

  getters: {
    playID: function(state) {
      return state.playIndex >= 0 ? state.playList[state.playIndex].id : 0;
    },

    playName: function(state) {
      return state.playIndex >= 0 ? state.playList[state.playIndex].name : '';
    },

    playArtist: function(state) {
      return state.playIndex >= 0 ? state.playList[state.playIndex].artist : '';
    },

    playCover: function(state) {
      return state.playIndex >= 0 ? state.playList[state.playIndex].cover : '';
    },

    currentSong(state) {
      return state.playIndex >= 0 ? state.playList[state.playIndex] : {};
    }
  },

  mutations: {
    ended(state) {
      const next = state.playIndex + 1;
      state.playIndex = next < state.playList.length ? next : 0;
      setItem('playIndex', state.playIndex);
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
        default:
          state.mode = 'list-loop';
          break;
      }
      setItem('mode', state.mode);
    },

    clear(state) {
      state.playIndex = -1;
      while (state.playList.length > 0) {
        state.playList.pop();
      }
      setItem('playIndex', state.playIndex);
      setItem('playList', JSON.stringify(state.playList));
    }
  },

  actions: {
    clear({commit}) {
      commit('clear');
      commit('playStatus/clear', null, {root: true});
    }
  }
};
