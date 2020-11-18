import Vue from 'vue';
import Vuex from 'vuex';
import fetchJSON from '@/functions/fetchJSON.js';
import auth from './module/auth.js';
import commonPlay from './module/commonPlay.js';
import radioPlay from './module/radioPlay.js';
import playStatus from './module/playStatus.js';
import routeHistory from './module/routeHistory.js';
import {getItem, setItem} from '@/functions/storage.js';

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
    radio: getItem('radio') ? getItem('radio') : false,
    likelist: []
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
      setItem('radio', state.radio);
    },

    updateLikelist(state, list) {
      state.likelist = list;
    }
  },

  actions: {
    updateLikelist(context) {
      fetchJSON('/likelist', context.state.auth.userID)
        .then((res) => {
          console.log(res);
          context.commit('updateLikelist', res.ids);
        });
    },

    logout({commit, state}) {
      return fetchJSON('/logout')
        .then((res) => {
          if (res.code === 200) {
            commit('auth/logout');
            if (state.radio) {
              commit('radioPlay/clear');
            } else {
              commit('commonPlay/clear');
            }
          }
        })
    }
  }
});

export default store;
