
import React from 'react';

interface LoadingSkeletonProps {
  height?: string;
  width?: string;
  count?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  height = 'h-4',
  width = 'w-full',
  count = 1,
  className = '',
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`bg-gray-700 rounded ${height} ${width} ${className}`}
        ></div>
      ))}
    </>
  );
};
