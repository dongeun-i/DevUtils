"use client";

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const defaultMarkdown = `# 제목 1
## 제목 2

**굵게**, *기울임*, \`코드\`

- 목록 1
- 목록 2

1. 순서 1
2. 순서 2

[링크](https://example.com)

\`\`\`js
console.log('Hello');
\`\`\`
`;

const MarkdownPreviewPage = () => {
  const [input, setInput] = useState(defaultMarkdown);

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">마크다운 미리보기</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-1">
            마크다운 입력
          </label>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={20}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
            placeholder="마크다운을 입력하세요..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            미리보기
          </label>
          <div className="min-h-[320px] p-4 border border-gray-300 rounded-md bg-white shadow-sm overflow-auto text-gray-800 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-bold [&_h3]:text-lg [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_pre]:bg-gray-100 [&_pre]:p-2 [&_pre]:rounded [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:rounded [&_a]:text-indigo-600 [&_a]:underline">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {input || '_입력이 없습니다._'}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownPreviewPage;
