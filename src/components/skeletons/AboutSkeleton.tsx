"use client";

import { Skeleton } from "../skeletonLoader";

export function AboutSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="p-6 rounded-[16px] bg-[#fafafa] shadow-lg max-w-[350px]">
        {/* Car Image Skeleton */}
        <Skeleton className="h-[200px] w-full rounded-[12px] mb-4" />
        
        {/* Car Info Skeleton */}
        <div className="flex justify-between w-full mb-4">
          <div className="text-left">
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="text-right">
            <Skeleton className="h-6 w-20 mb-1" />
            <Skeleton className="h-3 w-8" />
          </div>
        </div>
        
        {/* Car Features Skeleton */}
        <div className="flex justify-between w-full text-sm">
          <div className="flex justify-center items-center gap-2">
            <Skeleton className="h-6 w-6 rounded" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex justify-center items-center gap-2">
            <Skeleton className="h-6 w-6 rounded" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex justify-center items-center gap-2">
            <Skeleton className="h-6 w-6 rounded" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}
