import genDiff from '../src/index.js';
import { getFixturePath } from '../src/parsers.js';

const extension = ['json', 'yml'];

extension.forEach((ext) => {
  const filePath1 = getFixturePath(`file1.${ext}`);
  const filePath2 = getFixturePath(`file2.${ext}`);
  test(`test for ${ext} files`, () => {
    expect(genDiff(filePath1, filePath2)).toBe('{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n\}');
  });
  test(`test for ${ext} files in json format`, () => {
    expect(genDiff(filePath1, filePath2, 'json')).toBe('"{\\n  - follow: false\\n    host: hexlet.io\\n  - proxy: 123.234.53.22\\n  - timeout: 50\\n  + timeout: 20\\n  + verbose: true\\n}"');
  });
  test(`test for ${ext} files in plain format`, () => {
    expect(genDiff(filePath1, filePath2, 'plain')).toBe("Property 'follow' was removed\nProperty 'proxy' was removed\nProperty 'timeout' was updated. From 50 to 20\nProperty 'verbose' was added with value: true");
  });
});
