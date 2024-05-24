import plain from './plain.js';
import json from './json.js';

const formatter = (formatName, result) => {
    if (formatName === 'plain' ) {
        return plain(result);
    } else if (formatName === 'json') {
        return json(result)
    } else if (formatName === 'stylish') {
        return result;
    }
};

export default formatter;