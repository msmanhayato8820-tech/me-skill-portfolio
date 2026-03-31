"use client";

import { useState } from "react";
import { Engineer } from "@/types";
import { qualificationList } from "@/data/mock";

interface Props {
  engineers: Engineer[];
  setEngineers: React.Dispatch<React.SetStateAction<Engineer[]>>;
}

export default function EngineerDashboard({ engineers, setEngineers }: Props) {
  const me = engineers.find((e) => e.id === "eng-001")!;
  const [showAddQual, setShowAddQual] = useState(false);
  const [newQual, setNewQual] = useState({ name: qualificationList[0], acquiredDate: "" });
  const [toast, setToast] = useState("");

  const handleAddQual = () => {
    if (!newQual.acquiredDate) return;
    setEngineers((prev) =>
      prev.map((e) =>
        e.id === me.id
          ? { ...e, qualifications: [...e.qualifications, { name: newQual.name, acquiredDate: newQual.acquiredDate }] }
          : e
      )
    );
    setNewQual({ name: qualificationList[0], acquiredDate: "" });
    setShowAddQual(false);
    setToast("資格を登録しました");
    setTimeout(() => setToast(""), 3000);
  };

  const levelColors: Record<string, string> = {
    "初級": "bg-gray-100 text-gray-700",
    "中級": "bg-blue-100 text-blue-700",
    "上級": "bg-green-100 text-green-700",
    "エキスパート": "bg-purple-100 text-purple-700",
  };

  return (
    <div className="space-y-6">
      {toast && <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm z-50">{toast}</div>}

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#0057B8] text-white flex items-center justify-center text-2xl font-bold shrink-0">
            {me.photoInitial}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{me.name}</h2>
            <p className="text-sm text-gray-500">{me.company} / {me.department} / {me.position}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${levelColors[me.skillLevel]}`}>
                {me.skillLevel}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                経験{me.experienceYears}年
              </span>
              {me.specialties.map((s) => (
                <span key={s} className="px-2.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">{s}</span>
              ))}
            </div>
          </div>
          {!showAddQual && (
            <button onClick={() => setShowAddQual(true)} className="px-4 py-2 bg-[#0057B8] text-white rounded-lg text-sm font-medium hover:bg-[#003D80] transition-colors shrink-0">
              + 資格登録
            </button>
          )}
        </div>
      </div>

      {/* Add Qualification Form */}
      {showAddQual && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-bold text-gray-800 mb-4">新規資格取得の登録</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">資格名</label>
              <select className="w-full border rounded-lg px-3 py-2 text-sm" value={newQual.name} onChange={(e) => setNewQual((p) => ({ ...p, name: e.target.value }))}>
                {qualificationList.map((q) => <option key={q} value={q}>{q}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">取得年月</label>
              <input type="month" className="w-full border rounded-lg px-3 py-2 text-sm" value={newQual.acquiredDate} onChange={(e) => setNewQual((p) => ({ ...p, acquiredDate: e.target.value }))} />
            </div>
            <div className="flex gap-2">
              <button onClick={handleAddQual} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">登録</button>
              <button onClick={() => setShowAddQual(false)} className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">キャンセル</button>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <p className="text-xs text-gray-500">保有資格数</p>
          <p className="text-2xl font-bold text-[#0057B8]">{me.qualifications.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <p className="text-xs text-gray-500">研修受講数</p>
          <p className="text-2xl font-bold text-[#0057B8]">{me.trainings.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <p className="text-xs text-gray-500">スキルレベル</p>
          <p className="text-lg font-bold text-green-600">{me.skillLevel}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4 text-center">
          <p className="text-xs text-gray-500">入社年</p>
          <p className="text-2xl font-bold text-gray-700">{me.joinedYear}</p>
        </div>
      </div>

      {/* Qualifications & Trainings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-bold text-gray-800">保有資格一覧</h3>
          </div>
          <div className="divide-y">
            {me.qualifications.map((q, i) => (
              <div key={i} className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full shrink-0" />
                  <span className="text-sm font-medium">{q.name}</span>
                </div>
                <span className="text-xs text-gray-400">{q.acquiredDate}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-bold text-gray-800">研修受講履歴</h3>
          </div>
          <div className="divide-y">
            {me.trainings.map((t, i) => (
              <div key={i} className="px-4 py-3 flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">{t.name}</span>
                  <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                    t.type === "F&F型" ? "bg-purple-100 text-purple-700" :
                    t.type === "OJT" ? "bg-blue-100 text-blue-700" :
                    t.type === "外部研修" ? "bg-amber-100 text-amber-700" :
                    "bg-gray-100 text-gray-700"
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
