export default {
  namespaced: true,
  state: {
    isSafari: false,
    lastTouch: 0,
    transitionName: '',
    history: []
  },

  getters: {
    lastRoute(state) {
      return state.history[state.history.length - 2];
    }
  },

  mutations: {
    touchEnd(state) {
      state.lastTouch = Date.now();
    },

    agent(state, isSafari) {
      state.isSafari = isSafari;
    },

    transition(state, transition) {
      state.transitionName = transition;
    },

    push(state, routeName) {
      state.history.push(routeName);
    },

    pop(state) {
      state.history.pop();
    },

    clear(state) {
      state.history = [];
    }
  }
};
