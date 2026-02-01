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
      const entry: Record<string, any> = {};
      schema.forEach(row => {
        if (row.fieldName && row.dataType) {
          const [category, method] = row.dataType.split('.');
          // @ts-ignore
          entry[row.fieldName] = faker[category][method]();
        }
      });
      return entry;
    });
    setGeneratedData(JSON.stringify(data, null, 2));
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">더미 데이터 생성기</h1>
      
      <div className="bg-gray-50 p-4 rounded-md border">
        <h2 className="text-lg font-semibold mb-2">데이터 스키마 정의</h2>
        {schema.map(row => (
          <div key={row.id} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              placeholder="필드명"
              value={row.fieldName}
              onChange={(e) => handleSchemaChange(row.id, 'fieldName', e.target.value)}
              className="p-2 border rounded-md w-1/3"
            />
            <select
              value={row.dataType}
              onChange={(e) => handleSchemaChange(row.id, 'dataType', e.target.value)}
              className="p-2 border rounded-md w-1/2"
            >
              <option value="">데이터 타입 선택</option>
              {Object.entries(FAKER_METHODS).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
            <button onClick={() => removeSchemaRow(row.id)} className="px-3 py-2 bg-red-500 text-white rounded-md">X</button>
          </div>
        ))}
        <button onClick={addSchemaRow} className="px-4 py-2 bg-green-600 text-white rounded-md mt-2">필드 추가</button>
      </div>

      <div className="my-4">
        <label htmlFor="numRows" className="font-medium">생성할 개수:</label>
        <input
          type="number"
          id="numRows"
          value={numRows}
          onChange={(e) => setNumRows(Math.max(1, parseInt(e.target.value, 10) || 1))}
          className="p-2 border rounded-md ml-2 w-24"
        />
      </div>

      <button onClick={generateData} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700">
        생성하기
      </button>

      {generatedData && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">생성된 데이터 (JSON)</h2>
          <textarea
            readOnly
            value={generatedData}
            rows={20}
            className="w-full p-2 border bg-gray-50 font-mono rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default DummyDataGeneratorPage;
