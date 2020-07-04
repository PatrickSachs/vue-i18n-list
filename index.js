#!/usr/bin/env node
 'use strict';
 const program = require('commander');
 const listCommand = require('./command/list');
 const potCommand = require('./command/pot');
 
// List
 program
  .command('list')
  .description('Lists all language strings used in your Vue files.')
  .requiredOption(
    '-v, --vueFiles <vueFiles>',
    'The Vue.js file(s) you want to extract i18n strings from. It can be a path to a folder or to a file. It accepts glob patterns. (ex. *, ?, (pattern|pattern|pattern)',
  )
  .option(
    '-o, --output <output>',
    'Use if you want to create a json file out of your list. (ex. -o output.json)',
  )
  .action(listCommand)

// Pot
program
  .command('pot')
  .description('Creates a .pot file for translators.')
  .requiredOption(
    '-v, --vueFiles <vueFiles>',
    'The Vue.js file(s) you want to extract i18n strings from. It can be a path to a folder or to a file. It accepts glob patterns. (ex. *, ?, (pattern|pattern|pattern)',
  )
  .option(
    '-o, --output <output>',
    'Use if you want to create a .pot file out of your list. (ex. -o output.pot)',
  )
  .action(potCommand);
 
 program.parseAsync(process.argv);
 