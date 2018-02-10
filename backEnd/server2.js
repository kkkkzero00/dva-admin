const url = require('url');
const http = require('http');
const https = require('https');

/*
服务器代理，顾名思义，当你需要有跨域的请求操作时发送请求给后端，让后端帮你代为请求，
然后最后将获取的结果发送给你。因为跨域问题是因为浏览器的安全策略发生的，
所以如果后端直接获取不同域的数据就直接绕开了浏览器。
*/

const server = http.createServer((req, res) => {
    const path = url.parse(req.url).path.slice(1);
    console.log(req.url)
    /*用http代理进行跨域*/
    if(path === 'topics') {
        https.get('https://cnodejs.org/api/v1/topics', (resp) => {
            let data = "";
            resp.on('data', chunk => {
                data += chunk;
            });
            resp.on('end', () => {
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': 'http://localhost:8000'
                });
                res.end(data);
            });
        })      
    }
}).listen(3000, '127.0.0.1');

console.log('启动服务，监听 127.0.0.1:3000');