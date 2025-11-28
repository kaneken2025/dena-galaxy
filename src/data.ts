// Type definitions
export type Department = 'AI' | 'Health' | 'Game' | 'Sports';

export interface Employee {
  id: string;
  name: string;
  year: number;
  dept: Department;
  memo: string;
  url: string;
  color: string;
  position: [number, number, number];
}

// Department color mapping
const DEPT_COLORS: Record<Department, string> = {
  AI: '#ff4d4f',      // Red
  Health: '#52c41a',  // Green
  Game: '#1890ff',    // Blue
  Sports: '#fadb14',  // Yellow
};

// Sphere radius
const SPHERE_RADIUS = 5;

// Generate random sphere position
function getRandomSpherePosition(radius: number): [number, number, number] {
  const phi = Math.acos(-1 + 2 * Math.random());
  const theta = 2 * Math.PI * Math.random();
  
  return [
    radius * Math.cos(theta) * Math.sin(phi),
    radius * Math.sin(theta) * Math.sin(phi),
    radius * Math.cos(phi)
  ];
}

// Raw employee data
const RAW_EMPLOYEES: Omit<Employee, 'color' | 'position'>[] = [
  { id: 'me', name: 'ME', year: 2026, dept: 'AI', memo: '頑張るぞ！', url: 'https://example.me' },
  { id: 'a01', name: 'A01', year: 2026, dept: 'AI', memo: 'ラーメンが好き', url: 'https://example.a01' },
  { id: 'a02', name: 'A02', year: 2024, dept: 'Health', memo: '朝ランが日課', url: 'https://example.a02' },
  { id: 'a03', name: 'A03', year: 2021, dept: 'Game', memo: '猫を2匹飼っている', url: 'https://example.a03' },
  { id: 'a04', name: 'A04', year: 2019, dept: 'Sports', memo: 'マラソン大会によく出る', url: 'https://example.a04' },
  { id: 'a05', name: 'A05', year: 2023, dept: 'AI', memo: 'コーヒーに詳しい', url: 'https://example.a05' },
  { id: 'a06', name: 'A06', year: 2020, dept: 'Game', memo: 'FPSが得意', url: 'https://example.a06' },
  { id: 'a07', name: 'A07', year: 2022, dept: 'Health', memo: 'ヨガインストラクター資格', url: 'https://example.a07' },
  { id: 'a08', name: 'A08', year: 2025, dept: 'Sports', memo: '登山が趣味', url: 'https://example.a08' },
  { id: 'a09', name: 'A09', year: 2026, dept: 'Game', memo: '配信活動をしている', url: 'https://example.a09' },
  { id: 'a10', name: 'A10', year: 2023, dept: 'AI', memo: '週末は読書', url: 'https://example.a10' },
  { id: 'a11', name: 'A11', year: 2024, dept: 'Sports', memo: 'サッカー観戦が大好き', url: 'https://example.a11' },
  { id: 'a12', name: 'A12', year: 2022, dept: 'Game', memo: 'アニメが好き', url: 'https://example.a12' },
  { id: 'a13', name: 'A13', year: 2020, dept: 'Health', memo: '健康食にくわしい', url: 'https://example.a13' },
  { id: 'a14', name: 'A14', year: 2021, dept: 'AI', memo: 'カメラが趣味', url: 'https://example.a14' },
  { id: 'a15', name: 'A15', year: 2019, dept: 'Game', memo: 'レトロゲーム収集', url: 'https://example.a15' },
  { id: 'a16', name: 'A16', year: 2025, dept: 'Sports', memo: 'スキューバダイビング好き', url: 'https://example.a16' },
  { id: 'a17', name: 'A17', year: 2023, dept: 'Health', memo: 'ベジタリアン', url: 'https://example.a17' },
  { id: 'a18', name: 'A18', year: 2026, dept: 'AI', memo: 'ガジェットオタク', url: 'https://example.a18' },
  { id: 'a19', name: 'A19', year: 2019, dept: 'Sports', memo: '自転車旅が好き', url: 'https://example.a19' },
  { id: 'a20', name: 'A20', year: 2024, dept: 'Game', memo: 'コスプレが趣味', url: 'https://example.a20' },
  { id: 'a21', name: 'A21', year: 2026, dept: 'Health', memo: '英会話を勉強中', url: 'https://example.a21' },
  { id: 'a22', name: 'A22', year: 2020, dept: 'Sports', memo: 'バスケが得意', url: 'https://example.a22' },
  { id: 'a23', name: 'A23', year: 2021, dept: 'AI', memo: '手帳術にこだわり', url: 'https://example.a23' },
  { id: 'a24', name: 'A24', year: 2025, dept: 'Game', memo: 'ボードゲーム好き', url: 'https://example.a24' },
  { id: 'a25', name: 'A25', year: 2019, dept: 'Health', memo: '和食が好き', url: 'https://example.a25' },
  { id: 'a26', name: 'A26', year: 2022, dept: 'AI', memo: 'ドライブが好き', url: 'https://example.a26' },
  { id: 'a27', name: 'A27', year: 2024, dept: 'Sports', memo: '釣りによく行く', url: 'https://example.a27' },
  { id: 'a28', name: 'A28', year: 2023, dept: 'Game', memo: 'カラオケ好き', url: 'https://example.a28' },
  { id: 'a29', name: 'A29', year: 2020, dept: 'Health', memo: 'フルマラソン完走経験', url: 'https://example.a29' },
  { id: 'a30', name: 'A30', year: 2021, dept: 'Sports', memo: 'キャンプが趣味', url: 'https://example.a30' },
  { id: 'a31', name: 'A31', year: 2023, dept: 'AI', memo: 'プログラミングが趣味', url: 'https://example.a31' },
  { id: 'a32', name: 'A32', year: 2025, dept: 'Health', memo: 'サウナ好き', url: 'https://example.a32' },
  { id: 'a33', name: 'A33', year: 2019, dept: 'Game', memo: 'ダーツが得意', url: 'https://example.a33' },
  { id: 'a34', name: 'A34', year: 2026, dept: 'Sports', memo: '陸上部出身', url: 'https://example.a34' },
  { id: 'a35', name: 'A35', year: 2022, dept: 'Health', memo: '海外旅行が好き', url: 'https://example.a35' },
  { id: 'a36', name: 'A36', year: 2020, dept: 'AI', memo: '本屋巡りが趣味', url: 'https://example.a36' },
  { id: 'a37', name: 'A37', year: 2021, dept: 'Game', memo: 'パズルゲーム好き', url: 'https://example.a37' },
  { id: 'a38', name: 'A38', year: 2024, dept: 'Health', memo: 'ピラティス教室に通ってる', url: 'https://example.a38' },
  { id: 'a39', name: 'A39', year: 2025, dept: 'Sports', memo: '野球観戦が好き', url: 'https://example.a39' },
  { id: 'a40', name: 'A40', year: 2019, dept: 'AI', memo: '文房具マニア', url: 'https://example.a40' },
  { id: 'a41', name: 'A41', year: 2021, dept: 'Health', memo: 'ヘルシー料理が得意', url: 'https://example.a41' },
  { id: 'a42', name: 'A42', year: 2023, dept: 'Sports', memo: 'ジムに週4で通ってる', url: 'https://example.a42' },
  { id: 'a43', name: 'A43', year: 2022, dept: 'Game', memo: '旅行Vlogを撮っている', url: 'https://example.a43' },
  { id: 'a44', name: 'A44', year: 2026, dept: 'AI', memo: 'スタートアップが好き', url: 'https://example.a44' },
  { id: 'a45', name: 'A45', year: 2024, dept: 'Health', memo: 'ピアノを習っている', url: 'https://example.a45' },
  { id: 'a46', name: 'A46', year: 2020, dept: 'Sports', memo: 'ロードバイクで遠出', url: 'https://example.a46' },
  { id: 'a47', name: 'A47', year: 2025, dept: 'Game', memo: '料理配信をしている', url: 'https://example.a47' },
  { id: 'a48', name: 'A48', year: 2021, dept: 'AI', memo: 'ミニマリスト', url: 'https://example.a48' },
  { id: 'a49', name: 'A49', year: 2019, dept: 'Health', memo: '茶道を習っている', url: 'https://example.a49' },
  { id: 'a50', name: 'A50', year: 2022, dept: 'Sports', memo: 'eスポーツ観戦が好き', url: 'https://example.a50' },
];

// Process employees with colors and positions
export const EMPLOYEES: Employee[] = RAW_EMPLOYEES.map((emp) => ({
  ...emp,
  color: DEPT_COLORS[emp.dept],
  // ME is placed at camera front position, others get random positions
  position: emp.id === 'me' 
    ? [0, 0, SPHERE_RADIUS] as [number, number, number]
    : getRandomSpherePosition(SPHERE_RADIUS),
}));

// Get ME employee
export const ME = EMPLOYEES.find(emp => emp.id === 'me')!;

// Export constants
export { SPHERE_RADIUS, DEPT_COLORS };
