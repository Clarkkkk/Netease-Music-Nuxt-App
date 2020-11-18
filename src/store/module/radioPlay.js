import {getItem, setItem} from '@/functions/storage.js';

export default {
  namespaced: true,
  state: {
    radioIndex: getItem('radioIndex') >= 0 ? getItem('radioIndex') : -1,
    radioList: getItem('radioList') ? getItem('radioList') : [],
  },

  getters: {
    currentSong(state) {
      return state.radioIndex >= 0 && state.radioList[state.radioIndex] ?
        state.radioList[state.radioIndex] : {};
    }
  },

  mutations: {
    ended(state) {
      state.radioIndex++;
      setItem('radioIndex', state.radioIndex);
    },

    nextSong(state) {
      state.radioIndex++;
      setItem('radioIndex', state.radioIndex);
      console.log(state);
    },

    radioListUpdate(state, list) {
      console.log(state.radioList);
      console.log(list);
      if (state.radioIndex < 0) {
        state.radioIndex++;
      }
      // if the list is too long, clear the played songs
      if (state.radioIndex > 2) {
        state.radioList = state.radioList.slice(state.radioIndex - 1);
        state.radioIndex = 1;
      }
      state.radioList = state.radioList.concat(list);
      setItem('radioList', state.radioList);
    },

    clear(state) {
      state.radioIndex = -1;
      while (state.radioList.length > 0) {
        state.radioList.pop();
      }
      setItem('radioIndex', state.radioIndex);
      setItem('radioList', state.radioList);
    }
  },

  actions: {
    clear({commit}) {
      commit('clear');
      commit('playStatus/clear', null, {root: true});
    }
  }
};
