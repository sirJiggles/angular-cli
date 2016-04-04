#!/usr/bin/env node --harmony
var log = require('../util/log');

module.exports = function(name, library) {

  if (library) {
    log('we got a lib');
    log(library);
  } else {
    log('we got no lib');
  }
};
