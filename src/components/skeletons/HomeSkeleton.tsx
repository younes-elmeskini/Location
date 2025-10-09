"use client";

import { Skeleton } from "../skeletonLoader";

export function HomeSkeleton() {
  return (
    <div className="min-h-screen ">
      {/* Hero Section Skeleton */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 mx-4 md:mx-[100px]  ">
        {/* Left Section Skeleton */}
        <div className="space-y-6 text-center md:text-left w-full md:w-1/2">
          {/* Title Skeleton */}
          <Skeleton className="h-7 md:h-14 w-full mb-3" />
          <Skeleton className="h-7 md:h-14 w-4/5 mx-auto md:mx-0 mb-6" />

          {/* Paragraph Skeleton */}
          <div className="space-y-2 max-w-[460px] mx-auto md:mx-0 mb-6">
            <Skeleton className="h-3 md:h-4 w-full" />
            <Skeleton className="h-3 md:h-4 w-full" />
            <Skeleton className="h-3 md:h-4 w-3/4" />
          </div>

          {/* Button Skeleton */}
          <Skeleton className="h-10 md:h-12 w-40 mx-auto md:mx-0" />
        </div>

        {/* Right Section Skeleton - Car Filter Form */}
        <div className="bg-white p-[20px] md:p-[40px] rounded-[16px] w-full md:w-[500px]">
          {/* Title Skeleton */}
          <Skeleton className="h-6 md:h-7 w-1/2 mx-auto mb-4" />

          {/* Form Skeleton */}
          <div className="flex flex-col gap-4">
            {/* 5 Select Inputs */}
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-12 w-full rounded-[12px]" />
            ))}

            {/* Submit Button Skeleton */}
            <Skeleton className="h-12 w-full rounded-[12px]" />
          </div>
        </div>
      </div>

      {/* Info Block Skeleton */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <Skeleton className="h-12 w-1/3 mx-auto mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="text-center">
                <Skeleton className="h-16 w-16 mx-auto mb-4 rounded-full" />
                <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cars Grid Skeleton */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Skeleton className="h-8 w-1/4 mx-auto mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
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
