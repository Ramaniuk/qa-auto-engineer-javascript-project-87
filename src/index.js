#!/usr/bin/env node
import _ from 'lodash';
import { convertFileToObject } from './parsers';

function getAllKeysFromObjectsSorted(object1, object2) {
    const allKeys = Object.keys(object1).concat(Object.keys(object2));
    const array = [...new Set(allKeys)];
    const sortedArray = _.sortBy(array);
    return sortedArray;
};

function genDiff(filePath1, filePath2){
    
    const file1 = convertFileToObject(filePath1);
    const file2 = convertFileToObject(filePath2);

    const allSortedKeys = getAllKeysFromObjectsSorted(file1, file2);

    let resultString = '';
    for (let i = 0; i < allSortedKeys.length; i += 1){
        const key = allSortedKeys[i];
        if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key) && file1[key] !== file2[key]) {
            resultString += ` - ${key}: ${file1[key]}\n`
            resultString += ` + ${key}: ${file2[key]}\n`
        } else if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
            resultString += `   ${key}: ${file1[key]}\n`
        } else if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) {
            resultString += ` - ${key}: ${file1[key]}\n`
        } else if (!Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
            resultString += ` + ${key}: ${file2[key]}\n`
        }
    }
    resultString = `{\n${resultString}\n}`;
    console.log(resultString);
    
    return resultString;
};

export default genDiff;