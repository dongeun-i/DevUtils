"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

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

  return (
    <nav className="container mx-auto flex justify-between items-center gap-2 py-1.5 sm:py-2 min-h-[2.75rem] sm:min-h-0">
      <Link href="/" className="flex items-center gap-1.5 sm:gap-2 text-lg sm:text-xl font-bold text-white shrink-0 min-w-0">
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
      <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-4 justify-end items-center content-center">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap
                ${isActive ? "bg-[color:var(--brand-hover)] text-white" : "hover:bg-white/10"}`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
