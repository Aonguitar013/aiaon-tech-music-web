import { getLineOrderUrl } from "@/lib/line";
import type { EduLang } from "@/lib/eduCatalog";

export type StorybookThemeKey = "indigo" | "pink" | "rose" | "purple" | "teal" | "amber";

export interface SeriesBookSummary {
  bookNo: number;
  sku: string;
  slug: string;
  status: "live" | "next" | "planned";
  emoji: string;
  characterTh: string;
  characterEn: string;
  titleTh: string;
  titleEn: string;
  topicTh: string;
  topicEn: string;
  theme: StorybookThemeKey;
  pairedWorkbookSku: string;
  pairedWorkbookSlug: string;
  pairedWorkbookNameTh: string;
  pairedWorkbookNameEn: string;
  pairedWorkbookDescTh: string;
  pairedWorkbookDescEn: string;
  pairPriceThb: number;
  regularPairThb: number;
  pairPriceUsd: string;
}

export interface StoryPageItem {
  pageNo: number;
  image: string;
  tagTh: string;
  tagEn: string;
  linesTh: string[];
  linesEn: string[];
}

export interface StorybookDialogicQuestion {
  emoji: string;
  th: string;
  en: string;
}

export interface StorybookGalleryItem {
  src: string;
  labelTh: string;
  labelEn: string;
}

export interface StorybookFaqItem {
  qTh: string;
  qEn: string;
  aTh: string;
  aEn: string;
}

export interface StorybookConfig {
  sku: string;
  slug: string;
  bookNo: number;
  theme: StorybookThemeKey;
  badgeTh: string;
  badgeEn: string;
  heroPrefixTh: string;
  heroPrefixEn: string;
  titleTh: string;
  titleEn: string;
  heroDescTh: string;
  heroDescEn: string;
  coverImage: string;
  coverAlt: string;
  freebieTitleTh: string;
  freebieTitleEn: string;
  freebieThUrl: string;
  freebieEnUrl: string;
  priceHomeThb: number;
  priceHomeRegularThb: number;
  priceHomeUsd: string;
  priceClassThb: number;
  priceClassRegularThb: number;
  priceClassUsd: string;
  homeBulletsTh: string[];
  classBulletsTh: string[];
  pages: StoryPageItem[];
  dialogicQuestions: StorybookDialogicQuestion[];
  galleryImages: StorybookGalleryItem[];
  faqs: StorybookFaqItem[];
}

export const SERIES_SEASON_1_BOOKS: SeriesBookSummary[] = [
  {
    bookNo: 1,
    sku: "EDU-ST01",
    slug: "st01",
    status: "live",
    emoji: "🐱",
    characterTh: "น้องดำ",
    characterEn: "Midnight",
    titleTh: "คืนที่ก้อนเมฆสีเทาหายไป",
    titleEn: "The Night the Gray Cloud Melted Away",
    topicTh: "คุมอารมณ์หงุดหงิดก่อนนอน",
    topicEn: "Calming Big Feelings",
    theme: "indigo",
    pairedWorkbookSku: "EDU-AC01",
    pairedWorkbookSlug: "ac01",
    pairedWorkbookNameTh: "สตูดิโอศิลปะ & พลังใจ SEL น้องดำ (32 หน้า)",
    pairedWorkbookNameEn: "Midnight's Art & Gentle SEL Studio (32 Pages)",
    pairedWorkbookDescTh: "จานสี 6 อารมณ์ + วาดรูป 4 ขั้น + ผสมแม่สี + หุ่นนิ้วมือ + แอปหายใจ 4-4-4",
    pairedWorkbookDescEn: "6-Feeling Wheel, 4-Step Drawing, Color Mixing & 4-4-4 Breathing App",
    pairPriceThb: 149,
    regularPairThb: 178,
    pairPriceUsd: "$6.99",
  },
  {
    bookNo: 2,
    sku: "EDU-ST02",
    slug: "st02",
    status: "live",
    emoji: "🪥",
    characterTh: "น้องชาบู",
    characterEn: "Shabu",
    titleTh: "ภารกิจปราบแมงกินฟันของน้องชาบู",
    titleEn: "Shabu's Sparkle-Tooth Mission",
    topicTh: "แปรงฟัน 2 นาที & สุขอนามัย",
    topicEn: "Happy Brushing & Hygiene",
    theme: "pink",
    pairedWorkbookSku: "EDU-BB01",
    pairedWorkbookSlug: "bb01",
    pairedWorkbookNameTh: "สมุด Busy Book แปรงฟัน & ลีลามือน้องชาบู (32 หน้า)",
    pairedWorkbookNameEn: "Shabu's Busy Book & Teeth Board (32 Pages)",
    pairedWorkbookDescTh: "ลีลามือ 6 หน้า + 45 การ์ดตีนตุ๊กแก + บอร์ดแปรงฟันไวท์บอร์ด + นาฬิกา 2 นาที",
    pairedWorkbookDescEn: "6 Tracing Pages, 45 Velcro Cards, Wipe-Clean Teeth Board & 2-Min Timer",
    pairPriceThb: 149,
    regularPairThb: 178,
    pairPriceUsd: "$6.99",
  },
  {
    bookNo: 3,
    sku: "EDU-ST03",
    slug: "st03",
    status: "live",
    emoji: "💖",
    characterTh: "แม่ใหญ่",
    characterEn: "Mama Mami",
    titleTh: "เช้าวันใหม่ใจเย็นของแม่ใหญ่",
    titleEn: "Mama Mami's Calm Morning Magic",
    topicTh: "กิจวัตรเช้า & เก็บของเล่น",
    topicEn: "Calm Morning & Tidy Up",
    theme: "rose",
    pairedWorkbookSku: "EDU-RT01",
    pairedWorkbookSlug: "rt01",
    pairedWorkbookNameTh: "ชุดสร้างวินัย & กิจวัตร 30 วัน แม่ใหญ่ (32 หน้า)",
    pairedWorkbookNameEn: "Mama Mami's 30-Day Routine Kit (32 Pages)",
    pairedWorkbookDescTh: "บอร์ดเช้า-เย็น-ก่อนนอน + 24 การ์ดตีนตุ๊กแก + ขวดโหล 20 ดาว + นาฬิกา 4 โหมด",
    pairedWorkbookDescEn: "Daily Routine Boards, 24 Velcro Cards, 20-Star Jar & 4-Mode Timer",
    pairPriceThb: 149,
    regularPairThb: 178,
    pairPriceUsd: "$6.99",
  },
  {
    bookNo: 4,
    sku: "EDU-ST04",
    slug: "st04",
    status: "live",
    emoji: "🥁",
    characterTh: "น้องข้าวต้ม",
    characterEn: "Khao Tom",
    titleTh: "จังหวะหัวใจของน้องข้าวต้ม",
    titleEn: "Khao Tom's Steady Heartbeat Drum",
    topicTh: "คุมพลังงานล้น & จังหวะดนตรี",
    topicEn: "Self-Control Through Rhythm",
    theme: "purple",
    pairedWorkbookSku: "EDU-MU01",
    pairedWorkbookSlug: "mu01",
    pairedWorkbookNameTh: "สนุกกับจังหวะและโน้ตดนตรีน้องข้าวต้ม (32 หน้า)",
    pairedWorkbookNameEn: "Khao Tom's Music & Rhythm Adventure (32 Pages)",
    pairedWorkbookDescTh: "32 หน้าดนตรีเด็กเล็ก + 6 แทร็กเสียงจริง 70/95 BPM + ทายเสียงเครื่องดนตรี",
    pairedWorkbookDescEn: "32-Page Music Workbook + 6 Real Audio Tracks & Instrument Quiz",
    pairPriceThb: 149,
    regularPairThb: 208,
    pairPriceUsd: "$7.99",
  },
  {
    bookNo: 5,
    sku: "EDU-ST05",
    slug: "st05",
    status: "live",
    emoji: "🎒",
    characterTh: "น้องบ๊อบ",
    characterEn: "Explorer Bob",
    titleTh: "วันแรกที่โรงเรียนของน้องบ๊อบ",
    titleEn: "Explorer Bob's Brave First Day",
    topicTh: "ความกล้าไป รร. & เพื่อนใหม่",
    topicEn: "Brave School Days & Friends",
    theme: "teal",
    pairedWorkbookSku: "EDU-VL01",
    pairedWorkbookSlug: "vl01",
    pairedWorkbookNameTh: "นักผจญภัยสายภาษา & Phonics น้องบ๊อบ (32 หน้า)",
    pairedWorkbookNameEn: "Bob's Visual Phonics & Vocabulary (32 Pages)",
    pairedWorkbookDescTh: "แผนที่เสียง A–Z + 36 คำศัพท์ + CVC Blending + 27 แฟลชการ์ด + กระดานเสียง",
    pairedWorkbookDescEn: "A–Z Phonics Soundboard, 36 Words, CVC Blending & 27 Flashcards",
    pairPriceThb: 149,
    regularPairThb: 178,
    pairPriceUsd: "$6.99",
  },
  {
    bookNo: 6,
    sku: "EDU-ST06",
    slug: "st06",
    status: "live",
    emoji: "🔍",
    characterTh: "น้องแซลมอน",
    characterEn: "Detective Salmon",
    titleTh: "นักสืบแซลมอนกับปริศนาที่หายไป",
    titleEn: "Detective Salmon's Patient Clue Hunt",
    topicTh: "สมาธิ การรอคอย & ไม่ยอมแพ้",
    topicEn: "Focus, Patience & Persistence",
    theme: "amber",
    pairedWorkbookSku: "EDU-EF01",
    pairedWorkbookSlug: "ef01",
    pairedWorkbookNameTh: "นักสืบสมองไว & EF น้องแซลมอน (32 หน้า)",
    pairedWorkbookNameEn: "Detective Salmon's Brain & EF Booster (32 Pages)",
    pairedWorkbookDescTh: "EF 5 ด้าน + โค้ดดิ้งไร้จอ + ซูโดกุภาพ 4×4 + นาฬิกา Focus Timer 5 นาที",
    pairedWorkbookDescEn: "5 Core EF Skills, Unplugged Coding, 4×4 Sudoku & 5-Min Focus Timer",
    pairPriceThb: 149,
    regularPairThb: 178,
    pairPriceUsd: "$6.99",
  },
];

export function getStorybookOrderLineUrl(params: {
  book: StorybookConfig;
  mode: "HOME" | "CLASS" | "PAIR";
  lang: EduLang;
}): string {
  const { book, mode, lang } = params;
  const summary = SERIES_SEASON_1_BOOKS.find((b) => b.sku === book.sku);

  if (mode === "PAIR" && summary) {
    const msg =
      lang === "th"
        ? `สวัสดีครับครูอ้น สนใจสั่งซื้อ "แพ็กคู่สุดคุ้ม" ชุดนิทาน + ใบงาน 32 หน้า (Home Edition):\n📖 นิทานภาพ [${book.sku}] ${book.titleTh} (16 หน้า TH+EN)\n🎨 คู่ใบงาน [${summary.pairedWorkbookSku}] ${summary.pairedWorkbookNameTh}\n💰 ราคาแพ็กคู่พิเศษ: ${summary.pairPriceThb} ฿ (จากปกติ ${summary.regularPairThb} ฿)\nรบกวนขอเลขบัญชี / PromptPay QR เพื่อรับไฟล์ PDF ทันทีครับ 🙏`
        : `Hi Teacher Aon! I'd like to order the Story + Workbook Pair Pack (Home Edition):\n📖 [${book.sku}] ${book.titleEn} (16 Pages TH+EN)\n🎨 [${summary.pairedWorkbookSku}] ${summary.pairedWorkbookNameEn}\n💰 Pair Price: ${summary.pairPriceThb} THB (${summary.pairPriceUsd})\nPlease share payment instructions!`;
    return getLineOrderUrl(msg);
  }

  if (mode === "CLASS") {
    const msg =
      lang === "th"
        ? `สวัสดีครับครูอ้น สนใจสั่งซื้อนิทานภาพ iAon Edu-Verse:\n🏫 "[${book.sku}] ${book.titleTh} — CLASS EDITION (สิทธิ์ครู 1 ห้องเรียน • 16 หน้าสีเต็มรูปแบบ TH+EN)"\n💰 ราคา: ${book.priceClassThb} ฿\nรบกวนขอเลขบัญชี / PromptPay QR เพื่อรับไฟล์ PDF ทันทีครับ 🙏`
        : `Hi Teacher Aon! I'd like to order:\n🏫 "[${book.sku}] ${book.titleEn} — CLASS EDITION (16-Page Full-Color Bilingual PDF)"\n💰 Price: ${book.priceClassThb} THB (${book.priceClassUsd})\nPlease send payment instructions!`;
    return getLineOrderUrl(msg);
  }

  const msg =
    lang === "th"
      ? `สวัสดีครับครูอ้น สนใจสั่งซื้อนิทานภาพ iAon Edu-Verse:\n🏠 "[${book.sku}] ${book.titleTh} — HOME EDITION (16 หน้าสีเต็มรูปแบบ TH+EN + เว็บเสียงเล่านิทานฟรี)"\n💰 ราคา: ${book.priceHomeThb} ฿\nรบกวนขอเลขบัญชี / PromptPay QR เพื่อรับไฟล์ PDF ทันทีครับ 🙏`
      : `Hi Teacher Aon! I'd like to order:\n🏠 "[${book.sku}] ${book.titleEn} — HOME EDITION (16-Page Full-Color Bilingual PDF)"\n💰 Price: ${book.priceHomeThb} THB (${book.priceHomeUsd})\nPlease send payment instructions!`;
  return getLineOrderUrl(msg);
}

export function getNextBookWaitlistLineUrl(nextBook: SeriesBookSummary, lang: EduLang): string {
  const msg =
    lang === "th"
      ? `สวัสดีครับครูอ้น ขอลงชื่อรับแจ้งเตือนนิทานเล่มถัดไป [${nextBook.sku}] "${nextBook.titleTh}" (${nextBook.characterTh}) เมื่อเปิดตัว + ขอรับสิทธิ์ส่วนลดเปิดตัว 20฿ ด้วยครับ! 🐾`
      : `Hi Teacher Aon! Please notify me when Book ${nextBook.bookNo} [${nextBook.sku}] "${nextBook.titleEn}" launches so I can grab the early-bird launch discount! 🐾`;
  return getLineOrderUrl(msg);
}

