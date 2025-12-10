const http = require('http');

const PORT = 5000;


const msg = `
  <p>아이가 타이가 뭐이가 <span style='color:red'>매우</span> 힘들다</p>
`;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  //res.setHeader('Content-Type', 'text/plain');
  //res.end('Hello from Node.js running in Docker!\n');
  res.end(msg);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
