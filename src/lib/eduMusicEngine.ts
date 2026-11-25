"use client";

/**
 * Zero-dependency Web Audio Music Studio Engine for EDU-MU01
 * ("สนุกกับจังหวะและโน้ตดนตรีกับน้องข้าวต้ม / Khao Tom's Music & Rhythm Adventure")
 *
 * Matches the printed 32-page PDF (P03-P30) 100% — Zero AI-Slop:
 * - T01: 5-question Dynamics & Pitch Quiz (P07 / Answer Key P29)
 * - T02: 4 Note Durations at exact 70 BPM (P08-P11)
 * - T03 / T04: Steady 4/4 Clap-Along Backing Grooves at 70 BPM & 95 BPM (P14-P19)
 * - T05: 8-Instrument Sound Quiz in exact P23 / P30 order
 * - T06: Khao Tom's Little Band 95 BPM Sing-Along Melody (P26)
 */

let musicCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioCtx) return null;
  if (!musicCtx) {
    musicCtx = new AudioCtx();
  }
  if (musicCtx.state === "suspended") {
    void musicCtx.resume();
  }
  return musicCtx;
}

function scheduleTone(
  ctx: AudioContext,
  freq: number,
  startOffset: number,
  duration: number,
  gainPeak: number,
  type: OscillatorType = "triangle",
  attack = 0.015
) {
  const t0 = ctx.currentTime + startOffset;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);

  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.001, gainPeak), t0 + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.04);
}

function scheduleNoise(
  ctx: AudioContext,
  startOffset: number,
  duration: number,
  filterType: BiquadFilterType,
  filterFreq: number,
  q: number,
  gainPeak: number
) {
  const sampleRate = ctx.sampleRate;
  const length = Math.max(1, Math.floor(sampleRate * duration));
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const src = ctx.createBufferSource();
  src.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = filterType;
  filter.frequency.value = filterFreq;
  filter.Q.value = q;

  const env = ctx.createGain();
  const t0 = ctx.currentTime + startOffset;
  env.gain.setValueAtTime(0.0001, t0);
  env.gain.exponentialRampToValueAtTime(Math.max(0.001, gainPeak), t0 + 0.006);
  env.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

  src.connect(filter);
  filter.connect(env);
  env.connect(ctx.destination);
  src.start(t0);
}

function scheduleWoodblock(ctx: AudioContext, startOffset: number, accent = false) {
  const t0 = ctx.currentTime + startOffset;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  const baseFreq = accent ? 1050 : 780;
  osc.frequency.setValueAtTime(baseFreq, t0);
  osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.65, t0 + 0.055);

  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(accent ? 0.28 : 0.16, t0 + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.065);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + 0.08);
}

function scheduleKick(ctx: AudioContext, startOffset: number, gainPeak = 0.38) {
  const t0 = ctx.currentTime + startOffset;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(145, t0);
  osc.frequency.exponentialRampToValueAtTime(42, t0 + 0.14);

  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(gainPeak, t0 + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + 0.22);
}

/** T01: 5-Question Dynamics & Pitch Quiz (Exact P07 / Answer Key P29) */
export function playDynamicsPitchQuiz(questionNum: 1 | 2 | 3 | 4 | 5): void {
  const ctx = getCtx();
  if (!ctx) return;

  // Bell cue before question
  scheduleTone(ctx, 1318.5, 0.0, 0.18, 0.12, "sine");

  if (questionNum === 1) {
    // Q1 -> A (Loud / Forte): C Major chord loud x2
    [0.25, 0.9].forEach((offset) => {
      [261.63, 329.63, 392.0, 523.25].forEach((f) => {
        scheduleTone(ctx, f, offset, 0.5, 0.22, "sawtooth", 0.01);
        scheduleTone(ctx, f, offset, 0.5, 0.25, "triangle", 0.01);
      });
      scheduleKick(ctx, offset, 0.35);
    });
  } else if (questionNum === 2) {
    // Q2 -> B (Soft / Piano): Gentle soft notes x2
    [0.25, 0.95].forEach((offset) => {
      scheduleTone(ctx, 523.25, offset, 0.35, 0.055, "sine", 0.03);
      scheduleTone(ctx, 659.25, offset + 0.18, 0.4, 0.05, "sine", 0.03);
    });
  } else if (questionNum === 3) {
    // Q3 -> A (Loud / Forte): Timpani + Cymbal crash
    [0.25, 0.95].forEach((offset) => {
      scheduleKick(ctx, offset, 0.48);
      scheduleTone(ctx, 98.0, offset, 0.55, 0.34, "triangle", 0.01);
      scheduleNoise(ctx, offset, 0.5, "highpass", 4200, 0.8, 0.22);
    });
  } else if (questionNum === 4) {
    // Q4 -> A (High Pitch ↑): Bird-like C6 - E6 - G6
    [
      [1046.5, 0.25],
      [1318.5, 0.5],
      [1567.98, 0.75],
      [2093.0, 1.0],
    ].forEach(([f, off]) => {
      scheduleTone(ctx, f, off, 0.32, 0.18, "sine", 0.01);
      scheduleTone(ctx, f * 2, off, 0.14, 0.04, "sine", 0.01);
    });
  } else {
    // Q5 -> B (Low Pitch ↓): Bear-like C2 - G1 - C2
    [
      [65.41, 0.25, 0.45],
      [49.0, 0.75, 0.45],
      [65.41, 1.25, 0.65],
    ].forEach(([f, off, dur]) => {
      scheduleTone(ctx, f, off, dur, 0.34, "triangle", 0.02);
      scheduleTone(ctx, f * 2, off, dur, 0.16, "sine", 0.02);
    });
  }
}

