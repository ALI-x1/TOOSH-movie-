import React from 'react';

interface SkeletonGridProps {
  count?: number;
}

export const SkeletonGrid: React.FC<SkeletonGridProps> = ({ count = 12 }) => (
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="w-full aspect-[2/3] rounded-2xl skeleton-shimmer"
        style={{ backgroundColor: 'var(--surface)' }}
      />
    ))}
  </div>
);
