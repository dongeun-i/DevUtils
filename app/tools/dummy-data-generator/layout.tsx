import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '더미 데이터 생성기 | DevUtils',
  description: '개발 및 테스트를 위한 JSON 형식의 더미 데이터를 생성합니다. 원하는 스키마에 맞춰 유연하게 데이터를 만듭니다.',
};

export default function DummyDataGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
