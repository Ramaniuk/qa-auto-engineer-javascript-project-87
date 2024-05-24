import plain from './plain.js';
import json from './json.js';

const formatter = (formatName, result) => { 
  if (formatName === 'plain') {
    return plain(result);
  } if (formatName === 'json') { 
    return json(result);
  } if (formatName === 'stylish') {
    return result;
  }
};

export default formatter;
