// Web Speech API + Web Audio API Fallback Engine for EDU-VL01 (Bob's Phonics Soundboard)
// 100% browser-native, zero external MP3 dependencies, works offline!

let sharedCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioCtx) return null;
  if (!sharedCtx) sharedCtx = new AudioCtx();
  if (sharedCtx.state === "suspended") {
    sharedCtx.resume().catch(() => {});
  }
  return sharedCtx;
}

export function playSoftTapChime(freq = 660): void {
  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, now);
  osc.frequency.exponentialRampToValueAtTime(freq * 1.25, now + 0.09);
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(0.14, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.15);
}

function pickVoice(langPrefix: string): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return null;
  }
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const exact = voices.find((v) =>
    v.lang.toLowerCase().startsWith(langPrefix.toLowerCase())
  );
  return exact ?? null;
}

export function stopPhonicsSpeech(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
}

export function speakPhonicsCard(params: {
  letter: string;
  spokenPhoneme: string;
  word: string;
  thaiMeaning: string;
  bilingual: boolean;
  soundEnabled: boolean;
}): void {
  const { letter, spokenPhoneme, word, thaiMeaning, bilingual, soundEnabled } =
    params;
  if (!soundEnabled) return;

  playSoftTapChime(587.33);

  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  try {
    window.speechSynthesis.cancel();
    const enUtter = new SpeechSynthesisUtterance(
      `${letter}. ${spokenPhoneme}. ${word}.`
    );
    enUtter.lang = "en-US";
    enUtter.rate = 0.84;
    enUtter.pitch = 1.08;
    const enVoice = pickVoice("en-US") ?? pickVoice("en");
    if (enVoice) enUtter.voice = enVoice;
    window.speechSynthesis.speak(enUtter);

    if (bilingual && thaiMeaning) {
      const thUtter = new SpeechSynthesisUtterance(thaiMeaning);
      thUtter.lang = "th-TH";
      thUtter.rate = 0.95;
      const thVoice = pickVoice("th");
      if (thVoice) thUtter.voice = thVoice;
      window.speechSynthesis.speak(thUtter);
    }
  } catch {
    // Fallback chime already played above
  }
}

export function speakVocabWord(params: {
  word: string;
  thaiMeaning: string;
  bilingual: boolean;
  soundEnabled: boolean;
}): void {
  const { word, thaiMeaning, bilingual, soundEnabled } = params;
  if (!soundEnabled) return;

  playSoftTapChime(659.25);

  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  try {
    window.speechSynthesis.cancel();
    const enUtter = new SpeechSynthesisUtterance(word);
    enUtter.lang = "en-US";
    enUtter.rate = 0.84;
    enUtter.pitch = 1.06;
    const enVoice = pickVoice("en-US") ?? pickVoice("en");
    if (enVoice) enUtter.voice = enVoice;
    window.speechSynthesis.speak(enUtter);

    if (bilingual && thaiMeaning) {
      const thUtter = new SpeechSynthesisUtterance(thaiMeaning);
      thUtter.lang = "th-TH";
      thUtter.rate = 0.95;
      const thVoice = pickVoice("th");
      if (thVoice) thUtter.voice = thVoice;
      window.speechSynthesis.speak(thUtter);
    }
  } catch {
    // Fallback chime already played
  }
}

export function speakCvcBlend(params: {
  sounds: string[];
  word: string;
  thaiMeaning: string;
  bilingual: boolean;
  soundEnabled: boolean;
}): void {
  const { sounds, word, thaiMeaning, bilingual, soundEnabled } = params;
  if (!soundEnabled) return;

  playSoftTapChime(783.99);

  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  try {
    window.speechSynthesis.cancel();
    const script = `${sounds.join(", ")}. ${word}!`;
    const enUtter = new SpeechSynthesisUtterance(script);
    enUtter.lang = "en-US";
    enUtter.rate = 0.78;
    enUtter.pitch = 1.08;
    const enVoice = pickVoice("en-US") ?? pickVoice("en");
    if (enVoice) enUtter.voice = enVoice;
    window.speechSynthesis.speak(enUtter);

    if (bilingual && thaiMeaning) {
      const thUtter = new SpeechSynthesisUtterance(thaiMeaning);
      thUtter.lang = "th-TH";
      thUtter.rate = 0.95;
      const thVoice = pickVoice("th");
      if (thVoice) thUtter.voice = thVoice;
      window.speechSynthesis.speak(thUtter);
    }
  } catch {
    // Fallback chime already played
  }
}
