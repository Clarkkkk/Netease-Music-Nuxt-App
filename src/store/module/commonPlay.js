import {getItem, setItem} from '@/functions/storage.js';
function createIndexList(length, isRandom) {
  // create sequential index array
  const indexArr = [];
  for (let i = 0; i < length; i++) {
    indexArr[i] = i;
  }

  // return sequential index array if conditions satisfied
  if (length <= 2 || !isRandom) {
    return indexArr;
  }

  // create and return random index array
  for (let j = 0; j < length; j++) {
    const randomIndex = Math.floor(Math.random() * length);
    const temp = indexArr[j];
    indexArr[j] = indexArr[randomIndex];
    indexArr[randomIndex] = temp;
  }
  return indexArr;
}

// It is used to move the 'moving' item to be right after the 'target' item
// It won't change array's length
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
    indexList: getItem('indexList', 'array'),
    mode: getItem('mode', 'string') || 'list-loop'
  },

  getters: {
    currentSong(state) {
      return state.playIndex >= 0 ?
        state.playList[state.indexList[state.playIndex]] : {};
    },

    lastSong(state) {
      const last =
        (state.playIndex - 1 + state.playList.length) % state.playList.length;
      return state.playIndex >= 0 ?
        state.playList[state.indexList[last]] : {};
    },

    nextSong(state) {
      const next = (state.playIndex + 1) % state.playList.length;
      return state.playIndex >= 0 ?
        state.playList[state.indexList[next]] : {};
    }
  },

  mutations: {
    next(state) {
      console.log('next');
      // Set the right index when switching random to list-loop
      // It does nothing in other cases
      state.playIndex = state.indexList[state.playIndex];
      // get a random array of index for random mode
      if (state.mode === 'random') {
        state.indexList = createIndexList(state.indexList.length, true);
        setItem('indexList', state.indexList);
      }
      state.playIndex = (state.playIndex + 1) % state.playList.length;
      setItem('playIndex', state.playIndex);
    },

    last(state) {
      state.playIndex =
        (state.playIndex - 1 + state.playList.length) % state.playList.length;
      setItem('playIndex', state.playIndex);
    },

    updateIndex(state, index) {
      state.playIndex = index;
      setItem('playIndex', state.playIndex);
    },

    addToPlay(state, obj) {
      console.log('add to play');
      let contain = false;
      let index = 0;
      // check if there is already a same song in playList
      // if there is, log its index
      while (index < state.playList.length) {
        if (state.playList[index].id === obj.id) {
          contain = true;
          break;
        }
        index++;
      }
      // if not contained, add it right after the current song
      if (!contain) {
        state.playList.splice(state.playIndex + 1, 0, obj);
        state.playIndex++;
        state.indexList =
          createIndexList(state.playList.length, state.mode === 'random');
        setItem('indexList', state.indexList);
        console.log('!contain');
      // if contained, but not playing, move it right after the current song
      } else if (index !== state.playIndex) {
        state.playList = moveAfter(index, state.playIndex, state.playList);
        (index > state.playIndex) && state.playIndex++;
        console.log('contain');
      } // else do nothing, it is already playing
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
        state.indexList =
          createIndexList(state.playList.length, state.mode === 'random');
        setItem('indexList', state.indexList);
      } else if (index !== state.playIndex) {
        state.playList = moveAfter(index, state.playIndex, state.playList);
      }
      setItem('playList', state.playList);
    },

    playTheList(state, list) {
      // play from the start of the list
      state.playList = list;
      state.playIndex = 0;
      setItem('playIndex', state.playIndex);
      setItem('playList', state.playList);
      if (state.mode === 'random') {
        state.indexList = createIndexList(state.indexList.length, true);
        setItem('indexList', state.indexList);
      }
    },

    playSongOfList(state, obj) {
      console.log('play song of list');
      state.playIndex = state.playList.indexOf(obj);
      setItem('playIndex', state.playIndex);
    },

    switchMode(state) {
      // To avoid changing currentSong
      // mode switch will be delayed until next song
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
      state.playList.length = 0;
      state.indexList.length = 0;
      state.mode = 'list-loop';
      setItem('playIndex', state.playIndex);
      setItem('playList', state.playList);
      setItem('indexList', state.indexList);
      setItem('mode', state.mode);
    }
  },

  actions: {
    ended({commit}) {
      commit('next');
    },

    clear({commit}) {
      commit('clear');
      commit('playStatus/clear', null, {root: true});
    }
  }
};
