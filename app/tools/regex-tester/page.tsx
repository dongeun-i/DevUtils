"use client";

import React, { useState, useMemo } from 'react';

const RegexTesterPage = () => {
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState('');

  // Regex matching and highlighting logic
  const highlightedResult = useMemo(() => {
    if (!pattern || !testString) {
      return {
        count: 0,
        highlighted: testString,
      };
    }

    try {
      const regex = new RegExp(pattern, 'g');
      const matches = Array.from(testString.matchAll(regex));

      if (matches.length === 0) {
        return {
          count: 0,
          highlighted: testString,
        };
      }

      let lastIndex = 0;
      const parts: (string | JSX.Element)[] = [];
      matches.forEach((match, index) => {
        const matchIndex = match.index ?? 0;
        // Add the text before the match
        if (matchIndex > lastIndex) {
          parts.push(testString.substring(lastIndex, matchIndex));
        }
        // Add the highlighted match
        parts.push(
          <span key={index} className="bg-yellow-300">
            {match[0]}
          </span>
        );
        lastIndex = matchIndex + match[0].length;
      });

      // Add the remaining text after the last match
      if (lastIndex < testString.length) {
        parts.push(testString.substring(lastIndex));
      }
      
      return {
        count: matches.length,
        highlighted: <>{parts}</>,
      };
    } catch (error: any) {
      return {
        count: 0,
        highlighted: testString,
        error: "유효하지 않은 정규식입니다: " + error.message,
      };
    }
  }, [pattern, testString]);

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">정규식 테스터</h1>
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="pattern" className="block text-sm font-medium text-gray-700 mb-1">
            정규식
          </label>
          <input
            type="text"
            id="pattern"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="여기에 정규식을 입력하세요 (예: \\w+)"
          />
        </div>

        {/* Regex Visualization section removed */}

        <div>
          <label htmlFor="testString" className="block text-sm font-medium text-gray-700 mb-1">
            테스트 문자열
          </label>
          <textarea
            id="testString"
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            rows={10}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="이곳에 테스트할 문자열을 입력하세요."
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">결과</h2>
          {highlightedResult.error && <p className="text-red-500">{highlightedResult.error}</p>}
          <div className="p-4 bg-gray-100 rounded-md">
            <h3 className="font-bold mb-2">{highlightedResult.count}개 일치</h3>
            <div className="whitespace-pre-wrap p-2 border rounded bg-white">
              {highlightedResult.highlighted}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegexTesterPage;