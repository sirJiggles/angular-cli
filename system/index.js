#!/usr/bin/env node --harmony

// require all the functions
var component = require('./component');
var project = require('./project');
var inter = require('./interface');
var mock = require('./mock');
var pipe = require('./pipe');
var service = require('./service');

module.exports = function() {

  // generator functions
  this.g = {
    component: component,
    project: project,
    interface: inter,
    mock: mock,
    service: service,
    pipe: pipe
  };

  return this;

};
