const plain = (str) => {
  const arr = str.split('\n');

  const result = arr.reduce((acc, el, index, array) => {
    const [key, value] = el.split(': ');
    const slicedKey = key.slice(4);
    if ((acc.includes(`Property '${slicedKey}' was removed`)
      || acc.includes(`Property '${slicedKey}' was added with value: ${value}`))
    ) {
      const [, oldValue] = array[index - 1].split(': ');
      return [...acc.slice(0, -1), `Property '${slicedKey}' was updated. From ${oldValue} to ${value}`];
    } if (el.includes('-')) {
      return [...acc, `Property '${slicedKey}' was removed`];
    } if (el.includes('+')) {
      return [...acc, `Property '${slicedKey}' was added with value: ${value}`];
    }
    return acc;
  }, []).join('\n');
  return result;
};

export default plain;
