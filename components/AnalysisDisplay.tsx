
import React from 'react';
import type { SongAnalysis } from '../types';
import { LoadingSkeleton } from './LoadingSkeleton';

interface AnalysisDisplayProps {
  analysis: SongAnalysis | null;
  isLoading: boolean;
}

const AnalysisItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h3 className="text-sm font-semibold text-purple-400 mb-1">{title}</h3>
    <p className="text-gray-300">{children}</p>
  </div>
);

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis, isLoading }) => {
  if (isLoading && !analysis) {
    return (
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-4 animate-pulse">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">تحلیل آهنگ</h2>
        <LoadingSkeleton height="h-6" width="w-1/3" />
        <LoadingSkeleton />
        <LoadingSkeleton height="h-6" width="w-1/3" />
        <LoadingSkeleton />
        <LoadingSkeleton height="h-6" width="w-1/3" />
        <LoadingSkeleton count={2} />
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-4">
      <h2 className="text-2xl font-bold text-gray-200">تحلیل آهنگ</h2>
      <div className="space-y-4">
        <AnalysisItem title="ژانر">{analysis.genre}</AnalysisItem>
        <AnalysisItem title="حال و هوا">{analysis.mood}</AnalysisItem>
        <AnalysisItem title="ریتم و تمپو">{analysis.rhythmAndTempo}</AnalysisItem>
        <AnalysisItem title="مضامین متن">{analysis.lyricalThemes}</AnalysisItem>
        <AnalysisItem title="عناصر بصری">{analysis.visualElements}</AnalysisItem>
      </div>
    </div>
  );
};

export default AnalysisDisplay;
