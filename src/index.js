#!/usr/bin/env node
import _ from 'lodash';
import { convertFileToObject, getFixturePath } from './parsers.js';
import formatter from './formatters/index.js';

function getAllKeysFromObjectsSorted(object1, object2) {
  const allKeys = Object.keys(object1).concat(Object.keys(object2));
  const array = [...new Set(allKeys)];
  const sortedArray = _.sortBy(array);
  return sortedArray;
}

function genDiff(file1, file2, formatName = 'stylish') {
  const filePath1 = getFixturePath(file1);
  const filePath2 = getFixturePath(file2);

  const fileObject1 = convertFileToObject(filePath1);
  const fileObject2 = convertFileToObject(filePath2);

  const allSortedKeys = getAllKeysFromObjectsSorted(fileObject1, fileObject2);

  const resultObj = allSortedKeys.reduce((acc, key) => {
    if (Object.hasOwn(fileObject1, key)
    && Object.hasOwn(fileObject2, key) && fileObject1[key] !== fileObject2[key]) {
      return {
        ...acc,
        [`- ${key}`]: fileObject1[key],
        [`+ ${key}`]: fileObject2[key],
      };
    } if (Object.hasOwn(fileObject1, key) && Object.hasOwn(fileObject2, key)) {
      return {
        ...acc,
        [`  ${key}`]: fileObject1[key],
      };
    } if (Object.hasOwn(fileObject1, key) && !Object.hasOwn(fileObject2, key)) {
      return {
        ...acc,
        [`- ${key}`]: fileObject1[key],
      };
    } if (!Object.hasOwn(fileObject1, key) && Object.hasOwn(fileObject2, key)) {
      return {
        ...acc,
        [`+ ${key}`]: fileObject2[key],
      };
    }
    return acc;
  }, {});

  const strFromObj = Object.entries(resultObj).map(([key, value]) => (`  ${key}: ${value}\n`)).join('');

  const resultStrFromObj = `{\n${strFromObj}}`;
  const resultObjFormatted = formatter(formatName, resultStrFromObj);
  console.log(resultObjFormatted);
  return resultObjFormatted;
}

export default genDiff;
