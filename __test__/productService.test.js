// services/productService.test.js
// 테스트 환경: 단위 테스트 (unit test)

const { getProductPrice, productRepository } = require('../services/productService');


const mockFindById = jest.fn();

// productRepository의 findById 함수를 Jest Mock 함수로 대체
jest.mock('../services/productService', () => ({
  ...jest.requireActual('../services/productService'),
  productRepository: {
    findById: mockFindById, // findById만 Mocking
  },
}));

describe('Product Service Unit Tests', () => {

  // 각 테스트 실행 전 Mock 함수 초기화 (필수)
  beforeEach(() => {
    productRepository.findById.mockClear();
  });

  test('할인율 10%가 정확히 적용되어야 한다.', async () => {
    // Mocking: findById가 호출되면 특정 데이터를 반환하도록 설정
    productRepository.findById.mockResolvedValue({ basePrice: 10000, discountRate: 0.1 });

    const price = await getProductPrice(1);

    // Assert: 결과 검증
    expect(price).toBe(9000);
    
    // Assert: Mock 함수가 예상대로 호출되었는지 검증
    expect(productRepository.findById).toHaveBeenCalledWith(1);
  });

  test('상품이 없을 경우 0을 반환해야 한다.', async () => {
    // Mocking: findById가 null을 반환하도록 설정
    productRepository.findById.mockResolvedValue(null);

    const price = await getProductPrice(999);

    expect(price).toBe(0);
    expect(productRepository.findById).toHaveBeenCalledWith(999);
  });
});