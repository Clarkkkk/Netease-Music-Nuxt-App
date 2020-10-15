let id = 0;

const debounce = (fn, time = 500) => {
  if (id) {
    clearTimeout(id);
  }
  id = setTimeout(() => {
    fn();
    id = 0;
  }, time);
};

export default debounce;
