const url = require('url');

require('http').createServer((req,res)=>{
    const data = {
        x: 10
    };

    /*cors跨域其实就是在返回的报文中设置ACAO头*/
    res.writeHead(200, {
        'Access-Control-Allow-Origin': 'http://localhost:8000'
    });
    // console.log(window.localStorage)

    res.end(JSON.stringify(data));

}).listen(3000,'127.0.0.1');

console.log('启动服务，监听127.0.0.1:3000');