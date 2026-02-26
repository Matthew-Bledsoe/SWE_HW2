const http = require('node:http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  if (req.url.endsWith('.css')) {
    res.setHeader('Content-Type', 'text/css');
  } else {
    res.setHeader('Content-Type', 'text/html');
  }
  //res.end('Hello World\n');
  console.log('Request received' + req.url);
  const requested_page = req.url.split('/')[1];
  const html = fs.readFileSync(requested_page);
  res.end(html);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/home.html`);
});

