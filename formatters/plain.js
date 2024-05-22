export const plain = (str) => {
    
    const arr = str.trim().split('\n  ');

    const result = [];
    const obj = {};

    arr.forEach(el => {
        const arr = el.split(': ')
        const key = arr[0].slice(2);
        const value = arr[1];
        
        if (Object.hasOwn(obj, key)) {
            result.pop();
            result.push(`Property '${key}' was updated. From ${obj[key]} to ${value}`);
        } else if (el.includes('- ')) {
            result.push(`Property '${key}' was removed`);
        } else if (el.includes('+ ')) {
            result.push(`Property '${key}' was added with value: ${value}`)
        }
        obj[key] = value;
    });

    return result.join('\n');
}