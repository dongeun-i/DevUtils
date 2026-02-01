"use client";

import React, { useState, useEffect } from 'react';

const Base64EncoderPage = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    setError(''); // Clear error on new input
  };

  useEffect(() => {
    if (!input) {
      return;
    }

    try {
      let result = '';
      setError(''); // Clear error on successful operation
      if (mode === 'encode') {
        const utf8Bytes = new TextEncoder().encode(input);
        result = btoa(String.fromCharCode.apply(null, Array.from(utf8Bytes)));
      } else {
        const binaryString = atob(input);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        result = new TextDecoder().decode(bytes);
      }
      setOutput(result);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(`작업 실패: ${e.message}. 입력 값을 확인해주세요.`);
      } else {
        setError('알 수 없는 오류가 발생했습니다. 입력 값을 확인해주세요.');
      }
      setOutput('');
    }
  }, [input, mode]); // Dependencies for useEffect

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output)
        .then(() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        })
        .catch((err) => {
          console.error('클립보사 실패:', err);
          alert('클립보드 복사 실패.');
        });
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">Base64 인코더 / 디코더</h1>
      
      <div className="mb-4 flex items-center gap-4">
        <label className="font-medium">모드:</label>
        <div className="flex items-center gap-2">
            <input 
                type="radio" 
                id="encode" 
                name="mode" 
                value="encode" 
                checked={mode === 'encode'} 
                onChange={() => setMode('encode')} 
            />
            <label htmlFor="encode">인코딩</label>
        </div>
        <div className="flex items-center gap-2">
            <input 
                type="radio" 
                id="decode" 
                name="mode" 
                value="decode" 
                checked={mode === 'decode'} 
                onChange={() => setMode('decode')} 
            />
            <label htmlFor="decode">디코딩</label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-1">
            {mode === 'encode' ? '원본 문자열' : 'Base64 문자열'}
          </label>
          <textarea
            id="input"
            value={input}
            onChange={handleInputChange} // Use the new handler
            rows={15}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-mono"
            placeholder={mode === 'encode' ? '인코딩할 텍스트를 입력하세요.' : '디코딩할 Base64 텍스트를 입력하세요.'}
          />
        </div>
        <div>
          <label htmlFor="output" className="block text-sm font-medium text-gray-700 mb-1">
            결과
          </label>
          <div className="relative mt-1">
            <textarea
              id="output"
              value={output}
              readOnly
              rows={15}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 font-mono pr-10"
              placeholder="결과가 여기에 표시됩니다."
            />
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md text-sm flex items-center justify-center"
              title="복사"
            >
              {copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M16 16h.01" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default Base64EncoderPage;
