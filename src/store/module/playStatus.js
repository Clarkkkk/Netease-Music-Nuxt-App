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

    replay(state) {
      state.player.currentTime = 0;
      state.player.play();
    },

    clear(state) {
      state.playing = false;
      state.waiting = false;
      state.duration = 0;
      state.currentTime = 0;
    }
  },

  actions: {
    ended({dispatch, commit, rootState}) {
      if (rootState.radio) {
        dispatch('radioPlay/ended', null, {root: true});
      } else if (rootState.commonPlay.playList.length === 1) {
        // if the list contains only one song, play the song again
        commit('replay');
      } else {
        dispatch('commonPlay/ended', null, {root: true});
      }
    },

    playOrPause({state, dispatch}) {
      if (state.playing) {
        state.player.pause();
      } else {
        state.player.play()
          .catch((e) => {
            console.log(e);
            return new Promise((r) => setTimeout(() => r(), 1000));
          })
          .then(() => state.player.play())
          .catch((e) => {
            console.log(e);
            dispatch('ended');
          });
      }
    }
  }
};
