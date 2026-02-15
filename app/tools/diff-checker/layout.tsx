import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diff 체커 | DevUtils',
  description: '두 텍스트를 비교하여 차이를 시각적으로 확인합니다. 추가·삭제·변경 라인을 한눈에 볼 수 있습니다.',
  openGraph: {
    title: 'Diff 체커 | DevUtils',
    description: '두 텍스트를 비교하여 차이를 시각적으로 확인합니다. 추가·삭제·변경 라인을 한눈에 볼 수 있습니다.',
    url: 'https://devutils.example.com/tools/diff-checker',
    images: [
      {
        url: 'https://devutils.example.com/devutils-og.svg',
        alt: 'Diff 체커',
      },
    ],
  },
  twitter: {
    title: 'Diff 체커 | DevUtils',
    description: '두 텍스트를 비교하여 차이를 시각적으로 확인합니다. 추가·삭제·변경 라인을 한눈에 볼 수 있습니다.',
    images: [
      {
        url: 'https://devutils.example.com/devutils-og.svg',
        alt: 'Diff 체커',
      },
    ],
  },
};

export default function DiffCheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