export const ST01_CONFIG: StorybookConfig = {
  sku: "EDU-ST01",
  slug: "st01",
  bookNo: 1,
  theme: "indigo",
  badgeTh: "EDU-ST01 • ชุดนิทานพลังใจแก๊ง 6 แมว (เล่มที่ 1) • วัย 3–6 ปี",
  badgeEn: "EDU-ST01 • The 6 Cats Gentle Heart Series (Book 1) • Ages 3–6",
  heroPrefixTh: "นิทานก่อนนอน:",
  heroPrefixEn: "Bedtime Story:",
  titleTh: "คืนที่ก้อนเมฆสีเทาหายไป",
  titleEn: "The Night the Gray Cloud Melted Away",
  heroDescTh:
    "เปลี่ยนคืนที่ลูกหงุดหงิดงอแงให้กลายเป็นช่วงเวลากอดอุ่นก่อนนอน! นิทานภาพสีน้ำ 16 หน้าของน้องดำกับแม่ใหญ่ สอนลูกดูแลอารมณ์ด้วยเวทมนตร์หายใจสายรุ้ง 4-4-4 พร้อมระบบอ่านออกเสียง TH/EN ฟรีไม่มีโฆษณา",
  heroDescEn:
    "Turn grumpy evenings into warm bedtime cuddles! A 16-page watercolor SEL picture book with Midnight & Mama Mami teaching 4-4-4 Rainbow Breathing — paired with free ad-free audio narration!",
  coverImage: "/edu/st01/01_cover.webp",
  coverAlt: "EDU-ST01 Book Cover — The Night the Gray Cloud Melted Away",
  freebieTitleTh:
    "🎁 ดาวน์โหลดตัวอย่างนิทานฟรี 5 หน้า (ปก + หน้า 1 + แม่ใหญ่โคมไฟจันทร์ + เป่าสายรุ้ง + ปกหลังแผนที่ 6 เล่ม)",
  freebieTitleEn:
    "🎁 Download Free 5-Page Storybook Sample (Cover + 3 Key Spreads + 6-Book Collection Map)",
  freebieThUrl: "/edu/st01/EDU-ST01_Freebie_5Pages_TH.pdf",
  freebieEnUrl: "/edu/st01/EDU-ST01_Freebie_5Pages_EN.pdf",
  priceHomeThb: 79,
  priceHomeRegularThb: 129,
  priceHomeUsd: "$3.99",
  priceClassThb: 159,
  priceClassRegularThb: 249,
  priceClassUsd: "$6.99",
  homeBulletsTh: [
    "นิทานภาพสีน้ำเต็มเล่ม 16 หน้า ครบทั้งภาษาไทย (ฟอนต์ Mali) และภาษาอังกฤษ",
    "ปริ้นท์เย็บเล่ม A4/US Letter หรือเปิดอ่านบน iPad ให้ลูกก่อนนอนได้ไม่จำกัด",
    "ครบ 3 คำถามชวนคุยก่อนนอน (Dialogic Reading) + หน้าวาดภาพต่อยอด P15",
    "ใช้งานเสียงเล่านิทาน TH/EN & หายใจ 4-4-4 บน /edu/st01 ฟรีตลอดชีพ",
  ],
  classBulletsTh: [
    "ลิขสิทธิ์ครู 1 ท่าน เปิดขึ้นจอทีวี/โปรเจกเตอร์เล่านิทานหน้าห้องเรียนได้ไม่จำกัด",
    "ปริ้นท์หน้ากิจกรรมวาดภาพ P15 แจกนักเรียน อ.1–อ.3 ได้ทั้งห้อง (30–40 คน)",
    "มีครบทั้งภาษาไทยและภาษาอังกฤษ เหมาะกับห้องเรียน EP / Bilingual / มุมสงบใจ SEL",
    "เปิดเสียงเล่านิทาน TH/EN & หายใจสายรุ้ง 4-4-4 หน้าห้องเรียนได้ทันที ไร้โฆษณา",
  ],
  pages: [
    {
      pageNo: 3,
      image: "/edu/st01/02_p03.webp",
      tagTh: "หน้า 1 • ก้อนเมฆปริศนา",
      tagEn: "Page 1 • The Little Gray Cloud",
      linesTh: [
        "เย็นวันหนึ่ง เมื่อท้องฟ้าเปลี่ยนเป็นสีส้มอ่อน",
        "น้องดำเดินกลับเข้าบ้านอย่างเงียบๆ...",
        "แต่เอ๊ะ! เหนือหมวกเบเรต์สีม่วงของน้องดำ",
        'มี "ก้อนเมฆสีเทาจิ๋ว" ลอยตามมาด้วย!',
      ],
      linesEn: [
        "One evening, as the sky turned soft tangerine,",
        "little Midnight walked quietly through the front door...",
        "Wait! Floating right above her lavender beret",
        "was a tiny gray cloud!",
      ],
    },
    {
      pageNo: 4,
      image: "/edu/st01/03_p04.webp",
      tagTh: "หน้า 2 • ทำไมเมฆถึงมาอยู่ตรงนี้?",
      tagEn: "Page 2 • Where Did It Come From?",
      linesTh: [
        "ก้อนเมฆสีเทาไม่ได้ตกลงมาจากท้องฟ้าหรอกนะ",
        "แต่มันเกิดขึ้นตอนแก้วน้ำล้างพู่กัน",
        "หกเลอะภาพวาดที่น้องดำตั้งใจทำ",
        "หัวใจน้องดำทั้งเสียใจ หงุดหงิด จนเกือบร้องไห้",
      ],
      linesEn: [
        "The gray cloud didn't fall from the sky.",
        "It appeared when Midnight's paint cup spilled",
        "right across her favorite rainbow drawing.",
        "Her little heart felt heavy and ready to cry.",
      ],
    },
    {
      pageNo: 5,
      image: "/edu/st01/04_p05.webp",
      tagTh: "หน้า 3 • ก้อนเมฆยิ่งพองโต",
      tagEn: "Page 3 • Growing Bigger and Bigger",
      linesTh: [
        "น้องดำกอดอก ก้มหน้า ไม่ยอมพูดกับใครเลย",
        "แต่ยิ่งน้องดำเก็บความหงุดหงิดไว้คนเดียว",
        "ก้อนเมฆสีเทาก็ยิ่งพองใหญ่ขึ้น... ใหญ่ขึ้น...",
        "จนเกือบคับห้องนอนไปหมดแล้ว!",
      ],
      linesEn: [
        "Midnight crossed her paws and didn't say a word.",
        "Yet the tighter she held her grumpy feelings inside,",
        "the bigger and puffier the gray cloud grew—",
        "almost filling her whole cozy bedroom!",
      ],
    },
    {
      pageNo: 6,
      image: "/edu/st01/05_p06.webp",
      tagTh: "หน้า 4 • แสงอุ่นจากแม่ใหญ่",
      tagEn: "Page 4 • Mama Mami's Warm Glow",
      linesTh: [
        "ก๊อก ก๊อก... แม่ใหญ่เดินเข้ามาพร้อมโคมไฟดวงจันทร์",
        "แม่ใหญ่ไม่ได้ดุ และไม่ได้ไล่ก้อนเมฆสีเทาหนีไป",
        "แม่ใหญ่ยิ้มอ่อนโยนแล้วกระซิบเบาๆ ว่า",
        '"เมฆสีเทากำลังบอกว่าหัวใจหนูเหนื่อยอยู่นะลูก"',
      ],
      linesEn: [
        "Knock, knock... Mama Mami came in with a moon lantern.",
        "She didn't scold Midnight or shoo the cloud away.",
        "She smiled softly and whispered,",
        '"Gray clouds just mean your heart feels tired, sweetheart."',
      ],
    },
    {
      pageNo: 7,
      image: "/edu/st01/06_p07.webp",
      tagTh: "หน้า 5 • เวทมนตร์สายรุ้ง 4-4-4",
      tagEn: "Page 5 • The 4-4-4 Rainbow Magic",
      linesTh: [
        "แม่ใหญ่ชวนน้องดำมานั่งเคียงข้างกัน",
        "บนพรมนุ่มๆ ริมหน้าต่างใต้แสงดาว",
        '"ลูกอยากลองใช้เวทมนตร์หายใจสายรุ้ง 4-4-4',
        'คุยกับก้อนเมฆสีเทาไหมจ๊ะ? มาทำพร้อมแม่นะ"',
      ],
      linesEn: [
        "Mama Mami invited Midnight to sit beside her",
        "on the cozy rug by the starry window.",
        '"Would you like to try our 4-4-4 Rainbow Breathing',
        'to help your gray cloud feel lighter?"',
      ],
    },
    {
      pageNo: 8,
      image: "/edu/st01/07_p08.webp",
      tagTh: "หน้า 6 • ขั้นที่ 1 สูดกลิ่นดอกไม้ (4 วิ)",
      tagEn: "Page 6 • Step 1: Smell the Flower (4s)",
      linesTh: [
        "ขั้นที่ 1: สูดหายใจเข้าช้าๆ เหมือนดมดอกไม้หอม",
        "นับในใจเบาๆ... 1... 2... 3... 4...",
        "กลิ่นหอมละมุนในจินตนาการ",
        "ทำให้ก้อนเมฆสีเทาเริ่มนุ่มฟูเหมือนสำลี",
      ],
      linesEn: [
        "Step 1: Breathe in slowly like smelling a sweet flower.",
        "Count gently inside: 1... 2... 3... 4...",
        "The soft imaginary petals made the heavy cloud",
        "turn light and fluffy as cotton.",
      ],
    },
    {
      pageNo: 9,
      image: "/edu/st01/08_p09.webp",
      tagTh: "หน้า 7 • ขั้นที่ 2 กอดลมไว้เบาๆ (4 วิ)",
      tagEn: "Page 7 • Step 2: Hold Gently (4s)",
      linesTh: [
        "ขั้นที่ 2: กอดลมหายใจอุ่นๆ ไว้ในพุงเบาๆ",
        "นับช้าๆ ไปด้วยกัน... 1... 2... 3... 4...",
        "ตึกตัก... ตึกตัก... หัวใจที่เต้นแรงของน้องดำ",
        "เริ่มสงบลงเหมือนคลื่นทะเลใส",
      ],
      linesEn: [
        "Step 2: Hug that warm breath gently in your tummy.",
        "Count slowly together: 1... 2... 3... 4...",
        "Thump-thump... Midnight's racing heartbeat",
        "began to calm like gentle ocean waves.",
      ],
    },
    {
      pageNo: 10,
      image: "/edu/st01/09_p10.webp",
      tagTh: "หน้า 8 • ขั้นที่ 3 เป่าเทียนช้าๆ (4 วิ)",
      tagEn: "Page 8 • Step 3: Blow the Candle (4s)",
      linesTh: [
        "ขั้นที่ 3: ผ่อนลมหายใจออกเหมือนเป่าเทียนวันเกิด",
        "ฟู่ววว... ช้าๆ... 1... 2... 3... 4...",
        "ว้าว! ละอองแสงสีรุ้งระยิบระยับ",
        "ค่อยๆ ลอยออกมาจากลมหายใจของน้องดำ!",
      ],
      linesEn: [
        "Step 3: Breathe out slowly like a birthday candle.",
        "Whoooosh... 1... 2... 3... 4...",
        "Whoa! Sparkling rainbow mist floated gently",
        "out from Midnight's breath!",
      ],
    },
    {
      pageNo: 11,
      image: "/edu/st01/10_p11.webp",
      tagTh: "หน้า 9 • ก้อนเมฆกลายเป็นดาวทอง",
      tagEn: "Page 9 • From Cloud to Golden Stars",
      linesTh: [
        "พอหายใจสายรุ้งครบ 3 รอบ ปาฏิหาริย์ก็เกิดขึ้น!",
        "ก้อนเมฆสีเทาค่อยๆ ละลายหายไปในอากาศ",
        "กลายเป็นดวงดาวสีทองจิ๋วๆ",
        "ลอยวิบวับอบอุ่นไปทั่วทั้งห้องนอน",
      ],
      linesEn: [
        "After three slow rainbow breaths, magic happened!",
        "The heavy gray cloud softly melted away,",
        "turning into dozens of tiny golden stars",
        "twinkling warmly across the whole room.",
      ],
    },
    {
      pageNo: 12,
      image: "/edu/st01/11_p12.webp",
      tagTh: "หน้า 10 • กอดอุ่นและเริ่มใหม่ได้เสมอ",
      tagEn: "Page 10 • A Warm Hug & A Fresh Start",
      linesTh: [
        "น้องดำยิ้มกว้าง แล้วโผเข้ากอดแม่ใหญ่แน่นๆ",
        '"ขอบคุณครับแม่ใหญ่! พรุ่งนี้หนูจะวาดสายรุ้งใหม่!"',
        "แม่ใหญ่หอมหน้าผากเบาๆ แล้วบอกว่า",
        '"เก่งมากลูก ทุกความผิดพลาดเริ่มใหม่ได้เสมอจ้ะ"',
      ],
      linesEn: [
        "Midnight beamed and gave Mama Mami a huge hug.",
        '"Thank you, Mama! Tomorrow I\'ll paint a brighter rainbow!"',
        "Mama Mami kissed her forehead softly.",
        '"I\'m so proud of you. We can always try again."',
      ],
    },
    {
      pageNo: 13,
      image: "/edu/st01/12_p13.webp",
      tagTh: "หน้า 11 • ฝันดีนะเจ้าแมวน้อย",
      tagEn: "Page 11 • Sweet Dreams, Little Artist",
      linesTh: [
        "คืนนี้น้องดำห่มผ้าลายดาวหลับปุ๋ยใต้แสงจันทร์",
        "เหนือหมอนไม่มีก้อนเมฆสีเทาอีกต่อไปแล้ว",
        "มีเพียงหัวใจที่โล่ง เบา และอุ่นสบาย",
        "ฝันดีนะน้องดำ... และฝันดีนะเด็กเก่งของแม่",
      ],
      linesEn: [
        "Tonight, Midnight slept cozily under her starry quilt.",
        "No gray cloud lingered above her pillow anymore—",
        "only a peaceful, light, and happy heart.",
        "Goodnight, little Midnight... and sweet dreams to you.",
      ],
    },
  ],
  dialogicQuestions: [
    {
      emoji: "☁️",
      th: "1. วันนี้มีเรื่องอะไรที่ทำให้หัวใจของหนูมี 'ก้อนเมฆสีเทา' เกิดขึ้นบ้างไหมครับ?",
      en: "1. Did anything today bring a little 'gray cloud' into your heart?",
    },
    {
      emoji: "💛",
      th: "2. ถ้าน้องดำทำน้ำหกใส่ภาพวาดอีก หนูอยากให้กำลังใจน้องดำว่าอะไรดี?",
      en: "2. If Midnight spills her paint again tomorrow, what kind words would you tell her?",
    },
    {
      emoji: "🌈",
      th: "3. ก่อนหลับคืนนี้ เรามาลอง 'หายใจสายรุ้ง 4-4-4' ด้วยกันสัก 2 รอบดีไหม?",
      en: "3. Before we fall asleep tonight, shall we practice 2 rounds of 4-4-4 Rainbow Breathing together?",
    },
  ],
  galleryImages: [
    {
      src: "/edu/st01/mockup-01-cover.webp",
      labelTh: "ปกหน้า & จุดเด่นนิทานก่อนนอน 16 หน้า (เล่มที่ 1)",
      labelEn: "Front Cover & 16-Page Highlights (Book 1)",
    },
    {
      src: "/edu/st01/mockup-02-spreads.webp",
      labelTh: "ส่องภาพประกอบสีน้ำจริงข้างใน (12 ภาพเต็มเล่ม)",
      labelEn: "Inside Watercolor Illustrations (12 Full Plates)",
    },
    {
      src: "/edu/st01/mockup-03-audio-qr.webp",
      labelTh: "นิทานกระดาษคู่ Hybrid QR เสียงเล่านิทาน TH/EN",
      labelEn: "Hybrid QR Audio Storybook & 4-4-4 Breathing",
    },
    {
      src: "/edu/st01/mockup-04-editions.webp",
      labelTh: "เทียบสิทธิ์ Home (79฿) vs Class (159฿) + แพ็กคู่ 149฿",
      labelEn: "Home ($3.99) vs Class ($6.99) + Pair Bundle",
    },
  ],
  faqs: [
    {
      qTh: "ชุดนิทาน EDU-ST01 ได้ไฟล์อะไรบ้าง? อ่านบน iPad หรือปริ้นท์เป็นเล่มได้ไหม?",
      qEn: "What files are included? Can I read on iPad or print it out?",
      aTh: "ได้รับไฟล์ PDF สีเต็มรูปแบบ 16 หน้า ครบทั้งเวอร์ชันภาษาไทย (ฟอนต์ Mali อ่านง่าย) และภาษาอังกฤษ (ฟอนต์ Quicksand) ครับ จะเปิดอ่านบน iPad/แท็บเล็ตก่อนนอน หรือปริ้นท์เย็บเล่ม A4/US Letter ก็คมชัดสวยงาม 100% พร้อมเปิดเสียงเล่านิทานฟรีบนหน้า /edu/st01 ครับ",
      aEn: "You get crisp 16-page Full-Color PDFs in both Thai and English, formatted for both A4 & US Letter printing or cozy bedtime reading on iPad/tablets, plus free lifetime access to this /edu/st01 audio companion.",
    },
    {
      qTh: "ต่างจากชุดใบงาน EDU-AC01 (น้องดำศิลปะ & SEL) อย่างไร? แพ็กคู่ 149฿ คุ้มไหม?",
      qEn: "How is EDU-ST01 different from EDU-AC01? Is the Pair Pack worth it?",
      aTh: "EDU-ST01 เป็น 'หนังสือนิทานภาพก่อนนอน 16 หน้า' เน้นเล่านิทานสร้างความอบอุ่นและสอนหายใจ 4-4-4 ส่วน EDU-AC01 เป็น 'สมุดใบงานกิจกรรม 32 หน้า' (วาดรูป 4 ขั้น ผสมสี หุ่นนิ้วมือ การ์ด SEL) แพ็กคู่ 149฿ (จากปกติ 178฿) ได้ทั้งนิทานก่อนนอนและใบงานทำตอนกลางวัน ครบวงจรที่สุดครับ",
      aEn: "EDU-ST01 is a 16-page illustrated bedtime picture book, while EDU-AC01 is a 32-page hands-on art & SEL activity workbook. The Pair Pack bundles both together at a discount!",
    },
  ],
};

