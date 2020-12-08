const options = {
  root: null,
  rootMargin: '0px 0px 0% 0px',
  threshold: 0.0
};
const callback = (entries, observer) => {
  entries.forEach((entry) => {
    console.log(entry);
    const vm = entry.target.vm;
    if (vm) {
      vm.toLoad = true;
      observer.unobserve(entry.target);
    }
  });
};
const observer = new IntersectionObserver(callback, options);

export default observer;
