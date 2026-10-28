// ข้อมูลทำเนียบว่าที่ครูผู้ช่วย (Mock Leaderboard Data)
const MOCK_LEADERBOARD = [
  {
    rank: 1,
    name: "ครูฟ้าใส ใจรักสอน",
    major: "เอกปฐมวัย",
    area: "สพป.สงขลา เขต 1",
    scoreRate: 98.5,
    totalCorrect: 482,
    streak: 28,
    badge: "ว่าที่ครูผู้ช่วยระดับทองคำ",
    isVIP: true,
    avatar: "👩‍🏫"
  },
  {
    rank: 2,
    name: "ครูบอย สายคำนวณ",
    major: "เอกคณิตศาสตร์",
    area: "สพม.กทม. เขต 2",
    scoreRate: 97.2,
    totalCorrect: 460,
    streak: 24,
    badge: "เซียนกฎหมายการศึกษา",
    isVIP: true,
    avatar: "👨‍🏫"
  },
  {
    rank: 3,
    name: "ครูพลอย เสียงทอง",
    major: "เอกดนตรีสากล",
    area: "สพม.สงขลา สตูล",
    scoreRate: 96.0,
    totalCorrect: 445,
    streak: 21,
    badge: "เทพวิชาเอก",
    isVIP: true,
    avatar: "🎵"
  },
  {
    rank: 4,
    name: "ครูแมน แดนใต้",
    major: "เอกภาษาไทย",
    area: "สพป.สุราษฎร์ธานี เขต 1",
    scoreRate: 94.8,
    totalCorrect: 410,
    streak: 19,
    badge: "ผู้พิชิต Streak 15 วัน",
    isVIP: false,
    avatar: "🧑‍🏫"
  },
  {
    rank: 5,
    name: "ครูกานต์ คอมพิวเตอร์",
    major: "เอกคอมพิวเตอร์",
    area: "สพม.เชียงใหม่",
    scoreRate: 93.5,
    totalCorrect: 395,
    streak: 15,
    badge: "เซียนกฎหมายการศึกษา",
    isVIP: true,
    avatar: "💻"
  },
  {
    rank: 6,
    name: "ครูแนน วิทย์ปัง",
    major: "เอกวิทยาศาสตร์",
    area: "สพป.นครราชสีมา เขต 2",
    scoreRate: 91.2,
    totalCorrect: 370,
    streak: 12,
    badge: "ผู้พิชิต Streak 10 วัน",
    isVIP: false,
    avatar: "🔬"
  },
  {
    rank: 7,
    name: "ครูบาส กีตาร์โปร่ง",
    major: "เอกดนตรีสากล",
    area: "สพม.สงขลา สตูล",
    scoreRate: 90.0,
    totalCorrect: 350,
    streak: 11,
    badge: "ว่าที่ครูผู้ช่วยระดับเงิน",
    isVIP: false,
    avatar: "🎸"
  },
  {
    rank: 18,
    name: "คุณครู (คุณเอง)",
    major: "เอกดนตรีสากล",
    area: "สพม.สงขลา สตูล",
    scoreRate: 85.0,
    totalCorrect: 128,
    streak: 5,
    badge: "ว่าที่ครูผู้ช่วยระดับเงิน",
    isVIP: false,
    isCurrentPlayer: true,
    avatar: "⭐"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MOCK_LEADERBOARD };
}
