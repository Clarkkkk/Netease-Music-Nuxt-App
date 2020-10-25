import {getItem, setItem} from '@/functions/storage.js';

export default {
  namespaced: true,
  state: {
    login: getItem('login') ? JSON.parse(getItem('login')) : false,
    userID: getItem('userID') ? getItem('userID') : '',
    cookie: getItem('cookie') ? getItem('cookie') : ''
  },

  mutations: {
    login(state, res) {
      console.log('commit login');
      state.login = true;
      state.cookie = res.cookie;
      state.userID = res.profile.userId;
      setItem('login', JSON.stringify(state.login));
      setItem('cookie', state.cookie);
      setItem('userID', state.userID);
    },

    logout(state) {
      state.login = false;
      state.cookie = '';
      state.userID = '';
      setItem('login', JSON.stringify(state.login));
      setItem('cookie', state.cookie);
      setItem('userID', state.userID);
    }
  }
};
