let queryString = require('querystring'),
    fs = require('fs'),
    formidable = require('formidable');

let start = response => {
    console.log('start路径被请求');

    let body = '<html>'+
                '<head>'+
                '<meta http-equiv="Content-Type" content="text/html; '+
                'charset=UTF-8" />'+
                '</head>'+
                '<body>'+
                '<form action="/upload" enctype="multipart/form-data" '+
                'method="post">'+
                '<input type="file" name="upload" multiple="multiple">'+
                '<input type="submit" value="Upload file" />'+
                '</form>'+
                '</body>'+
                '</html>';
    
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
};

let upload = (response, request) => {
    let form = new formidable.IncomingForm();

    // 当前项目下的tmp文件夹
    form.uploadDir = 'tmp';  // 设置上传的根目录

    form.parse(request, (error, fields, files) => {
        fs.renameSync(files.upload.path, "tmp/test.png");
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write('上传的文件:<br/>');
        response.write("<img src='/show' />");
        response.end();
    });
};

let show = response => {
    fs.readFile('tmp/test.png', "binary", (error, file) => {
        if (error) {
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.write(error + '</br>');
            response.end();
        } else {
            response.writeHead(200, {'Content-Type': 'image/png'});
            response.write(file, 'binary');
            response.end();
        }
    });
};

exports.start = start;
exports.upload = upload;
exports.show = show;