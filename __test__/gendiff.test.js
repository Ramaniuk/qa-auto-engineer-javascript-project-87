import genDiff from '../src/index.js';
import { getFixturePath } from '../src/parsers.js';

const extension = ['json', 'yaml'];

extension.forEach(ext => {
    const filePath1 = getFixturePath(`file1.${ext}`);
    const filePath2 = getFixturePath(`file2.${ext}`);
    test(`test for ${ext} files`, () => {
        expect(genDiff(filePath1, filePath2)).toBe('{\n - follow: false\n   host: hexlet.io\n - proxy: 123.234.53.22\n - timeout: 50\n + timeout: 20\n + verbose: true\n\}');
    });
})
