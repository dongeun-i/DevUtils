"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/tools/regex-tester", label: "정규식 테스터" },
  { href: "/tools/json-formatter", label: "JSON 포맷터" },
  { href: "/tools/base64-encoder", label: "Base64 인코더" },
  { href: "/tools/dummy-data-generator", label: "더미 데이터 생성기" },
  { href: "/tools/url-encoder", label: "URL 인코더" },
  { href: "/tools/timestamp-converter", label: "타임스탬프" },
  { href: "/tools/diff-checker", label: "Diff 체커" },
  { href: "/tools/markdown-preview", label: "마크다운" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = (isActive: boolean) =>
    `block px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200
      ${isActive ? "bg-[color:var(--brand-hover)] text-white" : "text-white hover:bg-white/10"}`;

  return (
    <div className="relative">
      <nav className="container mx-auto flex justify-between items-center gap-2 py-1.5 sm:py-2 min-h-[2.75rem] sm:min-h-0">
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2 text-lg sm:text-xl font-bold text-white shrink-0 min-w-0" onClick={() => setMenuOpen(false)}>
          <img
            src="/devuill_logo_white.png"
            alt="DevUtils"
            className="h-8 sm:h-10 w-auto block shrink-0"
            width={96}
            height={48}
            fetchPriority="high"
          />
          <span className="shrink-0">DevUtils</span>
        </Link>

        {/* 데스크톱: 링크 표시 */}
        <div className="hidden md:flex flex-wrap gap-2 lg:gap-4 justify-end items-center content-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap
                  ${isActive ? "bg-[color:var(--brand-hover)] text-white" : "hover:bg-white/10"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* 모바일: 햄버거 버튼 */}
        <button
          type="button"
          aria-label="메뉴 열기"
          aria-expanded={menuOpen}
          className="md:hidden p-2 rounded-md text-white hover:bg-white/10"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* 모바일 메뉴 패널 */}
      {menuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full bg-[color:var(--brand-primary)] shadow-lg border-t border-white/10 z-50">
          <div className="container mx-auto py-2 px-2 flex flex-col">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={linkClass(isActive)}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
