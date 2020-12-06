const getItem = (key, type) => {
  const item = window.localStorage.getItem(key);
  // identify primitive value's type
  if (type && typeof item !== type) {
    return false;
  } else if (!item) {
    // '', null or undefined
    return item;
  } else if (
    item.charAt(0) === '{' ||
    item.charAt(0) === '[' ||
    item === 'null' ||
    item === 'true' || item === 'false' ||
    /^.*[0-9]$/.test(item)
  ) {
    // object, array, null, boolean or number
    return JSON.parse(item);
  } else if (item === 'undefined') {
    // undeifined
    return undefined;
  } else {
    // string
    return item;
  }
};
const setItem = (key, value) => {
  if (typeof value !== 'string') {
    return window.localStorage.setItem(key, JSON.stringify(value));
  } else {
    return window.localStorage.setItem(key, value);
  }
};

export {getItem, setItem};
