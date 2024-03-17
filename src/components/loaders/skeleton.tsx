import React from "react";

const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 dark:bg-[#121212] p-2 shadow-sm h-full`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200 dark:bg-[#121212]" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 dark:bg-[#121212] text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white dark:bg-[#121212] px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200 dark:bg-[#121212]" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <>
      <div className="p-5">
        <div
          className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100 dark:bg-[#272626]`}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"></div>
      </div>
    </>
  );
}

export function ProjectSkeleton() {
  return (
    <>
      <div className="p-5">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </>
  );
}

export function ProjectDetailSkeleton() {
  return (
    <>
      <div className="p-5">
        <div className="flex justify-between items-center">
          <div
            className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100 dark:bg-[#121212]`}
          />
          <div
            className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100 dark:bg-[#121212]`}
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"></div>
      </div>
    </>
  );
}
