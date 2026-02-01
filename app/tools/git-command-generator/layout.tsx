import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Git 커맨드 생성기 | DevUtils',
  description: '자주 사용하는 Git 명령어를 손쉽게 생성합니다. 복잡한 옵션 없이 직관적으로 명령어를 만듭니다.',
  openGraph: {
    title: 'Git 커맨드 생성기 | DevUtils',
    description: '자주 사용하는 Git 명령어를 손쉽게 생성합니다. 복잡한 옵션 없이 직관적으로 명령어를 만듭니다.',
    url: 'https://devutils.example.com/tools/git-command-generator', // Replace with actual domain
    images: [
      {
        url: 'https://devutils.example.com/devutils-og.svg', // Consider a specific image for this tool
        alt: 'Git 커맨드 생성기',
      },
    ],
  },
  twitter: {
    title: 'Git 커맨드 생성기 | DevUtils',
    description: '자주 사용하는 Git 명령어를 손쉽게 생성합니다. 복잡한 옵션 없이 직관적으로 명령어를 만듭니다.',
    images: [
      {
        url: 'https://devutils.example.com/devutils-og.svg', // Consider a specific image for this tool
        alt: 'Git 커맨드 생성기',
      },
    ],
  },
};

export default function GitCommandGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}