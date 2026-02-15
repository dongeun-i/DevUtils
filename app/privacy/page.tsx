import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침 | DevUtils",
  description: "DevUtils 개인정보처리방침. 회원가입 없이 제공되는 서비스와 제3자(Google AdSense) 쿠키 사용에 대한 안내입니다.",
};

export default function PrivacyPage() {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-[color:var(--text-primary)] mb-6">
        개인정보처리방침
      </h1>
      <p className="text-sm text-[color:var(--text-muted)] mb-8">
        시행일: 2026년 2월 15일
      </p>

      <div className="space-y-6 text-[color:var(--text-secondary)]">
        <section>
          <h2 className="text-lg font-semibold text-[color:var(--text-primary)] mb-2">
            1. 개요
          </h2>
          <p>
            DevUtils(이하 &quot;사이트&quot;)는 회원가입 없이 브라우저에서 바로 사용할 수 있는
            개발자 유틸리티 도구를 제공합니다. 사이트 운영자는 이용자의 개인정보를
            직접 수집·저장·처리하는 회원제 서비스를 운영하지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[color:var(--text-primary)] mb-2">
            2. 수집하는 개인정보
          </h2>
          <p>
            사이트는 회원가입, 로그인, 이메일 수집 폼을 두지 않습니다. 따라서
            사이트를 통해 이용자의 이름, 이메일, 전화번호 등 개인정보를 직접
            수집하지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[color:var(--text-primary)] mb-2">
            3. 제3자 서비스 및 쿠키
          </h2>
          <p>
            사이트에는 Google에서 제공하는 광고 서비스(Google AdSense)가
            게재될 수 있습니다. Google은 광고 게재, 노출 횟수 측정, 사기 방지 등을
            위해 쿠키 및 기타 기술을 사용할 수 있으며, 이 과정에서 방문자에 대한
            데이터가 수집·처리될 수 있습니다.
          </p>
          <p className="mt-2">
            Google의 데이터 처리 방식은 Google 개인정보처리방침에서 확인할 수
            있습니다:{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--brand-primary)] underline"
            >
              https://policies.google.com/privacy
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[color:var(--text-primary)] mb-2">
            4. 방침 변경
          </h2>
          <p>
            본 개인정보처리방침은 법령·정책 또는 서비스 변경에 따라 수정될 수
            있으며, 변경 시 이 페이지를 통해 공지합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[color:var(--text-primary)] mb-2">
            5. 문의
          </h2>
          <p>
            개인정보처리방침에 대한 문의는 사이트 내 이용약관 또는 운영자
            연락처(도메인 소유자)를 통해 할 수 있습니다.
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
