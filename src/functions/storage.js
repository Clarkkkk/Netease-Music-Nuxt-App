function getItem(key, type) {
  if (type === undefined) {
    console.log(`Getting ${key}: Specifying a type is recommended.`);
  }
  let item = window.localStorage.getItem(key);
  // convert item to proper typee
  if (item === null) {
    // null
  } else if (
    item.charAt(0) === '{' ||
    item.charAt(0) === '[' ||
    item === 'null' ||
    item === 'true' || item === 'false' ||
    /^[0-9]+$/.test(item)
  ) {
    // object, array, null, boolean or number
    item = JSON.parse(item);
  } else if (item === 'undefined') {
    // undeifined
    item = undefined;
  } else {
    // normal string
  }
  // if specify a type explicitly
  // determine if the converted value is the right type
  // if it is, return it. if not, return an initialized value in that type
  // if no type is specified, return the item directly
  if (type && typeOf(item) === type) {
    return item;
  } else if (type === 'number') {
    return -1;
  } else if (type === 'string') {
    return '';
  } else if (type === 'boolean') {
    return false;
  } else if (type === 'object') {
    return {};
  } else if (type === 'array') {
    return [];
  } else {
    return item;
  }
}

function setItem(key, value) {
  if (typeof value !== 'string') {
    return window.localStorage.setItem(key, JSON.stringify(value));
  } else {
    return window.localStorage.setItem(key, value);
  }
}

function typeOf(item) {
  let type;
  if (Array.isArray(item)) {
    type = 'array';
  } else if (item === null) {
    type = 'null';
  } else {
    type = typeof item;
  }
  return type;
}

export {getItem, setItem};
