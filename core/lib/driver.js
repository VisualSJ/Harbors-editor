'use strict';

const Fs = require('fs');
const Path = require('path');

class Driver {

    constructor (path) {
        this.path = path;
        this.name = 'unknown';
        this.version = '0.0.0';
        this.main = 'index.js';

        this.exports = {};

        this.readPackage();
    }

    readPackage () {
        let path = this.path;

        // 读取 package.json
        let packageFile = Path.join(path, 'package.json');
        if (!Fs.existsSync(packageFile)) return Editor.log(`Editor can't load driver: ${path}`);
        let buffer = Fs.readFileSync(packageFile);
        let json;
        try {
            json = JSON.parse(buffer + '');
        } catch (error) {
            return Editor.log(`Editor can't load driver: ${path}`);
        }

        this.name = json.name;
        this.version = json.version;
        this.main = json.main;
    }

    load () {
        let path = this.path;
        let mainFile = Path.join(Editor.System.EDITORPATH, path, this.main);
        this.exports = require(mainFile);
    }

    unload () {}
}

class DriverManager {

    constructor () {
        this.manager = {};
    }

    load (path) {
        var manager = this.manager;

        for (let i=0; i<manager.length; i++) {
            if (manager[i].path === path) {
                return manager[i];
            }
        }

        var driver = new Driver(path);
        driver.load();
        if (driver.name) {
            manager[driver.name] = driver;
        }

        return driver;
    }

    unload () {}

    find (name) {
        var manager = this.manager;
        if (manager[name])
            return manager[name].exports;

        return null;
    }
}

if (global.Editor) {
    Editor.Driver = new DriverManager;
}

module.exports = {
    Driver: Driver,
    DriverManager: DriverManager
};