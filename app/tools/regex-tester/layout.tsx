import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '정규식 테스터 | DevUtils',
  description: '정규식을 테스트하고 문자열에서 일치하는 부분을 찾아 하이라이트합니다. 실시간으로 정규식 매칭을 확인하고 일치하는 부분을 강조하여 표시합니다.',
};

export default function RegexTesterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
