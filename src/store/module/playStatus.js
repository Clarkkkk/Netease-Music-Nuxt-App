export default {
  namespaced: true,
  state: {
    player: {},
    playing: false,
    waiting: false,
    duration: 0,
    currentTime: 0
  },

  mutations: {
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

    durationChange(state, duration) {
      state.duration = isNaN(duration) ? 0 : duration;
    },

    timeUpdate(state, time) {
      state.currentTime = time;
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
      state.playing = false;
      state.waiting = false;
      state.duration = 0;
      state.currentTime = 0;
    }
  },

  actions: {
    ended({commit, rootState}) {
      if (rootState.radio) {
        commit('radioPlay/ended', null, {root: true});
      } else {
        commit('commonPlay/ended', null, {root: true});
      }
    },
  }
};
