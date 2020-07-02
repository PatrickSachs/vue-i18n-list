#!/usr/bin/env node
 'use strict';
 const program = require('commander');
 const listCommand = require('./command/list');
 
 program
   .command('list', { isDefault: true })
   .description('Lists all language strings used in your Vue files.')
   .requiredOption(
     '-v, --vueFiles <vueFiles>',
     'The Vue.js file(s) you want to extract i18n strings from. It can be a path to a folder or to a file. It accepts glob patterns. (ex. *, ?, (pattern|pattern|pattern)',
   )
   .option(
     '-o, --output <output>',
     'Use if you want to create a json file out of your list. (ex. -o output.json)',
   )
   .action(listCommand);
 
 program.parseAsync(process.argv);
 