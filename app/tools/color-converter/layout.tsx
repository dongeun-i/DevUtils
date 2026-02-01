import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '색상 피커 / 변환기 | DevUtils',
  description: 'HEX, RGB, HSL 등 다양한 색상 코드를 상호 변환하고, 시각적으로 색상을 선택합니다.',
};

export default function ColorConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