export const ST02_CONFIG: StorybookConfig = {
  sku: "EDU-ST02",
  slug: "st02",
  bookNo: 2,
  theme: "pink",
  badgeTh: "EDU-ST02 • ชุดนิทานพลังใจแก๊ง 6 แมว (เล่มที่ 2) • วัย 3–6 ปี",
  badgeEn: "EDU-ST02 • The 6 Cats Gentle Heart Series (Book 2) • Ages 3–6",
  heroPrefixTh: "นิทานแปรงฟัน:",
  heroPrefixEn: "Brushing Story:",
  titleTh: "ภารกิจปราบแมงกินฟันของน้องชาบู",
  titleEn: "Shabu's Sparkle-Tooth Mission",
  heroDescTh:
    "เปลี่ยนศึกบังคับแปรงฟันก่อนนอนให้กลายเป็นเกมกัปตันสุดสนุก! นิทานภาพสีน้ำ 16 หน้าของน้องชาบูกับแม่ใหญ่ พาทำภารกิจฟองดาว 3 ด่านครบ 2 นาที พร้อมเสียงเล่านิทาน TH/EN และนาฬิกาแปรงฟันฟรีไร้โฆษณา",
  heroDescEn:
    "Turn bedtime brushing battles into a joyful 2-minute captain mission! A 16-page watercolor picture book with Shabu & Mama Mami — paired with free bilingual audio narration and a 3-stage 2-minute brush timer!",
  coverImage: "/edu/st02/01_cover.webp",
  coverAlt: "EDU-ST02 Book Cover — Shabu's Sparkle-Tooth Mission",
  freebieTitleTh:
    "🎁 ดาวน์โหลดตัวอย่างนิทานฟรี 5 หน้า (ปก + หน้า 1 + แปรงวิเศษฟองดาว + บ้วนน้ำปิ๊ง + ปกหลังแผนที่ 6 เล่ม)",
  freebieTitleEn:
    "🎁 Download Free 5-Page Storybook Sample (Cover + 3 Key Spreads + 6-Book Collection Map)",
  freebieThUrl: "/edu/st02/EDU-ST02_Freebie_5Pages_TH.pdf",
  freebieEnUrl: "/edu/st02/EDU-ST02_Freebie_5Pages_EN.pdf",
  priceHomeThb: 79,
  priceHomeRegularThb: 129,
  priceHomeUsd: "$3.99",
  priceClassThb: 159,
  priceClassRegularThb: 249,
  priceClassUsd: "$6.99",
  homeBulletsTh: [
    "นิทานภาพสีน้ำเต็มเล่ม 16 หน้า ครบทั้งภาษาไทย (ฟอนต์ Mali) และภาษาอังกฤษ",
    "ปริ้นท์เย็บเล่ม A4/US Letter หรือเปิดอ่านบน iPad ให้ลูกก่อนแปรงฟันได้ไม่จำกัด",
    "ครบ 3 คำถามชวนคุย + หน้ากิจกรรมออกแบบแปรงวิเศษ P15",
    "ใช้งานเสียงเล่านิทาน TH/EN & นาฬิกาแปรงฟัน 2 นาทีบน /edu/st02 ฟรีตลอดชีพ",
  ],
  classBulletsTh: [
    "ลิขสิทธิ์ครู 1 ท่าน เปิดขึ้นจอทีวี/โปรเจกเตอร์เล่านิทานหน้าห้องเรียนได้ไม่จำกัด",
    "ปริ้นท์หน้ากิจกรรม P15 แจกนักเรียน อ.1–อ.3 ได้ทั้งห้อง (30–40 คน)",
    "มีครบทั้งภาษาไทยและภาษาอังกฤษ เหมาะกับหน่วยการเรียนรู้ 'ฟันสะอาด' / ห้อง EP",
    "เปิดเสียงเล่านิทาน TH/EN & นาฬิกาจับเวลา 2 นาทีหน้าห้องเรียนได้ทันที ไร้โฆษณา",
  ],
  pages: [
    {
      pageNo: 3,
      image: "/edu/st02/02_p03.webp",
      tagTh: "หน้า 1 • คุกกี้น้ำผึ้งแสนอร่อย",
      tagEn: "Page 1 • The Yummy Honey Cookie",
      linesTh: [
        "หลังอาหารเย็นวันนี้ น้องชาบูยิ้มแก้มตุ่ย",
        "เพราะเพิ่งกินคุกกี้น้ำผึ้งกรอบๆ ไปตั้งสองชิ้น!",
        '"อื้มมม... หวานอร่อยที่สุดเลย!"',
        "น้องชาบูเลียปากแผล็บ แล้ววิ่งปรู๊ดไปเล่นต่อทันที",
      ],
      linesEn: [
        "After dinner tonight, Shabu grinned from ear to ear.",
        "She had just munched two crunchy honey cookies!",
        '"Mmm... so sweet and yummy!"',
        "Shabu licked her whiskers and zoomed off to play.",
      ],
    },
    {
      pageNo: 4,
      image: "/edu/st02/03_p04.webp",
      tagTh: "หน้า 2 • ไม่อยากแปรงฟันเลย!",
      tagEn: "Page 2 • Not Brush Time Yet!",
      linesTh: [
        "พอได้เวลาเข้านอน แม่ใหญ่เรียกเสียงนุ่ม",
        '"ชาบูลูก มาแปรงฟันก่อนนอนกันจ้า"',
        "แต่น้องชาบูรีบมุดไปซ่อนหลังหมอนอิงใบโต",
        '"ไม่เอาๆ! หนูง่วงแล้ว แปรงฟันมันน่าเบื่อออก!"',
      ],
      linesEn: [
        "At bedtime, Mama Mami called in a gentle voice,",
        '"Shabu sweetheart, time to brush our teeth!"',
        "But Shabu quickly hid behind a big fluffy cushion.",
        '"Nooo! I\'m sleepy—brushing takes too long!"',
      ],
    },
    {
      pageNo: 5,
      image: "/edu/st02/04_p05.webp",
      tagTh: "หน้า 3 • แก๊งฝุ่นน้ำตาลจอมป่วน",
      tagEn: "Page 3 • The Tiny Sugar-Bug Party",
      linesTh: [
        "ทันใดนั้น น้องชาบูรู้สึกจั๊กจี้แปลกๆ ในปาก!",
        "เพราะเศษน้ำตาลหวานๆ ที่ติดอยู่ตามซอกฟัน",
        'เรียก "แก๊งฝุ่นน้ำตาลจิ๋ว" ตัวป่วนสีม่วงกลมๆ',
        "ออกมาจัดปาร์ตี้เต้นดึ๋งๆ เหนียวหนึบเต็มไปหมด!",
      ],
      linesEn: [
        "Suddenly, Shabu felt a funny tickle on her teeth!",
        "The sticky honey crumbs left behind",
        "had invited tiny, silly purple Sugar Bugs",
        "to throw a bouncy sticky party inside her mouth!",
      ],
    },
    {
      pageNo: 6,
      image: "/edu/st02/05_p06.webp",
      tagTh: "หน้า 4 • แปรงวิเศษฟองดาวของแม่ใหญ่",
      tagEn: "Page 4 • Mama Mami's Star-Bubble Brush",
      linesTh: [
        "แม่ใหญ่ไม่ได้ดุ และไม่ได้บังคับน้องชาบูเลย",
        'แต่แม่ใหญ่ชู "แปรงวิเศษฟองดาว" สีชมพูวิบวับ',
        "พร้อมนาฬิกาทรายสีทองที่ส่องแสงอุ่นๆ แล้วกระซิบว่า",
        '"กัปตันชาบู... พร้อมออกภารกิจ 3 ด่านหรือยังจ๊ะ?"',
      ],
      linesEn: [
        "Mama Mami didn't scold or hurry Shabu at all.",
        "Instead, she held up a sparkling pink Star-Bubble Brush",
        "and a glowing golden two-minute sandglass.",
        '"Captain Shabu... ready for our 3-Stage Mission?"',
      ],
    },
    {
      pageNo: 7,
      image: "/edu/st02/06_p07.webp",
      tagTh: "หน้า 5 • แปลงร่างเป็นกัปตันชาบู!",
      tagEn: "Page 5 • Captain Shabu Reporting!",
      linesTh: [
        "ตาน้องชาบูเป็นประกายวิ้ง! รีบกระโดดขึ้นเก้าอี้ไม้",
        "บีบยาสีฟันกลิ่นสตรอว์เบอร์รีจิ๋วเท่าเม็ดถั่วเขียว",
        '"รับทราบครับแม่ใหญ่! กัปตันชาบูพร้อมลุยแล้ว!"',
        "แม่ใหญ่พลิกนาฬิกาทราย 2 นาที... เริ่มภารกิจได้!",
      ],
      linesEn: [
        "Shabu's eyes sparkled! She hopped onto her wooden stool",
        "and squeezed a tiny pea-sized dot of berry toothpaste.",
        '"Aye-aye, Mama! Captain Shabu is ready!"',
        "Mama flipped the 2-minute timer—mission start!",
      ],
    },
    {
      pageNo: 8,
      image: "/edu/st02/07_p08.webp",
      tagTh: "หน้า 6 • ด่านที่ 1 วนเป็นวงกลมข้างนอก!",
      tagEn: "Page 6 • Stage 1: Sparkle Circles Outside!",
      linesTh: [
        "ด่านที่ 1: ปราบแก๊งฝุ่นน้ำตาลที่ฟันหน้าและข้างนอก!",
        '"ฉึก ฉึก ซ่าาา... วนเป็นวงกลมเบาๆ นะลูก"',
        "ฟองสีชมพูวิ้งๆ แตกป๊อปแป๊ะหอมกลิ่นเบอร์รี",
        "เจ้าฝุ่นน้ำตาลตัวแรกร้องจ๊าก กระเด็นไปเลย!",
      ],
      linesEn: [
        "Stage 1: Sweep the front and outside teeth!",
        '"Swish, swish, circle-round—gentle as a cloud!"',
        "Berry-scented star bubbles popped with a sparkle,",
        "sending the first silly Sugar Bugs tumbling away!",
      ],
    },
    {
      pageNo: 9,
      image: "/edu/st02/08_p09.webp",
      tagTh: "หน้า 7 • ด่านที่ 2 ถูฟันกรามข้างในให้ครบ!",
      tagEn: "Page 7 • Stage 2: Scrub the Back Molars!",
      linesTh: [
        'ด่านที่ 2: อ้าปากกว้างๆ เหมือนสิงโต "อ้าาา!"',
        '"จิ๊ก จิ๊ก ฟู่... ถูไป-ถูมาที่ฟันกรามด้านใน!"',
        "ไม่ว่าแก๊งฝุ่นน้ำตาลจะแอบซ่อนมุมไหนลึกแค่ไหน",
        "แปรงวิเศษของกัปตันชาบูก็กวาดเกลี้ยงทุกซี่!",
      ],
      linesEn: [
        'Stage 2: Open wide like a friendly lion—"Aaaah!"',
        '"Scrub, scrub, back and forth on the sleepy back teeth!"',
        "No matter which cozy corner the Sugar Bugs hid in,",
        "Captain Shabu's magic brush swept every single one!",
      ],
    },
    {
      pageNo: 10,
      image: "/edu/st02/09_p10.webp",
      tagTh: "หน้า 8 • ด่านที่ 3 แปรงลิ้นและบ้วนน้ำวิ้ง!",
      tagEn: "Page 8 • Stage 3: Brush Tongue & Rinse Clean!",
      linesTh: [
        "ด่านที่ 3: ปัดลิ้นเบาๆ 3 ที แล้วกลั้วน้ำใสๆ",
        '"กลั้ว กลั้ว... บ้วนฟองดาวออกไปเลย ปิ๊ง!"',
        "เม็ดทรายสีทองเม็ดสุดท้ายไหลลงครบ 2 นาทีพอดี",
        "เจ้าแก๊งฝุ่นน้ำตาลปลิววับหายไปกับสายน้ำหมดแล้ว!",
      ],
      linesEn: [
        "Stage 3: Three gentle sweeps on the tongue, then rinse!",
        '"Swish, swish... whoosh go the starry bubbles!"',
        "Just as the last golden grain of sand fell at 2 minutes,",
        "every last Sugar Bug waved goodbye and vanished!",
      ],
    },
    {
      pageNo: 11,
      image: "/edu/st02/10_p11.webp",
      tagTh: "หน้า 9 • ยิ้มแฉ่งฟันขาวเป็นประกายดาว!",
      tagEn: "Page 9 • A Sparkling Star-Bright Smile!",
      linesTh: [
        "น้องชาบูฉีกยิ้มกว้างส่องกระจกดูผลงานตัวเอง",
        "ว้าว! ฟันทุกซี่ขาวสะอาด ส่องประกายวิ้งงงเหมือนดาว!",
        "ปากหอมสดชื่น ไม่มีเจ้าฝุ่นน้ำตาลกวนใจอีกแล้ว",
        '"แม่ใหญ่ดูสิ! ฟันหนูวิบวับเหมือนเพชรเลย!"',
      ],
      linesEn: [
        "Shabu beamed a giant smile into the bathroom mirror.",
        "Whoa! Every tooth shone bright and clean like stars!",
        "Her breath felt minty-fresh, with zero sticky bugs left.",
        '"Look, Mama! My teeth sparkle like tiny diamonds!"',
      ],
    },
    {
      pageNo: 12,
      image: "/edu/st02/11_p12.webp",
      tagTh: "หน้า 10 • กอดอุ่นและดาวรางวัลกัปตัน",
      tagEn: "Page 10 • Warm Hug & Captain's Star",
      linesTh: [
        "แม่ใหญ่ยิ้มปลื้มใจ โผเข้ากอดน้องชาบูแน่นๆ",
        'แล้วติดสติกเกอร์ "ดาวทองกัปตันฟันสวย" ที่หน้าผาก',
        '"เก่งมากลูก แปรงฟันเองครบ 2 นาทีโดยไม่ต้องบ่นเลย"',
        "น้องชาบูหัวเราะคิกคัก ภูมิใจในตัวเองที่สุดในโลก!",
      ],
      linesEn: [
        "Mama Mami beamed and wrapped Shabu in a big warm hug,",
        "placing a shiny golden Sparkle-Captain star sticker by her ear.",
        '"I\'m so proud of you—two whole minutes all by yourself!"',
        "Shabu giggled, feeling like the bravest kitten in the world.",
      ],
    },
    {
      pageNo: 13,
      image: "/edu/st02/12_p13.webp",
      tagTh: "หน้า 11 • ฝันดีนะกัปตันฟันสวย",
      tagEn: "Page 11 • Sweet Dreams, Sparkle Captain",
      linesTh: [
        "คืนนี้น้องชาบูห่มผ้าสีชมพูหลับปุ๋ยอย่างสบายใจ",
        "ฟันสะอาดวิบวับ ลมหายใจหอมชื่นใจใต้แสงจันทร์",
        "พรุ่งนี้เช้าและก่อนนอน เราจะมาปราบแมงกินฟันกันอีกนะ",
        "ฝันดีนะน้องชาบู... และฝันดีนะกัปตันฟันสวยของแม่",
      ],
      linesEn: [
        "Tonight, Shabu curled cozily under her pink starry blanket,",
        "with sparkling clean teeth and sweet moonlit dreams.",
        "Morning and night, our Sparkle Mission keeps smiles bright.",
        "Goodnight, little Shabu... and sweet dreams to you.",
      ],
    },
  ],
  dialogicQuestions: [
    {
      emoji: "🪥",
      th: "1. คืนนี้หนูคิดว่า 'เจ้าแก๊งฝุ่นน้ำตาล' แอบซ่อนอยู่ตรงฟันซี่หน้า หรือฟันกรามด้านในมากกว่ากันนะ?",
      en: "1. Tonight, do you think the tiny Sugar Bugs are hiding more in the front teeth or the back molars?",
    },
    {
      emoji: "🫧",
      th: "2. ในภารกิจ 3 ด่านของกัปตันชาบู (วนวงกลม-ถูฟันกราม-แปรงลิ้น) หนูชอบด่านไหนมากที่สุด?",
      en: "2. Which of Captain Shabu's 3 brushing missions (circles, back molars, or tongue sweep) is your favorite?",
    },
    {
      emoji: "⭐",
      th: "3. คืนนี้เรามาเปิดนาฬิกา 2 นาที แปรงฟันเก็บดาวกัปตันแข่งกับน้องชาบูกันไหม?",
      en: "3. Shall we start the 2-minute timer tonight and earn our Sparkle-Captain star just like Shabu?",
    },
  ],
  galleryImages: [
    {
      src: "/edu/st02/mockup-01-cover.webp",
      labelTh: "ปกหน้า & จุดเด่นนิทานแปรงฟัน 16 หน้า (เล่มที่ 2)",
      labelEn: "Front Cover & 16-Page Highlights (Book 2)",
    },
    {
      src: "/edu/st02/mockup-02-spreads.webp",
      labelTh: "ส่องภาพประกอบสีน้ำจริงข้างใน (12 ภาพเต็มเล่ม)",
      labelEn: "Inside Watercolor Illustrations (12 Full Plates)",
    },
    {
      src: "/edu/st02/mockup-03-audio-qr.webp",
      labelTh: "นิทานกระดาษคู่ Hybrid QR + นาฬิกาแปรงฟัน 2 นาที",
      labelEn: "Hybrid QR Audio Storybook & 2-Min Brush Timer",
    },
    {
      src: "/edu/st02/mockup-04-editions.webp",
      labelTh: "เทียบสิทธิ์ Home (79฿) vs Class (159฿) + แพ็กคู่ BB01 149฿",
      labelEn: "Home ($3.99) vs Class ($6.99) + BB01 Pair Bundle",
    },
  ],
  faqs: [
    {
      qTh: "ชุดนิทาน EDU-ST02 ช่วยเรื่องลูกไม่ยอมแปรงฟันได้ยังไง?",
      qEn: "How does EDU-ST02 help kids who resist brushing their teeth?",
      aTh: "แทนการดุหรือบังคับ นิทานเปลี่ยนการแปรงฟันเป็น 'เกมกัปตันฟองดาว 3 ด่าน' ปราบแก๊งฝุ่นน้ำตาล พร้อมเปิดนาฬิกาจับเวลา 2 นาทีบนหน้า /edu/st02 ที่แบ่งช่วง 40 วินาทีให้เด็กทำตามทีละด่านอย่างสนุกครับ",
      aEn: "Instead of nagging, the story turns brushing into a fun 3-stage Captain Mission paired with our interactive 2-minute timer on /edu/st02.",
    },
    {
      qTh: "แพ็กคู่ 149฿ (EDU-ST02 + EDU-BB01) ได้อะไรบ้าง?",
      qEn: "What is included in the 149 THB Pair Pack (EDU-ST02 + EDU-BB01)?",
      aTh: "ได้ครบทั้งนิทานภาพสีน้ำ EDU-ST02 (16 หน้า TH+EN) และสมุด Busy Book น้องชาบู EDU-BB01 (32 หน้า พร้อมบอร์ดแปรงฟันไวท์บอร์ด P15 + 45 การ์ดตีนตุ๊กแก + ล้างมือ 6 ขั้น WHO) ประหยัดจากปกติ 178฿ ครับ!",
      aEn: "You get both the 16-page watercolor storybook EDU-ST02 and the 32-page Busy Book EDU-BB01 (including the wipe-clean teeth board & 45 Velcro cards) at a bundle discount!",
    },
  ],
};

