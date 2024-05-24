const plain = (str) => {
  const arr = str.split('\n');
  let result = [];
  const obj = {};
  arr.forEach((el) => {
    const [key, value] = el.split(': ');
    const slicedKey = key.slice(4);
    if ((el.includes('-') || el.includes('+')) && Object.hasOwn(obj, slicedKey)) {
      result = [...result.slice(0, -1), `Property '${slicedKey}' was updated. From ${obj[slicedKey]} to ${value}`];
    } else if (el.includes('-')) {
      result = [...result, `Property '${slicedKey}' was removed`];
    } else if (el.includes('+')) {
      result = [...result,`Property '${slicedKey}' was added with value: ${value}`];
    }
    obj[slicedKey] = value;
  });
  return result.join('\n');
};

export default plain;
