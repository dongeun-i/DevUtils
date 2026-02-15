import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "이용약관 | DevUtils",
  description: "DevUtils 이용약관. 개발자 유틸리티 도구 사용에 관한 약관입니다.",
};

export default function TermsPage() {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-[color:var(--text-primary)] mb-6">
        이용약관
      </h1>
      <p className="text-sm text-[color:var(--text-muted)] mb-8">
        시행일: 2026년 2월 15일
      </p>

      <div className="space-y-6 text-[color:var(--text-secondary)]">
        <section>
          <h2 className="text-lg font-semibold text-[color:var(--text-primary)] mb-2">
            제1조 (목적)
          </h2>
          <p>
            본 약관은 DevUtils(이하 &quot;사이트&quot;)가 제공하는 웹 기반 개발자
            유틸리티 도구(정규식 테스터, JSON 포맷터, 인코더, 변환기 등)의
            이용 조건 및 절차에 관한 사항을 정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[color:var(--text-primary)] mb-2">
            제2조 (서비스의 이용)
          </h2>
          <p>
            이용자는 회원가입 없이 브라우저를 통해 사이트의 도구를 자유롭게
            이용할 수 있습니다. 단, 서비스의 품질 유지를 위해 일부 기능·접근이
            제한되거나 변경될 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[color:var(--text-primary)] mb-2">
            제3조 (금지 행위)
          </h2>
          <p>
            이용자는 다음 행위를 하여서는 안 됩니다: 서비스에 대한 무단 스크래핑·자동화
            접근, 다른 이용자 또는 제3자에 대한 혐오·명예훼손, 불법 콘텐츠
            게시, 시스템 또는 네트워크에 대한 방해 행위, 기타 관련 법령에
            위반되는 행위.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[color:var(--text-primary)] mb-2">
            제4조 (면책)
          </h2>
          <p>
            사이트는 도구를 &quot;있는 그대로&quot; 제공하며, 이용자가 도구를 사용하여
            처리한 데이터에 대한 결과의 정확성·적합성에 대해 보증하지 않습니다.
            중요한 데이터는 반드시 백업·검증 후 사용하시기 바랍니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[color:var(--text-primary)] mb-2">
            제5조 (약관의 변경)
          </h2>
          <p>
            사이트는 필요한 경우 이용약관을 변경할 수 있으며, 변경 시 이
            페이지에 게시하여 효력이 발생합니다.
          </p>
        </section>
      </div>

      <div className="mt-10 pt-6 border-t border-[color:var(--border-default)]">
        <Link
          href="/"
          className="text-[color:var(--brand-primary)] hover:underline"
        >
          ← 홈으로
        </Link>
      </div>
    </div>
  );
}
