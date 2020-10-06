function arrayMove(index, position, arr) {
  if (index < 0 || position < 0 ||
    index > arr.length - 1 || position > arr.length - 1) {
    throw (new Error('index or position is out of array!'));
  }
  const newArr = arr;
  if (index < position) {
    const temp = newArr[index];
    for (let i = index; i < position; i++) {
      newArr[i] = newArr[i + 1];
    }
    newArr[position] = temp;
  } else if (index > position) {
    const temp = newArr[position];
    for (let i = position; i < index; i++) {
      newArr[i] = newArr[i + 1];
    }
    newArr[index] = temp;
  }
  return newArr;
}

export default arrayMove;
