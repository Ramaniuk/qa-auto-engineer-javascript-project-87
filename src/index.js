#!/usr/bin/env node
import _ from 'lodash';
import { convertFileToObject, getFixturePath } from './parsers.js';
import formatter from './formatters/index.js';

function getAllKeysFromObjectsSorted(object1, object2) {
    const allKeys = Object.keys(object1).concat(Object.keys(object2));
    const array = [...new Set(allKeys)];
    const sortedArray = _.sortBy(array);
    return sortedArray;
};

function genDiff(file1, file2, formatName = 'stylish'){
    const filePath1 = getFixturePath(file1);
    const filePath2 = getFixturePath(file2);

    const fileObject1 = convertFileToObject(filePath1);
    const fileObject2 = convertFileToObject(filePath2);

    const allSortedKeys = getAllKeysFromObjectsSorted(fileObject1, fileObject2);

    const resultObj = {};
    for (let i = 0; i < allSortedKeys.length; i += 1){
        const key = allSortedKeys[i];
        if (Object.hasOwn(fileObject1, key) && Object.hasOwn(fileObject2, key) && fileObject1[key] !== fileObject2[key]) {
            resultObj[`- ${key}`] = fileObject1[key];
            resultObj[`+ ${key}`] = fileObject2[key];
        } else if (Object.hasOwn(fileObject1, key) && Object.hasOwn(fileObject2, key)) {
            resultObj[`  ${key}`] = fileObject1[key];
        } else if (Object.hasOwn(fileObject1, key) && !Object.hasOwn(fileObject2, key)) {
            resultObj[`- ${key}`] = fileObject1[key];
        } else if (!Object.hasOwn(fileObject1, key) && Object.hasOwn(fileObject2, key)) {
            resultObj[`+ ${key}`] = fileObject2[key];
        }
    }

    let strFromObj = '';
    for (const [key, value] of Object.entries(resultObj)) {
        strFromObj += `  ${key}: ${value}\n`;
    }
    const resultStrFromObj = `{\n${strFromObj}}`;

    const resultObjFormatted = formatter(formatName, resultStrFromObj);
    console.log(resultObjFormatted);
    return resultObjFormatted;
}

export default genDiff;