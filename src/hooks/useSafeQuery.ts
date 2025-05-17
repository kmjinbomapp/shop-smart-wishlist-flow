
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ZodSchema } from "zod";
import { toast } from 'sonner';

export function useSafeQuery<T>(
  queryKey: string[],
  fetcher: () => Promise<any>,
  schema: ZodSchema<T>,
  options?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const data = await fetcher();
        const result = schema.safeParse(data);
        
        if (!result.success) {
          console.error("Data validation error:", result.error);
          throw new Error("서버 응답 형식이 올바르지 않습니다");
        }
        
        return result.data;
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("데이터 로딩에 실패했습니다");
        }
        throw error;
      }
    },
    ...options,
  });
}
