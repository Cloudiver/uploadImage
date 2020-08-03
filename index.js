//导入这个文件并把它指向一个变量，其中已导出的函数就可以被我们使用了。
let server = require('./server');
let router = require('./route');
let requestHandlers = require('./requestHandlers');

let handle = {
    "/": requestHandlers.start,
    "/start": requestHandlers.start,
    "/upload": requestHandlers.upload,
    "/show": requestHandlers.show
};

// 直接调用
server.start(router.route, handle);