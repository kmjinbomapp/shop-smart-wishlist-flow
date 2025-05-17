
import { rest } from 'msw';
import { setupWorker } from 'msw/browser';
import { Product } from '../schemas/productSchema';

// Mock data for our API
const hotdeals: Product[] = [
  {
    id: 1,
    name: "프리미엄 블루투스 이어폰",
    description: "고품질 사운드의 무선 이어폰",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    price: 89000,
    originalPrice: 129000,
    discountRate: 31,
    isHotDeal: true
  },
  {
    id: 2,
    name: "편안한 패브릭 소파",
    description: "거실에 어울리는 모던한 소파",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    price: 450000,
    originalPrice: 600000,
    discountRate: 25,
    isHotDeal: true
  },
  {
    id: 3,
    name: "고양이 장난감 세트",
    description: "귀여운 고양이 장난감 모음",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    price: 15000,
    originalPrice: 20000,
    discountRate: 25,
    isHotDeal: true
  },
  {
    id: 4,
    name: "캠핑용 접이식 의자",
    description: "내구성 높은 야외용 의자",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
    price: 35000,
    originalPrice: 50000,
    discountRate: 30,
    isHotDeal: true
  }
];

const products: Product[] = [
  {
    id: 5,
    name: "베이직 화이트 티셔츠",
    description: "부드러운 코튼 소재의 기본 티셔츠",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    price: 19900,
    originalPrice: 24900,
    discountRate: 20
  },
  {
    id: 6,
    name: "스마트 센서 무드등",
    description: "움직임을 감지하는 스마트 조명",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    price: 39000,
    originalPrice: 45000,
    discountRate: 13
  },
  {
    id: 7,
    name: "스테인리스 텀블러",
    description: "보온 보냉이 뛰어난 고급 텀블러",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    price: 28000,
    originalPrice: 35000,
    discountRate: 20
  },
  {
    id: 8,
    name: "무선 충전 마우스",
    description: "충전 걱정 없는 무선 마우스",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
    price: 45000,
    originalPrice: 60000,
    discountRate: 25
  }
];

// Calculate hot deal end time (2 hours from now)
const now = new Date();
const endTime = new Date(now);
endTime.setHours(now.getHours() + 2);

// Mock handlers
export const handlers = [
  rest.get('/api/hotdeals', (_, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json(hotdeals)
    );
  }),
  
  rest.get('/api/products', (_, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json(products)
    );
  }),
  
  rest.get('/api/hotdeal/time', (_, res, ctx) => {
    return res(
      ctx.delay(200),
      ctx.status(200),
      ctx.json({
        startTime: now.toISOString(),
        endTime: endTime.toISOString()
      })
    );
  })
];

// This is for development purposes, no need to actually setup the worker
// export const worker = setupWorker(...handlers);
