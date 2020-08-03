let route = (handle, pathName, response, request) => {
    console.log('请求路径是:' + pathName);
    if (typeof handle[pathName] === 'function') {
        //handle.pathName(); // pathName 是字符串, 不能这样调用
        handle[pathName](response, request);
    } else {    
        console.log(pathName + '请求地址没有找到');

        response.writeHead(404, {"Content-Type": "text/html"});
        response.write("404 Not Found");
        response.end();
    }
};

exports.route = route;