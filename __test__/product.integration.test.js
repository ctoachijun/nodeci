// __tests__/product.integration.test.js
// 테스트 환경: 통합 테스트 (integration test)

const request = require('supertest');
const server = require('../server');
const { productRepository } = require('../services/productService');

// 통합 테스트를 위해 실제 DB 접근 함수를 Mocking하여 일관된 데이터 환경 구성
jest.mock('../services/productService', () => ({
  ...jest.requireActual('../services/productService'),
  productRepository: {
    findById: jest.fn(),
  },
}));

describe('Product API Integration Tests', () => {
  beforeEach(() => {
    productRepository.findById.mockClear();
  });

  test('GET /api/products/101 - 상품 정보를 200 OK와 함께 반환해야 한다.', async () => {
    // 통합 테스트를 위해 특정 상품 Mock 데이터 설정
    productRepository.findById.mockResolvedValue({ basePrice: 10000, discountRate: 0.1 });

    const response = await request(server)
      .get('/api/products/101')
      .expect('Content-Type', /json/)
      .expect(200); // 200 OK 검증

    // 응답 본문 검증
    expect(response.body).toEqual({ id: 101, price: 9000 });
  });

  test('GET /api/products/999 - 상품이 없을 경우 404 Not Found를 반환해야 한다.', async () => {
    productRepository.findById.mockResolvedValue(null);

    await request(server)
      .get('/api/products/999')
      .expect(404) // 404 Not Found 검증
      .expect(response => {
        expect(response.body).toHaveProperty('message', 'Product not found');
      });
  });
});