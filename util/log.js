#!/usr/bin/env node

var colors = require('colors');

module.exports = function(what, error) {
  if (!error) {
    console.log('----------------------'.green);
    console.log(colors.green(what));
    console.log('----------------------'.green);
  } else {
    console.log('----------------------'.red);
    console.log(colors.red(what));
    console.log('----------------------'.red);
  }
};
