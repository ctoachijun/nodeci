// services/productService.js

// DB 접근을 모방하는 함수 (단위 테스트에서 Mocking 될 대상)
const productRepository = {
  // 실제 DB를 호출한다고 가정
  findById: async (id) => {
    if (id === 101) return { basePrice: 10000, discountRate: 0.1 };
    if (id === 202) return { basePrice: 50000, discountRate: 0 };
    return null; // 상품 없음
  }
};

// 테스트 대상 함수 (핵심 비즈니스 로직)
const getProductPrice = async (id) => {
  const product = await productRepository.findById(id);

  if (!product) {
    return 0;
  }

  // 10% 할인 적용 로직
  return product.basePrice * (1 - product.discountRate);
};

module.exports = { getProductPrice, productRepository };