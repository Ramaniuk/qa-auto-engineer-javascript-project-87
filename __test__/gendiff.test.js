import genDiff from '../src/index.js';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);

const fileJson1 = getFixturePath('file1.json');
const fileJson2 = getFixturePath('file2.json');

test('test for json files', () => {
    expect(genDiff(fileJson1, fileJson2)).toBe('{\n - follow: false\n   host: hexlet.io\n - proxy: 123.234.53.22\n - timeout: 50\n + timeout: 20\n + verbose: true\n\n}');
});