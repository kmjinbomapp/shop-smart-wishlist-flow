import { http, HttpResponse } from 'msw';
import { Product, HotdealTime } from '../schemas/productSchema';

// Mock data
const products: Product[] = [
  {
    id: 1,
    name: "프리미엄 블루투스 이어폰",
    description: "고품질 사운드의 무선 이어폰",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    price: 89000,
    originalPrice: 129000,
    discountRate: 31,
    isHotDeal: false
  },
  {
    id: 2,
    name: "편안한 패브릭 소파",
    description: "거실에 어울리는 모던한 소파",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    price: 450000,
    originalPrice: 600000,
    discountRate: 25,
    isHotDeal: false
  },
  {
    id: 3,
    name: "고양이 장난감 세트",
    description: "귀여운 고양이 장난감 모음",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    price: 15000,
    originalPrice: 20000,
    discountRate: 25,
    isHotDeal: false
  },
  {
    id: 4,
    name: "캠핑용 접이식 의자",
    description: "내구성 높은 야외용 의자",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
    price: 35000,
    originalPrice: 50000,
    discountRate: 30,
    isHotDeal: false
  }
];

const hotdeals: Product[] = [
  {
    id: 5,
    name: "스마트 워치 최신형",
    description: "건강 관리와 알림 기능이 탑재된 스마트 워치",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    price: 129000,
    originalPrice: 199000,
    discountRate: 35,
    isHotDeal: true
  },
  {
    id: 6,
    name: "무선 게이밍 마우스",
    description: "초저지연 무선 기술의 게이밍 마우스",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7",
    price: 78000,
    originalPrice: 120000,
    discountRate: 35,
    isHotDeal: true
  },
  {
    id: 7,
    name: "프리미엄 커피 머신",
    description: "바리스타급 커피를 집에서",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    price: 249000,
    originalPrice: 400000,
    discountRate: 38,
    isHotDeal: true
  },
  {
    id: 8,
    name: "휴대용 블루투스 스피커",
    description: "강력한 사운드의 방수 스피커",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    price: 59000,
    originalPrice: 89000,
    discountRate: 34,
    isHotDeal: true
  }
];

// Calculate hotdeal time
const now = new Date();
const startTime = new Date(now);
const endTime = new Date(now);
endTime.setHours(endTime.getHours() + 4); // Hotdeal ends in 4 hours

const hotdealTime: HotdealTime = {
  startTime: startTime.toISOString(),
  endTime: endTime.toISOString()
};

export const handlers = [
  http.get('/api/products', () => {
    return HttpResponse.json(products);
  }),

  http.get('/api/hotdeals', () => {
    return HttpResponse.json(hotdeals);
  }),

  http.get('/api/hotdeal-time', () => {
    return HttpResponse.json(hotdealTime);
  })
];
