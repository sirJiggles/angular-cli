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
  fs.createReadStream(__dirname+'/base/.gitignore').pipe(fs.createWriteStream('./.gitignore'));
  fs.createReadStream(__dirname+'/base/index.html').pipe(fs.createWriteStream('./index.html'));
  fs.createReadStream(__dirname+'/base/package.json').pipe(fs.createWriteStream('./package.json'));
  fs.createReadStream(__dirname+'/base/tsconfig.json').pipe(fs.createWriteStream('./tsconfig.json'));
  fs.createReadStream(__dirname+'/base/typings.json').pipe(fs.createWriteStream('./typings.json'));
  fs.createReadStream(__dirname+'/base/app/index.ts').pipe(fs.createWriteStream('./app/index.ts'));

  // Copy the app component (recursive)
  cp('-R', __dirname+'/base/app/components/app', './app/components/');
  
  // replace the constants
  replace({
    regex: 'APPNAME',
    replacement: name,
    paths: ['.'],
    recursive: true,
    exclude: './node_modules'
  }, function(err, done) {
    if (err) {
      log(err, true);
    } else {
      installDeps();
    }
  });

  log(`created the project ${name}`);

};
