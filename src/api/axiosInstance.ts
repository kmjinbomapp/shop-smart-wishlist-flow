
import axios from 'axios';
import { toast } from 'sonner';

export const apiClient = axios.create({
  baseURL: 'https://assignment.api.a-bly.com/api', // 실제 API 서버 주소로 변경
  timeout: 5000,
});

// Adding a response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMsg = error?.response?.data?.message || error.message || '알 수 없는 오류가 발생했습니다';
    toast.error(errorMsg);
    return Promise.reject(new Error(errorMsg));
  }
);
