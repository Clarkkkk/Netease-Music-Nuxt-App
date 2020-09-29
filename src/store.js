import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    requestURL: 'http://localhost:3000'
  }
});

export default store;
