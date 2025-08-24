
import React from 'react';

export const LoadingSpinner: React.FC = () => {
    return (
        <div className="relative h-20 w-20">
            <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
        </div>
    );
}
