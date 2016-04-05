#!/usr/bin/env node --harmony

var fs = require('fs');
var log = require('../util/log');
var cpy = require('../util/copyFile');
var Case = require('case');
var replace = require('replace');
var async = require('async');
var ncp = require('ncp');

// TODO this is only used for exec, look into node child process
require('shelljs/global');

// what we export
module.exports = run;

function run(name) {
  log(`creating project ${name}`);

  var kebab = Case.kebab(name);

  // Create and change into main folder
  fs.mkdirSync(kebab);
  process.chdir(kebab);

  // run npm and other things side by side
  async.parallel([
    function(cb) { startNpm(cb); },
    function(cb) { appSettup(cb); }
  ], function(err) {
    if (err) {
      log(err, true);
      return;
    }
    done(name);
  });
}

// when all said and ...
function done(name) {

  // replace constants
  replace({
    regex: 'APPNAME',
    replacement: name,
    paths: ['./index.html', './app/components/app/app.ts'],
    recursive: false,
    silent: true
  });

  log(`created the project ${name}, cd into it then use "npm start" to run it`);
}

function startNpm(parentCallback) {
  async.series([
    function(cb) { cpy(__dirname+'/../base/package.json', './package.json', cb); },
    function(cb) {
      exec('npm install --no-progress');
      cb();
    }
  ], parentCallback);
}

function appSettup(parentCallback) {
  async.series([
    function(cb) { setUpAppDirs(cb); },
    function(cb) { makeFolders(cb); },
    function(cb) { makeFiles(cb); }
  ], parentCallback);
}

function setUpAppDirs(parentCallback) {
  async.series([
    function(cb) { fs.mkdir('./app', cb); },
    function(cb) { fs.mkdir('./app/components', cb); }
  ], parentCallback);
}

function makeFolders(parentCallback) {
  async.parallel([
    function(cb) { fs.mkdir('./app/lib', cb); },
    function(cb) { fs.mkdir('./app/interfaces', cb); },
    function(cb) { fs.mkdir('./app/mocks', cb); },
    function(cb) { fs.mkdir('./app/pipes', cb); },
    function(cb) { fs.mkdir('./app/services', cb); },
    function(cb) { fs.mkdir('./app/styles', cb); }
  ], parentCallback);
}

function makeFiles(parentCallback) {

  // all file creation can be done in parallel
  async.parallel([
    function(cb) { fs.writeFile('./app/lib/.gitkeep', '', cb); },
    function(cb) { fs.writeFile('./app/mocks/.gitkeep', '', cb); },
    function(cb) { fs.writeFile('./app/pipes/.gitkeep', '', cb); },
    function(cb) { fs.writeFile('./app/services/.gitkeep', '', cb); },
    function(cb) { fs.writeFile('./app/components/.gitkeep', '', cb); },
    function(cb) { fs.writeFile('./app/interfaces/.gitkeep', '', cb); },
    function(cb) { ncp(__dirname+'/../base/app/components/app', './app/components/app/', cb); },
    function(cb) { cpy(__dirname+'/../base/gitignore', './.gitignore', cb); },
    function(cb) { cpy(__dirname+'/../base/app/styles/styles.css', './app/styles/styles.css', cb); },
    function(cb) { cpy(__dirname+'/../base/index.html', './index.html', cb); },
    function(cb) { cpy(__dirname+'/../base/tsconfig.json', './tsconfig.json', cb); },
    function(cb) { cpy(__dirname+'/../base/typings.json', './typings.json', cb); },
    function(cb) { cpy(__dirname+'/../base/app/index.ts', './app/index.ts', cb); }
  ], parentCallback);
}
