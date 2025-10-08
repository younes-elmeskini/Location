"use client";

import { Skeleton } from "../skeletonLoader";

export function AuthSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-4">
        {/* Title Skeleton */}
        <Skeleton className="h-8 w-3/4" />
        
        {/* Form Fields Skeleton */}
        <div className="space-y-4">
          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        
        {/* Button Skeleton */}
        <Skeleton className="h-10 w-full" />
        
        {/* Additional Info Skeleton */}
        <div className="text-center">
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>
      </div>
    </div>
  );
}
