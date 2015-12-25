'use strict';

const Fs = require('fs');
const Path = require('path');

var Editor = {};
global.Editor = Editor;



// 加载 lib 库文件
((dirPath) => {

    var list = Fs.readdirSync(dirPath);
    list.forEach((name) => {
        var path = Path.join(dirPath, name);
        var extname = Path.extname(path);

        if (extname === '.js') {
            require(path);
        }
    });

})(Path.join(__dirname, 'lib'));
