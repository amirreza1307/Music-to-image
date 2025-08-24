
import React from 'react';

interface SongInputFormProps {
  songFile: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const SongInputForm: React.FC<SongInputFormProps> = ({
  songFile,
  onFileChange,
  onSubmit,
  isLoading,
}) => {
  return (
    <div className="bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-700">
      <label htmlFor="song-file-input" className="block mb-3 text-sm font-medium text-gray-300">
        یک فایل صوتی را برای تحلیل انتخاب کنید:
      </label>
      
      <div className="flex items-center space-x-4 rtl:space-x-reverse border border-gray-600 rounded-lg p-2">
        <label
          htmlFor="song-file-input"
          className="flex-shrink-0 cursor-pointer bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-2 px-4 rounded-md transition-colors duration-200"
        >
          انتخاب فایل
        </label>
        <input
            id="song-file-input"
            type="file"
            accept="audio/*"
            onChange={onFileChange}
            className="hidden"
            disabled={isLoading}
        />
        <span className="flex-grow text-gray-400 truncate" aria-live="polite">
            {songFile ? songFile.name : 'فایلی انتخاب نشده است'}
        </span>
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading || !songFile}
        className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            در حال پردازش...
          </>
        ) : (
          'تحلیل و ساخت تصویر'
        )}
      </button>
    </div>
  );
};

export default SongInputForm;
