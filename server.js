// 1. 导入Nodejs自带的http模块
let http = require('http');
let url = require('url');

// 将启动服务功能封装为函数
let start = function(route, handle) {
    // 2.调用 http 模块提供的函数 createServer
    // 该函数会返回一个对象, 该对象有一个listen监听方法
    http.createServer((request, response) => {
        // console.log('收到请求');
        // 2个对象作为参数传递

        // 判别请求路径
        let pathName = url.parse(request.url).pathname;

        route(handle, pathName, response, request);
		
		// 异步执行, 将请求放在处理程序handle中

        // // 1) 收到请求: 先发送HTTP状态和HTTP头内容
        // response.writeHead(200, {"Content-Type": "text/plain"});
        // // 2) HTTP主体中发送文本
        // response.write('Hello World');
        // // 3) 完成响应
        // response.end();
    }).listen(8888);  // 指定监听端口号

    // 无论我们的服务器何时收到一个请求, 这个函数就会被调用

    console.log('服务已启动');

    // 异步服务端
    // 说明: 先启动服务, 然后有请求时, 执行回调函数
};

// 导出这个函数 
// 现在已近可以使用这个模块了.
exports.start = start;


