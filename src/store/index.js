import Vue from 'vue';
import Vuex from 'vuex';
import auth from './module/auth.js';
import commonPlay from './module/commonPlay.js';
import radioPlay from './module/radioPlay.js';
import playStatus from './module/playStatus.js';
import routeHistory from './module/routeHistory.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    commonPlay,
    radioPlay,
    playStatus,
    routeHistory
  },

  state: {
    radio: false,
  },

  getters: {
    currentSong(state) {
      return state.radio ? store.getters['radioPlay/currentSong'] :
        store.getters['commonPlay/currentSong'];
    }
  },

  mutations: {
    playRadio(state, isRadio) {
      state.radio = isRadio;
    }
  }
});

export default store;
