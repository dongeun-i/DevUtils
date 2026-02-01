"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navLinks = [
  { href: "/tools/regex-tester", label: "정규식 테스터" },
  { href: "/tools/json-formatter", label: "JSON 포맷터" },
  { href: "/tools/base64-encoder", label: "Base64 인코더" },
  { href: "/tools/dummy-data-generator", label: "더미 데이터 생성기" },
  { href: "/tools/git-command-generator", label: "Git 커맨드 생성기" },
  { href: "/tools/color-converter", label: "색상 변환기" },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="container mx-auto flex justify-between items-center py-2">
      <Link href="/" className="text-xl font-bold text-white">
        DevUtils
      </Link>
      <div className="flex gap-2 sm:gap-4 flex-wrap justify-end">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200
                ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`}
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
