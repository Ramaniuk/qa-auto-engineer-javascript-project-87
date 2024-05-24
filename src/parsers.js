import yaml from 'js-yaml';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);

export const convertFileToObject = (filePath) => {
  // extname returns: '.html'
  const format = path.extname(filePath);
  const data = readFileSync(filePath, 'utf8');
  // choose parser depending on file extension
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.load;
  }
  // parse(data);
  const object = parse(data);
  return object;
};
