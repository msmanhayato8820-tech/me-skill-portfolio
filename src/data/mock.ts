import { Engineer, GroupCompany } from "@/types";

export const groupCompanies: GroupCompany[] = [
  { id: "gc-1", name: "MEテクノサービス(株)", engineerCount: 185, region: "関東" },
  { id: "gc-2", name: "MEプラントエンジニアリング(株)", engineerCount: 120, region: "中部" },
  { id: "gc-3", name: "MEファシリティマネジメント(株)", engineerCount: 95, region: "関西" },
  { id: "gc-4", name: "MEインフラテック(株)", engineerCount: 78, region: "東北" },
  { id: "gc-5", name: "MEエレクトロニクス(株)", engineerCount: 55, region: "九州" },
  { id: "gc-6", name: "MEグリーンエナジー(株)", engineerCount: 42, region: "北海道" },
  { id: "gc-7", name: "MEビルテクノ(株)", engineerCount: 68, region: "関東" },
  { id: "gc-8", name: "MEパワーシステムズ(株)", engineerCount: 50, region: "中国" },
];

export const qualificationList = [
  "第1種電気工事士",
  "第2種電気工事士",
  "第3種電気主任技術者",
  "第2種電気主任技術者",
  "1級電気工事施工管理技士",
  "2級電気工事施工管理技士",
  "1級管工事施工管理技士",
  "2級管工事施工管理技士",
  "1級建築施工管理技士",
  "危険物取扱者（乙種第4類）",
  "ボイラー技士（2級）",
  "消防設備士（甲種第4類）",
  "エネルギー管理士",
  "ビル管理士（建築物環境衛生管理技術者）",
  "第1種冷凍機械責任者",
];

