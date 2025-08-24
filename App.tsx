
import React, { useState, useCallback } from 'react';
import { SongAnalysis } from './types';
import { analyzeSong, generateImageForSong } from './services/geminiService';
import SongInputForm from './components/SongInputForm';
import AnalysisDisplay from './components/AnalysisDisplay';
import ImageDisplay from './components/ImageDisplay';

const App: React.FC = () => {
  const [songFile, setSongFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<SongAnalysis | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [imagePrompt, setImagePrompt] = useState<string | null>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        setSongFile(e.target.files[0]);
        setError(null); // Clear previous errors on new file selection
    }
  }, []);


  const handleSubmit = useCallback(async () => {
    if (!songFile) {
      setError('لطفاً یک فایل صوتی را انتخاب کنید.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    setImageUrl(null);
    setImagePrompt(null);

    try {
      setLoadingMessage('در حال تحلیل آهنگ...');
      const analysisResult = await analyzeSong(songFile);
      setAnalysis(analysisResult);

      setLoadingMessage('در حال ساخت تصویر...');
      const newImagePrompt = `Create an evocative, artistic image representing a ${analysisResult.mood}, ${analysisResult.genre} song. The scene should capture the themes of ${analysisResult.lyricalThemes}. Visually, it should incorporate elements like ${analysisResult.visualElements}. The overall feeling should match a ${analysisResult.rhythmAndTempo} rhythm. Cinematic, high-detail, abstract painting.`;
      setImagePrompt(newImagePrompt);

      const generatedImageUrl = await generateImageForSong(newImagePrompt);
      setImageUrl(generatedImageUrl);
    } catch (err) {
      console.error(err);
      setError('متاسفانه خطایی رخ داد. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [songFile]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            مولد تصویر آهنگ
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            فایل موسیقی خود را به یک اثر هنری بصری تبدیل کنید.
          </p>
        </header>

        <main>
          <SongInputForm
            songFile={songFile}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

          {error && (
            <div className="mt-6 bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-8">
                <ImageDisplay
                  imageUrl={imageUrl}
                  isLoading={isLoading}
                  loadingMessage={loadingMessage}
                />
                {imagePrompt && (
                  <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 animate-fade-in">
                    <h3 className="text-sm font-semibold text-purple-400 mb-2">
                      پرامپت ساخت تصویر
                    </h3>
                    <p className="text-gray-300 bg-gray-900 p-3 rounded-md text-left dir-ltr whitespace-pre-wrap font-mono text-sm leading-relaxed">
                      {imagePrompt}
                    </p>
                  </div>
                )}
            </div>
            <AnalysisDisplay analysis={analysis} isLoading={isLoading} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;