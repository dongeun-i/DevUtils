"use client";

import React, { useState, useMemo } from 'react';

const GitCommandGeneratorPage = () => {
  const [command, setCommand] = useState('commit');
  
  // State for 'git commit'
  const [commitMessage, setCommitMessage] = useState('');
  const [stageAll, setStageAll] = useState(false);
  const [amend, setAmend] = useState(false);

  // State for 'git branch'
  const [branchName, setBranchName] = useState('');
  const [deleteBranch, setDeleteBranch] = useState(false);
  const [forceDeleteBranch, setForceDeleteBranch] = useState(false);

  // State for 'git checkout'
  const [checkoutBranchName, setCheckoutBranchName] = useState('');
  const [createNewBranch, setCreateNewBranch] = useState(false);

  // State for 'git tag'
  const [tagName, setTagName] = useState('');
  const [tagMessage, setTagMessage] = useState('');
  const [deleteTag, setDeleteTag] = useState(false);


  const generatedCommand = useMemo(() => {
    switch (command) {
      case 'commit': {
        let base = 'git commit';
        if (stageAll) base += ' -a';
        if (amend) {
          base += ' --amend';
          if (!commitMessage) base += ' --no-edit';
        }
        if (commitMessage) base += ` -m "${commitMessage}"`;
        return base;
      }
      case 'branch': {
        let base = 'git branch';
        if (deleteBranch) {
          base += forceDeleteBranch ? ' -D' : ' -d';
        }
        if (branchName) base += ` ${branchName}`;
        return base;
      }
      case 'checkout': {
        let base = 'git checkout';
        if (createNewBranch) base += ' -b';
        if (checkoutBranchName) base += ` ${checkoutBranchName}`;
        return base;
      }
      case 'tag': {
        let base = 'git tag';
        if (deleteTag) {
          base += ' -d';
          if (tagName) base += ` ${tagName}`;
        } else if (tagName) {
          if (tagMessage) base += ' -a';
          base += ` ${tagName}`;
          if (tagMessage) base += ` -m "${tagMessage}"`;
        }
        return base;
      }
      default:
        return '선택된 명령어가 없습니다.';
    }
  }, [
    command, commitMessage, stageAll, amend, 
    branchName, deleteBranch, forceDeleteBranch,
    checkoutBranchName, createNewBranch,
    tagName, tagMessage, deleteTag
  ]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCommand);
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">Git 커맨드 생성기</h1>

      <div className="mb-4">
        <label htmlFor="command-select" className="block text-sm font-medium text-gray-700 mb-1">
          Git 명령어 선택
        </label>
        <select
          id="command-select"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="commit">commit</option>
          <option value="branch">branch</option>
          <option value="checkout">checkout</option>
          <option value="tag">tag</option>
        </select>
      </div>

      {command === 'commit' && (
        <div className="bg-gray-50 p-4 rounded-md border">
          <h2 className="text-lg font-semibold mb-2">Commit 옵션</h2>
          {/* ... commit options UI ... */}
        </div>
      )}
      
      {command === 'branch' && (
        <div className="bg-gray-50 p-4 rounded-md border">
          <h2 className="text-lg font-semibold mb-2">Branch 옵션</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="branch-name" className="block text-sm font-medium">브랜치 이름</label>
              <input type="text" id="branch-name" value={branchName} onChange={(e) => setBranchName(e.target.value)} className="w-full p-2 border rounded-md" placeholder="feature/new-branch"/>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="delete-branch" checked={deleteBranch} onChange={(e) => setDeleteBranch(e.target.checked)} />
              <label htmlFor="delete-branch">브랜치 삭제 (`-d`)</label>
            </div>
            {deleteBranch && <div className="flex items-center gap-2 ml-6">
              <input type="checkbox" id="force-delete-branch" checked={forceDeleteBranch} onChange={(e) => setForceDeleteBranch(e.target.checked)} />
              <label htmlFor="force-delete-branch">강제 삭제 (`-D`)</label>
            </div>}
          </div>
        </div>
      )}

      {command === 'checkout' && (
         <div className="bg-gray-50 p-4 rounded-md border">
          <h2 className="text-lg font-semibold mb-2">Checkout 옵션</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="checkout-branch-name" className="block text-sm font-medium">브랜치 이름</label>
                <input type="text" id="checkout-branch-name" value={checkoutBranchName} onChange={(e) => setCheckoutBranchName(e.target.value)} className="w-full p-2 border rounded-md" placeholder="main"/>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="create-new-branch" checked={createNewBranch} onChange={(e) => setCreateNewBranch(e.target.checked)} />
                <label htmlFor="create-new-branch">새로운 브랜치 생성 및 이동 (`-b`)</label>
              </div>
            </div>
         </div>
      )}

      {command === 'tag' && (
        <div className="bg-gray-50 p-4 rounded-md border">
          <h2 className="text-lg font-semibold mb-2">Tag 옵션</h2>
           <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="tag-name" className="block text-sm font-medium">태그 이름</label>
                <input type="text" id="tag-name" value={tagName} onChange={(e) => setTagName(e.target.value)} className="w-full p-2 border rounded-md" placeholder="v1.0.0"/>
              </div>
               <div className="flex items-center gap-2">
                <input type="checkbox" id="delete-tag" checked={deleteTag} onChange={(e) => setDeleteTag(e.target.checked)} />
                <label htmlFor="delete-tag">태그 삭제 (`-d`)</label>
              </div>
              {!deleteTag && <div>
                <label htmlFor="tag-message" className="block text-sm font-medium">주석 있는 태그 메시지 (`-a`)</label>
                <input type="text" id="tag-message" value={tagMessage} onChange={(e) => setTagMessage(e.target.value)} className="w-full p-2 border rounded-md" placeholder="Release version 1.0.0"/>
              </div>}
            </div>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">생성된 명령어</h2>
        <div className="p-4 bg-gray-800 text-white font-mono rounded-md flex justify-between items-center">
          <code>{generatedCommand}</code>
          <button onClick={copyToClipboard} className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded-md">
            복사
          </button>
        </div>
      </div>
    </div>
  );
};

export default GitCommandGeneratorPage;