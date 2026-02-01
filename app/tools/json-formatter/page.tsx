"use client";

import React, { useState } from 'react';

const JSONFormatterPage = () => {
  const [inputJson, setInputJson] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleFormat = () => {
    try {
      setError('');
      if (!inputJson.trim()) {
        setOutput('');
        return;
      }
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
    } catch (e: any) {
      setOutput('');
      setError(`유효하지 않은 JSON입니다: ${e.message}`);
    }
  };

  const handleClear = () => {
    setInputJson('');
    setOutput('');
    setError('');
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">JSON 포맷터 / 검증기</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inputJson" className="block text-sm font-medium text-gray-700 mb-1">
            JSON 입력
          </label>
          <textarea
            id="inputJson"
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            rows={20}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-mono"
            placeholder="여기에 JSON 데이터를 붙여넣으세요."
          />
        </div>
        <div>
          <label htmlFor="outputJson" className="block text-sm font-medium text-gray-700 mb-1">
            결과
          </label>
          <textarea
            id="outputJson"
            value={output}
            readOnly
            rows={20}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 font-mono"
            placeholder="포맷팅된 JSON 결과가 여기에 표시됩니다."
          />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={handleFormat}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          포맷 / 검증
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          지우기
        </button>
      </div>
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default JSONFormatterPage;
