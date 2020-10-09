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
  }
  return newArr;
}

export default moveAfter;
