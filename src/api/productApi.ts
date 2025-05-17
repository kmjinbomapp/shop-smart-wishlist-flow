
import { apiClient } from './axiosInstance';
import { ProductListSchema, HotdealTimeSchema } from '../schemas/productSchema';

export const fetchProducts = async () => {
  try {
    // For now, mocking the API response
    const response = await apiClient.get('/products');
    const parsed = ProductListSchema.safeParse(response.data);
    
    if (!parsed.success) {
      console.error('Product data parsing error:', parsed.error);
      throw new Error('서버 응답 형식이 올바르지 않습니다');
    }
    
    return parsed.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchHotdeals = async () => {
  try {
    // For now, mocking the API response 
    const response = await apiClient.get('/hotdeals');
    const parsed = ProductListSchema.safeParse(response.data);
    
    if (!parsed.success) {
      console.error('Hotdeal data parsing error:', parsed.error);
      throw new Error('서버 응답 형식이 올바르지 않습니다');
    }
    
    return parsed.data;
  } catch (error) {
    console.error('Error fetching hotdeals:', error);
    throw error;
  }
};

export const fetchHotdealTime = async () => {
  try {
    // For now, mocking the API response
    const response = await apiClient.get('/hotdeal/time');
    const parsed = HotdealTimeSchema.safeParse(response.data);
    
    if (!parsed.success) {
      console.error('Hotdeal time parsing error:', parsed.error);
      throw new Error('서버 응답 형식이 올바르지 않습니다');
    }
    
    return parsed.data;
  } catch (error) {
    console.error('Error fetching hotdeal time:', error);
    throw error;
  }
};
