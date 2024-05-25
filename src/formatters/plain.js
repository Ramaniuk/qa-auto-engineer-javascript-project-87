const plain = (str) => {
  const arr = str.split('\n');
  const obj = {};

  const result = arr.reduce((acc, el) => {
    const [key, value] = el.split(': ');
    const slicedKey = key.slice(4);
    if ((el.includes('-') || el.includes('+')) && Object.hasOwn(obj, slicedKey)) {
      const oldValue = obj[slicedKey];
      obj[slicedKey] = value;
      return [...acc.slice(0, -1), `Property '${slicedKey}' was updated. From ${oldValue} to ${value}`];
    } else if (el.includes('-')) {
      obj[slicedKey] = value;
      return [...acc, `Property '${slicedKey}' was removed`];
    } else if (el.includes('+')) {
      obj[slicedKey] = value;
      return [...acc, `Property '${slicedKey}' was added with value: ${value}`];
    }
    return acc;
  }, []).join('\n');
  return result;
};

export default plain;
