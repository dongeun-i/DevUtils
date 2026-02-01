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
  const [copied, setCopied] = useState(false); // State for copy feedback

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
    } catch (e: unknown) {
      let errorMessage = `유효하지 않은 JSON입니다.`;
      
      if (e instanceof Error) {
        errorMessage = `유효하지 않은 JSON입니다: ${e.message}`;
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
      } else {
        errorMessage = '알 수 없는 JSON 오류가 발생했습니다.';
      }
      setOutput(errorMessage); // Set error message to output
      setError(errorMessage); // Keep error state for potential styling/indicators on input
    }
  };

  const handleClear = () => {
    setInputJson('');
    setOutput('');
    setError('');
    setErrorLine(null);
    setErrorColumn(null);
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output)
        .then(() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 2000); // Reset "Copied!" message after 2 seconds
        })
        .catch((err) => {
          console.error('클립보드 복사 실패:', err);
          alert('클립보드 복사 실패.');
        });
    }
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
          <div className="relative mt-1"> {/* Added relative container */}
            <textarea
              id="outputJson"
              value={output}
              readOnly
              rows={20}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 font-mono pr-10" // Added pr-10 for spacing
              placeholder="포맷팅된 JSON 결과가 여기에 표시됩니다."
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

    </div>
  );
};

export default JSONFormatterPage;