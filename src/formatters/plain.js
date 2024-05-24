const plain = (str) => {
    const arr = str.split('\n');

    const result = [];
    const obj = {};

    arr.forEach((el) => {
        const array = el.split(': ');
        const key = array[0].slice(4);
        const value = array[1];
        
        if ((el.includes('-') || el.includes('+')) && Object.hasOwn(obj, key)) {
            result.pop();
            result.push(`Property '${key}' was updated. From ${obj[key]} to ${value}`);
        } else if (el.includes('-')) {
            result.push(`Property '${key}' was removed`);
        } else if (el.includes('+')) {
            result.push(`Property '${key}' was added with value: ${value}`)
        }
        obj[key] = value;
    });

    return result.join('\n');
};

export default plain;