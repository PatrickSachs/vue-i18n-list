const { parseVueFiles } = require('../vue-files');
const path = require('path');
const fs = require('fs');

function listCommand(command) {
  const { vueFiles, output } = command;

  const resolvedVueFiles = path.resolve(process.cwd(), vueFiles);
  const parsedVueFiles = parseVueFiles(resolvedVueFiles);
  const values = parsedVueFiles.map(file => file.path);

  console.log(values);

  if (output) {
    const outPath = path.resolve(process.cwd(), output);
    writeToFile(values, outPath);
    console.log(`The list has been has been saved to ${outPath}`);
  }
}

async function writeToFile(report, writePath) {
  const reportString = JSON.stringify(report);
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

module.exports = listCommand;