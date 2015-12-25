'use strict';

require('colors');

function stamp (string) {
    var date = new Date();
    var hour = date.getHours();
    if (hour < 10) hour = '0' + hour;
    var minute = date.getMinutes();
    if (minute < 10) minute = '0' + minute;
    var second = date.getSeconds();
    if (second < 10) second = '0' + second;
    var timeString = `${hour}:${minute}:${second}`;

    return `[${timeString.grey}] ${string}`;
}

Editor.log = function (message) {
    message += '';
    console.log( stamp(message) );
};

Editor.warn = function (message) {
    message += '';
    console.warn( stamp(message.yellow) );
};

Editor.error = function (message) {
    message += '';
    console.warn( stamp(message.red) );
};