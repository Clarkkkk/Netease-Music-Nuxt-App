const getItem = (key) => {
  console.log(key);
  console.log(window.localStorage.getItem(key));
  return window.localStorage.getItem(key);
};
const setItem = (key, value) => {
  return window.localStorage.setItem(key, value);
};

export {getItem, setItem};
