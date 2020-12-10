import {getItem, setItem} from '@/functions/storage.js';
function createRandomList(length) {
  const randomArr = [];
  for (let i = 0; i < length; i++) {
    randomArr[i] = i;
  }

  if (length <= 2) {
    return randomArr;
  }

  for (let j = 0; j < length; j++) {
    /* if (j === invariant) {
      continue;
    } */
    const randomIndex = Math.floor(Math.random() * length);
/*  if (randomIndex === invariant) {
      randomIndex = randomIndex + 1 > length ?
        randomIndex - 1 : randomIndex + 1;
    }
    */
    const temp = randomArr[j];
    randomArr[j] = randomArr[randomIndex];
    randomArr[randomIndex] = temp;
  }
  console.log(randomArr);
  return randomArr;
}

// It is used to move the 'moving' item to be right after the 'target' item
function moveAfter(moving, target, arr) {
  if (moving < 0 || target < 0 ||
    moving > arr.length - 1 || target > arr.length - 1) {
    throw (new Error('index or position is out of array!'));
  }
  const newArr = [...arr];
  if (moving < target) {
    const temp = newArr[moving];
    for (let i = moving; i < target; i++) {
      newArr[i] = newArr[i + 1];
    }
    newArr[target] = temp;
  } else if (moving > target) {
    const temp = newArr[moving];
    for (let i = moving; i > target + 1; i--) {
      newArr[i] = newArr[i - 1];
    }
    newArr[target + 1] = temp;
  } // else moving === target, do nothing
  return newArr;
}

export default {
  namespaced: true,
  state: {
    playIndex: getItem('playIndex', 'number'),
    playList: getItem('playList', 'array'),
    randomList: getItem('randomList', 'array'),
    mode: getItem('mode', 'string') ? getItem('mode', 'string') : 'list-loop',
    nextMode: getItem('mode', 'string') ? getItem('mode', 'string') : 'list-loop',
  },

  getters: {
    currentSong(state) {
      if (state.playIndex < 0) {
        return {};
      }
      if (state.mode === 'random') {
        return state.playList[state.randomList[state.playIndex]];
      } else {
        return state.playList[state.playIndex];
      }
    }
  },

  mutations: {
    nextSong(state) {
      console.log('next');
      if (state.nextMode) {
        if (state.nextMode === 'list-loop') {
          state.playIndex = state.randomList[state.playIndex];
        } else if (state.nextMode === 'random') {
          state.playIndex = state.randomList.indexOf(state.playIndex);
        } else if (state.nextMode === 'song-loop' && state.mode === 'random') {
          state.playIndex = state.randomList[state.playIndex];
        }
        state.mode = state.nextMode;
        setItem('mode', state.mode);
      }
      const next = state.playIndex + 1;
      if (next < state.playList.length) {
        state.playIndex = next;
      } else {
        state.randomList =
          createRandomList(state.playList.length);
        setItem('randomList', state.randomList);
        state.playIndex = 0;
      }
      setItem('playIndex', state.playIndex);
    },

    lastSong(state) {
      const prev = state.playIndex - 1;
      state.playIndex = prev < 0 ? state.playList.length - 1 : prev;
      setItem('playIndex', state.playIndex);
    },

    addToPlay(state, obj) {
      console.log('add to play');
      let contain = false;
      let index = 0;
      while (index < state.playList.length) {
        if (state.playList[index].id === obj.id) {
          contain = true;
          break;
        }
        index++;
      }
      if (!contain) {
        state.playList.splice(state.playIndex + 1, 0, obj);
        state.playIndex++;
        state.randomList =
          createRandomList(state.playList.length);
        setItem('randomList', state.randomList);
        console.log('!contain');
        // console.log(state.playList);
      } else if (index !== state.playIndex) {
        state.playList = moveAfter(index, state.playIndex, state.playList);
        (index > state.playIndex) && state.playIndex++;
        console.log('contain');
        // console.log(state.playList);
      }
      setItem('playIndex', state.playIndex);
      setItem('playList', state.playList);
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
        state.randomList =
          createRandomList(state.playList.length);
        setItem('randomList', state.randomList);
      } else if (index !== state.playIndex) {
        state.playList = moveAfter(index, state.playIndex, state.playList);
      }
      setItem('playList', state.playList);
    },

    playTheList(state, list) {
      state.playList = list;
      state.playIndex = 0;
      state.randomList =
        createRandomList(state.playList.length);
      setItem('playIndex', state.playIndex);
      setItem('playList', state.playList);
      setItem('randomList', state.randomList);
    },

    playSongOfList(state, obj) {
      console.log('play song of list');
      state.playIndex = state.playList.indexOf(obj);
      setItem('playIndex', state.playIndex);
    },

    switchMode(state) {
      // To avoid changing currentSong
      // mode switch will be delayed until next song
      switch (state.nextMode) {
        case 'list-loop':
          state.nextMode = 'song-loop';
          break;
        case 'song-loop':
          state.nextMode = 'random';
          break;
        case 'random':
          state.nextMode = 'list-loop';
          break;
        default:
          state.nextMode = 'list-loop';
          break;
      }
    },

    clear(state) {
      state.playIndex = -1;
      state.playList.length = 0;
      state.randomList.length = 0;
      setItem('playIndex', state.playIndex);
      setItem('playList', state.playList);
      setItem('randomList', state.randomList);
    }
  },

  actions: {
    ended({commit}) {
      commit('nextSong');
    },

    clear({commit}) {
      commit('clear');
      commit('playStatus/clear', null, {root: true});
    }
  }
};
