#!/usr/bin/env node --harmony

var fs = require('fs');
var log = require('../util/log');
var Case = require('case');
var replace = require('replace');
require('shelljs/global');

module.exports = function(name) {
  log(`creating project ${name}`);

  var kebab = Case.kebab(name);

  fs.mkdirSync(kebab);
  process.chdir(kebab);

  // Create and change into main folder
  fs.mkdirSync('./app');
  fs.mkdirSync('./app/components');

  // create the folder structure
  fs.mkdirSync('./app/lib');
  fs.mkdirSync('./app/interfaces');
  fs.mkdirSync('./app/mocks');
  fs.mkdirSync('./app/pipes');
  fs.mkdirSync('./app/services');
  fs.mkdirSync('./app/styles');

  // Create the git keep
  fs.closeSync(fs.openSync('./app/lib/.gitkeep', 'w'));
  fs.closeSync(fs.openSync('./app/mocks/.gitkeep', 'w'));
  fs.closeSync(fs.openSync('./app/pipes/.gitkeep', 'w'));
  fs.closeSync(fs.openSync('./app/services/.gitkeep', 'w'));
  fs.closeSync(fs.openSync('./app/components/.gitkeep', 'w'));
  fs.closeSync(fs.openSync('./app/interfaces/.gitkeep', 'w'));

  // Copy over the single files from the base into the new structure
  cp(__dirname+'/../base/.gitignore', './.gitignore');
  cp(__dirname+'/../base/index.html','./index.html');
  cp(__dirname+'/../base/package.json','./package.json');
  cp(__dirname+'/../base/tsconfig.json','./tsconfig.json');
  cp(__dirname+'/../base/typings.json','./typings.json');
  cp(__dirname+'/../base/app/index.ts','./app/index.ts');

  // Copy the app component (recursive)
  cp('-R', __dirname+'/../base/app/components/app', './app/components/');

  // replace the constants
  var files = find(['./index.html', './app/components/app/app.ts']);
  files.forEach(function(file) {
    sed('-i', 'APPNAME', name, file);
  });

  exec('npm set progress=false');
  exec('npm install');

  log(`created the project ${name}, cd into it then use "npm start" to run it`);

};