export const initialEngineers: Engineer[] = [
  {
    id: "eng-001", name: "田中 太郎", nameKana: "タナカ タロウ",
    company: "MEテクノサービス(株)", department: "設備保全課", position: "主任技術者",
    joinedYear: 2015, experienceYears: 11,
    qualifications: [
      { name: "第1種電気工事士", acquiredDate: "2017-09" },
      { name: "第3種電気主任技術者", acquiredDate: "2019-11" },
      { name: "1級電気工事施工管理技士", acquiredDate: "2021-03" },
    ],
    trainings: [
      { name: "F&F型リーダーシップ研修", completedDate: "2024-06", type: "F&F型" },
      { name: "高圧受変電設備点検実務", completedDate: "2023-09", type: "OJT" },
    ],
    skillLevel: "上級", specialties: ["高圧受変電設備", "太陽光発電システム"], photoInitial: "田",
  },
  {
    id: "eng-002", name: "佐藤 花子", nameKana: "サトウ ハナコ",
    company: "MEプラントエンジニアリング(株)", department: "工事管理部", position: "技術者",
    joinedYear: 2019, experienceYears: 7,
    qualifications: [
      { name: "第2種電気工事士", acquiredDate: "2019-12" },
      { name: "2級電気工事施工管理技士", acquiredDate: "2022-06" },
      { name: "危険物取扱者（乙種第4類）", acquiredDate: "2020-08" },
    ],
    trainings: [
      { name: "安全衛生管理者講習", completedDate: "2023-04", type: "外部研修" },
      { name: "CAD基礎（AutoCAD）", completedDate: "2024-01", type: "eラーニング" },
    ],
    skillLevel: "中級", specialties: ["プラント電気設備", "制御盤設計"], photoInitial: "佐",
  },
  {
    id: "eng-003", name: "山田 健一", nameKana: "ヤマダ ケンイチ",
    company: "MEファシリティマネジメント(株)", department: "ビル管理課", position: "チーフエンジニア",
    joinedYear: 2010, experienceYears: 16,
    qualifications: [
      { name: "ビル管理士（建築物環境衛生管理技術者）", acquiredDate: "2015-11", expiryDate: "2026-04-25", renewalRequired: true },
      { name: "第1種電気工事士", acquiredDate: "2013-09" },
      { name: "第2種電気主任技術者", acquiredDate: "2020-11" },
      { name: "エネルギー管理士", acquiredDate: "2022-03" },
    ],
    trainings: [
      { name: "F&F型マネジメント実践", completedDate: "2025-01", type: "F&F型" },
      { name: "省エネ診断実務研修", completedDate: "2024-07", type: "外部研修" },
    ],
    skillLevel: "エキスパート", specialties: ["ビル管理", "省エネルギー", "空調設備"], photoInitial: "山",
  },
  {
    id: "eng-004", name: "鈴木 美咲", nameKana: "スズキ ミサキ",
    company: "MEインフラテック(株)", department: "送電線保守課", position: "技術者",
    joinedYear: 2021, experienceYears: 5,
    qualifications: [
      { name: "第2種電気工事士", acquiredDate: "2021-12" },
      { name: "第1種電気工事士", acquiredDate: "2023-09" },
    ],
    trainings: [
      { name: "高所作業特別教育", completedDate: "2022-03", type: "外部研修" },
      { name: "F&F型新入社員研修", completedDate: "2021-07", type: "F&F型" },
    ],
    skillLevel: "中級", specialties: ["送電線保守", "鉄塔点検"], photoInitial: "鈴",
  },
  {
    id: "eng-005", name: "高橋 一郎", nameKana: "タカハシ イチロウ",
    company: "MEエレクトロニクス(株)", department: "施工管理課", position: "課長",
    joinedYear: 2008, experienceYears: 18,
    qualifications: [
      { name: "1級電気工事施工管理技士", acquiredDate: "2014-03" },
      { name: "第1種電気工事士", acquiredDate: "2011-09" },
      { name: "消防設備士（甲種第4類）", acquiredDate: "2016-06", expiryDate: "2026-03-15", renewalRequired: true },
      { name: "1級管工事施工管理技士", acquiredDate: "2019-03" },
    ],
    trainings: [
      { name: "F&F型部門長研修", completedDate: "2025-02", type: "F&F型" },
      { name: "プロジェクトマネジメント基礎", completedDate: "2023-11", type: "eラーニング" },
    ],
    skillLevel: "エキスパート", specialties: ["電気工事施工管理", "消防設備", "プロジェクトマネジメント"], photoInitial: "高",
  },
  {
    id: "eng-006", name: "中村 隆", nameKana: "ナカムラ タカシ",
    company: "MEグリーンエナジー(株)", department: "発電事業部", position: "技術者",
    joinedYear: 2022, experienceYears: 4,
    qualifications: [
      { name: "第2種電気工事士", acquiredDate: "2022-12" },
      { name: "ボイラー技士（2級）", acquiredDate: "2023-08" },
    ],
    trainings: [
      { name: "風力発電メンテナンス基礎", completedDate: "2023-05", type: "OJT" },
      { name: "GWO基礎安全訓練", completedDate: "2024-02", type: "外部研修" },
    ],
    skillLevel: "初級", specialties: ["風力発電", "バイオマス発電"], photoInitial: "中",
  },
  {
    id: "eng-007", name: "伊藤 彩", nameKana: "イトウ アヤ",
    company: "MEテクノサービス(株)", department: "技術開発部", position: "技術者",
    joinedYear: 2020, experienceYears: 6,
    qualifications: [
      { name: "第2種電気工事士", acquiredDate: "2020-12" },
      { name: "第1種電気工事士", acquiredDate: "2022-09" },
      { name: "第3種電気主任技術者", acquiredDate: "2024-11", expiryDate: "2026-04-20", renewalRequired: true },
    ],
    trainings: [
      { name: "IoTセンサー活用研修", completedDate: "2024-09", type: "外部研修" },
      { name: "F&F型技術者育成プログラム", completedDate: "2023-12", type: "F&F型" },
    ],
    skillLevel: "上級", specialties: ["IoT", "遠隔監視システム", "データ分析"], photoInitial: "伊",
  },
  {
    id: "eng-008", name: "渡辺 大輔", nameKana: "ワタナベ ダイスケ",
    company: "MEビルテクノ(株)", department: "設備管理課", position: "主任",
    joinedYear: 2013, experienceYears: 13,
    qualifications: [
      { name: "1級建築施工管理技士", acquiredDate: "2019-03" },
      { name: "ビル管理士（建築物環境衛生管理技術者）", acquiredDate: "2017-11" },
      { name: "第1種冷凍機械責任者", acquiredDate: "2020-03", expiryDate: "2026-05-20", renewalRequired: true },
    ],
    trainings: [
      { name: "F&F型リーダーシップ研修", completedDate: "2024-10", type: "F&F型" },
      { name: "ZEB設計実務", completedDate: "2025-01", type: "外部研修" },
    ],
    skillLevel: "上級", specialties: ["ビル設備管理", "空調冷熱", "ZEB"], photoInitial: "渡",
  },
  {
    id: "eng-009", name: "小林 誠", nameKana: "コバヤシ マコト",
    company: "MEパワーシステムズ(株)", department: "変電設備課", position: "技術者",
    joinedYear: 2018, experienceYears: 8,
    qualifications: [
      { name: "第1種電気工事士", acquiredDate: "2020-09" },
      { name: "第3種電気主任技術者", acquiredDate: "2022-11" },
    ],
    trainings: [
      { name: "特別高圧受変電設備研修", completedDate: "2023-06", type: "OJT" },
      { name: "電力品質管理基礎", completedDate: "2024-04", type: "eラーニング" },
    ],
    skillLevel: "中級", specialties: ["変電設備", "電力品質管理"], photoInitial: "小",
  },
  {
    id: "eng-010", name: "加藤 裕子", nameKana: "カトウ ユウコ",
    company: "MEプラントエンジニアリング(株)", department: "計装制御課", position: "チーフエンジニア",
    joinedYear: 2012, experienceYears: 14,
    qualifications: [
      { name: "第1種電気工事士", acquiredDate: "2014-09" },
      { name: "エネルギー管理士", acquiredDate: "2018-03", expiryDate: "2026-12-15", renewalRequired: true },
      { name: "1級電気工事施工管理技士", acquiredDate: "2020-03" },
      { name: "第3種電気主任技術者", acquiredDate: "2016-11" },
    ],
    trainings: [
      { name: "DCS/PLCプログラミング上級", completedDate: "2024-03", type: "外部研修" },
      { name: "F&F型技術指導者研修", completedDate: "2025-01", type: "F&F型" },
    ],
    skillLevel: "エキスパート", specialties: ["計装制御", "DCS/PLC", "プロセス制御"], photoInitial: "加",
  },
];
