#!/usr/bin/env node
import _ from 'lodash';
import { convertFileToObject, getFixturePath } from './parsers.js';

function getAllKeysFromObjectsSorted(object1, object2) {
    const allKeys = Object.keys(object1).concat(Object.keys(object2));
    const array = [...new Set(allKeys)];
    const sortedArray = _.sortBy(array);
    return sortedArray;
};

function genDiff(file1, file2){

    const filePath1 = getFixturePath(file1);
    const filePath2 = getFixturePath(file2);

    const fileObject1 = convertFileToObject(filePath1);
    const fileObject2 = convertFileToObject(filePath2);

    const allSortedKeys = getAllKeysFromObjectsSorted(fileObject1, fileObject2);

    let resultString = '';
    for (let i = 0; i < allSortedKeys.length; i += 1){
        const key = allSortedKeys[i];
        if (Object.hasOwn(fileObject1, key) && Object.hasOwn(fileObject2, key) && fileObject1[key] !== fileObject2[key]) {
            resultString += `   - ${key}: ${fileObject1[key]}\n`
            resultString += `   + ${key}: ${fileObject2[key]}\n`
        } else if (Object.hasOwn(fileObject1, key) && Object.hasOwn(fileObject2, key)) {
            resultString += `   ${key}: ${fileObject1[key]}\n`
        } else if (Object.hasOwn(fileObject1, key) && !Object.hasOwn(fileObject2, key)) {
            resultString += `   - ${key}: ${fileObject1[key]}\n`
        } else if (!Object.hasOwn(fileObject1, key) && Object.hasOwn(fileObject2, key)) {
            resultString += `   + ${key}: ${fileObject2[key]}\n`
        }
    }
    resultString = `{\n${resultString}}`;
    console.log(resultString);
    return resultString;
};

export default genDiff;