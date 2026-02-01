"use client";

import React, { useState, useMemo } from 'react';

const Base64EncoderPage = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  const output = useMemo(() => {
    setError('');
    if (!input) return '';

    try {
      if (mode === 'encode') {
        // Handle UTF-8 characters correctly
        const utf8Bytes = new TextEncoder().encode(input);
        const base64 = btoa(String.fromCharCode.apply(null, Array.from(utf8Bytes)));
        return base64;
      } else {
        const binaryString = atob(input);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        return new TextDecoder().decode(bytes);
      }
    } catch (e: any) {
      setError(`작업 실패: ${e.message}. 입력 값을 확인해주세요.`);
      return '';
    }
  }, [input, mode]);

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
            onChange={(e) => setInput(e.target.value)}
            rows={15}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-mono"
            placeholder={mode === 'encode' ? '인코딩할 텍스트를 입력하세요.' : '디코딩할 Base64 텍스트를 입력하세요.'}
          />
        </div>
        <div>
          <label htmlFor="output" className="block text-sm font-medium text-gray-700 mb-1">
            결과
          </label>
          <textarea
            id="output"
            value={output}
            readOnly
            rows={15}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 font-mono"
            placeholder="결과가 여기에 표시됩니다."
          />
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
