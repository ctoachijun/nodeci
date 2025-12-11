// server.js
const http = require('http');
const { getProductPrice } = require('./services/productService');

// HTTP 서버 로직 함수
const requestListener = async (req, res) => {
  const url = req.url;
  const method = req.method;

  // 헤더 설정 (JSON 응답을 위해)
  res.setHeader('Content-Type', 'application/json');

  // --- 헬스 체크 엔드포인트 ---
  if (url === '/health' && method === 'GET') {
    res.writeHead(200);
    return res.end(JSON.stringify({ status: 'OK' }));
  }

  // --- API 엔드포인트: GET /api/products/:id ---
  if (url.startsWith('/api/products/') && method === 'GET') {
    // URL에서 ID 추출 (단순화된 파싱)
    const parts = url.split('/');
    const id = parseInt(parts[parts.length - 1]);

    if (isNaN(id)) {
        res.writeHead(400); // Bad Request
        return res.end(JSON.stringify({ message: 'Invalid product ID' }));
    }

    try {
      const price = await getProductPrice(id);

      if (price === 0) {
        res.writeHead(404); // Not Found
        return res.end(JSON.stringify({ message: 'Product not found' }));
      }

      res.writeHead(200);
      return res.end(JSON.stringify({ id, price }));

    } catch (error) {
      res.writeHead(500); // Internal Server Error
      return res.end(JSON.stringify({ message: 'Internal server error' }));
    }
  }

  // --- 404 Not Found 처리 ---
  res.writeHead(404);
  res.end(JSON.stringify({ message: 'Not Found' }));
};

const server = http.createServer(requestListener);

// 테스트 목적으로만 export
module.exports = server;

if (require.main === module) {
  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}