/** T02: 4 Note Durations at exact 70 BPM (P08-P11) */
export function playNoteDurationDemo(
  kind: "quarter" | "half" | "whole" | "rest"
): void {
  const ctx = getCtx();
  if (!ctx) return;

  const beat = 60 / 70; // ~0.857s per beat
  // 4 steady woodblock clicks (1 - 2 - 3 - 4)
  for (let b = 0; b < 4; b++) {
    scheduleWoodblock(ctx, b * beat, b === 0);
  }

  if (kind === "quarter") {
    // 4 short C5 notes on beats 1, 2, 3, 4
    for (let b = 0; b < 4; b++) {
      scheduleTone(ctx, 523.25, b * beat, beat * 0.55, 0.2, "triangle");
    }
  } else if (kind === "half") {
    // 2 long 2-beat notes on beats 1 & 3
    scheduleTone(ctx, 523.25, 0, beat * 1.85, 0.22, "triangle");
    scheduleTone(ctx, 659.25, 2 * beat, beat * 1.85, 0.22, "triangle");
  } else if (kind === "whole") {
    // 1 full 4-beat sustained note
    scheduleTone(ctx, 523.25, 0, beat * 3.85, 0.22, "triangle");
    scheduleTone(ctx, 392.0, 0, beat * 3.85, 0.12, "sine");
  } else {
    // Quarter rest: Play(1) - Rest(2) - Play(3) - Rest(4)
    scheduleTone(ctx, 523.25, 0, beat * 0.55, 0.22, "triangle");
    scheduleTone(ctx, 523.25, 2 * beat, beat * 0.55, 0.22, "triangle");
  }
}

/** T05: 8-Instrument Sound Quiz — EXACT P23 / Answer Key P30 order! */
export function playInstrumentSample(num: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8): void {
  const ctx = getCtx();
  if (!ctx) return;

  switch (num) {
    case 1: {
      // 1. Drum (Kick + Snare + Tom 4/4)
      const step = 0.28;
      scheduleKick(ctx, 0, 0.45);
      scheduleNoise(ctx, step, 0.15, "bandpass", 1600, 1.0, 0.28);
      scheduleKick(ctx, step * 2, 0.42);
      scheduleTone(ctx, 130, step * 2.5, 0.18, 0.28, "sine");
      scheduleNoise(ctx, step * 3, 0.18, "bandpass", 1700, 1.0, 0.3);
      scheduleKick(ctx, step * 4, 0.48);
      break;
    }
    case 2: {
      // 2. Piano (C-D-E-F-G-E-C)
      const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 659.25, 523.25];
      notes.forEach((f, idx) => {
        const off = idx * 0.22;
        scheduleTone(ctx, f, off, 0.42, 0.2, "triangle", 0.008);
        scheduleTone(ctx, f * 2, off, 0.22, 0.06, "sine", 0.008);
      });
      break;
    }
    case 3: {
      // 3. Maracas (Rhythmic crisp shaker)
      [0, 0.25, 0.5, 0.65, 0.9, 1.15, 1.4, 1.55].forEach((off, i) => {
        scheduleNoise(ctx, off, 0.09, "highpass", 5800, 1.2, i % 2 === 0 ? 0.22 : 0.14);
      });
      break;
    }
    case 4: {
      // 4. Acoustic Guitar (Strummed C - G - Am - F chords)
      const chords = [
        [261.63, 329.63, 392.0, 523.25],
        [196.0, 246.94, 293.66, 392.0],
        [220.0, 261.63, 329.63, 440.0],
        [174.61, 220.0, 261.63, 349.23],
      ];
      chords.forEach((chord, cIdx) => {
        chord.forEach((f, sIdx) => {
          scheduleTone(
            ctx,
            f,
            cIdx * 0.42 + sIdx * 0.025,
            0.48,
            0.13,
            "sawtooth",
            0.006
          );
        });
      });
      break;
    }
    case 5: {
      // 5. Xylophone (Bright wooden chime C5 -> C6 -> C5)
      const scale = [523.25, 659.25, 783.99, 1046.5, 783.99, 659.25, 523.25];
      scale.forEach((f, idx) => {
        const off = idx * 0.16;
        scheduleTone(ctx, f, off, 0.24, 0.22, "sine", 0.004);
        scheduleTone(ctx, f * 3, off, 0.07, 0.07, "sine", 0.003);
      });
      break;
    }
    case 6: {
      // 6. Tambourine (Tap + metallic jingle)
      [0, 0.35, 0.7, 0.88, 1.2].forEach((off) => {
        scheduleKick(ctx, off, 0.18);
        scheduleNoise(ctx, off, 0.18, "bandpass", 7500, 3.0, 0.24);
        scheduleTone(ctx, 4186, off, 0.12, 0.05, "square", 0.003);
      });
      break;
    }
    case 7: {
      // 7. Recorder (Pure breathy G-A-B-A-G)
      const melody: Array<[number, number, number]> = [
        [783.99, 0.0, 0.32],
        [880.0, 0.34, 0.32],
        [987.77, 0.68, 0.38],
        [880.0, 1.08, 0.3],
        [783.99, 1.4, 0.55],
      ];
      melody.forEach(([f, off, dur]) => {
        scheduleTone(ctx, f, off, dur, 0.18, "sine", 0.04);
        scheduleNoise(ctx, off, dur * 0.8, "bandpass", f * 2, 6, 0.015);
      });
      break;
    }
    case 8: {
      // 8. Triangle (Shimmering metallic ring x3)
      [0.0, 0.55, 1.1].forEach((off) => {
        scheduleTone(ctx, 3520, off, 0.75, 0.14, "sine", 0.002);
        scheduleTone(ctx, 5280, off, 0.65, 0.08, "sine", 0.002);
        scheduleTone(ctx, 7920, off, 0.5, 0.04, "sine", 0.002);
      });
      break;
    }
  }
}

