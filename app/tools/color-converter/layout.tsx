import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '색상 피커 / 변환기 | DevUtils',
  description: 'HEX, RGB, HSL 등 다양한 색상 코드를 상호 변환하고, 시각적으로 색상을 선택합니다.',
  openGraph: {
    title: '색상 피커 / 변환기 | DevUtils',
    description: 'HEX, RGB, HSL 등 다양한 색상 코드를 상호 변환하고, 시각적으로 색상을 선택합니다.',
    url: 'https://devutils.example.com/tools/color-converter', // Replace with actual domain
    images: [
      {
        url: 'https://devutils.example.com/devutils-og.svg', // Consider a specific image for this tool
        alt: '색상 피커 / 변환기',
      },
    ],
  },
  twitter: {
    title: '색상 피커 / 변환기 | DevUtils',
    description: 'HEX, RGB, HSL 등 다양한 색상 코드를 상호 변환하고, 시각적으로 색상을 선택합니다.',
    images: [
      {
        url: 'https://devutils.example.com/devutils-og.svg', // Consider a specific image for this tool
        alt: '색상 피커 / 변환기',
      },
    ],
  },
};

export default function ColorConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}