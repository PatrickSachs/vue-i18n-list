const { parseVueFiles } = require('../vue-files');
const path = require('path');
const fs = require('fs');

function potCommand(command) {
  const { vueFiles, output } = command;

  const resolvedVueFiles = path.resolve(process.cwd(), vueFiles);
  const parsedVueFiles = parseVueFiles(resolvedVueFiles);

  let text = '';
  const known = new Set();
  for(let i = 0; i < parsedVueFiles.length; i++) {
    const res = parsedVueFiles[i];
    if (!known.has(res.path)) {
      // Meta data
      text += '#: ' + removeInitialSlash(res.file) + ':' + res.line + '\n';
      text += 'msgid ' + JSON.stringify(res.path) + '\n';
      text += 'msgstr ""\n';
      text += '\n';
      known.add(res.path);
    }
  }

  console.log(text);

  if (output) {
    const outPath = path.resolve(process.cwd(), output);
    writeToFile(text, outPath);
    console.log(`The pot file has been has been saved to ${outPath}`);
  }
}

function removeInitialSlash(str) {
  if (str.startsWith('/')) {
    return str.substring(1, str.length);
  }
}

async function writeToFile(reportString, writePath) {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      writePath,
      reportString,
      (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      },
    );
  });
}

module.exports = potCommand;