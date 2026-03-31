import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ME-Skill Portfolio | グループ横断 技術者スキル管理",
  description: "マイスターエンジニアリンググループ 技術者スキル・資格一元管理システム",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-800 antialiased">{children}</body>
    </html>
  );
}