export const ST03_CONFIG: StorybookConfig = {
  sku: "EDU-ST03",
  slug: "st03",
  bookNo: 3,
  theme: "rose",
  badgeTh: "EDU-ST03 • ชุดนิทานพลังใจแก๊ง 6 แมว (เล่มที่ 3) • วัย 3–6 ปี",
  badgeEn: "EDU-ST03 • The 6 Cats Gentle Heart Series (Book 3) • Ages 3–6",
  heroPrefixTh: "นิทานกิจวัตรเช้า:",
  heroPrefixEn: "Routine Story:",
  titleTh: "เช้าวันใหม่ใจเย็นของแม่ใหญ่",
  titleEn: "Mama Mami's Calm Morning Magic",
  heroDescTh:
    "เปลี่ยนเช้าสุดวุ่น ของเล่นกระจาย และเสียงเร่งลูกให้กลายเป็นเกม 'เวทมนตร์ 3 ก้าว' สุดอบอุ่น! นิทานภาพสีน้ำ 16 หน้าของแม่ใหญ่ น้องชาบู และน้องแซลมอน พร้อมเสียงเล่านิทาน TH/EN นาฬิกากิจวัตร 4 โหมด และขวดโหลดาวทองฟรีไร้โฆษณา",
  heroDescEn:
    "Turn chaotic mornings and scattered toys into calm, joyful 3-step teamwork! A 16-page watercolor storybook starring Mama Mami, Shabu & Salmon — paired with free bilingual audio narration, a 4-mode routine timer, and an interactive Golden Star Jar!",
  coverImage: "/edu/st03/01_cover.webp",
  coverAlt: "EDU-ST03 Book Cover — Mama Mami's Calm Morning Magic",
  freebieTitleTh:
    "🎁 ดาวน์โหลดตัวอย่างนิทานฟรี 5 หน้า (ปก + หน้า 1 + กระดาน 3 ก้าว + แปะการ์ดครบ + ปกหลังแผนที่ 6 เล่ม)",
  freebieTitleEn:
    "🎁 Download Free 5-Page Storybook Sample (Cover + 3 Key Spreads + 6-Book Collection Map)",
  freebieThUrl: "/edu/st03/EDU-ST03_Freebie_5Pages_TH.pdf",
  freebieEnUrl: "/edu/st03/EDU-ST03_Freebie_5Pages_EN.pdf",
  priceHomeThb: 79,
  priceHomeRegularThb: 129,
  priceHomeUsd: "$3.99",
  priceClassThb: 159,
  priceClassRegularThb: 249,
  priceClassUsd: "$6.99",
  homeBulletsTh: [
    "นิทานภาพสีน้ำเต็มเล่ม 16 หน้า ครบทั้งภาษาไทย (ฟอนต์ Mali) และภาษาอังกฤษ",
    "ปริ้นท์เย็บเล่ม A4/US Letter หรือเปิดอ่านบน iPad สร้างวินัยเช้า & เก็บของเล่นได้ไม่จำกัด",
    "ครบ 3 คำถามชวนคุย + หน้ากิจกรรมวาดขวดโหลดาวทอง P15",
    "ใช้งานเสียงเล่านิทาน TH/EN + นาฬิกากิจวัตร 4 โหมดบน /edu/st03 ฟรีตลอดชีพ",
  ],
  classBulletsTh: [
    "ลิขสิทธิ์ครู 1 ท่าน เปิดขึ้นจอทีวี/โปรเจกเตอร์เล่านิทานสอนเก็บของเล่นหน้าห้องเรียนได้ไม่จำกัด",
    "ปริ้นท์หน้ากิจกรรม P15 แจกนักเรียน อ.1–อ.3 ได้ทั้งห้อง (30–40 คน)",
    "มีครบทั้งภาษาไทยและภาษาอังกฤษ เหมาะกับหน่วยการเรียนรู้ 'กิจวัตรประจำวัน / วินัยในบ้าน' / ห้อง EP",
    "เปิดเสียงเล่านิทาน TH/EN & นาฬิกาจับเวลาเก็บของเล่นหน้าห้องเรียนได้ทันที ไร้โฆษณา",
  ],
  pages: [
    {
      pageNo: 3,
      image: "/edu/st03/02_p03.webp",
      tagTh: "หน้า 1 • เช้าวันใหม่ที่วุ่นวาย!",
      tagEn: "Page 1 • A Topsy-Turvy Morning!",
      linesTh: [
        "แสงแดดยามเช้าส่องเข้ามาในบ้านแก๊ง 6 แมว",
        "แต่วันนี้ห้องนั่งเล่นวุ่นวายเหมือนพายุเพิ่งพัดผ่าน!",
        "ตัวต่อไม้กระจายเต็มพรม ผ้าห่มกองเป็นภูเขา",
        '"แม่ใหญ่จ๋า! รองเท้าข้างซ้ายของชาบูหายไปไหนก็ไม่รู้!"',
      ],
      linesEn: [
        "Golden morning sunshine peeked into the 6 Cats' home.",
        "Whoa—the living room looked like a tiny tornado passed through!",
        "Wooden blocks covered the rug and blankets piled like a mountain.",
        '"Mama! Where did my left shoe hide?!" cried Shabu.',
      ],
    },
    {
      pageNo: 4,
      image: "/edu/st03/03_p04.webp",
      tagTh: "หน้า 2 • ทำไมเช้านี้ไม่ทันใจเลย!",
      tagEn: "Page 2 • Everything Feels So Rushed!",
      linesTh: [
        "น้องชาบูวิ่งวนหาถุงเท้าจนหางฟู",
        "น้องแซลมอนกอดกระเป๋าเป้แน่น ยืนงงอยู่กลางกองของเล่น",
        "เข็มนาฬิกาเดินติ๊กต็อก... ติ๊กต็อก... ใกล้เวลาออกเดินทางแล้ว",
        "หัวใจน้อยๆ เริ่มร้อนรน จนเกือบจะงอแงทั้งบ้านเลย!",
      ],
      linesEn: [
        "Shabu zoomed in circles looking for her socks with a puffy tail.",
        "Salmon hugged her backpack tight, standing puzzled amid the toys.",
        "Tick-tock went the wall clock—almost time to head out!",
        "Their little hearts raced, ready to burst into morning grumbles.",
      ],
    },
    {
      pageNo: 5,
      image: "/edu/st03/04_p05.webp",
      tagTh: "หน้า 3 • รอยยิ้มใจเย็นของแม่ใหญ่",
      tagEn: "Page 3 • Mama Mami's Calm Smile",
      linesTh: [
        "แม่ใหญ่ไม่ได้ดุ และไม่ได้ตะโกนเร่งลูกๆ เลยสักคำ",
        "แม่ใหญ่ยิ้มอุ่นๆ ย่อตัวลงกอดน้องชาบูกับน้องแซลมอนเบาๆ",
        '"ไม่เป็นไรนะลูก หายใจเข้าลึกๆ ก่อนนะ..."',
        '"วันนี้แม่มี \'กระดานเวทมนตร์ 3 ก้าว\' กับ \'ขวดโหลดาวทอง\' มาช่วยจ้ะ!"',
      ],
      linesEn: [
        "Mama Mami didn't scold or shout to hurry them up.",
        "She smiled warmly and knelt down to hug Shabu and Salmon close.",
        '"It\'s okay, sweethearts. Let\'s take one slow breath together..."',
        '"Today, my 3-Step Magic Board and Golden Star Jar will help!"',
      ],
    },
    {
      pageNo: 6,
      image: "/edu/st03/05_p06.webp",
      tagTh: "หน้า 4 • เปิดกระดานกิจวัตรและขวดโหลดาว!",
      tagEn: "Page 4 • The Routine Board & Star Jar!",
      linesTh: [
        "แม่ใหญ่ชูกระดานกิจวัตรสีชมพูแสนน่ารักพร้อมการ์ดภาพ 3 ใบ",
        "ข้างๆ มีขวดโหลแก้วใสที่รอรับดวงดาวสีทองวิบวับ",
        '"เราไม่ต้องรีบทำทุกอย่างพร้อมกันนะลูก"',
        '"แค่ทำทีละก้าวตามการ์ด ครบ 3 ก้าว รับดาวทองไปหยอดขวดโหลเลย!"',
      ],
      linesEn: [
        "Mama Mami showed a pretty rose-pink routine board with 3 picture cards",
        "and a sparkling clear glass jar waiting for golden stars.",
        '"We don\'t have to rush everything all at once," she said.',
        '"Just one small step at a time—finish 3 steps and earn a golden star!"',
      ],
    },
    {
      pageNo: 7,
      image: "/edu/st03/06_p07.webp",
      tagTh: "หน้า 5 • ก้าวที่ 1 ส่งของเล่นกลับบ้าน!",
      tagEn: "Page 5 • Step 1: Send Toys Back Home!",
      linesTh: [
        "ก้าวที่ 1: มาพับผ้าห่มและส่งของเล่นกลับบ้านกันเถอะ!",
        '"บล็อกไม้กลับกล่อง... ตุ๊กตากลับชั้น... พรมสะอาดแล้ว!"',
        "แม่ใหญ่เปิดนาฬิกาจับเวลา 5 นาที เป็นเกมแข่งสนุกๆ",
        "ว้าว! พอเก็บของเล่นเข้าที่ ก็เจอรองเท้าสีแดงที่ซ่อนอยู่ใต้พรมทันที!",
      ],
      linesEn: [
        "Step 1: Fold the cozy blanket and send every toy back home!",
        '"Blocks into the basket... plushies on the shelf... tidy rug!"',
        "Mama started a cheerful 5-minute timer like a fun little game.",
        "Whoa! As soon as the toys went home, Shabu's missing red shoe popped right out!",
      ],
    },
    {
      pageNo: 8,
      image: "/edu/st03/07_p08.webp",
      tagTh: "หน้า 6 • ก้าวที่ 2 ล้างหน้า แปรงฟัน แต่งตัว!",
      tagEn: "Page 6 • Step 2: Wash, Brush & Dress Up!",
      linesTh: [
        "ก้าวที่ 2: แปะการ์ดสีชมพูแล้วไปดูแลตัวเองให้สดชื่น!",
        "น้องแซลมอนล้างหน้าเย็นฉ่ำ น้องชาบูแปรงฟันยิ้มแฉ่ง",
        "สวมชุดเก่งและหวีขนเรียบร้อยด้วยมือตัวเอง",
        '"เสร็จแล้วจ้าแม่ใหญ่! พวกหนูติดกระดุมเองได้ด้วยนะ!"',
      ],
      linesEn: [
        "Step 2: Stick the pink card and get fresh and ready!",
        "Salmon splashed cool water on her face; Shabu brushed with a big grin.",
        "They put on their favorite morning outfits all by themselves.",
        '"Ta-da, Mama! We even buttoned our own collars today!"',
      ],
    },
    {
      pageNo: 9,
      image: "/edu/st03/08_p09.webp",
      tagTh: "หน้า 7 • ก้าวที่ 3 เตรียมกระเป๋าและรองเท้า!",
      tagEn: "Page 7 • Step 3: Pack Bag & Shoes Ready!",
      linesTh: [
        "ก้าวที่ 3: หยิบกระเป๋าเป้คู่ใจและวางรองเท้าเรียงคู่หน้าประตู",
        "น้องแซลมอนเช็กสมุดวาดภาพกับกระติกน้ำครบทุกชิ้น",
        "น้องชาบูสวมรองเท้าคู่เก่งเรียบร้อยไม่สลับข้างแล้ว!",
        "ติ๊ง! นาฬิกาของแม่ใหญ่ดังขึ้น... ทำครบก่อนเวลาตั้งเยอะเลย!",
      ],
      linesEn: [
        "Step 3: Pack the cozy backpacks and line up shoes by the door!",
        "Salmon tucked in her sketchbook and water bottle neatly.",
        "Shabu slipped on both red shoes on the right feet—hooray!",
        "Ding! Mama's gentle timer chimed with plenty of happy minutes to spare!",
      ],
    },
    {
      pageNo: 10,
      image: "/edu/st03/09_p10.webp",
      tagTh: "หน้า 8 • ว้าว! แปะการ์ดครบ 3 ก้าวแล้ว!",
      tagEn: "Page 8 • Hooray! All 3 Routine Cards Done!",
      linesTh: [
        "น้องชาบูกับน้องแซลมอนแปะการ์ดใบสุดท้ายบนกระดานดัง ปุ๊!",
        "บ้านทั้งหลังดูโล่ง สะอาด และสว่างสดใสขึ้นทันตา",
        "ไม่มีเสียงบ่น ไม่มีน้ำตา มีแต่เสียงหัวเราะคิกคัก",
        '"เวทมนตร์ 3 ก้าวของแม่ใหญ่ วิเศษจริงๆ ด้วย!"',
      ],
      linesEn: [
        "Pop! Shabu and Salmon placed the third picture card onto the board.",
        "The whole house looked bright, airy, and wonderfully tidy.",
        "Zero grumbles, zero tears—only warm giggles filling the room!",
        '"Mama Mami\'s 3-Step Magic really works!" cheered the kittens.',
      ],
    },
    {
      pageNo: 11,
      image: "/edu/st03/10_p11.webp",
      tagTh: "หน้า 9 • หยอดดาวทองลงขวดโหล!",
      tagEn: "Page 9 • Drop a Golden Star in the Jar!",
      linesTh: [
        "แม่ใหญ่ส่งดวงดาวสีทองระยิบระยับให้ลูกๆ คนละดวง",
        "กริ๊งงง! ดาวทองค่อยๆ ลอยลงไปในขวดโหลแก้วใส",
        "แสงสีทองอบอุ่นเปล่งประกายเหมือนความภูมิใจในหัวใจน้อยๆ",
        '"ดาวดวงนี้คือรางวัลของเด็กเก่งที่รับผิดชอบตัวเองนะลูก"',
      ],
      linesEn: [
        "Mama Mami handed each kitten a shimmering golden star.",
        "Clink! The stars dropped softly into the clear glass jar,",
        "glowing with warm golden light just like their proud little hearts.",
        '"This star celebrates how wonderfully you took care of your morning!"',
      ],
    },
    {
      pageNo: 12,
      image: "/edu/st03/11_p12.webp",
      tagTh: "หน้า 10 • กอดอุ่นเติมพลังก่อนออกจากบ้าน",
      tagEn: "Page 10 • Warm Morning Hug Power-Up!",
      linesTh: [
        "แม่ใหญ่กางแขนโอบกอดน้องชาบูกับน้องแซลมอนแน่นๆ",
        '"ขอบคุณที่ช่วยกันทำเช้านี้ให้ใจเย็นและมีความสุขนะจ๊ะ"',
        "น้องๆ หอมแก้มแม่ใหญ่ฟอดใหญ่ เติมพลังใจเต็มร้อย!",
        "เมื่อเราทำทีละก้าว เช้าวันใหม่ก็ไม่น่ากลัวอีกต่อไป",
      ],
      linesEn: [
        "Mama Mami opened her arms wide for a cozy group hug.",
        '"Thank you for making our morning so calm and joyful, little ones."',
        "Both kittens nuzzled Mama's cheek—heart batteries charged to 100%!",
        "One gentle step at a time makes every morning feel easy.",
      ],
    },
    {
      pageNo: 13,
      image: "/edu/st03/12_p13.webp",
      tagTh: "หน้า 11 • ออกเดินทางสู่เช้าวันใหม่ที่สดใส!",
      tagEn: "Page 11 • Off We Go to a Bright New Day!",
      linesTh: [
        "ประตูบ้านเปิดออกรับลมเช้าเย็นสบายและแดดสีทองอ่อนๆ",
        "น้องชาบูและน้องแซลมอนโบกมือลาแม่ใหญ่ด้วยรอยยิ้มกว้าง",
        "วันนี้และทุกๆ เช้า เราจะใช้เวทมนตร์ 3 ก้าวไปด้วยกันนะ",
        "อรุณสวัสดิ์นะเช้าวันใหม่... หัวใจเย็นๆ พร้อมลุยแล้ว!",
      ],
      linesEn: [
        "The front door opened to a cool breeze and soft golden sunshine.",
        "Shabu and Salmon waved happily to Mama Mami with bright smiles.",
        "Today and every morning, our 3-Step Magic keeps our hearts calm.",
        "Good morning, bright new day—we're ready to shine!",
      ],
    },
  ],
  dialogicQuestions: [
    {
      emoji: "🧸",
      th: "1. ในเวทมนตร์ 3 ก้าวตอนเช้าของแม่ใหญ่ (เก็บของเล่น-แต่งตัว-เตรียมกระเป๋า) หนูทำก้าวไหนเก่งที่สุดแล้วครับ?",
      en: "1. Of Mama Mami's 3 Morning Steps (Tidy Up, Get Ready, Pack Bag), which step are you already super good at?",
    },
    {
      emoji: "👟",
      th: "2. ถ้าของเล่นหรือรองเท้าของหนูหายตอนเช้าเหมือนน้องชาบู เราจะลองทำยังไงก่อนดีให้ใจเย็นๆ?",
      en: "2. If a toy or shoe goes missing like Shabu's did, what calm first step can we try together?",
    },
    {
      emoji: "⭐",
      th: "3. พรุ่งนี้เช้า เรามาตั้งนาฬิกา 5 นาที ช่วยกันส่งของเล่นกลับบ้านแล้วเก็บดาวทองลงขวดโหลกันไหม?",
      en: "3. Tomorrow morning, shall we set a fun 5-minute timer to tidy up and earn a golden star for our jar?",
    },
  ],
  galleryImages: [
    {
      src: "/edu/st03/mockup-01-cover.webp",
      labelTh: "ปกหน้า & จุดเด่นนิทานกิจวัตรเช้า 16 หน้า (เล่มที่ 3)",
      labelEn: "Front Cover & 16-Page Highlights (Book 3)",
    },
    {
      src: "/edu/st03/mockup-02-spreads.webp",
      labelTh: "ส่องภาพประกอบสีน้ำจริงข้างใน (12 ภาพเต็มเล่ม)",
      labelEn: "Inside Watercolor Illustrations (12 Full Plates)",
    },
    {
      src: "/edu/st03/mockup-03-audio-qr.webp",
      labelTh: "นิทานกระดาษคู่ Hybrid QR + นาฬิกากิจวัตร 4 โหมด",
      labelEn: "Hybrid QR Audio Storybook & 4-Mode Routine Timer",
    },
    {
      src: "/edu/st03/mockup-04-editions.webp",
      labelTh: "เทียบสิทธิ์ Home (79฿) vs Class (159฿) + แพ็กคู่ RT01 149฿",
      labelEn: "Home ($3.99) vs Class ($6.99) + RT01 Pair Bundle",
    },
  ],
  faqs: [
    {
      qTh: "ชุดนิทาน EDU-ST03 ช่วยแก้ปัญหาเช้าวันใหม่วุ่นวายและลูกไม่ยอมเก็บของเล่นได้ยังไง?",
      qEn: "How does EDU-ST03 help with rushed mornings and messy toys?",
      aTh: "สมองเด็ก 3–6 ปีจะรับคำสั่งยาวๆ ไม่ไหว นิทานเล่มนี้ย่อยกิจวัตรเช้าให้เหลือ 'เวทมนตร์ 3 ก้าว' ที่จำง่าย (ส่งของเล่นกลับบ้าน ➔ ล้างหน้าแต่งตัว ➔ เตรียมกระเป๋า) พร้อมจับเวลาสนุกๆ และหยอดดาวทองลงขวดโหลบนหน้า /edu/st03 ครับ",
      aEn: "Young brains thrive on visual sequences. This story breaks mornings into 3 simple steps paired with our 4-mode timer and interactive Star Jar on /edu/st03.",
    },
    {
      qTh: "แพ็กคู่ 149฿ (EDU-ST03 + EDU-RT01) ได้อะไรบ้าง?",
      qEn: "What is included in the 149 THB Pair Pack (EDU-ST03 + EDU-RT01)?",
      aTh: "ได้ครบทั้งนิทานภาพสีน้ำ EDU-ST03 (16 หน้า TH+EN) และชุดสร้างวินัย & กิจวัตร 30 วัน แม่ใหญ่ EDU-RT01 (32 หน้า พร้อมบอร์ดเช้า-เย็น-ก่อนนอน + 24 การ์ดตีนตุ๊กแก + ขวดโหล 20 ดาว + คูปองรางวัล 8 ใบ) ประหยัดจากปกติ 178฿ ครับ!",
      aEn: "You get both the 16-page watercolor storybook EDU-ST03 and the 32-page 30-Day Routine & Star Reward Kit EDU-RT01 (daily boards, 24 Velcro cards & 20-Star Jar) at a bundle discount!",
    },
  ],
};

