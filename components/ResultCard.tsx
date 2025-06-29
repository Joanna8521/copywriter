
import React from 'react';

interface ResultCardProps {
  text: string;
  isLoading: boolean;
  error: string | null;
}

const ResultCard: React.FC<ResultCardProps> = ({ text, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400">
          <svg className="animate-spin h-8 w-8 text-cyan-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-lg">AI 思考中...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-red-400">
          <p className="font-semibold">發生錯誤</p>
          <p className="mt-2 text-sm">{error}</p>
        </div>
      );
    }
    if (text) {
      return <p className="whitespace-pre-wrap text-slate-200">{text}</p>;
    }
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500">
        <p>填寫左側欄位，</p>
        <p>點擊按鈕後將會在此處顯示結果。</p>
      </div>
    );
  };
  
  return (
    <div className="h-full bg-slate-900/70 border border-slate-700 rounded-lg p-6 flex-grow transition-all overflow-y-auto" style={{minHeight: '240px'}}>
      {renderContent()}
    </div>
  );
};

export default ResultCard;
