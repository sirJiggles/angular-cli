#!/usr/bin/env node

var log = require('../util/log');
var Case = require('case');

module.exports = function(name) {
  log(`creating project ${name}`);

  var kebab = Case.kebab(name);

  console.log(kebab);

  // make the dir and change into it

};
