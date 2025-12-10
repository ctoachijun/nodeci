const http = require('http');

const PORT = 5000;


const msg = `
  <p>지금부터 수정할꺼야. 그럼 이제 <span style='color:red'>새로운 이미지가</span> 도커허브에 올라가겠지???</p>
  <p>혹시 모르니... 파일 수정후에 푸시해볼께</p>
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
