'use strict';

const Watch = require('watch');
const Driver = require('./driver');

class Package extends Driver.Driver {


    watch () {
        //watch.createMonitor('/home/mikeal', function (monitor) {
        //    monitor.files['/home/mikeal/.zshrc'] // Stat object for my zshrc.
        //    monitor.on("created", function (f, stat) {
        //        // Handle new files
        //    })
        //    monitor.on("changed", function (f, curr, prev) {
        //        // Handle file changes
        //    })
        //    monitor.on("removed", function (f, stat) {
        //        // Handle removed files
        //    })
        //    monitor.stop(); // Stop watching})
    }

    unwatch () {}
}