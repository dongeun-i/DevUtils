import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'URL 인코더 / 디코더 | DevUtils',
  description: 'URL 또는 텍스트를 인코딩하고 디코딩합니다. 한글·특수문자 등을 안전한 형식으로 변환합니다.',
  openGraph: {
    title: 'URL 인코더 / 디코더 | DevUtils',
    description: 'URL 또는 텍스트를 인코딩하고 디코딩합니다. 한글·특수문자 등을 안전한 형식으로 변환합니다.',
    url: 'https://devutils.example.com/tools/url-encoder',
    images: [
      {
        url: 'https://devutils.example.com/devutils-og.svg',
        alt: 'URL 인코더 / 디코더',
      },
    ],
  },
  twitter: {
    title: 'URL 인코더 / 디코더 | DevUtils',
    description: 'URL 또는 텍스트를 인코딩하고 디코딩합니다. 한글·특수문자 등을 안전한 형식으로 변환합니다.',
    images: [
      {
        url: 'https://devutils.example.com/devutils-og.svg',
        alt: 'URL 인코더 / 디코더',
      },
    ],
  },
};

export default function UrlEncoderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
