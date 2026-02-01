import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '더미 데이터 생성기 | DevUtils',
  description: '개발 및 테스트를 위한 JSON 형식의 더미 데이터를 생성합니다. 원하는 스키마에 맞춰 유연하게 데이터를 만듭니다.',
  openGraph: {
    title: '더미 데이터 생성기 | DevUtils',
    description: '개발 및 테스트를 위한 JSON 형식의 더미 데이터를 생성합니다. 원하는 스키마에 맞춰 유연하게 데이터를 만듭니다.',
    url: 'https://devutils.example.com/tools/dummy-data-generator', // Replace with actual domain
    images: [
      {
        url: 'https://devutils.example.com/devutils-og.svg', // Consider a specific image for this tool
        alt: '더미 데이터 생성기',
      },
    ],
  },
  twitter: {
    title: '더미 데이터 생성기 | DevUtils',
    description: '개발 및 테스트를 위한 JSON 형식의 더미 데이터를 생성합니다. 원하는 스키마에 맞춰 유연하게 데이터를 만듭니다.',
    images: [
      {
        url: 'https://devutils.example.com/devutils-og.svg', // Consider a specific image for this tool
        alt: '더미 데이터 생성기',
      },
    ],
  },
};

export default function DummyDataGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}