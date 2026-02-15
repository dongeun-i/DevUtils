import Link from "next/link";
import { Regex, Braces, Binary, Database, Link2, Clock, GitCompare, FileText } from "lucide-react";

const tools = [
  { 
    href: "/tools/regex-tester", 
    label: "정규식 테스터", 
    description: "복잡한 정규식을 쉽게 테스트하고 시각적으로 이해합니다.",
    icon: Regex
  },
  { 
    href: "/tools/json-formatter", 
    label: "JSON 포맷터", 
    description: "보기 어려운 JSON 데이터를 깔끔하게 정렬하고 유효성을 검사합니다.",
    icon: Braces
  },
  { 
    href: "/tools/base64-encoder", 
    label: "Base64 인코더", 
    description: "텍스트를 Base64로 인코딩 및 디코딩하여 데이터를 변환합니다.",
    icon: Binary
  },
  { 
    href: "/tools/dummy-data-generator", 
    label: "더미 데이터 생성기", 
    description: "테스트 및 개발에 필요한 가짜 데이터를 빠르게 생성합니다.",
    icon: Database
  },
  { 
    href: "/tools/url-encoder", 
    label: "URL 인코더/디코더", 
    description: "URL 또는 텍스트를 인코딩·디코딩하여 한글·특수문자를 안전하게 변환합니다.",
    icon: Link2
  },
  { 
    href: "/tools/timestamp-converter", 
    label: "타임스탬프 변환기", 
    description: "Unix 타임스탬프와 읽기 쉬운 날짜를 서로 변환합니다.",
    icon: Clock
  },
  { 
    href: "/tools/diff-checker", 
    label: "Diff 체커", 
    description: "두 텍스트의 차이를 시각적으로 비교합니다.",
    icon: GitCompare
  },
  { 
    href: "/tools/markdown-preview", 
    label: "마크다운 미리보기", 
    description: "마크다운을 실시간으로 렌더링하여 미리보기합니다.",
    icon: FileText
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-8 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[color:var(--text-primary)] leading-tight mb-4">
          개발자를 위한 올인원 유틸리티 허브
        </h1>
        <p className="text-lg sm:text-xl text-[color:var(--text-secondary)] max-w-2xl mx-auto mb-8">
          DevUtils는 개발자들이 일상적인 작업을 더 빠르고 효율적으로 처리할 수 있도록 돕는 다양한 도구를 제공합니다.
        </p>
        <Link 
                                        href="#tools"
                                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[color:var(--brand-primary)] hover:bg-[color:var(--brand-hover)] transition duration-150 ease-in-out shadow-lg"
                                      >
                                        도구 둘러보기        </Link>
      </section>

      {/* Tools Grid Section */}
      <section id="tools" className="w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-[color:var(--text-primary)] text-center mb-8">
          제공되는 도구들
        </h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {tools.map((tool, index) => {
              const tooltipAbove = index < 4;
              return (
                <Link key={tool.href} href={tool.href} className="group block relative p-6 md:hover:py-8 md:hover:px-8 bg-[color:var(--bg-surface)] border-[1px] border-[color:var(--border-default)] rounded-lg shadow-md md:hover:shadow-lg md:hover:bg-[color:var(--brand-soft)] transition-all duration-200 ease-out text-center flex flex-col items-center justify-center min-h-48">
                  <div className="text-[color:var(--brand-primary)] mb-2">
                    <tool.icon size={36} strokeWidth={2} />
                  </div>
                  <h3 className="text-base font-semibold text-[color:var(--text-primary)]">
                    {tool.label}
                  </h3>
                  {/* Tooltip: md 이상에서만 호버 시 표시 */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 hidden md:block opacity-0 md:group-hover:opacity-100 px-3 py-1 bg-[color:var(--text-primary)] text-[color:var(--bg-surface)] text-xs rounded-md whitespace-nowrap transition-opacity duration-200 ${
                      tooltipAbove ? "bottom-full mb-2" : "top-full mt-2"
                    }`}
                  >
                    {tool.description}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
