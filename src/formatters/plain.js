const plain = (str) => {
  const arr = str.split('\n');
  const obj = {};

  const result = arr.reduce((acc, el) => {
    const [key, value] = el.split(': ');
    const slicedKey = key.slice(4);
    if ((el.includes('-') || el.includes('+')) && Object.hasOwn(obj, slicedKey)) {
      acc = [...acc.slice(0, -1), `Property '${slicedKey}' was updated. From ${obj[slicedKey]} to ${value}`];
    } else if (el.includes('-')) {
      acc = [...acc, `Property '${slicedKey}' was removed`];
    } else if (el.includes('+')) {
      acc = [...acc, `Property '${slicedKey}' was added with value: ${value}`];
    }
    obj[slicedKey] = value;
    return acc;
  }, []).join('\n');
  return result;
};

export default plain;
