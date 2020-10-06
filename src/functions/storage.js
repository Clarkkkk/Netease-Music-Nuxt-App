const getItem = (key) => {
  window.localStorage.getItem(key);
};
const setItem = (key, value) => {
  window.localStorage.setItem(key, value);
};

export {getItem, setItem};
