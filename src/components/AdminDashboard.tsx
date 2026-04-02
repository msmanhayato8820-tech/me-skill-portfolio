"use client";

import { useState } from "react";
import { Engineer, SkillLevel } from "@/types";
import { groupCompanies, qualificationList } from "@/data/mock";

type Tab = "search" | "database" | "summary" | "compliance";

type ExpiryStatus = "expired" | "expiring_30" | "expiring_60" | "valid";

function getExpiryStatus(expiryDate?: string): ExpiryStatus | null {
  if (!expiryDate) return null;
  const today = new Date("2026-04-02");
  const expiry = new Date(expiryDate);
  const diffDays = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return "expired";
  if (diffDays <= 30) return "expiring_30";
  if (diffDays <= 60) return "expiring_60";
  return "valid";
}

interface Props {
  engineers: Engineer[];
  setEngineers: React.Dispatch<React.SetStateAction<Engineer[]>>;
}

export default function AdminDashboard({ engineers, setEngineers }: Props) {
  const [tab, setTab] = useState<Tab>("summary");
  const [selectedEngineer, setSelectedEngineer] = useState<Engineer | null>(null);

  const totalEngineers = groupCompanies.reduce((s, c) => s + c.engineerCount, 0);

  const riskCount = engineers.reduce((count, e) =>
    count + e.qualifications.filter((q) => {
      const s = getExpiryStatus(q.expiryDate);
      return s === "expired" || s === "expiring_30";
    }).length, 0);

  const tabs: { key: Tab; label: string }[] = [
    { key: "summary", label: "サマリー" },
    { key: "compliance", label: "コンプライアンス" },
    { key: "search", label: "人材検索" },
    { key: "database", label: "人材データベース" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">人財開発部・人事部 管理ダッシュボード</h2>
        <p className="text-sm text-gray-500">グループ横断 技術者スキル・資格の一元管理</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <p className="text-xs text-gray-500">グループ会社数</p>
          <p className="text-2xl font-bold text-[#0057B8]">{groupCompanies.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <p className="text-xs text-gray-500">登録技術者数</p>
          <p className="text-2xl font-bold text-[#0057B8]">{totalEngineers}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <p className="text-xs text-gray-500">DB登録済み</p>
          <p className="text-2xl font-bold text-green-600">{engineers.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <p className="text-xs text-gray-500">エキスパート人材</p>
          <p className="text-2xl font-bold text-purple-600">{engineers.filter((e) => e.skillLevel === "エキスパート").length}</p>
        </div>
        <div className={`rounded-xl shadow-sm border p-4 text-center ${riskCount > 0 ? "bg-red-50 border-red-200" : "bg-white"}`}>
          <p className="text-xs text-gray-500">コンプライアンスリスク</p>
          <p className={`text-2xl font-bold ${riskCount > 0 ? "text-red-600" : "text-green-600"}`}>{riskCount}件</p>
          {riskCount > 0 && <p className="text-xs text-red-500 mt-1">期限切れ・30日以内</p>}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setSelectedEngineer(null); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === t.key ? "bg-white shadow-sm text-[#0057B8]" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "summary" && <SummaryTab engineers={engineers} />}
      {tab === "compliance" && <ComplianceTab engineers={engineers} />}
      {tab === "search" && <SearchTab engineers={engineers} onSelect={setSelectedEngineer} />}
      {tab === "database" && !selectedEngineer && <DatabaseTab engineers={engineers} onSelect={setSelectedEngineer} setEngineers={setEngineers} />}
      {selectedEngineer && <EngineerDetail engineer={selectedEngineer} onBack={() => setSelectedEngineer(null)} />}
    </div>
  );
}

/* ───── Compliance Tab ───── */
function ComplianceTab({ engineers }: { engineers: Engineer[] }) {
  const statusConfig: Record<ExpiryStatus, { label: string; badge: string; row: string; priority: number }> = {
    expired:     { label: "期限切れ",  badge: "bg-red-100 text-red-700 border border-red-300",     row: "bg-red-50",    priority: 0 },
    expiring_30: { label: "30日以内",  badge: "bg-orange-100 text-orange-700 border border-orange-300", row: "bg-orange-50", priority: 1 },
    expiring_60: { label: "60日以内",  badge: "bg-yellow-100 text-yellow-700 border border-yellow-300", row: "bg-yellow-50",  priority: 2 },
    valid:       { label: "有効",      badge: "bg-green-100 text-green-700 border border-green-300",  row: "",             priority: 3 },
  };

  type RiskItem = { engineer: Engineer; qualName: string; expiryDate: string; status: ExpiryStatus; daysLeft: number };

  const riskItems: RiskItem[] = [];
  engineers.forEach((e) => {
    e.qualifications.forEach((q) => {
      const status = getExpiryStatus(q.expiryDate);
      if (!status || !q.expiryDate) return;
      const today = new Date("2026-04-02");
      const expiry = new Date(q.expiryDate);
      const daysLeft = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      riskItems.push({ engineer: e, qualName: q.name, expiryDate: q.expiryDate, status, daysLeft });
    });
  });
  riskItems.sort((a, b) => statusConfig[a.status].priority - statusConfig[b.status].priority);

  const counts = { expired: 0, expiring_30: 0, expiring_60: 0, valid: 0 };
  riskItems.forEach((r) => counts[r.status]++);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500">期限切れ</p>
          <p className="text-2xl font-bold text-red-600">{counts.expired}</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500">30日以内</p>
          <p className="text-2xl font-bold text-orange-600">{counts.expiring_30}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500">60日以内</p>
          <p className="text-2xl font-bold text-yellow-600">{counts.expiring_60}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500">有効</p>
          <p className="text-2xl font-bold text-green-600">{counts.valid}</p>
        </div>
      </div>

      {/* Risk List */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-bold text-gray-800">資格有効期限一覧</h3>
          <span className="text-xs text-gray-400">基準日: 2026-04-02</span>
        </div>
        {riskItems.length === 0 ? (
          <div className="p-8 text-center text-gray-400">有効期限が設定された資格はありません</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">技術者</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">所属会社</th>
                  <th className="text-left px-4 py-3 font-medium">資格名</th>
                  <th className="text-left px-4 py-3 font-medium">有効期限</th>
                  <th className="text-left px-4 py-3 font-medium">状態</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {riskItems.map((item, i) => {
                  const cfg = statusConfig[item.status];
                  return (
                    <tr key={i} className={cfg.row}>
                      <td className="px-4 py-3 font-medium">{item.engineer.name}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 hidden sm:table-cell">{item.engineer.company}</td>
                      <td className="px-4 py-3 text-xs">{item.qualName}</td>
                      <td className="px-4 py-3 text-xs">
                        {item.expiryDate}
                        <span className="ml-1 text-gray-400">
                          {item.daysLeft < 0 ? `(${Math.abs(item.daysLeft)}日超過)` : `(残${item.daysLeft}日)`}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.badge}`}>{cfg.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ───── Summary Tab ───── */
function SummaryTab({ engineers }: { engineers: Engineer[] }) {
  const qualCounts: Record<string, number> = {};
  engineers.forEach((e) => e.qualifications.forEach((q) => {
    qualCounts[q.name] = (qualCounts[q.name] || 0) + 1;
  }));
  const sortedQuals = Object.entries(qualCounts).sort((a, b) => b[1] - a[1]);

  const levelCounts: Record<string, number> = { "初級": 0, "中級": 0, "上級": 0, "エキスパート": 0 };
  engineers.forEach((e) => { levelCounts[e.skillLevel]++; });

  const levelColors: Record<string, string> = {
    "初級": "bg-gray-200", "中級": "bg-blue-400", "上級": "bg-green-500", "エキスパート": "bg-purple-600",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Qualification Distribution */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="font-bold text-gray-800">資格保有者数ランキング</h3>
        </div>
        <div className="p-4 space-y-3">
          {sortedQuals.map(([name, count]) => (
            <div key={name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="truncate mr-2">{name}</span>
                <span className="font-bold text-[#0057B8] shrink-0">{count}名</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#0057B8] rounded-full" style={{ width: `${(count / engineers.length) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Level Distribution */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="font-bold text-gray-800">スキルレベル分布</h3>
        </div>
        <div className="p-6 space-y-4">
          {Object.entries(levelCounts).map(([level, count]) => (
            <div key={level} className="flex items-center gap-3">
              <span className="text-sm w-24 shrink-0">{level}</span>
              <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                <div className={`h-full ${levelColors[level]} rounded-lg transition-all`} style={{ width: `${(count / engineers.length) * 100}%` }} />
              </div>
              <span className="font-bold text-sm w-8 text-right">{count}</span>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <h4 className="font-bold text-gray-800 mb-3">グループ会社別 技術者数</h4>
          <div className="space-y-2">
            {groupCompanies.map((gc) => (
              <div key={gc.id} className="flex items-center justify-between text-sm">
                <span className="truncate mr-2">{gc.name}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-gray-400">{gc.region}</span>
                  <span className="font-bold text-[#0057B8]">{gc.engineerCount}名</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── Search Tab ───── */
function SearchTab({ engineers, onSelect }: { engineers: Engineer[]; onSelect: (e: Engineer) => void }) {
  const [filters, setFilters] = useState({ name: "", company: "", qualification: "", skillLevel: "" });

  const filtered = engineers.filter((e) => {
    if (filters.name && !e.name.includes(filters.name) && !e.nameKana.includes(filters.name)) return false;
    if (filters.company && !e.company.includes(filters.company)) return false;
    if (filters.qualification && !e.qualifications.some((q) => q.name === filters.qualification)) return false;
    if (filters.skillLevel && e.skillLevel !== filters.skillLevel) return false;
    return true;
  });

  const inputClass = "w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none";

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border p-4">
        <h3 className="font-bold text-gray-800 mb-3">検索条件</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <input className={inputClass} placeholder="氏名で検索" value={filters.name} onChange={(e) => setFilters((p) => ({ ...p, name: e.target.value }))} />
          <select className={inputClass} value={filters.company} onChange={(e) => setFilters((p) => ({ ...p, company: e.target.value }))}>
            <option value="">全グループ会社</option>
            {groupCompanies.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          <select className={inputClass} value={filters.qualification} onChange={(e) => setFilters((p) => ({ ...p, qualification: e.target.value }))}>
            <option value="">全資格</option>
            {qualificationList.map((q) => <option key={q} value={q}>{q}</option>)}
          </select>
          <select className={inputClass} value={filters.skillLevel} onChange={(e) => setFilters((p) => ({ ...p, skillLevel: e.target.value }))}>
            <option value="">全レベル</option>
            {(["初級", "中級", "上級", "エキスパート"] as const).map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="font-bold text-gray-800">検索結果 ({filtered.length}件)</h3>
        </div>
        <div className="divide-y">
          {filtered.map((e) => (
            <div key={e.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 hover:bg-gray-50 cursor-pointer" onClick={() => onSelect(e)}>
              <div className="w-10 h-10 rounded-full bg-[#0057B8] text-white flex items-center justify-center font-bold shrink-0">{e.photoInitial}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold">{e.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    e.skillLevel === "エキスパート" ? "bg-purple-100 text-purple-700" :
                    e.skillLevel === "上級" ? "bg-green-100 text-green-700" :
                    e.skillLevel === "中級" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                  }`}>{e.skillLevel}</span>
                </div>
                <p className="text-xs text-gray-500">{e.company} / {e.department}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {e.qualifications.slice(0, 3).map((q) => (
                    <span key={q.name} className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">{q.name}</span>
                  ))}
                  {e.qualifications.length > 3 && <span className="text-xs text-gray-400">+{e.qualifications.length - 3}</span>}
                </div>
              </div>
              <span className="text-xs text-blue-600 font-medium shrink-0">詳細 &rarr;</span>
            </div>
          ))}
          {filtered.length === 0 && <div className="p-8 text-center text-gray-400">該当する技術者が見つかりません</div>}
        </div>
      </div>
    </div>
  );
}

/* ───── Database Tab ───── */
function DatabaseTab({ engineers, onSelect, setEngineers }: { engineers: Engineer[]; onSelect: (e: Engineer) => void; setEngineers: React.Dispatch<React.SetStateAction<Engineer[]>> }) {
  const [toast, setToast] = useState("");

  const handleDelete = (id: string) => {
    setEngineers((prev) => prev.filter((e) => e.id !== id));
    setToast("削除しました");
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      {toast && <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm z-50">{toast}</div>}
      <div className="p-4 border-b">
        <h3 className="font-bold text-gray-800">人材データベース ({engineers.length}名)</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3 font-medium">氏名</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">所属会社</th>
              <th className="text-left px-4 py-3 font-medium">レベル</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">資格数</th>
              <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">経験年数</th>
              <th className="text-left px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {engineers.map((e) => (
              <tr key={e.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#0057B8] text-white flex items-center justify-center text-xs font-bold shrink-0">{e.photoInitial}</div>
                    <div>
                      <p className="font-medium">{e.name}</p>
                      <p className="text-xs text-gray-400 md:hidden">{e.company}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs hidden md:table-cell">{e.company}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    e.skillLevel === "エキスパート" ? "bg-purple-100 text-purple-700" :
                    e.skillLevel === "上級" ? "bg-green-100 text-green-700" :
                    e.skillLevel === "中級" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                  }`}>{e.skillLevel}</span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">{e.qualifications.length}</td>
                <td className="px-4 py-3 hidden lg:table-cell">{e.experienceYears}年</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => onSelect(e)} className="text-blue-600 hover:text-blue-800 text-xs">詳細</button>
                    <button onClick={() => handleDelete(e.id)} className="text-red-500 hover:text-red-700 text-xs">削除</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ───── Engineer Detail ───── */
function EngineerDetail({ engineer: e, onBack }: { engineer: Engineer; onBack: () => void }) {
  const levelColors: Record<string, string> = {
    "初級": "bg-gray-100 text-gray-700", "中級": "bg-blue-100 text-blue-700",
    "上級": "bg-green-100 text-green-700", "エキスパート": "bg-purple-100 text-purple-700",
  };

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="text-sm text-blue-600 hover:text-blue-800">&larr; 一覧に戻る</button>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-20 h-20 rounded-full bg-[#0057B8] text-white flex items-center justify-center text-3xl font-bold shrink-0">{e.photoInitial}</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{e.name} <span className="text-sm font-normal text-gray-400">({e.nameKana})</span></h2>
            <p className="text-gray-600">{e.company}</p>
            <p className="text-sm text-gray-500">{e.department} / {e.position}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${levelColors[e.skillLevel]}`}>{e.skillLevel}</span>
              <span className="px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-700">経験{e.experienceYears}年</span>
              <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600">入社{e.joinedYear}年</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {e.specialties.map((s) => (
                <span key={s} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-4 border-b"><h3 className="font-bold">保有資格 ({e.qualifications.length})</h3></div>
          <div className="divide-y">
            {e.qualifications.map((q, i) => (
              <div key={i} className="px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm font-medium">{q.name}</span>
                </div>
                <span className="text-xs text-gray-400">{q.acquiredDate}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-4 border-b"><h3 className="font-bold">研修受講履歴 ({e.trainings.length})</h3></div>
          <div className="divide-y">
            {e.trainings.map((t, i) => (
              <div key={i} className="px-4 py-3 flex justify-between items-center">
                <div>
                  <span className="text-sm font-medium">{t.name}</span>
                  <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                    t.type === "F&F型" ? "bg-purple-100 text-purple-700" :
                    t.type === "OJT" ? "bg-blue-100 text-blue-700" :
                    t.type === "外部研修" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-700"
                  }`}>{t.type}</span>
                </div>
                <span className="text-xs text-gray-400">{t.completedDate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
