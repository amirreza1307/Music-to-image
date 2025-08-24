
import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  loadingMessage: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, loadingMessage }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-800 aspect-square rounded-xl border-2 border-dashed border-gray-700 p-6 text-center">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-full">
            <LoadingSpinner />
            <p className="mt-4 text-lg text-gray-300">{loadingMessage}</p>
        </div>
      ) : imageUrl ? (
        <img
          src={imageUrl}
          alt="Generated from song"
          className="w-full h-full object-cover rounded-lg shadow-2xl"
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-semibold">تصویر شما اینجا ظاهر می‌شود</h3>
            <p className="mt-1 text-sm">برای شروع، یک آهنگ را تحلیل کنید.</p>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;
