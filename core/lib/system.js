'use strict';

const Env = process.env;
const Path = require('path');

var System = {
    EDITORPATH: Path.join(__dirname, '../../'),
    TEMP: Env.TEMP,
    PUBLIC: Env.PUBLIC,
    HOME: Env.HOME
};

Editor.System = System;