"use client";

import { useState } from "react";
import { Role, Engineer } from "@/types";
import { initialEngineers } from "@/data/mock";
import Header from "@/components/Header";
import EngineerDashboard from "@/components/EngineerDashboard";
import AdminDashboard from "@/components/AdminDashboard";

export default function Home() {
  const [role, setRole] = useState<Role>("engineer");
  const [engineers, setEngineers] = useState<Engineer[]>(initialEngineers);

  return (
    <div className="min-h-screen flex flex-col">
      <Header role={role} onRoleChange={setRole} />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {role === "engineer" && (
          <EngineerDashboard engineers={engineers} setEngineers={setEngineers} />
        )}
        {role === "admin" && (
          <AdminDashboard engineers={engineers} setEngineers={setEngineers} />
        )}
      </main>
      <footer className="text-center text-xs text-gray-400 py-4 border-t">
        ME-Skill Portfolio Demo &copy; 2026 &mdash; 人財開発・PMI統合支援プロトタイプ
      </footer>
    </div>
  );
}
