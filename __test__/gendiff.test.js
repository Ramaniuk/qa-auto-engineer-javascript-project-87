import genDiff from '../src/index.js';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);

const extension = ['json', 'yalm'];

extension.forEach(fileName => {
    const file1 = getFixturePath(`file1.${fileName}`);
    const file2 = getFixturePath(`file2.${fileName}`);
    test(`test for ${fileName} files`, () => {
        expect(genDiff(file1, file2)).toBe('{\n - follow: false\n   host: hexlet.io\n - proxy: 123.234.53.22\n - timeout: 50\n + timeout: 20\n + verbose: true\n\n}');
    });
})
