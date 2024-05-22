import { plain } from './plain.js';
import { json } from './json.js';

export const formatter = (formatName, resultString) => {
    if (formatName.format === 'plain') {
        return plain(resultString);
    } else {
        return json(resultString);
    }
};

