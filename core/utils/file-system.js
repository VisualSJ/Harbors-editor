'use strict';

const Fs = require('fs');

var fileSystem = {};

fileSystem.exists = Fs.exists;
fileSystem.stat = Fs.stat;
fileSystem.mkdir = Fs.mkdir;

fileSystem.isDirectory = function (path, callback) {
    Fs.exists(path, (exists) => {
       if (exists) {
           Fs.stat(path, (error, stat) => {
                if (error) {
                    typeof callback === 'function' && callback(error, null);
                    return;
                }
               typeof callback === 'function' && callback(null, stat.isDirectory());
           });
           return;
       }

        typeof callback === 'function' && callback('Path does not exist', null);
    });
};

fileSystem.readJson = function (jsonPath, callback) {
    Fs.readFile(jsonPath, (error, buffer) => {
        if (error) {
            return callback(error, null);
        }

        var string = buffer.toString();
        try {
            var json = JSON.parse(string);
        } catch (error) {
            return callback(error, null);
        }

        typeof callback === 'function' && callback(null, json);
    });
};

module .exports = fileSystem;