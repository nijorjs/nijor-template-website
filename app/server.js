const http = require('http');
const fs = require('fs');
const path = require('path');
const rootDir = __dirname;
const staticDir = path.join(rootDir,'static');
const hostname = '127.0.0.1';
const port = 3000;

const page = fs.readFileSync(path.join(staticDir,'index.html'),'utf-8');

const server = http.createServer((req, res) => {
        if(req.url=="/index.html"){
            res.writeHead(302,{location:'/'});
            res.end();
            return;
        }
        try {
            let data = fs.readFileSync(staticDir + req.url);
            if (path.extname(req.url)==='.svg') {
                res.setHeader('Content-Type', 'image/svg+xml');
            }
            if (path.extname(req.url)==='.ico') {
                res.setHeader('Content-Type', 'image/vnd.microsoft.icon');
            }
            res.writeHead(200);
            res.end(data);
        } catch (error) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(page);
        }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://localhost:${port}`);
});