"use client";

/**
 * Zero-dependency Web Audio API Sound Engine for iAon Edu-Verse.
 * Generates warm, kid-friendly chimes and realistic synthesized applause
 * directly in the browser (works offline and on iOS/Android mobile browsers
 * without loading external MP3 files).
 */

let sharedCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioCtx) return null;
  if (!sharedCtx) {
    sharedCtx = new AudioCtx();
  }
  if (sharedCtx.state === "suspended") {
    void sharedCtx.resume();
  }
  return sharedCtx;
}

function playTone(
  ctx: AudioContext,
  freq: number,
  startOffset: number,
  duration: number,
  gainPeak = 0.18,
  type: OscillatorType = "triangle"
) {
  const now = ctx.currentTime + startOffset;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(gainPeak, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.03);
}

/** Gentle marimba-like start chime */
export function playStartChime(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  playTone(ctx, 523.25, 0.0, 0.22, 0.16, "triangle"); // C5
  playTone(ctx, 659.25, 0.11, 0.28, 0.18, "triangle"); // E5
  playTone(ctx, 783.99, 0.22, 0.35, 0.16, "sine"); // G5
}

/** Soft woodblock tick for final countdown seconds */
export function playSoftTick(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  playTone(ctx, 880, 0.0, 0.07, 0.08, "sine");
}

/** Playful star pop when tapping a mission badge */
export function playStarPop(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  playTone(ctx, 587.33, 0.0, 0.14, 0.14, "triangle"); // D5
  playTone(ctx, 880.0, 0.07, 0.22, 0.16, "sine"); // A5
}

/** Cheerful victory fanfare + realistic layered hand-clap applause */
export function playApplauseAndFanfare(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  // 1. Bright victory arpeggio (C5 - E5 - G5 - C6)
  const fanfare: Array<[number, number, number]> = [
    [523.25, 0.0, 0.2],
    [659.25, 0.12, 0.2],
    [783.99, 0.24, 0.24],
    [1046.5, 0.38, 0.65],
    [783.99, 0.38, 0.55],
    [659.25, 0.38, 0.55],
  ];
  for (const [freq, offset, dur] of fanfare) {
    playTone(ctx, freq, offset, dur, 0.15, "triangle");
  }

  // 2. Synthesized crowd applause (layered bandpass-filtered noise bursts)
  const sampleRate = ctx.sampleRate;
  const totalSec = 2.4;
  const bufferLength = Math.floor(sampleRate * totalSec);
  const noiseBuffer = ctx.createBuffer(1, bufferLength, sampleRate);
  const data = noiseBuffer.getChannelData(0);

  // Fill with organic randomized clap impulses
  for (let i = 0; i < bufferLength; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.6;
  }

  const clapOffsets = [
    0.15, 0.22, 0.28, 0.36, 0.42, 0.49, 0.56, 0.63, 0.71, 0.79, 0.87, 0.96,
    1.04, 1.13, 1.22, 1.31, 1.41, 1.52, 1.63, 1.75, 1.88, 2.02,
  ];

  clapOffsets.forEach((offset, idx) => {
    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    // Slightly vary resonant frequency per hand clap for natural warmth
    filter.frequency.value = 1050 + ((idx * 173) % 750);
    filter.Q.value = 2.2;

    const env = ctx.createGain();
    const t0 = ctx.currentTime + offset;
    // Fade applause intensity smoothly across 2.2s
    const fadeFactor =
      offset < 0.4
        ? 0.7 + offset
        : offset > 1.5
          ? Math.max(0.15, 1 - (offset - 1.5) * 1.1)
          : 1.0;
    const peak = 0.22 * fadeFactor;

    env.gain.setValueAtTime(0.0001, t0);
    env.gain.exponentialRampToValueAtTime(peak, t0 + 0.008);
    env.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.095);

    src.connect(filter);
    filter.connect(env);
    env.connect(ctx.destination);

    src.start(t0, (idx * 0.07) % 1.2, 0.11);
  });
}