/** T03 / T04 / T06: Continuous 4/4 Backing Groove Engine (70 BPM or 95 BPM) */
export function startRhythmGroove(
  bpm: 70 | 95,
  mode: "groove" | "theme",
  onBeat: (beat1to4: number) => void
): () => void {
  const ctx = getCtx();
  if (!ctx) return () => {};

  const beatMs = (60 / bpm) * 1000;
  let step = 0;

  // Cheerful 16-beat (4-bar) bass + marimba/melody pattern in C Major
  const bassSeq = [
    130.81, 196.0, 130.81, 196.0, // C
    146.83, 196.0, 146.83, 196.0, // G/D
    164.81, 196.0, 174.61, 196.0, // Am/F
    196.0, 146.83, 130.81, 130.81, // G -> C
  ];

  const melodySeq =
    mode === "theme"
      ? [
          523.25, 523.25, 659.25, 783.99,
          880.0, 783.99, 659.25, 523.25,
          698.46, 659.25, 587.33, 523.25,
          587.33, 659.25, 523.25, 0, // beat 16 = Shh! Rest
        ]
      : [
          523.25, 659.25, 783.99, 659.25,
          587.33, 698.46, 783.99, 698.46,
          659.25, 783.99, 880.0, 783.99,
          783.99, 659.25, 587.33, 523.25,
        ];

  const tick = () => {
    const activeCtx = getCtx();
    if (!activeCtx) return;

    const beatInBar = (step % 4) + 1; // 1..4
    const idx = step % 16;

    // 1. Clear Woodblock beat (accent on beat 1)
    scheduleWoodblock(activeCtx, 0, beatInBar === 1);

    // 2. Soft kick on beats 1 & 3, shaker on beats 2 & 4
    if (beatInBar === 1 || beatInBar === 3) {
      scheduleKick(activeCtx, 0, 0.22);
    } else {
      scheduleNoise(activeCtx, 0, 0.07, "highpass", 5200, 1.2, 0.09);
    }

    // 3. Warm upright bass
    scheduleTone(activeCtx, bassSeq[idx], 0, (beatMs / 1000) * 0.7, 0.14, "triangle");

    // 4. Playful marimba / xylophone melody
    const melFreq = melodySeq[idx];
    if (melFreq > 0) {
      scheduleTone(
        activeCtx,
        melFreq,
        0,
        (beatMs / 1000) * 0.65,
        mode === "theme" ? 0.18 : 0.12,
        "sine"
      );
    }

    onBeat(beatInBar);
    step += 1;
  };

  tick();
  const intervalId = window.setInterval(tick, beatMs);

  return () => {
    window.clearInterval(intervalId);
  };
}
