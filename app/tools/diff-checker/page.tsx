"use client";

import React, { useMemo } from 'react';
import { diffLines, type Change } from 'diff';

const DiffCheckerPage = () => {
  const [oldText, setOldText] = React.useState('');
  const [newText, setNewText] = React.useState('');

  const changes = useMemo(() => {
    return diffLines(oldText, newText);
  }, [oldText, newText]);

  const renderLine = (change: Change, key: number) => {
    const lines = change.value.split('\n').filter((line, i, arr) => i < arr.length - 1 || line !== '');
    return lines.map((line, i) => {
      const bg = change.added ? 'bg-green-100' : change.removed ? 'bg-red-100' : 'bg-transparent';
      const prefix = change.added ? '+ ' : change.removed ? '- ' : '  ';
      return (
        <div key={`${key}-${i}`} className={`font-mono text-sm px-2 py-0.5 ${bg}`}>
          <span className="select-none text-gray-400">{prefix}</span>
          {line || ' '}
        </div>
      );
    });
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">Diff 체커</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="old" className="block text-sm font-medium text-gray-700 mb-1">
            원본 (Old)
          </label>
          <textarea
            id="old"
            value={oldText}
            onChange={(e) => setOldText(e.target.value)}
            rows={12}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
            placeholder="비교할 원본 텍스트를 입력하세요."
          />
        </div>
        <div>
          <label htmlFor="new" className="block text-sm font-medium text-gray-700 mb-1">
            비교 (New)
          </label>
          <textarea
            id="new"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            rows={12}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
            placeholder="비교할 새 텍스트를 입력하세요."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">차이 결과</label>
        <div className="border border-gray-300 rounded-md bg-gray-50 font-mono text-sm overflow-auto max-h-[400px]">
          {changes.length === 1 && !changes[0].added && !changes[0].removed && !oldText && !newText ? (
            <div className="p-4 text-gray-500">위에 원본과 비교 텍스트를 입력하면 차이가 여기에 표시됩니다.</div>
          ) : (
            changes.map((change, i) => (
              <React.Fragment key={i}>{renderLine(change, i)}</React.Fragment>
            ))
          )}
        </div>
        <p className="mt-2 text-xs text-gray-500">
          초록: 추가된 라인 · 빨강: 삭제된 라인
        </p>
      </div>
    </div>
  );
};

export default DiffCheckerPage;