export const ST04_CONFIG: StorybookConfig = {
  "sku": "EDU-ST04",
  "slug": "st04",
  "bookNo": 4,
  "theme": "purple",
  "badgeTh": "NEW เล่ม 4 • กลองจังหวะหัวใจ 70 BPM",
  "badgeEn": "NEW Book 4 • 70 BPM Heartbeat Drum",
  "heroPrefixTh": "นิทานดนตรีคุมพลังล้น:",
  "heroPrefixEn": "Rhythm Storybook:",
  "titleTh": "จังหวะหัวใจของน้องข้าวต้ม",
  "titleEn": "Khao Tom's Steady Heartbeat Drum",
  "heroDescTh": "นิทานภาพสีน้ำ 16 หน้า (น้องข้าวต้ม × แม่ใหญ่) ชวนลูกคุมพลังงานล้นและฝึกสมาธิด้วยเกมกลองจังหวะหัวใจ 3 สปีด พร้อมเสียงเล่านิทาน TH/EN ฟรี!",
  "heroDescEn": "16-page watercolor storybook (Khao Tom & Mama Mami) helping energetic kids calm down with a 3-speed Heartbeat Drum & free bilingual audio!",
  "coverImage": "/edu/st04/01_cover.webp",
  "coverAlt": "EDU-ST04 Khao Tom's Steady Heartbeat Drum",
  "freebieTitleTh": "ชุดทดลองอ่านฟรี 5 หน้า (EDU-ST04)",
  "freebieTitleEn": "Free 5-Page Sample (EDU-ST04)",
  "freebieThUrl": "/edu/st04/EDU-ST04_Freebie_5Pages_TH.pdf",
  "freebieEnUrl": "/edu/st04/EDU-ST04_Freebie_5Pages_EN.pdf",
  "priceHomeThb": 79,
  "priceHomeRegularThb": 129,
  "priceHomeUsd": "$3.99",
  "priceClassThb": 159,
  "priceClassRegularThb": 249,
  "priceClassUsd": "$6.99",
  "homeBulletsTh": [
    "นิทานภาพสีน้ำ 16 หน้าเต็ม (TH + EN ครบ 2 ภาษา)",
    "ปริ้นท์อ่านหรือเปิดบน iPad ให้ลูกในครอบครัวได้ไม่จำกัด",
    "คู่มือพ่อแม่ 3 ขั้น + 3 คำถามชวนคุย P14 + กิจกรรมวาดภาพ P15",
    "เว็บเสียงเล่านิทาน /edu/st04 ไร้โฆษณา 100% ใช้ได้ตลอดชีพ"
  ],
  "classBulletsTh": [
    "ลิขสิทธิ์คุณครู 1 ท่าน ใช้เปิดเล่าหน้าห้องเรียนได้ทั้งห้อง",
    "ขึ้นจอทีวี/โปรเจกเตอร์พร้อมเปิดเสียงเล่านิทาน TH/EN ได้ทันที",
    "ปริ้นท์หน้ากิจกรรม P15 แจกนักเรียน 30–40 คนได้ไม่จำกัด",
    "ครบทั้งภาษาไทยและภาษาอังกฤษ เหมาะสำหรับห้องเรียนปกติและ EP"
  ],
  "pages": [
    {
      "pageNo": 3,
      "image": "/edu/st04/02_p03.webp",
      "tagTh": "หน้า 1 • น้องข้าวต้มพลังจรวด!",
      "tagEn": "Page 1 • Rocket-Energy Khao Tom!",
      "linesTh": [
        "น้องข้าวต้มเป็นลูกแมวขาวที่พลังล้นที่สุด!",
        "ตั้งแต่เช้า น้องกระโดดดึ๋งๆ วิ่งปรู๊ดรอบห้อง",
        "\"ซูมมม! ปุ๊งๆ! ตะลุยอวกาศเลย!\"",
        "หูฟังฟ้า-เหลืองสั่นดุ๊กดิ๊กเร็วเหมือนพายุ!"
      ],
      "linesEn": [
        "Khao Tom was the bounciest kitten in the house!",
        "All morning, he zoomed around the living room.",
        "\"Zooooom! Boing-boing! Blast off to space!\"",
        "His blue headphones wiggled to a whirlwind beat!"
      ]
    },
    {
      "pageNo": 4,
      "image": "/edu/st04/03_p04.webp",
      "tagTh": "หน้า 2 • อ๊ะ! เร็วเกินไปจนชนโครม!",
      "tagEn": "Page 2 • Oops! Too Fast—Crash!",
      "linesTh": [
        "แต่พอน้องข้าวต้มวิ่งเร็วจนเบรกไม่อยู่...",
        "โครม! บล็อกไม้ล้มกระจาย ดินสอสีกลิ้งเต็มพื้น!",
        "ขาน้องยังกระตุกยุกยิก หยุดนิ่งไม่ได้เลย",
        "\"ฮือ... หนูไม่ได้ตั้งใจ ทำไมตัวหยุดไม่ได้ล่ะ!\""
      ],
      "linesEn": [
        "Wait—Khao Tom zoomed too fast to stop...",
        "Crash! The block tower tumbled down the rug!",
        "His wiggly paws kept bouncing on their own.",
        "\"Aww... why won't my body slow down?\""
      ]
    },
    {
      "pageNo": 5,
      "image": "/edu/st04/04_p05.webp",
      "tagTh": "หน้า 3 • แม่ใหญ่กับกลองไม้ใบจิ๋ว",
      "tagEn": "Page 3 • Mama Mami's Little Wooden Drum",
      "linesTh": [
        "แม่ใหญ่ไม่ได้ดุ และไม่สั่งให้นั่งนิ่งๆ เลย",
        "แม่ใหญ่ยิ้มอุ่นๆ หยิบ \"กลองไม้สีม่วงทอง\" มาให้",
        "\"พลังล้นไม่ผิดนะลูก แปลว่าหนูมีดนตรีเต็มตัว!\"",
        "\"มาฝึกเป็นวาทยกรคุมจังหวะหัวใจกันไหมจ๊ะ?\""
      ],
      "linesEn": [
        "Mama Mami didn't scold or say 'Sit still!'",
        "She smiled and set a purple wooden drum down.",
        "\"Big energy means you're full of music!\"",
        "\"Let's conduct your Heartbeat Drum together!\""
      ]
    },
    {
      "pageNo": 6,
      "image": "/edu/st04/05_p06.webp",
      "tagTh": "หน้า 4 • ฟังเสียงกลองในอกของหนูสิ",
      "tagEn": "Page 4 • Listen to the Drum Inside!",
      "linesTh": [
        "แม่ใหญ่จับอุ้งมือนุ่มๆ วางเบาๆ ที่หน้าอกน้อง",
        "ตึกตัก-ตึกตัก! หัวใจน้องเต้นรัวเหมือนกลองรบ!",
        "\"ได้ยินไหมลูก? หัวใจหนูตีกลองเร็วเหมือนจรวด\"",
        "\"มาเล่นเกม 'กลอง 3 สปีด' ไปพร้อมแม่นะ!\""
      ],
      "linesEn": [
        "Mama placed Khao Tom's soft paw on his chest.",
        "Thump-thump-thump! His heart beat super fast!",
        "\"Hear that? Your heart played a rocket beat!\"",
        "\"Let's play our 3-Speed Drum Game together!\""
      ]
    },
    {
      "pageNo": 7,
      "image": "/edu/st04/06_p07.webp",
      "tagTh": "หน้า 5 • สปีดที่ 1 จังหวะจรวดเร็วปรื๋อ!",
      "tagEn": "Page 5 • Speed 1: Super Fast Rocket Beat!",
      "linesTh": [
        "สปีดที่ 1: ปล่อยพลังให้สุดกับจังหวะเร็วปรื๋อ!",
        "\"ตึ๊งตังตึ๊งตัง! ปรบมือรัวๆ ส่ายหางดุ๊กดิ๊ก!\"",
        "น้องข้าวต้มหัวเราะเอิ๊กอ๊าก ตีกลองสุดสนุก",
        "พลังที่อัดแน่นค่อยๆ ปลดปล่อยเป็นเสียงเพลง!"
      ],
      "linesEn": [
        "Speed 1: Let out energy with a fast beat!",
        "\"Bum-ba-da-bum! Tap fast and wiggle your tail!\"",
        "Khao Tom giggled, drumming with bright notes.",
        "All the big wiggles turned into happy music!"
      ]
    },
    {
      "pageNo": 8,
      "image": "/edu/st04/07_p08.webp",
      "tagTh": "หน้า 6 • สปีดที่ 2 จังหวะเดินสวนสนาม",
      "tagEn": "Page 6 • Speed 2: Steady Marching Beat!",
      "linesTh": [
        "สปีดที่ 2: แตะเบรกเป็นจังหวะเดินสวนสนาม!",
        "\"หนึ่ง... สอง... สาม... สี่... ตึง... ตัง...\"",
        "น้องข้าวต้มย่ำเท้าตามจังหวะกลองอย่างพร้อมเพรียง",
        "ลมหายใจเริ่มสม่ำเสมอ ไม่วิ่งชนอีกแล้ว!"
      ],
      "linesEn": [
        "Speed 2: Slow down into a steady march!",
        "\"One... two... three... four... boom... tap...\"",
        "Khao Tom marched smoothly right beside Mama.",
        "His breath grew even—no more bumping blocks!"
      ]
    },
    {
      "pageNo": 9,
      "image": "/edu/st04/08_p09.webp",
      "tagTh": "หน้า 7 • สปีดที่ 3 จังหวะหัวใจอุ่นๆ 70 BPM",
      "tagEn": "Page 7 • Speed 3: Calm Heartbeat 70 BPM",
      "linesTh": [
        "สปีดที่ 3: ลดเสียงเบาๆ เป็นจังหวะหัวใจสงบ!",
        "\"ตึก... ตัก... ตึก... ตัก... ช้าๆ นุ่มๆ\"",
        "น้องข้าวต้มหลับตาพริ้ม เคาะกลองเบาๆ ตามใจ",
        "โน้ตดนตรีสีม่วงทองลอยละล่องอุ่นทั่วห้อง!"
      ],
      "linesEn": [
        "Speed 3: Soften down to a calm heartbeat!",
        "\"Lub... dub... lub... dub... slow and gentle.\"",
        "Khao Tom closed his eyes and tapped softly.",
        "Warm purple and gold notes floated like stars!"
      ]
    },
    {
      "pageNo": 10,
      "image": "/edu/st04/09_p10.webp",
      "tagTh": "หน้า 8 • วาทยกรตัวน้อยคุมเบรกได้แล้ว!",
      "tagEn": "Page 8 • Little Conductor in Control!",
      "linesTh": [
        "ว้าว! น้องข้าวต้มลืมตาขึ้นด้วยรอยยิ้มภูมิใจ",
        "หัวใจเต้นนุ่มนวล มือและเท้าสงบนิ่งพร้อมฟัง!",
        "\"แม่ดูสิ! หนูเบรกพลังจรวดได้ด้วยดนตรี!\"",
        "น้องต่อหอคอยบล็อกไม้สูงใหม่ได้โดยไม่ล้ม!"
      ],
      "linesEn": [
        "Whoa! Khao Tom smiled with bright pride.",
        "His heart felt calm; his paws felt steady!",
        "\"Look, Mama! I slowed my rocket down myself!\"",
        "Carefully, he rebuilt the tall block tower!"
      ]
    },
    {
      "pageNo": 11,
      "image": "/edu/st04/10_p11.webp",
      "tagTh": "หน้า 9 • เล่นดนตรีด้วยกันเพราะกว่าเยอะเลย!",
      "tagEn": "Page 9 • Music Sounds Sweeter Together!",
      "linesTh": [
        "พอฟังจังหวะเป็น น้องก็เล่นเข้าจังหวะกับแม่",
        "ตึง... ตัง... กริ๊ง... เสียงดนตรีผสานไพเราะ",
        "พลังล้นกลายเป็นพลังสร้างสรรค์สุดวิเศษ!",
        "\"หนูชอบเป็นวาทยกรคุมหัวใจที่สุดเลยครับ!\""
      ],
      "linesEn": [
        "Now Khao Tom played in sweet harmony with Mama!",
        "Boom... tap... ting! Drum and chime blended.",
        "His big energy turned into creative rhythm!",
        "\"Being my own Heart Conductor is the best!\""
      ]
    },
    {
      "pageNo": 12,
      "image": "/edu/st04/11_p12.webp",
      "tagTh": "หน้า 10 • กอดอุ่นและเหรียญดาววาทยกร",
      "tagEn": "Page 10 • Warm Hug & Conductor's Star",
      "linesTh": [
        "แม่ใหญ่กอดน้องแน่นๆ หัวใจเต้นเป็นจังหวะเดียว",
        "\"เก่งมากลูก รู้จักเร่งและผ่อนคือพลังวิเศษจ้ะ\"",
        "น้องข้าวต้มกอดแม่ตอบ เต็มไปด้วยความมั่นใจ",
        "ไม่ว่าจะตื่นเต้นแค่ไหน เรามีกลองในใจเสมอ!"
      ],
      "linesEn": [
        "Mama hugged Khao Tom—two hearts in one beat.",
        "\"Speeding up and slowing down is a superpower!\"",
        "Khao Tom hugged back, calm and confident.",
        "His steady drum is always right inside!"
      ]
    },
    {
      "pageNo": 13,
      "image": "/edu/st04/12_p13.webp",
      "tagTh": "หน้า 11 • หลับฝันดีในจังหวะกล่อมหัวใจ",
      "tagEn": "Page 11 • Sweet Dreams in a Gentle Beat",
      "linesTh": [
        "คืนนี้น้องวางหูฟังไว้ข้างหมอนอย่างเรียบร้อย",
        "วางอุ้งมือบนอก ฟังหัวใจ ตึก... ตัก... ช้าๆ",
        "จังหวะละมุนกล่อมน้องหลับใต้แสงดาวสีม่วงทอง",
        "ฝันดีนะน้องข้าวต้ม... วาทยกรตัวน้อยของแม่"
      ],
      "linesEn": [
        "Tonight, Khao Tom placed his headphones away.",
        "Paw on chest, he heard: lub... dub... slow.",
        "A gentle beat carried him to starry dreams.",
        "Goodnight, Khao Tom... sweet dreams to you."
      ]
    }
  ],
  "dialogicQuestions": [
    {
      "emoji": "🚀",
      "th": "1. วันนี้หัวใจของหนูเต้นเป็นจังหวะไหนบ่อยที่สุดครับ — สปีด 1 จรวดเร็วปรื๋อ, สปีด 2 สวนสนาม, หรือสปีด 3 หัวใจอุ่นๆ?",
      "en": "1. Which beat did your heart play most today—Speed 1 Rocket, Speed 2 Marching, or Speed 3 Calm Heartbeat?"
    },
    {
      "emoji": "🥁",
      "th": "2. เวลาเราตื่นเต้นหรือพลังล้นเหมือนน้องข้าวต้ม เราลองเคาะตัก 'ตึก... ตัก...' ช้าลงตามจังหวะไหนดี?",
      "en": "2. When big bouncy energy bubbles up like Khao Tom's, how can we use our lap drum to slow down?"
    },
    {
      "emoji": "💜",
      "th": "3. คืนนี้เรามาเปิดแอปจังหวะหัวใจ 70 BPM เคาะกลอง 3 สปีดแข่งกับน้องข้าวต้มก่อนนอนกันไหม?",
      "en": "3. Shall we open the 70 BPM Heartbeat Drum tonight and practice slowing down together just like Khao Tom?"
    }
  ],
  "galleryImages": [
    {
      "src": "/edu/st04/mockup-01-cover.webp",
      "labelTh": "ปกหน้า & จุดเด่นนิทาน 16 หน้า (เล่มที่ 4)",
      "labelEn": "Front Cover & 16-Page Highlights (Book 4)"
    },
    {
      "src": "/edu/st04/mockup-02-spreads.webp",
      "labelTh": "ส่องภาพประกอบสีน้ำจริงข้างใน (12 ภาพเต็มเล่ม)",
      "labelEn": "Inside Watercolor Illustrations (12 Full Plates)"
    },
    {
      "src": "/edu/st04/mockup-03-audio-qr.webp",
      "labelTh": "นิทานกระดาษคู่ Hybrid QR + กลองจังหวะหัวใจ 70 BPM",
      "labelEn": "Hybrid QR Audio Storybook & 70 BPM Heartbeat Drum"
    },
    {
      "src": "/edu/st04/mockup-04-editions.webp",
      "labelTh": "เทียบสิทธิ์ Home (79฿) vs Class (159฿) + แพ็กคู่ MU01 149฿",
      "labelEn": "Home ($3.99) vs Class ($6.99) + MU01 Pair Bundle"
    }
  ],
  "faqs": [
    {
      "qTh": "นิทาน EDU-ST04 ช่วยลูกที่พลังล้น อยู่ไม่นิ่ง ได้ยังไง?",
      "qEn": "How does EDU-ST04 help energetic kids who struggle to sit still?",
      "aTh": "แทนที่จะดุให้ 'อยู่นิ่งๆ!' นิทานเล่มนี้ใช้หลักดนตรีบำบัด: ยอมรับพลังล้นก่อน (สปีด 1 จรวด 120 BPM) แล้วค่อยๆ ชวนลดสปีดลงมาที่เดินสวนสนาม (95 BPM) และหัวใจอุ่น (70 BPM) บนหน้า /edu/st04 ครับ",
      "aEn": "Instead of saying 'sit still!', this story matches high energy first (120 BPM), then guides kids gently down to a steady march (95 BPM) and calm heartbeat (70 BPM) on /edu/st04."
    },
    {
      "qTh": "แพ็กคู่ 149฿ (EDU-ST04 + EDU-MU01) ได้อะไรบ้าง?",
      "qEn": "What is included in the 149 THB Pair Pack (EDU-ST04 + EDU-MU01)?",
      "aTh": "ได้ครบทั้งนิทานภาพสีน้ำ EDU-ST04 (16 หน้า TH+EN) และใบงานดนตรี & จังหวะน้องข้าวต้ม EDU-MU01 (32 หน้า + ห้องซ้อมดนตรี 6 แทร็กเสียงจริง 70/95 BPM + ควิซทายเสียงเครื่องดนตรี) ประหยัดจากปกติ 208฿ ครับ!",
      "aEn": "You get both the 16-page storybook EDU-ST04 and the 32-page Music & Rhythm Workbook EDU-MU01 with 6 real audio tracks at a bundle discount!"
    }
  ]
};

