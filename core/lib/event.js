'use strict';

class Event {

    constructor (handle, options) {
        options = options || {};
        this.handle = handle;
        this.target = options.target;
        this.args = options.args;
    }

    matching (handle) {
        return handle === this.handle;
    }

    emit (data) {
        if (this.target) {
            if (this.arguments)
                this.handle.apply(this.target, this.args);
            else
                this.handle.call(this.target, data);
        } else {
            this.handle(data);
        }
    }
}

class EventManager {

    constructor () {
        this.manager = {
            //'event-test': [new Event()]
        };
    }

    emit (event, data) {
        if (typeof event !== 'string')
            Editor.error('EventManager: event must be string');

        var manager = this.manager;
        var handles = manager[event];
        if (!handles) return;

        var i;
        for (i=0; i<handles.length; i++) {
            handles[i].emit(data);
        }
    }

    restore () {
        this.manager = {};
    }

    on (event, handle, options) {
        if (typeof event !== 'string')
            Editor.error('EventManager: event must be string');
        if (typeof handle !== 'function')
            Editor.error('EventManager: handle must be function');

        var manager = this.manager;
        var handles = manager[event];
        if (!handles)
            manager[event] = handles = [];

        handles.push(new Event(handle, options));
    }

    off (event, handle) {
        if (typeof event !== 'string')
            Editor.error('EventManager: event must be string');
        if (typeof handle !== 'function')
            Editor.error('EventManager: handle must be function');

        var manager = this.manager;
        var handles = manager[event];
        if (!handles) return;

        var i, item;
        for (i=0; i<handles.length; i++) {
            item = handles[i];
            if (!item.matching(handle)) continue;
            handles.splice(i, 1);
        }

        if (handles.length === 0) {
            delete manager[event];
        }
    }

    mount (object) {
        object._eventManager = new EventManager;
        object.emit = function (event, data) {
            this._eventManager.emit(event, data);
        };
        object.on = function (event, handle, options) {
            this._eventManager.on(event, handle, options);
        };
        object.off = function (event, handle) {
            this._eventManager.off(event, handle);
        };
    }
}

if (global.Editor) {
    Editor.Event = new EventManager;
}

module.exports = {
    EventManager: EventManager,
    Event: Event
};