/**
 * VITALE Sanctuary Visual - effects.js
 * Synthesizes Web Audio acoustic crystal chimes, harmonic chords, and visual particle bursts.
 */

// Web Audio API Sound Synthesizer (Zero external audio assets required)
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBranchGrowthChime(freqMultiplier = 1.0) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    // Pentatonic scale crystal chimes: C5, D5, E5, G5, A5
    const pentatonic = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
    const baseFreq = pentatonic[Math.floor(Math.random() * pentatonic.length)] * freqMultiplier;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.35);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.9);

    // Subtle overtone sparkle
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(baseFreq * 2, now);

    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.linearRampToValueAtTime(0.06, now + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);

    osc2.start(now);
    osc2.stop(now + 0.55);
  }

  playLeafPopSound() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, now); // B5
    osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.12); // E6

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  playLevelUpChord() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    // Major 9th triumphant chord: C4, E4, G4, B4, D5
    const notes = [261.63, 329.63, 392.0, 493.88, 587.33, 1046.5];
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.001, now + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.14, now + idx * 0.06 + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8 + idx * 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.06);
      osc.stop(now + 2.4);
    });
  }
}

export const sounds = new SoundEngine();

// Visual Particle & Shockwave Effects
export function spawnBranchParticles(x, y, color, count = 16) {
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'sanctuary-particle';
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    p.style.backgroundColor = color;
    p.style.boxShadow = `0 0 10px 2px ${color}`;

    const angle = Math.random() * Math.PI * 2;
    const dist = 35 + Math.random() * 65;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 20;

    p.style.setProperty('--dx', `${dx}px`);
    p.style.setProperty('--dy', `${dy}px`);

    document.body.appendChild(p);
    p.addEventListener('animationend', () => p.remove());
  }
}

export function spawnFloatingXP(x, y, text, color) {
  const el = document.createElement('div');
  el.className = 'sanctuary-floating-xp';
  el.textContent = text;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.color = color;
  el.style.textShadow = `0 0 14px ${color}, 0 2px 4px rgba(0,0,0,0.8)`;

  document.body.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

export function triggerTreePulse() {
  const tree = document.getElementById('bonsaiContainer');
  if (tree) {
    tree.classList.remove('tree-pulse');
    void tree.offsetWidth;
    tree.classList.add('tree-pulse');
    setTimeout(() => tree.classList.remove('tree-pulse'), 600);
  }

  const flash = document.getElementById('ambientFlash');
  if (flash) {
    flash.classList.remove('active');
    void flash.offsetWidth;
    flash.classList.add('active');
  }
}
