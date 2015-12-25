'use strict';

const core = require('./core/index');

var Display = Editor.Driver.load('./driver/display');

console.log(Display)
console.log(Editor.Driver.find('display'))

Editor.Driver.find('display').a()