export const ST05_CONFIG: StorybookConfig = {
  "sku": "EDU-ST05",
  "slug": "st05",
  "bookNo": 5,
  "theme": "teal",
  "badgeTh": "NEW เล่ม 5 • แผนที่ความกล้า 3 ก้าว",
  "badgeEn": "NEW Book 5 • 3-Step Brave School Map",
  "heroPrefixTh": "นิทานความกล้าไปโรงเรียน:",
  "heroPrefixEn": "Brave School Storybook:",
  "titleTh": "วันแรกที่โรงเรียนของน้องบ๊อบ",
  "titleEn": "Explorer Bob's Brave First Day",
  "heroDescTh": "นิทานภาพสีน้ำ 16 หน้า (น้องบ๊อบ × แม่ใหญ่) ลดอาการร้องไห้หน้าประตูโรงเรียนและสร้างความกล้าทักทายเพื่อนใหม่ด้วย 'ตราหัวใจอุ่น' & แผนที่ความกล้า 3 ก้าว!",
  "heroDescEn": "16-page watercolor storybook (Explorer Bob & Mama Mami) easing first-day school jitters with a Pocket Heart ritual & 3-Step Brave Map!",
  "coverImage": "/edu/st05/01_cover.webp",
  "coverAlt": "EDU-ST05 Explorer Bob's Brave First Day",
  "freebieTitleTh": "ชุดทดลองอ่านฟรี 5 หน้า (EDU-ST05)",
  "freebieTitleEn": "Free 5-Page Sample (EDU-ST05)",
  "freebieThUrl": "/edu/st05/EDU-ST05_Freebie_5Pages_TH.pdf",
  "freebieEnUrl": "/edu/st05/EDU-ST05_Freebie_5Pages_EN.pdf",
  "priceHomeThb": 79,
  "priceHomeRegularThb": 129,
  "priceHomeUsd": "$3.99",
  "priceClassThb": 159,
  "priceClassRegularThb": 249,
  "priceClassUsd": "$6.99",
  "homeBulletsTh": [
    "นิทานภาพสีน้ำ 16 หน้าเต็ม (TH + EN ครบ 2 ภาษา)",
    "ปริ้นท์อ่านหรือเปิดบน iPad ให้ลูกในครอบครัวได้ไม่จำกัด",
    "คู่มือพ่อแม่ 3 ขั้น + 3 คำถามชวนคุย P14 + กิจกรรมวาดภาพ P15",
    "เว็บเสียงเล่านิทาน /edu/st05 ไร้โฆษณา 100% ใช้ได้ตลอดชีพ"
  ],
  "classBulletsTh": [
    "ลิขสิทธิ์คุณครู 1 ท่าน ใช้เปิดเล่าหน้าห้องเรียนได้ทั้งห้อง",
    "ขึ้นจอทีวี/โปรเจกเตอร์พร้อมเปิดเสียงเล่านิทาน TH/EN ได้ทันที",
    "ปริ้นท์หน้ากิจกรรม P15 แจกนักเรียน 30–40 คนได้ไม่จำกัด",
    "ครบทั้งภาษาไทยและภาษาอังกฤษ เหมาะสำหรับห้องเรียนปกติและ EP"
  ],
  "pages": [
    {
      "pageNo": 3,
      "image": "/edu/st05/02_p03.webp",
      "tagTh": "หน้า 1 • เช้าวันแรกกับเป้นักผจญภัย!",
      "tagEn": "Page 1 • First Day with My Explorer Bag!",
      "linesTh": [
        "เช้าวันนี้เป็นวันพิเศษของน้องบ๊อบ!",
        "น้องสะพายเป้สีเขียวมิ้นต์และผ้าพันคอคู่ใจ",
        "หางพวงฟูสีส้มแกว่งไปมาอย่างตื่นเต้น",
        "\"เย้! วันนี้บ๊อบจะได้ไปโรงเรียนวันแรกแล้ว!\""
      ],
      "linesEn": [
        "Today was a super special day for Bob!",
        "He wore his mint bandana and little backpack.",
        "His big fluffy orange tail swished excitedly.",
        "\"Yay! Today is my very first day of school!\""
      ]
    },
    {
      "pageNo": 4,
      "image": "/edu/st05/03_p04.webp",
      "tagTh": "หน้า 2 • เอ๊ะ! ทำไมหน้าประตูมันใหญ่จัง!",
      "tagEn": "Page 2 • Whoa! The School Gate Looks Big!",
      "linesTh": [
        "แต่พอเดินมาถึงหน้าประตูโรงเรียนสีสดใส...",
        "น้องบ๊อบกลับหยุดกึก แล้วรีบหลบหลังแม่ใหญ่!",
        "ห้องเรียนกว้างๆ กับเพื่อนใหม่เต็มไปหมดเลย",
        "\"แม่ใหญ่จ๋า... ท้องบ๊อบเหมือนมีผีเสื้อบินอยู่!\""
      ],
      "linesEn": [
        "Yet when they reached the bright school gate...",
        "Bob froze and hid right behind Mama Mami!",
        "The big classroom was full of brand-new faces.",
        "\"Mama... my tummy feels full of butterflies!\""
      ]
    },
    {
      "pageNo": 5,
      "image": "/edu/st05/04_p05.webp",
      "tagTh": "หน้า 3 • ก้าวที่ 1 ตราหัวใจอุ่นของแม่ใหญ่",
      "tagEn": "Page 3 • Step 1: Mama's Warm Pocket Heart",
      "linesTh": [
        "แม่ใหญ่ย่อตัวกอดน้องบ๊อบไว้แน่นๆ อย่างใจเย็น",
        "\"ความกลัวแค่นิดเดียว แปลว่ากำลังจะกล้าจ้ะ\"",
        "แม่ใหญ่ติด 'ตราหัวใจสีทอง' ไว้ที่สายกระเป๋า",
        "\"คิดถึงแม่เมื่อไหร่ แตะหัวใจดวงนี้เบาๆ นะลูก\""
      ],
      "linesEn": [
        "Mama Mami knelt and gave Bob a cozy hug.",
        "\"Feeling shy just means you're ready to grow.\"",
        "She pinned a glowing golden heart on his strap.",
        "\"Whenever you miss me, tap this warm heart!\""
      ]
    },
    {
      "pageNo": 6,
      "image": "/edu/st05/05_p06.webp",
      "tagTh": "หน้า 4 • แผนที่ความกล้า 3 ก้าว!",
      "tagEn": "Page 4 • The 3-Step Brave Explorer Map!",
      "linesTh": [
        "แม่ใหญ่กาง 'แผนที่ความกล้า' ใบจิ๋วให้น้องดู",
        "\"นักผจญภัยตัวจริงใช้แผนที่แค่ 3 ก้าวเองนะ:\"",
        "\"1. แตะหัวใจอุ่น  2. ยิ้มทักทาย  3. ชวนเล่น!\"",
        "น้องบ๊อบพยักหน้าหงึกๆ ตาเป็นประกายความกล้า!"
      ],
      "linesEn": [
        "Mama unrolled a tiny pastel Explorer Map.",
        "\"Brave explorers only need three easy steps:\"",
        "\"1. Tap your heart  2. Say hi  3. Share & play!\"",
        "Bob nodded brightly—his brave eyes sparkled!"
      ]
    },
    {
      "pageNo": 7,
      "image": "/edu/st05/06_p07.webp",
      "tagTh": "หน้า 5 • ก้าวเท้าเข้าห้องเรียนอย่างกล้าหาญ!",
      "tagEn": "Page 5 • One Brave Step Inside!",
      "linesTh": [
        "น้องบ๊อบแตะตราหัวใจอุ่นที่สายกระเป๋าเบาๆ",
        "สูดหายใจลึก 1 ที แล้วโบกมือลาแม่ใหญ่",
        "\"บ๊อบจะไปผจญภัยแล้วนะ ตอนเย็นเจอกันครับ!\"",
        "แม่ใหญ่ยิ้มปลื้มใจ โบกมือส่งนักผจญภัยตัวน้อย"
      ],
      "linesEn": [
        "Bob gently tapped the warm heart on his strap.",
        "He took one deep breath and waved to Mama.",
        "\"I'm ready to explore! See you this afternoon!\"",
        "Mama beamed proudly and waved him inside."
      ]
    },
    {
      "pageNo": 8,
      "image": "/edu/st05/07_p08.webp",
      "tagTh": "หน้า 6 • ก้าวที่ 2 ยิ้มกว้างแล้วทักทาย!",
      "tagEn": "Page 6 • Step 2: Smile & Say Hello!",
      "linesTh": [
        "ในมุมหนังสือ น้องบ๊อบเห็นเพื่อนใหม่นั่งเงียบๆ",
        "น้องบ๊อบจำก้าวที่ 2 ได้ จึงเดินเข้าไปยิ้มกว้าง",
        "\"สวัสดี! เราชื่อบ๊อบนะ... Hi! I'm Bob!\"",
        "เพื่อนใหม่เงยหน้ายิ้มแฉ่ง โบกมือทักทายกลับ!"
      ],
      "linesEn": [
        "In the reading nook, a shy kitten sat alone.",
        "Remembering Step 2, Bob walked over smiling.",
        "\"Hello! I'm Bob! Nice to meet you!\"",
        "The new friend looked up and beamed right back!"
      ]
    },
    {
      "pageNo": 9,
      "image": "/edu/st05/08_p09.webp",
      "tagTh": "หน้า 7 • ก้าวที่ 3 แบ่งสีไม้ชวนเล่นด้วยกัน!",
      "tagEn": "Page 7 • Step 3: Share & Play Together!",
      "linesTh": [
        "ก้าวที่ 3: น้องบ๊อบหยิบสีไม้จากเป้แบ่งเพื่อน",
        "\"เรามาวาดแผนที่ผจญภัยด้วยกันไหม?\"",
        "เพื่อนใหม่ดีใจมาก หยิบบล็อกไม้มาต่อด้วยกัน",
        "ผีเสื้อในท้องหายวับ กลายเป็นเสียงหัวเราะแทน!"
      ],
      "linesEn": [
        "Step 3: Bob shared his crayons from his bag.",
        "\"Want to draw an adventure map together?\"",
        "His new friend cheered and shared wooden blocks.",
        "The tummy butterflies turned into happy giggles!"
      ]
    },
    {
      "pageNo": 10,
      "image": "/edu/st05/09_p10.webp",
      "tagTh": "หน้า 8 • สนุกกับเกมเสียงและนิทาน!",
      "tagEn": "Page 8 • Fun Storytime & Phonics Games!",
      "linesTh": [
        "ในห้องเรียนมีทั้งร้องเพลง นิทาน และเกมคำศัพท์",
        "น้องบ๊อบยกมือตอบเสียงดังฟังชัดอย่างมั่นใจ",
        "\"A - B - C! แอปเปิ้ลกับหมีน้อยครับ!\"",
        "หางพวงฟูของน้องแกว่งดุ๊กดิ๊กอย่างมีความสุข!"
      ],
      "linesEn": [
        "Class was full of songs, stories, and games!",
        "Bob raised his paw high with a brave voice.",
        "He loved matching bright picture cards together.",
        "His fluffy orange tail swished with pure joy!"
      ]
    },
    {
      "pageNo": 11,
      "image": "/edu/st05/10_p11.webp",
      "tagTh": "หน้า 9 • แป๊บเดียวก็ถึงเวลาแม่มารับแล้ว!",
      "tagEn": "Page 9 • Pickup Time Already!",
      "linesTh": [
        "กริ๊งงง! เสียงระฆังเลิกเรียนดังขึ้นอย่างไว",
        "แม่ใหญ่มายืนรอรับที่หน้าประตูตรงเวลาเป๊ะ!",
        "น้องบ๊อบวิ่งปรู๊ดออกไปโชว์ภาพวาดให้แม่ดู",
        "\"แม่ใหญ่! โรงเรียนสนุกมาก บ๊อบมีเพื่อนใหม่ด้วย!\""
      ],
      "linesEn": [
        "Ding! Before he knew it, school was done!",
        "Mama Mami waited right by the sunny gate.",
        "Bob zoomed over proudly holding his drawing.",
        "\"Mama! School was amazing—I made a new friend!\""
      ]
    },
    {
      "pageNo": 12,
      "image": "/edu/st05/11_p12.webp",
      "tagTh": "หน้า 10 • กอดอุ่นและเหรียญนักผจญภัยกล้าหาญ",
      "tagEn": "Page 10 • Warm Hug & Brave Explorer Badge",
      "linesTh": [
        "แม่ใหญ่โอบกอดน้องบ๊อบแน่นๆ ด้วยความภูมิใจ",
        "\"เห็นไหมลูก แม่กลับมาหาบ๊อบเสมอเลยนะ\"",
        "แม่ใหญ่แปะ 'ดาวทองนักผจญภัย' ลงบนแผนที่",
        "\"วันนี้บ๊อบกล้าหาญที่สุดในโลกเลยจ้ะ!\""
      ],
      "linesEn": [
        "Mama Mami wrapped Bob in a huge proud hug.",
        "\"See, sweetheart? I always come back for you.\"",
        "She placed a golden Explorer Star on his map.",
        "\"You were the bravest little explorer today!\""
      ]
    },
    {
      "pageNo": 13,
      "image": "/edu/st05/12_p13.webp",
      "tagTh": "หน้า 11 • พรุ่งนี้ไปผจญภัยกันอีกนะ!",
      "tagEn": "Page 11 • Ready for Tomorrow's Adventure!",
      "linesTh": [
        "คืนนี้น้องบ๊อบจัดเป้สีเขียวมิ้นต์เตรียมไว้พร้อม",
        "ยิ้มอุ่นๆ ใต้ผ้าห่มลายแผนที่ดาวดวงน้อย",
        "โรงเรียนไม่ใช่ที่ที่น่ากลัวอีกต่อไปแล้ว",
        "ฝันดีนะน้องบ๊อบ... พรุ่งนี้ไปสนุกกันใหม่นะ!"
      ],
      "linesEn": [
        "Tonight, Bob packed his mint bag for tomorrow.",
        "He smiled warmly under his starry quilt.",
        "School wasn't scary at all—it was full of fun!",
        "Goodnight, brave Bob... see you tomorrow!"
      ]
    }
  ],
  "dialogicQuestions": [
    {
      "emoji": "🦋",
      "th": "1. ตอนไปโรงเรียนหรือไปที่ใหม่ๆ หนูเคยรู้สึกเหมือนมี 'ผีเสื้อบินในท้อง' แบบน้องบ๊อบไหมครับ?",
      "en": "1. Have you ever felt 'tummy butterflies' when visiting a new place or school like Explorer Bob?"
    },
    {
      "emoji": "💛",
      "th": "2. ในแผนที่ความกล้า 3 ก้าว (แตะหัวใจ-ยิ้มทักทาย-ชวนเล่น) พรุ่งนี้หนูอยากลองใช้ก้าวไหนกับเพื่อนใหม่?",
      "en": "2. Of the 3 Brave Steps (Tap Heart, Say Hi, Share & Play), which one do you want to try tomorrow?"
    },
    {
      "emoji": "👋",
      "th": "3. เรามาซ้อมคำทักทายเพื่อนใหม่แบบน้องบ๊อบ 'สวัสดี! เราชื่อ...' / 'Hi! I'm...' ด้วยกัน 1 รอบดีไหม?",
      "en": "3. Shall we practice saying 'Hi! I'm ___! Want to play?' together just like Explorer Bob?"
    }
  ],
  "galleryImages": [
    {
      "src": "/edu/st05/mockup-01-cover.webp",
      "labelTh": "ปกหน้า & จุดเด่นนิทาน 16 หน้า (เล่มที่ 5)",
      "labelEn": "Front Cover & 16-Page Highlights (Book 5)"
    },
    {
      "src": "/edu/st05/mockup-02-spreads.webp",
      "labelTh": "ส่องภาพประกอบสีน้ำจริงข้างใน (12 ภาพเต็มเล่ม)",
      "labelEn": "Inside Watercolor Illustrations (12 Full Plates)"
    },
    {
      "src": "/edu/st05/mockup-03-audio-qr.webp",
      "labelTh": "นิทานกระดาษคู่ Hybrid QR + กระดานคำทักทาย & Phonics",
      "labelEn": "Hybrid QR Audio Storybook & Friendly Hello Board"
    },
    {
      "src": "/edu/st05/mockup-04-editions.webp",
      "labelTh": "เทียบสิทธิ์ Home (79฿) vs Class (159฿) + แพ็กคู่ VL01 149฿",
      "labelEn": "Home ($3.99) vs Class ($6.99) + VL01 Pair Bundle"
    }
  ],
  "faqs": [
    {
      "qTh": "นิทาน EDU-ST05 ช่วยลดอาการร้องไห้ไม่อยากไปโรงเรียนได้จริงไหม?",
      "qEn": "How does EDU-ST05 help with school drop-off tears?",
      "aTh": "นิทานเล่มนี้ช่วยสร้าง 'พิธีกรรมเชื่อมต่อใจแม่-ลูก' ด้วยตราหัวใจอุ่นที่สายกระเป๋าเป้ และซ้อมคำพูดทักทายเพื่อนใหม่สั้นๆ 1 ประโยคบนหน้า /edu/st05 ทำให้ลูกอุ่นใจว่าแม่รอรับเสมอและกล้าก้าวเข้าห้องเรียนครับ",
      "aEn": "It creates a comforting 'Pocket Heart' separation ritual and lets kids rehearse friendly hello phrases on /edu/st05 before morning drop-off."
    },
    {
      "qTh": "แพ็กคู่ 149฿ (EDU-ST05 + EDU-VL01) ได้อะไรบ้าง?",
      "qEn": "What is included in the 149 THB Pair Pack (EDU-ST05 + EDU-VL01)?",
      "aTh": "ได้ครบทั้งนิทานภาพสีน้ำ EDU-ST05 (16 หน้า TH+EN) และชุดฝึกภาษา & Phonics A–Z น้องบ๊อบ EDU-VL01 (32 หน้า + 36 คำศัพท์ 2 ภาษา + 27 แฟลชการ์ด + กระดานเสียง A–Z) ประหยัดจากปกติ 178฿ ครับ!",
      "aEn": "You get both the 16-page storybook EDU-ST05 and the 32-page Visual Phonics & Vocabulary Kit EDU-VL01 (A-Z soundboard + 27 flashcards)!"
    }
  ]
};

