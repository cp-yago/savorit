import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh p-4 space-y-6">
      {/* Logo skeleton */}
      <Skeleton className="h-12 w-24 mb-8" />

      {/* Continue to Savorit text skeleton */}
      <Skeleton className="h-6 w-48 mb-8" />

      {/* Apple button skeleton */}
      <Skeleton className="h-10 w-full max-w-sm rounded-lg" />

      {/* Google button skeleton */}
      <Skeleton className="h-10 w-full max-w-sm rounded-lg" />

      {/* Or divider skeleton */}
      <div className="flex items-center w-full max-w-sm gap-4 my-4">
        <Skeleton className="h-[1px] flex-1" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-[1px] flex-1" />
      </div>

      {/* Email input skeleton */}
      <Skeleton className="h-10 w-full max-w-sm rounded-lg" />

      {/* Continue button skeleton */}
      <Skeleton className="h-10 w-full max-w-sm rounded-lg" />
    </div>
  );
}
