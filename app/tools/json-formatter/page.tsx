"use client";

import React, { useState } from 'react';

// Helper function to get line and column from a character index
const getLineAndColumnFromCharIndex = (text: string, index: number) => {
  let line = 1;
  let column = 1;
  for (let i = 0; i < index; i++) {
    if (text[i] === '\n') {
      line++;
      column = 1;
    } else {
      column++;
    }
  }
  return { line, column };
};

const JSONFormatterPage = () => {
  const [inputJson, setInputJson] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [errorLine, setErrorLine] = useState<number | null>(null);
  const [errorColumn, setErrorColumn] = useState<number | null>(null);

  const handleFormat = () => {
    try {
      setError('');
      setErrorLine(null);
      setErrorColumn(null);
      if (!inputJson.trim()) {
        setOutput('');
        return;
      }
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
    } catch (e: any) {
      setOutput('');
      let errorMessage = `유효하지 않은 JSON입니다: ${e.message}`;
      
      // Attempt to extract position for more detailed error
      if (e instanceof SyntaxError) {
        const match = e.message.match(/at position (\d+)/);
        if (match && match[1]) {
          const position = parseInt(match[1], 10);
          const { line, column } = getLineAndColumnFromCharIndex(inputJson, position);
          errorMessage = `유효하지 않은 JSON입니다: ${e.message} (Line: ${line}, Column: ${column})`;
          setErrorLine(line);
          setErrorColumn(column);
        }
      }
      setError(errorMessage);
    }
  };

  const handleClear = () => {
    setInputJson('');
    setOutput('');
    setError('');
    setErrorLine(null);
    setErrorColumn(null);
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
            className={`w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-mono ${error ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="여기에 JSON 데이터를 붙여넣으세요."
            style={errorLine ? { borderColor: 'red', outline: 'none' } : {}}
          />
           {errorLine && (
            <p className="text-red-500 text-sm mt-1">
              에러 발생: Line {errorLine}, Column {errorColumn}
            </p>
          )}
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