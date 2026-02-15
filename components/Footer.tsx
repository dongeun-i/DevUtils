import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[color:var(--border-default)] bg-[color:var(--bg-surface)] py-4">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-2 text-sm text-[color:var(--text-secondary)]">
        <div className="flex items-center gap-2">
          <Image
            src="/devuitil_logo_color.png"
            alt="DevUtils"
            width={56}
            height={56}
            className="object-contain"
          />
          <span>© DevUtils. 개발자 도구 모음.</span>
        </div>
        <nav className="flex gap-4">
          <Link
            href="/privacy"
            className="text-[color:var(--text-secondary)] hover:text-[color:var(--brand-primary)] hover:underline"
          >
            개인정보처리방침
          </Link>
          <Link
            href="/terms"
            className="text-[color:var(--text-secondary)] hover:text-[color:var(--brand-primary)] hover:underline"
          >
            이용약관
          </Link>
        </nav>
      </div>
    </footer>
  );
}
