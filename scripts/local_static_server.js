const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const requestedPort = Number(process.argv[2] || 0);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg'
};

const server = http.createServer((req, res) => {
  let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (pathname === '/') pathname = '/kanban.html';

  const file = path.resolve(root, `.${pathname}`);
  if (!file.startsWith(root)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    res.writeHead(200, {
      'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream'
    });
    res.end(data);
  });
});

server.on('error', error => {
  const logPath = path.join(root, 'pmo', 'local_server.err.log');
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.writeFileSync(logPath, `${error.stack || error.message}\n`, 'utf8');
  process.exit(1);
});

server.listen(requestedPort, '127.0.0.1', () => {
  const address = server.address();
  const url = `http://127.0.0.1:${address.port}/kanban.html`;
  const outPath = path.join(root, 'pmo', 'local_server_url.txt');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `${url}\n`, 'utf8');
});
