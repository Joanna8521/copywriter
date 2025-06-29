
import React, { useState, useCallback } from 'react';
import { Platform, Tone } from './types';
import { PLATFORM_OPTIONS, TONE_OPTIONS } from './constants';
import { generateCopy } from './services/geminiService';
import Input from './components/Input';
import Select from './components/Select';
import Button from './components/Button';
import Spinner from './components/Spinner';
import ResultCard from './components/ResultCard';
import GithubIcon from './components/GithubIcon';

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [platform, setPlatform] = useState<Platform>(Platform.IG);
  const [tone, setTone] = useState<Tone>(Tone.FUN);
  const [generatedCopy, setGeneratedCopy] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateClick = useCallback(async () => {
    if (!topic) {
      setError('請輸入內容主題');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedCopy('');
    try {
      const result = await generateCopy(topic, platform, tone);
      setGeneratedCopy(result);
    } catch (e) {
      setError('文案生成失敗，請稍後再試。');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [topic, platform, tone]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
            社群文案產生器
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            輸入主題、選擇平台與風格，讓 AI 為您打造吸睛文案
          </p>
        </header>

        <div className="bg-slate-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-slate-300 mb-2">
                  內容主題
                </label>
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="例如：新上市的夏季水果茶"
                />
              </div>
              <div>
                <label htmlFor="platform" className="block text-sm font-medium text-slate-300 mb-2">
                  平台
                </label>
                <Select
                  id="platform"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as Platform)}
                  options={PLATFORM_OPTIONS}
                />
              </div>
              <div>
                <label htmlFor="tone" className="block text-sm font-medium text-slate-300 mb-2">
                  語氣風格
                </label>
                <Select
                  id="tone"
                  value={tone}
                  onChange={(e) => setTone(e.target.value as Tone)}
                  options={TONE_OPTIONS}
                />
              </div>
              <Button onClick={handleGenerateClick} disabled={isLoading}>
                {isLoading && <Spinner />}
                {isLoading ? '生成中...' : '產生文案'}
              </Button>
            </div>
            
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-slate-200 mb-3">AI 生成結果</h2>
              <ResultCard
                text={generatedCopy}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full max-w-4xl mx-auto text-center mt-10 text-slate-500">
        <p>Powered by Google Gemini API</p>
        <a 
          href="https://github.com/google/genai-js" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 hover:text-cyan-400 transition-colors mt-2"
        >
          <GithubIcon />
          View on GitHub
        </a>
      </footer>
    </div>
  );
};

export default App;
