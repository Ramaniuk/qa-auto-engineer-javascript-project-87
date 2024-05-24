#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .argument('<file1>')
    .argument('<file2>')
    .option('-V, --version', 'output the version number')
    .option('-f, --format <type>', 'output format')
    .action((file1, file2, cmd) => {
        genDiff(file1, file2, cmd.format); 
    });
  
program.parse();
