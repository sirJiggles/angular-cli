#!/usr/bin/env node --harmony
var fs = require('fs');

module.exports = function(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
};
