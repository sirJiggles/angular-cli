#!/usr/bin/env node --harmony

var program = require('commander');
var log = require('./util/log');
var system = require('./system/index');
var checkForFile = require('./util/checkForFile');

program
  .version('1.0.0')
  .arguments('<perform> <what> <name> [library]')
  .action(function(perform, what, name, library) {

    if (what !== 'project') {
      // all commands need to be run at the root of the application
      if (!checkForFile('./package.json')) {
        log('commands need to be run inside a angular-2-cli folder', true);
        // break out the function
        return true;
      }
    }

    // if generating
    if (perform === 'g' || perform === 'generate') {

      // check if we have the system function for the generator
      if (system().g[what]) {
        system().g[what](name, library);
      } else {
        log('unsuported generator please try again', true);
      }
    }
    // if removing items
    else if (perform === 'd' || perform === 'destroy') {
      if (system().d[what]) {
        system().d[what](name);
      } else {
        log('unsuported destroyer please try again', true);
      }
    } else {
      log('unsupported function use help command for more help', true);
    }
  });

program.parse(process.argv);
