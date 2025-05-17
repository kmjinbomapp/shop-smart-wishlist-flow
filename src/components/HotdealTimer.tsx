
import React from "react";
import { HotdealTime } from "../schemas/productSchema";
import useHotdealTimer from "../hooks/useHotdealTimer";
import { useSafeQuery } from "../hooks/useSafeQuery";
import { fetchHotdealTime } from "../api/productApi";
import { HotdealTimeSchema } from "../schemas/productSchema";

export default function HotdealTimer() {
  const {
    data: hotdealTime,
    isLoading,
    error,
  } = useSafeQuery<HotdealTime>(
    ["hotdealTime"],
    fetchHotdealTime,
    HotdealTimeSchema,
    {
      refetchOnWindowFocus: false,
    }
  );

  // Mock data for development purposes
  const mockEndTime = new Date();
  mockEndTime.setHours(mockEndTime.getHours() + 2); // End time is 2 hours from now
  
  const endTimeStr = hotdealTime?.endTime || mockEndTime.toISOString();
  const { hours, minutes, seconds, isExpired } = useHotdealTimer(endTimeStr);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-16 bg-gray-100 rounded-lg animate-pulse">
        <p>타이머 로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-16 bg-red-100 text-red-600 rounded-lg">
        <p>타이머 로드 실패</p>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="flex justify-center items-center h-16 bg-gray-100 text-gray-600 rounded-lg">
        <p>핫딜이 종료되었습니다</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gradient-to-r from-hotdeal to-wishlist text-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2 animate-hotdeal-pulse">오늘의 핫딜</h3>
      <div className="flex justify-center space-x-4">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">{hours.toString().padStart(2, "0")}</span>
          <span className="text-xs">시간</span>
        </div>
        <span className="text-2xl font-bold">:</span>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">{minutes.toString().padStart(2, "0")}</span>
          <span className="text-xs">분</span>
        </div>
        <span className="text-2xl font-bold">:</span>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">{seconds.toString().padStart(2, "0")}</span>
          <span className="text-xs">초</span>
        </div>
      </div>
    </div>
  );
}
