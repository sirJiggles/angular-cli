#!/usr/bin/env node --harmony

var fs = require('fs');
var log = require('../util/log');
var Case = require('case');

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

  log('cerated the files');
};
