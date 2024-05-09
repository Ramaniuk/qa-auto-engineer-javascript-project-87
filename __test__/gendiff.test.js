import genDiff from '../src/index.js';
import * as path from 'path';

const fileJson1 = path.resolve(`__fixtures__/file1.json`);
const fileJson2 = path.resolve(`__fixtures__/file2.json`);

test('test for json files', () => {
    expect(genDiff(fileJson1, fileJson2)).toBe('{\n - follow: false\n   host: hexlet.io\n - proxy: 123.234.53.22\n - timeout: 50\n + timeout: 20\n + verbose: true\n\n}');
});