export const ST06_CONFIG: StorybookConfig = {
  "sku": "EDU-ST06",
  "slug": "st06",
  "bookNo": 6,
  "theme": "amber",
  "badgeTh": "👑 เล่มปิดซีซัน 1 (6/6) • Focus Timer 5 น.",
  "badgeEn": "👑 Season 1 Finale (6/6) • 5-Min Focus Timer",
  "heroPrefixTh": "นิทานฝึกสมาธิ EF:",
  "heroPrefixEn": "EF Focus Storybook:",
  "titleTh": "นักสืบแซลมอนกับปริศนาที่หายไป",
  "titleEn": "Detective Salmon's Patient Clue Hunt",
  "heroDescTh": "นิทานภาพสีน้ำ 16 หน้า เล่มปิดซีซัน 1 (น้องแซลมอน × แม่ใหญ่) ฝึกสมาธิ การรอคอย และไม่ยอมแพ้ง่ายๆ ด้วย 'สูตรนักสืบใจเย็น 3 ขั้น' + นาฬิกา Focus Timer 5 นาทีฟรี!",
  "heroDescEn": "16-page Season 1 Finale watercolor storybook (Detective Salmon & Mama Mami) building EF focus, patience & persistence with a 5-Min Focus Timer!",
  "coverImage": "/edu/st06/01_cover.webp",
  "coverAlt": "EDU-ST06 Detective Salmon's Patient Clue Hunt",
  "freebieTitleTh": "ชุดทดลองอ่านฟรี 5 หน้า (EDU-ST06)",
  "freebieTitleEn": "Free 5-Page Sample (EDU-ST06)",
  "freebieThUrl": "/edu/st06/EDU-ST06_Freebie_5Pages_TH.pdf",
  "freebieEnUrl": "/edu/st06/EDU-ST06_Freebie_5Pages_EN.pdf",
  "priceHomeThb": 79,
  "priceHomeRegularThb": 129,
  "priceHomeUsd": "$3.99",
  "priceClassThb": 159,
  "priceClassRegularThb": 249,
  "priceClassUsd": "$6.99",
  "homeBulletsTh": [
    "นิทานภาพสีน้ำ 16 หน้าเต็ม (TH + EN ครบ 2 ภาษา)",
    "ปริ้นท์อ่านหรือเปิดบน iPad ให้ลูกในครอบครัวได้ไม่จำกัด",
    "คู่มือพ่อแม่ 3 ขั้น + 3 คำถามชวนคุย P14 + กิจกรรมวาดภาพ P15",
    "เว็บเสียงเล่านิทาน /edu/st06 ไร้โฆษณา 100% ใช้ได้ตลอดชีพ"
  ],
  "classBulletsTh": [
    "ลิขสิทธิ์คุณครู 1 ท่าน ใช้เปิดเล่าหน้าห้องเรียนได้ทั้งห้อง",
    "ขึ้นจอทีวี/โปรเจกเตอร์พร้อมเปิดเสียงเล่านิทาน TH/EN ได้ทันที",
    "ปริ้นท์หน้ากิจกรรม P15 แจกนักเรียน 30–40 คนได้ไม่จำกัด",
    "ครบทั้งภาษาไทยและภาษาอังกฤษ เหมาะสำหรับห้องเรียนปกติและ EP"
  ],
  "pages": [
    {
      "pageNo": 3,
      "image": "/edu/st06/02_p03.webp",
      "tagTh": "หน้า 1 • ปริศนาจิ๊กซอว์ชิ้นสุดท้าย!",
      "tagEn": "Page 1 • The Missing Last Puzzle Piece!",
      "linesTh": [
        "บ่ายวันนี้น้องแซลมอนกำลังต่อจิ๊กซอว์รูปดาว",
        "ต่อมาตั้งนานจนเกือบจะเสร็จสมบูรณ์แล้ว!",
        "แต่เอ๊ะ... ช่องตรงกลางยังว่างอยู่หนึ่งช่อง",
        "\"อ้าว! ชิ้นจิ๊กซอว์ดาวสีทองหายไปไหนนะ?\""
      ],
      "linesEn": [
        "This afternoon, Salmon built a star puzzle.",
        "She worked so hard and nearly finished it!",
        "Wait... one tiny spot in the middle was empty.",
        "\"Oh no! Where did the golden star piece go?\""
      ]
    },
    {
      "pageNo": 4,
      "image": "/edu/st06/03_p04.webp",
      "tagTh": "หน้า 2 • ยิ่งรีบร้อน ยิ่งหาไม่เจอ!",
      "tagEn": "Page 2 • Rushing Makes It Harder to See!",
      "linesTh": [
        "น้องแซลมอนรีบรื้อกล่องของเล่นอย่างไว!",
        "หันซ้ายหันขวา คุ้ยหมอน คุ้ยกองตุ๊กตา",
        "ของเล่นกระจายเต็มพื้นแต่ก็ยังไม่เจออยู่ดี",
        "\"ฮือ... ยากจังเลย แซลมอนไม่หาแล้วได้ไหม?\""
      ],
      "linesEn": [
        "Salmon rushed and dumped out her toy box!",
        "She spun left and right, tossing pillows high.",
        "Toys scattered everywhere, yet no piece showed.",
        "\"Ugh... it's too hard! I want to give up!\""
      ]
    },
    {
      "pageNo": 5,
      "image": "/edu/st06/04_p05.webp",
      "tagTh": "หน้า 3 • แว่นขยายและสูตรนักสืบ 3 ขั้น",
      "tagEn": "Page 3 • Mama's 3-Step Detective Plan",
      "linesTh": [
        "แม่ใหญ่เดินมานั่งข้างๆ โอบกอดลูกเบาๆ",
        "แล้วยื่นแว่นขยายด้ามไม้ให้นักสืบตัวน้อย",
        "\"นักสืบเก่งๆ ไม่รีบจ้ะ ใช้แค่ 3 ขั้นง่ายๆ:\"",
        "\"1. หยุดหายใจ 2. ส่องทีละมุม 3. ไม่ยอมแพ้!\""
      ],
      "linesEn": [
        "Mama Mami sat beside her with a gentle hug.",
        "She handed Salmon a wooden magnifying glass.",
        "\"Great detectives go slow with three steps:\"",
        "\"1. Breathe  2. Look closely  3. Never give up!\""
      ]
    },
    {
      "pageNo": 6,
      "image": "/edu/st06/05_p06.webp",
      "tagTh": "หน้า 4 • ขั้นที่ 1 หยุดพักและหายใจลึกๆ",
      "tagEn": "Page 4 • Step 1: Pause and Take a Breath",
      "linesTh": [
        "น้องแซลมอนวางอุ้งมือน้อยๆ ลงบนพุงกลม",
        "หลับตาสูดหายใจเข้าช้าๆ... นับ 1 - 2 - 3",
        "แล้วค่อยๆ ผ่อนลมหายใจออกเบาๆ อย่างใจเย็น",
        "หัวใจเต้นช้าลง สมองนักสืบกลับมาสว่างใส!"
      ],
      "linesEn": [
        "Salmon placed both soft paws on her tummy.",
        "She closed her eyes and breathed in... 1, 2, 3.",
        "Then she puffed the air out nice and slowly.",
        "Her heart felt calm—her detective mind shone!"
      ]
    },
    {
      "pageNo": 7,
      "image": "/edu/st06/06_p07.webp",
      "tagTh": "หน้า 5 • ขั้นที่ 2 ส่องทีละมุม — ใต้โต๊ะไม้",
      "tagEn": "Page 5 • Step 2: Check Corner One — The Table",
      "linesTh": [
        "น้องแซลมอนยกแว่นขยายขึ้นส่องมุมที่ 1",
        "ค่อยๆ ก้มมองใต้โต๊ะไม้ทีละนิดอย่างตั้งใจ",
        "เจอสีเทียนแท่งสีเหลืองกับลูกแก้วสีใส",
        "\"ยังไม่ใช่ชิ้นดาว... ไม่เป็นไร ส่องต่อนะ!\""
      ],
      "linesEn": [
        "Salmon raised her glass to check Corner One.",
        "She peeked under the wooden table with focus.",
        "She found a yellow crayon and a clear marble.",
        "\"Not the star piece yet—let's keep looking!\""
      ]
    },
    {
      "pageNo": 8,
      "image": "/edu/st06/07_p08.webp",
      "tagTh": "หน้า 6 • เบาะแสที่ 1 ข้างชั้นหนังสือนิทาน",
      "tagEn": "Page 6 • Clue One by the Cozy Bookshelf",
      "linesTh": [
        "มุมที่ 2 น้องเดินไปส่องข้างชั้นหนังสือนิทาน",
        "เอ๊ะ! มีมุมสีทองแหลมๆ โผล่ออกมานิดหนึ่ง!",
        "พอดึงดูเบาๆ กลับเป็นสติกเกอร์ดาวแผ่นจิ๋ว",
        "แซลมอนยิ้มสู้ \"ใกล้เจอแล้วล่ะ ต้องใจเย็น!\""
      ],
      "linesEn": [
        "Corner Two: she checked the storybook shelf.",
        "Ooh! A tiny golden point peeked out quietly!",
        "She pulled gently—just a shiny star sticker.",
        "Salmon smiled bravely: \"Stay patient, keep going!\""
      ]
    },
    {
      "pageNo": 9,
      "image": "/edu/st06/08_p09.webp",
      "tagTh": "หน้า 7 • เบาะแสที่ 2 รอยเส้นริบบิ้นนำทาง!",
      "tagEn": "Page 7 • Clue Two: A Guiding Ribbon Trail!",
      "linesTh": [
        "เพราะไม่ใจร้อน น้องจึงสังเกตเห็นเบาะแสใหม่!",
        "มีปลายริบบิ้นสีฟ้าพาดยาวไปที่มุมโซฟานุ่ม",
        "น้องแซลมอนค่อยๆ เดินตามเส้นริบบิ้นไปทีละก้าว",
        "\"เหมือนเกมตามหาเส้นทางเลย สนุกจัง!\""
      ],
      "linesEn": [
        "Because she slowed down, she spotted a clue!",
        "A soft blue ribbon trailed to the cozy sofa.",
        "Salmon followed the ribbon one step at a time.",
        "\"Just like a path puzzle—this is so much fun!\""
      ]
    },
    {
      "pageNo": 10,
      "image": "/edu/st06/09_p10.webp",
      "tagTh": "หน้า 8 • ขั้นที่ 3 รอคอยและค่อยๆ ยกหมอนทีละใบ",
      "tagEn": "Page 8 • Step 3: Lift Each Cushion Gently",
      "linesTh": [
        "ถึงมุมหมอนนุ่มที่ปลายทางของริบบิ้นสีฟ้าแล้ว",
        "น้องแซลมอนไม่โยนหมอนทิ้งเหมือนตอนแรก",
        "แต่ค่อยๆ ยกหมอนทีละใบวางเรียงอย่างเบามือ",
        "เอ๊ะ... ใต้หมอนใบที่สามมีแสงสีทองวิบวับ!"
      ],
      "linesEn": [
        "The blue ribbon ended at a stack of pillows.",
        "This time, Salmon did not toss them around.",
        "She lifted each soft pillow slowly and neatly.",
        "Wait... something golden sparkled underneath!"
      ]
    },
    {
      "pageNo": 11,
      "image": "/edu/st06/10_p11.webp",
      "tagTh": "หน้า 9 • เย้! เจอชิ้นจิ๊กซอว์ดาวสีทองแล้ว!",
      "tagEn": "Page 9 • Hooray! The Golden Star Piece!",
      "linesTh": [
        "\"เจอแล้ว!! ชิ้นดาวสีทองอยู่ตรงนี้นี่เอง!\"",
        "น้องแซลมอนชูชิ้นดาวขึ้นสูงด้วยความดีใจ",
        "ตาสีเขียวหลังแว่นสีม่วงเป็นประกายวิบวับ",
        "การใจเย็นและไม่ยอมแพ้พาหนูมาเจอจนได้!"
      ],
      "linesEn": [
        "\"Found it!! The golden star piece was here!\"",
        "Salmon held the glowing star piece up high.",
        "Her green eyes sparkled behind purple glasses.",
        "Patience and focus solved the whole mystery!"
      ]
    },
    {
      "pageNo": 12,
      "image": "/edu/st06/11_p12.webp",
      "tagTh": "หน้า 10 • วางชิ้นสุดท้าย... สำเร็จ 100%!",
      "tagEn": "Page 10 • The Final Piece Fits Just Right!",
      "linesTh": [
        "คลิก! น้องแซลมอนวางชิ้นดาวลงตรงกลางพอดี",
        "ภาพจิ๊กซอว์บ้านแก๊ง 6 แมวสมบูรณ์สวยงาม!",
        "แม่ใหญ่ปรบมือชื่นชมแล้วกอดลูกสาวแน่นๆ",
        "\"แม่ภูมิใจมากที่แซลมอนใจเย็นและไม่ยอมแพ้จ้ะ\""
      ],
      "linesEn": [
        "Click! Salmon placed the star right in place.",
        "The 6 Cats puzzle picture was 100% complete!",
        "Mama Mami clapped and hugged her tightly.",
        "\"I'm so proud you stayed calm and never quit!\""
      ]
    },
    {
      "pageNo": 13,
      "image": "/edu/st06/12_p13.webp",
      "tagTh": "หน้า 11 • นักสืบใจเย็นทำได้ทุกปริศนา!",
      "tagEn": "Page 11 • Calm Detectives Solve Anything!",
      "linesTh": [
        "ก่อนนอน น้องเก็บแว่นขยายเข้ากล่องเรียบร้อย",
        "วางภาพจิ๊กซอว์ดาวไว้ข้างหมอนอย่างภูมิใจ",
        "ต่อให้เจอปริศนายากแค่ไหน แค่ใจเย็นทีละขั้น",
        "ฝันดีนะแซลมอน... พรุ่งนี้ลุยปริศนาใหม่กัน!"
      ],
      "linesEn": [
        "At bedtime, Salmon put her glass away neatly.",
        "She smiled at her finished star puzzle nearby.",
        "Even tricky puzzles feel easy step by step.",
        "Goodnight, Detective Salmon—sweet dreams!"
      ]
    }
  ],
  "dialogicQuestions": [
    {
      "emoji": "🧩",
      "th": "1. ตอนที่หนูหาของไม่เจอหรือทำอะไรยากๆ หนูเคยรู้สึกอยากยอมแพ้แบบน้องแซลมอนตอนแรกไหมครับ?",
      "en": "1. Have you ever felt frustrated and wanted to give up on a tricky puzzle like Detective Salmon?"
    },
    {
      "emoji": "🔍",
      "th": "2. สูตรนักสืบ 3 ขั้นของน้องแซลมอน (หยุดหายใจ-ส่องทีละมุม-ไม่ยอมแพ้) ขั้นไหนที่หนูชอบที่สุด?",
      "en": "2. Which of Detective Salmon's 3 steps (Breathe, Look Closely, Never Give Up) is your favorite?"
    },
    {
      "emoji": "⭐",
      "th": "3. พรุ่งนี้ถ้าเจอเกมหรือการบ้านที่ท้าทาย เรามาลองใช้แว่นขยายนักสืบค่อยๆ ทำทีละขั้นด้วยกันไหม?",
      "en": "3. Next time something feels tricky, shall we put on our detective glasses and go step by step?"
    }
  ],
  "galleryImages": [
    {
      "src": "/edu/st06/mockup-01-cover.webp",
      "labelTh": "ปกหน้า & จุดเด่นนิทาน 16 หน้า (เล่มที่ 6)",
      "labelEn": "Front Cover & 16-Page Highlights (Book 6)"
    },
    {
      "src": "/edu/st06/mockup-02-spreads.webp",
      "labelTh": "ส่องภาพประกอบสีน้ำจริงข้างใน (12 ภาพเต็มเล่ม)",
      "labelEn": "Inside Watercolor Illustrations (12 Full Plates)"
    },
    {
      "src": "/edu/st06/mockup-03-audio-qr.webp",
      "labelTh": "นิทานกระดาษคู่ Hybrid QR + นาฬิกา Focus Timer 5 นาที",
      "labelEn": "Hybrid QR Audio Storybook & 5-Min Focus Timer"
    },
    {
      "src": "/edu/st06/mockup-04-editions.webp",
      "labelTh": "เทียบสิทธิ์ Home (79฿) vs Class (159฿) + แพ็กคู่ EF01 149฿",
      "labelEn": "Home ($3.99) vs Class ($6.99) + EF01 Pair Bundle"
    }
  ],
  "faqs": [
    {
      "qTh": "นิทาน EDU-ST06 ช่วยฝึกสมาธิและแก้ปัญหาลูกใจร้อนยอมแพ้ง่ายได้ยังไง?",
      "qEn": "How does EDU-ST06 build patience and persistence?",
      "aTh": "สอนเด็กวัย 3–6 ปีด้วย 'สูตรนักสืบใจเย็น 3 ขั้น' ที่ทำตามได้ทันที: 1. หยุด-หายใจ 1-2-3 ➔ 2. ส่องหาทีละมุม ➔ 3. รอคอยและไม่ยอมแพ้ พร้อมนาฬิกา Focus Timer 5 นาทีบนหน้า /edu/st06 ครับ",
      "aEn": "It teaches kids a concrete 3-Step Detective Plan (Pause & Breathe, Check Corner by Corner, Stay Patient) paired with our 5-Min Focus Timer on /edu/st06."
    },
    {
      "qTh": "แพ็กคู่ 149฿ (EDU-ST06 + EDU-EF01) หรือ Boxset 6 เล่ม 349฿ คุ้มกว่ากัน?",
      "qEn": "Should I get the 149 THB Pair Pack or the 6-Book Season 1 Boxset?",
      "aTh": "ถ้าอยากเน้นฝึกสมอง EF ครบจบกับน้องแซลมอน แนะนำแพ็กคู่ ST06+EF01 เพียง 149฿ (48 หน้า) แต่ถ้าอยากเก็บนิทานแก๊ง 6 แมวครบทุกเล่มทั้ง 6 ทักษะ (ST01–ST06 = 96 หน้า 12 PDFs) แนะนำ Boxset Season 1 เพียง 349฿ ประหยัด 125฿ ครับ!",
      "aEn": "The ST06+EF01 Pair Pack (149 THB) is ideal for focused EF practice, while the Complete Season 1 Boxset (349 THB) unlocks all 6 bilingual storybooks (96 pages) at 26% off!"
    }
  ]
};
