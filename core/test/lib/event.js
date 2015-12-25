'use strict';

var assert = require('assert');
var Event = require('../../lib/event');

var manager = new Event.EventManager();

describe('监听单个事件，并触发', () => {
    it('触发一个事件回调', (done) => {
        manager.on('test-listen', () => {
            done();
        });
        manager.emit('test-listen');
    });
});

describe('监听两个事件，并触发', () => {
    it('触发两个事件回调', (done) => {
        var index = 0;
        var end = function () {
            index++;
            if (index >= 2) {
                done();
            }
        };
        manager.on('test-listen-2', end);
        manager.on('test-listen-2', end);
        manager.emit('test-listen-2');
    });
});
