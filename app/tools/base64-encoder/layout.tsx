import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base64 인코더 / 디코더 | DevUtils',
  description: '텍스트 또는 Base64 문자열을 인코딩하고 디코딩합니다. Base64 변환 작업을 손쉽게 수행합니다.',
};

export default function Base64EncoderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
