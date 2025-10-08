"use client";

import { Skeleton } from "../skeletonLoader";

export function CarDetailSkeleton() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Car Details Skeleton */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Car Image Skeleton */}
            <div>
              <Skeleton className="h-80 w-full rounded-lg mb-4" />
              <div className="flex gap-2">
                <Skeleton className="h-16 w-16 rounded" />
                <Skeleton className="h-16 w-16 rounded" />
                <Skeleton className="h-16 w-16 rounded" />
              </div>
            </div>
            
            {/* Car Info Skeleton */}
            <div>
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2 mb-6" />
              
              {/* Car Specifications */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
              
              {/* Price and Button */}
              <div className="border-t pt-6">
                <Skeleton className="h-8 w-1/2 mb-4" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Related Cars Section Skeleton */}
        <div>
          <Skeleton className="h-10 w-1/3 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
