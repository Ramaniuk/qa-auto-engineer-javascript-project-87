import fs from 'fs';
import yaml from 'js-yaml';

const filePath = path.resolve(__dirname, '..', '__fixtures__', filename);
// extname returns: '.html'
const format = path.extname(filePath);
const data = fs.readSync(filePath, "utf8")

// Выбop парсерa в зависимости от расширения файла
let parse;
if (format === 'json') {
  parse = JSON.parse;
} else if (format === '.yml' || format === '.yaml') {
  parse = yaml.load;
} 

parse(data);