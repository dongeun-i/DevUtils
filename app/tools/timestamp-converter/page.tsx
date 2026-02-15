"use client";

import React, { useState, useEffect } from 'react';

type Direction = 'toDate' | 'toTimestamp';

const TimestampConverterPage = () => {
  const [direction, setDirection] = useState<Direction>('toDate');
  const [input, setInput] = useState('');
  const [readable, setReadable] = useState('');
  const [iso, setIso] = useState('');
  const [timestampMs, setTimestampMs] = useState('');
  const [timestampSec, setTimestampSec] = useState('');
  const [error, setError] = useState('');

  const applyNow = () => {
    const now = Date.now();
    if (direction === 'toDate') {
      setInput(String(now));
    } else {
      setInput(new Date().toISOString());
    }
  };

  useEffect(() => {
    if (!input.trim()) {
      setReadable('');
      setIso('');
      setTimestampMs('');
      setTimestampSec('');
      setError('');
      return;
    }

    try {
      setError('');
      if (direction === 'toDate') {
        const raw = input.trim().replace(/,/g, '');
        const num = Number(raw);
        if (Number.isNaN(num)) {
          setError('숫자(Unix 타임스탬프)를 입력해주세요.');
          return;
        }
        const ms = raw.length >= 13 ? num : num * 1000;
        const d = new Date(ms);
        if (Number.isNaN(d.getTime())) {
          setError('유효한 타임스탬프가 아닙니다.');
          return;
        }
        setReadable(d.toLocaleString('ko-KR'));
        setIso(d.toISOString());
        setTimestampMs(String(d.getTime()));
        setTimestampSec(String(Math.floor(d.getTime() / 1000)));
      } else {
        const d = new Date(input.trim());
        if (Number.isNaN(d.getTime())) {
          setError('날짜/시간을 올바르게 입력해주세요. (예: 2024-01-15, 2024-01-15T12:00:00Z)');
          return;
        }
        setReadable(d.toLocaleString('ko-KR'));
        setIso(d.toISOString());
        setTimestampMs(String(d.getTime()));
        setTimestampSec(String(Math.floor(d.getTime() / 1000)));
      }
    } catch {
      setError('변환 중 오류가 발생했습니다.');
      setReadable('');
      setIso('');
      setTimestampMs('');
      setTimestampSec('');
    }
  }, [input, direction]);

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">타임스탬프 변환기</h1>

      <div className="mb-4 flex items-center gap-4 flex-wrap">
        <span className="font-medium">변환 방향:</span>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="toDate"
            name="direction"
            checked={direction === 'toDate'}
            onChange={() => setDirection('toDate')}
          />
          <label htmlFor="toDate">Timestamp → 날짜</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="toTimestamp"
            name="direction"
            checked={direction === 'toTimestamp'}
            onChange={() => setDirection('toTimestamp')}
          />
          <label htmlFor="toTimestamp">날짜 → Timestamp</label>
        </div>
        <button
          type="button"
          onClick={applyNow}
          className="px-3 py-1.5 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md text-sm font-medium"
        >
          현재 시간
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-1">
            {direction === 'toDate' ? 'Unix 타임스탬프 (초 또는 밀리초)' : '날짜/시간'}
          </label>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-mono"
            placeholder={direction === 'toDate' ? '예: 1705305600000 또는 1705305600' : '예: 2024-01-15, 2024-01-15T12:00:00Z'}
          />
        </div>
        <div className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">읽기 쉬운 날짜</label>
            <div className="p-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm">{readable || '—'}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ISO 8601</label>
            <div className="p-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm break-all">{iso || '—'}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timestamp (ms)</label>
            <div className="p-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm">{timestampMs || '—'}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timestamp (초)</label>
            <div className="p-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm">{timestampSec || '—'}</div>
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

export default TimestampConverterPage;
