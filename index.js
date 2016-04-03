#!/usr/bin/env node --harmony

var program = require('commander');
var log = require('./util/log');
var system = require('./system/index');

program
  .version('1.0.0')
  .arguments('<perform> <what> <name>')
  .action(function(perform, what, name) {
    // if generating
    if (perform === 'g' || perform === 'generate') {

      // check if we have the system function for the generator
      if (system().g[what]) {
        system().g[what](name);
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
