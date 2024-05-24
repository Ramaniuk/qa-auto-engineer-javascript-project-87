export const plain = (str) => {
    
    const arr = str.split('\n');

    const result = [];
    const obj = {};

    arr.forEach(el => {
        const arr = el.split(': ')
        console.log(arr)
        const key = arr[0].slice(4);
        // console.log(key)
        const value = arr[1];
        
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
}