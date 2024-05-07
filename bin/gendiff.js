#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';
import * as path from 'path';
const program = new Command();

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-V, --version', 'output the version number')
    .option('-f, --format <type>', 'output format')
    .action((filepath1, filepath2) => {
        const path1 = path.resolve(`src/${filepath1}`);
        const path2 = path.resolve(`src/${filepath2}`);
        if (path1.includes('.json') && path2.includes('.json')) {
           genDiff(path1, path2); 
        }
      });
  
program.parse();