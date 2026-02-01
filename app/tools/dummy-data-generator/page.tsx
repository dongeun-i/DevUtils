"use client";

import React, { useState } from 'react';
import { faker } from '@faker-js/faker';

// A subset of faker methods for the user to choose from
const FAKER_METHODS = {
  // Person
  'person.firstName': '이름 (First Name)',
  'person.lastName': '성 (Last Name)',
  'person.fullName': '전체 이름',
  // Internet
  'internet.email': '이메일 주소',
  'internet.userName': '사용자 이름',
  'internet.url': 'URL',
  // Location
  'location.city': '도시',
  'location.streetAddress': '거리 주소',
  'location.zipCode': '우편번호',
  // Database
  'database.mongodbObjectId': 'MongoDB ID',
  // Random
  'string.uuid': 'UUID',
  'number.int': '정수 (Integer)',
  // Company
  'company.name': '회사명',
  // Phone
  'phone.number': '전화번호',
};

type FakerMethod = keyof typeof FAKER_METHODS;

interface SchemaRow {
  id: string;
  fieldName: string;
  dataType: FakerMethod | '';
}

const DummyDataGeneratorPage = () => {
  const [schema, setSchema] = useState<SchemaRow[]>([
    { id: faker.string.uuid(), fieldName: 'name', dataType: 'person.fullName' },
    { id: faker.string.uuid(), fieldName: 'email', dataType: 'internet.email' },
  ]);
  const [numRows, setNumRows] = useState(10);
  const [generatedData, setGeneratedData] = useState('');

  const [copySuccess, setCopySuccess] = useState(false);

  const addSchemaRow = () => {
    setSchema([...schema, { id: faker.string.uuid(), fieldName: '', dataType: '' }]);
  };

  const removeSchemaRow = (id: string) => {
    setSchema(schema.filter(row => row.id !== id));
  };

  const handleSchemaChange = (id: string, field: 'fieldName' | 'dataType', value: string) => {
    setSchema(schema.map(row => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const generateData = () => {
    const data = Array.from({ length: numRows }, () => {
      const entry: Record<string, unknown> = {};
      schema.forEach(row => {
        if (row.fieldName && row.dataType) {
          const [category, method] = row.dataType.split('.');
          // @ts-expect-error: Faker's API is dynamic, type checking is difficult here.
          entry[row.fieldName] = faker[category][method]();
        }
      });
      return entry;
    });
    setGeneratedData(JSON.stringify(data, null, 2));
    setCopySuccess(false); // Clear copy success message on new generation
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedData);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Clear message after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err); // Keep console.error for debugging purposes
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">더미 데이터 생성기</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
                {/* Left Panel: Schema Definition and Controls */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                  <div className="p-4 bg-gray-50 rounded-md border shadow-sm flex-grow"> {/* Added grouping styles */}
                    <h2 className="text-lg font-semibold mb-2">데이터 스키마 정의</h2>
                    {schema.map(row => (
                      <div key={row.id} className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="필드명"
                          value={row.fieldName}
                          onChange={(e) => handleSchemaChange(row.id, 'fieldName', e.target.value)}
                          className="p-2 border rounded-md w-1/3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <select
                          value={row.dataType}
                          onChange={(e) => handleSchemaChange(row.id, 'dataType', e.target.value)}
                          className="p-2 border rounded-md w-1/2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="">데이터 타입 선택</option>
                          {Object.entries(FAKER_METHODS).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                          ))}
                        </select>
                        <button onClick={() => removeSchemaRow(row.id)} className="px-3 py-2 bg-red-500 text-white rounded-md">X</button>
                      </div>
                    ))}
                    <button onClick={addSchemaRow} className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md mt-2 hover:bg-gray-300">필드 추가</button>
                  </div>
        
                  <div className="p-4 bg-gray-50 rounded-md border shadow-sm flex flex-col gap-2"> {/* Grouped numRows and generate button */}
                    <label htmlFor="numRows" className="block text-sm font-medium text-gray-700 mb-1">생성할 개수:</label>
                    <input
                      type="number"
                      id="numRows"
                      value={numRows}
                      onChange={(e) => setNumRows(Math.max(1, parseInt(e.target.value, 10) || 1))}
                      className="p-2 border rounded-md w-24 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                                <button onClick={generateData} className="px-6 py-3 bg-gray-200 text-gray-800 font-bold rounded-md hover:bg-gray-300 mt-2">
                                  생성하기
                                </button>                  </div>
                </div>        {/* Right Panel: Generated Data */}
        <div className="w-full md:w-1/2">
          {generatedData && (
            <div className="h-full flex flex-col">
               {/* <div className="flex justify-between items-center mb-2">
                 <h2 className="text-xl font-semibold">생성된 데이터</h2>
               </div> */}
              <div className="relative mt-1 flex-grow">
                <textarea
                  readOnly
                  value={generatedData}
                  rows={20}
                  className="w-full h-full p-2 border bg-gray-50 font-mono rounded-md pr-10" 
                />
                <button
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 p-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md text-sm flex items-center justify-center"
                  title="복사"
                >
                  {copySuccess ? (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default DummyDataGeneratorPage;
