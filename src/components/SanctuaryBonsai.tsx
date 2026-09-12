import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  VolumeX,
  Sun,
  Sunset,
  Moon,
  Camera,
  Upload,
  X,
  Sparkles,
  Flame,
  Coins,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  ShieldAlert,
  Calendar,
  Layers,
  Sprout,
  Clock,
  TrendingUp,
  ArrowRight,
  Droplets
} from 'lucide-react';
import { CelestialSky } from './CelestialSky';
import { SeedCeremony } from './SeedCeremony';
import { StreakDrawer } from './StreakDrawer';
import { HabitUploadModal } from './HabitUploadModal';
import { TreeGrowthCelebration } from './TreeGrowthCelebration';
import { WateringCanAnimation } from './WateringCanAnimation';

// Web Audio Sound Synthesizer
class SoundEngine {
  ctx: AudioContext | null = null;
  muted: boolean = false;

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playWaterPouring() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Organic liquid noise stream
    const bufferSize = Math.floor(this.ctx.sampleRate * 2.2);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(850, now);
    filter.frequency.exponentialRampToValueAtTime(1300, now + 1.2);
    filter.Q.setValueAtTime(2.8, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.3);
    gain.gain.setValueAtTime(0.2, now + 1.6);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 2.2);

    // Liquid droplet pings
    for (let i = 0; i < 7; i++) {
      const dropTime = now + 0.3 + i * 0.22 + Math.random() * 0.08;
      const osc = this.ctx.createOscillator();
      const dropGain = this.ctx.createGain();
      const freq = 650 + Math.random() * 600;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, dropTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, dropTime + 0.06);

      dropGain.gain.setValueAtTime(0.001, dropTime);
      dropGain.gain.linearRampToValueAtTime(0.08, dropTime + 0.015);
      dropGain.gain.exponentialRampToValueAtTime(0.0001, dropTime + 0.12);

      osc.connect(dropGain);
      dropGain.connect(this.ctx.destination);
      osc.start(dropTime);
      osc.stop(dropTime + 0.15);
    }
  }

  playGrowthSurge() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const notes = [440, 554.37, 659.25, 880, 1108.73];
    const now = this.ctx.currentTime;
    notes.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.05);
      gain.gain.setValueAtTime(0.001, now + i * 0.05);
      gain.gain.linearRampToValueAtTime(0.12, now + i * 0.05 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2 + i * 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.05);
      osc.stop(now + 1.35);
    });
  }

  playSeedPlant() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Organic earth impact bass thud
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(36, now + 0.4);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.6);

    // Crystalline awakening chime
    const chime = this.ctx.createOscillator();
    const chimeGain = this.ctx.createGain();
    chime.type = 'triangle';
    chime.frequency.setValueAtTime(784, now + 0.08);
    chime.frequency.exponentialRampToValueAtTime(1318.5, now + 0.35);

    chimeGain.gain.setValueAtTime(0.001, now + 0.08);
    chimeGain.gain.linearRampToValueAtTime(0.18, now + 0.14);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    chime.connect(chimeGain);
    chimeGain.connect(this.ctx.destination);
    chime.start(now + 0.08);
    chime.stop(now + 1.25);
  }

  playFlameWhoosh() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.linearRampToValueAtTime(320, now + 0.18);
    osc.frequency.exponentialRampToValueAtTime(75, now + 0.48);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.55);
  }

  playLeafPop() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(920, now + 0.14);

    gain.gain.setValueAtTime(0.16, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  playBranchChime(freqMultiplier = 1.0) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

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

  playRejectionSound() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(140, now + 0.25);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  playLevelUpChord() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [261.63, 329.63, 392.0, 493.88, 587.33, 1046.5];
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
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

const sounds = new SoundEngine();

export type DomainType = 'mind' | 'craft' | 'body' | 'social';

interface VerificationResult {
  verified: boolean;
  confidence: number;
  reason: string;
  detectedItems: string[];
  encouragement: string;
}

export const SanctuaryBonsai: React.FC = () => {
  // First-time Interactive Seed Drop Ceremony
  const [seedPlanted, setSeedPlanted] = useState<boolean>(() => {
    try {
      return localStorage.getItem('lifeforge_seed_planted_v2') === 'true';
    } catch {
      return false;
    }
  });
  const [showSeedCeremony, setShowSeedCeremony] = useState<boolean>(() => {
    try {
      return localStorage.getItem('lifeforge_seed_planted_v2') !== 'true';
    } catch {
      return true;
    }
  });

  // Snapchat-style Streak Drawer state
  const [showStreakDrawer, setShowStreakDrawer] = useState<boolean>(false);

  // Tree & Progression State
  const [totalXP, setTotalXP] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('lifeforge_total_xp_v4');
      if (saved !== null) return Number(saved);
      return 0; // Starts at Stage 1: Seed nestled in soil!
    } catch {
      return 0;
    }
  });
  const [streakDays, setStreakDays] = useState<number>(5);
  const [essence, setEssence] = useState<number>(65);
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'dusk' | 'night'>('day');
  const [narratorEnabled, setNarratorEnabled] = useState<boolean>(true);

  // Directional Branch XP (Grows slowly with consistent daily actions)
  const [branches, setBranches] = useState<Record<DomainType, number>>(() => {
    try {
      const saved = localStorage.getItem('lifeforge_branches_v4');
      if (saved) return JSON.parse(saved);
      return { mind: 0, craft: 0, body: 0, social: 0 };
    } catch {
      return { mind: 0, craft: 0, body: 0, social: 0 };
    }
  });

  // Save progression changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lifeforge_total_xp_v4', String(totalXP));
      localStorage.setItem('lifeforge_branches_v4', JSON.stringify(branches));
    } catch (err) {
      console.warn(err);
    }
  }, [totalXP, branches]);

  // Daily Consistency Habits (Today's completions)
  const [todayCompleted, setTodayCompleted] = useState<Record<DomainType, boolean>>({
    mind: false,
    craft: false,
    body: false,
    social: false,
  });

  // Modal & AI Verification State
  const [activeModalDomain, setActiveModalDomain] = useState<DomainType | null>(null);
  const [verifiedProofImages, setVerifiedProofImages] = useState<Record<DomainType, string | null>>({
    mind: null,
    craft: null,
    body: null,
    social: null,
  });
  const [recentlyGrownDomain, setRecentlyGrownDomain] = useState<DomainType | null>(null);
  const [isTreeTrembling, setIsTreeTrembling] = useState<boolean>(false);
  const [growthCelebrationEvent, setGrowthCelebrationEvent] = useState<{
    domain: DomainType;
    result: VerificationResult;
    imageUrl: string;
    oldXP: number;
    newXP: number;
    oldLeaves: number;
    newLeaves: number;
    branchName: string;
  } | null>(null);

  // ================= WATERING CAN & NUTRIENT SURGE ANIMATION STATE =================
  const [isWateringCanActive, setIsWateringCanActive] = useState<boolean>(false);
  const [wateringDomain, setWateringDomain] = useState<DomainType>('mind');
  const [pendingGrowthData, setPendingGrowthData] = useState<{
    domain: DomainType;
    data: VerificationResult;
    imageUrl: string;
  } | null>(null);
  const [nutrientSurgeActive, setNutrientSurgeActive] = useState<boolean>(false);

  // FX States
  const [isTreePulsing, setIsTreePulsing] = useState<boolean>(false);
  const [flashScreen, setFlashScreen] = useState<boolean>(false);
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });

  // Floating notifications
  const [notifications, setNotifications] = useState<Array<{ id: string; text: string; color: string }>>([]);

  // Voice narration
  const speakNarrator = (text: string) => {
    if (!narratorEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.92;
      utter.pitch = 1.05;
      utter.volume = 0.8;
      window.speechSynthesis.speak(utter);
    } catch (err) {
      console.log('Speech synthesis unavailable', err);
    }
  };

  // 3D Parallax tilt tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const nx = (e.clientX - cx) / cx;
      const ny = (e.clientY - cy) / cy;
      setTilt({ rx: -ny * 6, ry: nx * 8 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Natural Biological Plant Stage Calculation:
  // How a plant grows naturally in our environment:
  // 1. Dormant Seed in Soil (0-24 XP): Seed rests nestled in soil. Roots do NOT grow directly!
  // 2. Germination & Taproot (25-69 XP): Seed coat splits. Single tiny delicate taproot descends, arched shoot rises.
  // 3. Emergent Cotyledons (70-139 XP): Two heart-shaped embryonic leaves unfold on a slender green stem.
  // 4. Vegetative Young Sapling (140-239 XP): Upright stem lignifies into bark, true leaves form, budding branch nodes appear.
  // 5. Developing Branching Bonsai (240-399 XP): Trunk curves with distinct bark; 4 discipline branches actively extend.
  // 6. Ancient Harmonious Sanctuary (400+ XP): Lush full canopy, blossoms, deep anchor roots gripping moss.
  const getTreeGrowthMetrics = () => {
    let stageName = 'Seed in Fertile Soil';
    let stageLevel = 1;
    let stageDesc = 'The seed rests nestled in soil. Roots do not grow directly — water and perform habits to awaken germination.';

    if (totalXP >= 400) {
      stageName = 'Ancient Harmonious Bonsai';
      stageLevel = 6;
      stageDesc = 'Deep anchoring surface roots, flourishing canopy, radiant blossoms and resilient weathered trunk.';
    } else if (totalXP >= 240) {
      stageName = 'Developing Branching Bonsai';
      stageLevel = 5;
      stageDesc = 'Woody curving trunk with 4 directional branches extending in response to your daily disciplines.';
    } else if (totalXP >= 140) {
      stageName = 'Vegetative Young Sapling';
      stageLevel = 4;
      stageDesc = 'True leaves emerge and the tender shoot begins lignifying into woody bark with anchor roots.';
    } else if (totalXP >= 70) {
      stageName = 'Emergent Cotyledon Seedling';
      stageLevel = 3;
      stageDesc = 'Two bright green embryonic cotyledon leaves unfurl to absorb sunlight on a slender green stem.';
    } else if (totalXP >= 25) {
      stageName = 'Germinating Seed & Taproot';
      stageLevel = 2;
      stageDesc = 'The seed coat cracks open. A delicate primary taproot descends into the soil as an arched sprout emerges.';
    }

    // Trunk thickness: from 6px at seedling up to 44px at ancient bonsai
    const trunkWidth = stageLevel <= 3 ? Math.max(5, 5 + (totalXP / 70) * 4) : Math.min(44, 14 + Math.round((totalXP / 600) * 26));
    const heightScale = stageLevel <= 2 ? 0.95 : Math.min(1.18, 0.9 + (totalXP / 800) * 0.28);
    // Notice: For stageLevel === 1 (seed in soil), rootSpread is 0 and roots do NOT grow directly!
    const rootSpread = stageLevel <= 1 ? 0 : Math.min(1, (totalXP - 25) / 380);
    const mossScale = Math.min(1.2, 0.9 + (totalXP / 900) * 0.3);

    return { trunkWidth, heightScale, rootSpread, mossScale, stageName, stageLevel, stageDesc };
  };

  const { trunkWidth, heightScale, rootSpread, mossScale, stageName, stageLevel, stageDesc } = getTreeGrowthMetrics();

  // Branch extension math (slow, gradual growth per domain)
  const getBranchLength = (domain: DomainType) => {
    const xp = branches[domain];
    return Math.min(1, xp / 250);
  };

  const getUnfurledLeafCount = (domain: DomainType) => {
    return Math.min(7, Math.floor(branches[domain] / 25));
  };

  // First-time Seed Drop Ceremony Complete Handler
  const handleSeedPlantComplete = () => {
    sounds.playSeedPlant();
    setSeedPlanted(true);
    setShowSeedCeremony(false);
    // Start with a clean seed in soil (0 XP, no roots yet)
    setTotalXP(0);
    setBranches({ mind: 0, craft: 0, body: 0, social: 0 });
    try {
      localStorage.setItem('lifeforge_seed_planted_v2', 'true');
      localStorage.setItem('lifeforge_total_xp_v4', '0');
      localStorage.setItem('lifeforge_branches_v4', JSON.stringify({ mind: 0, craft: 0, body: 0, social: 0 }));
    } catch (err) {
      console.warn(err);
    }
    sounds.playLevelUpChord();
    speakNarrator('Your seed is safely placed in fertile soil. Roots do not grow directly. Complete daily habits or pour water to awaken life naturally.');

    const nid = `${Date.now()}`;
    setNotifications((prev) => [
      ...prev,
      {
        id: nid,
        text: '🌱 Seed Nestled in Soil! Roots do not appear directly — upload a study photo or water the plant to awaken it.',
        color: '#34d399',
      },
    ]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== nid));
    }, 5000);
  };

  // Apply gradual growth nourishment to the specific branch AND the whole tree
  const applyNourishment = (domain: DomainType, data: VerificationResult, imageUrl: string) => {
    const earnedXP = 35; // Gradual, slow progress
    const earnedEssence = 15;
    const oldXP = branches[domain];
    const newXP = oldXP + earnedXP;
    const oldLeaves = Math.min(7, Math.floor(oldXP / 25));
    const newLeaves = Math.min(7, Math.floor(newXP / 25));

    const wasProtectedBefore = Object.values(todayCompleted).some(Boolean);

    // Update branches and overall tree progression
    setBranches((prev) => ({ ...prev, [domain]: newXP }));
    setTotalXP((prev) => prev + earnedXP);
    setEssence((prev) => prev + earnedEssence);
    setTodayCompleted((prev) => ({ ...prev, [domain]: true }));
    setVerifiedProofImages((prev) => ({ ...prev, [domain]: imageUrl }));

    // Highlight the branch that just physically grew!
    setRecentlyGrownDomain(domain);
    setTimeout(() => {
      setRecentlyGrownDomain((curr) => (curr === domain ? null : curr));
    }, 5000);

    const branchDisplayNames: Record<DomainType, string> = {
      mind: 'Mind & Study Branch',
      body: 'Body & Gym Branch',
      craft: 'Craft & Code Branch',
      social: 'Social & Kinship Branch',
    };

    // Pop up the celebration card with verified photo proof and growth stats
    setGrowthCelebrationEvent({
      domain,
      result: data,
      imageUrl,
      oldXP,
      newXP,
      oldLeaves,
      newLeaves,
      branchName: branchDisplayNames[domain],
    });

    // Audio & Screen Pulse
    sounds.playGrowthSurge();
    sounds.playBranchChime(domain === 'mind' ? 1.2 : domain === 'body' ? 0.85 : 1.0);
    sounds.playLeafPop();
    if (!wasProtectedBefore) {
      sounds.playFlameWhoosh();
    }
    setIsTreePulsing(true);
    setTimeout(() => setIsTreePulsing(false), 900);

    setFlashScreen(true);
    setTimeout(() => setFlashScreen(false), 500);

    // Floating notification
    const nid = `${Date.now()}`;
    setNotifications((prev) => [
      ...prev,
      {
        id: nid,
        text: `🌱 Water Nourishment Absorbed: ${branchDisplayNames[domain]} grew (+${earnedXP} XP)`,
        color: domain === 'mind' ? '#60a5fa' : domain === 'body' ? '#f87171' : domain === 'craft' ? '#f59e0b' : '#fb923c',
      },
    ]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== nid));
    }, 4000);

    // Spoken feedback
    speakNarrator(data.encouragement || `Living water absorbed. Your ${domain} plant growth has progressed.`);
  };

  // Called when AI approves image proof in HabitUploadModal
  // SPECIFIC REQUIREMENT: When user uploads photo in study section,
  // the watering can pours water to the plant, and AFTER THAT the plant growing is shown!
  const handleVerifySuccess = (domain: DomainType, data: VerificationResult, imageUrl: string) => {
    setActiveModalDomain(null);
    setPendingGrowthData({ domain, data, imageUrl });
    setWateringDomain(domain);
    setIsWateringCanActive(true);
    sounds.playWaterPouring();

    const domainLabels: Record<DomainType, string> = {
      mind: 'Study & Research',
      body: 'Gym & Fitness',
      craft: 'Coding & Craft',
      social: 'Kinship & Social',
    };
    speakNarrator(`Verified ${domainLabels[domain]} habit. Pouring water to the plant...`);
  };

  // Triggered when the watering can finishes pouring water
  const handleWateringComplete = () => {
    setIsWateringCanActive(false);
    // Nutrient surge travels up from wet soil into plant stem/branches
    setNutrientSurgeActive(true);
    setTimeout(() => setNutrientSurgeActive(false), 1400);

    if (pendingGrowthData) {
      const { domain, data, imageUrl } = pendingGrowthData;
      setPendingGrowthData(null);
      // AFTER watering finishes, the plant growing is shown!
      applyNourishment(domain, data, imageUrl);
    } else {
      // Manual watering hydration boost
      sounds.playGrowthSurge();
      sounds.playLeafPop();
      setTotalXP((prev) => prev + 15);
      setBranches((prev) => ({ ...prev, [wateringDomain]: (prev[wateringDomain] || 0) + 10 }));
      const nid = `${Date.now()}`;
      setNotifications((prev) => [
        ...prev,
        {
          id: nid,
          text: '💧 Soil Hydrated: Living water absorbed, stimulating natural growth! (+15 XP)',
          color: '#38bdf8',
        },
      ]);
      setTimeout(() => setNotifications((p) => p.filter((n) => n.id !== nid)), 3500);
    }
  };

  // Manual watering trigger to test or nourish at any time
  const triggerManualWatering = (domain: DomainType = 'mind') => {
    if (isWateringCanActive) return;
    setWateringDomain(domain);
    setIsWateringCanActive(true);
    sounds.playWaterPouring();
    speakNarrator('Nourishing soil with living water.');
  };

  // Reset or set specific biological stage (for testing and verification)
  const setLifecycleStage = (targetLevel: number) => {
    setSeedPlanted(true);
    if (targetLevel === 1) {
      setTotalXP(0);
      setBranches({ mind: 0, craft: 0, body: 0, social: 0 });
      speakNarrator('Reset to Stage 1: Seed in Fertile Soil. Roots have not grown directly.');
    } else if (targetLevel === 2) {
      setTotalXP(35);
      setBranches({ mind: 15, craft: 0, body: 10, social: 0 });
      speakNarrator('Switched to Stage 2: Germinating Sprout with Taproot.');
    } else if (targetLevel === 3) {
      setTotalXP(85);
      setBranches({ mind: 30, craft: 20, body: 25, social: 10 });
      speakNarrator('Switched to Stage 3: Emergent Cotyledon Seedling.');
    } else if (targetLevel === 4) {
      setTotalXP(175);
      setBranches({ mind: 50, craft: 40, body: 45, social: 30 });
      speakNarrator('Switched to Stage 4: Vegetative Young Sapling.');
    } else if (targetLevel === 5) {
      setTotalXP(290);
      setBranches({ mind: 95, craft: 75, body: 80, social: 60 });
      speakNarrator('Switched to Stage 5: Developing Branching Bonsai.');
    } else {
      setTotalXP(450);
      setBranches({ mind: 150, craft: 120, body: 130, social: 100 });
      speakNarrator('Switched to Stage 6: Harmonious Ancient Canopy.');
    }
  };

  // Called when AI rejects image proof in HabitUploadModal
  const handleVerifyFailure = (domain: DomainType, data: VerificationResult) => {
    sounds.playRejectionSound();
    setIsTreeTrembling(true);
    setTimeout(() => setIsTreeTrembling(false), 700);

    const nid = `${Date.now()}`;
    setNotifications((prev) => [
      ...prev,
      {
        id: nid,
        text: `⛔ Tree Growth Denied: ${data.reason}. Genuine habit photo required.`,
        color: '#f87171',
      },
    ]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== nid));
    }, 5000);

    speakNarrator(`Verification declined: ${data.reason}. Real task proof is required to grow your tree.`);
  };

  const isProtectedToday = Object.values(todayCompleted).some(Boolean);
  const todayCompletedCount = Object.values(todayCompleted).filter(Boolean).length;

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none flex flex-col justify-between">
      {/* Dynamic Animated Sky (Morning Sun & Clouds, Sunset Fireflies, Midnight Moon & Stars) */}
      <CelestialSky timeOfDay={timeOfDay} />

      {/* Shockwave Flash */}
      <div
        className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-500 ${
          flashScreen ? 'bg-amber-400/20 opacity-100' : 'opacity-0'
        }`}
      />

      {/* Floating Notifications */}
      <div className="fixed top-20 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40 }}
            className="px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-white/15 backdrop-blur-md shadow-2xl text-xs font-semibold"
            style={{ color: n.color, boxShadow: `0 0 20px ${n.color}25` }}
          >
            {n.text}
          </motion.div>
        ))}
      </div>

      {/* ================= TOP HUD ================= */}
      <header className="relative z-30 w-[calc(100%-24px)] max-w-6xl mx-auto mt-4 px-5 py-3 rounded-2xl bg-slate-950/85 border border-white/15 backdrop-blur-xl shadow-2xl flex flex-wrap items-center justify-between gap-3 text-slate-100">
        {/* Brand & Stage */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 text-slate-950 font-black flex items-center justify-center text-sm shadow-[0_0_20px_rgba(245,158,11,0.6)]">
            LF
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-['Fraunces',serif] font-black text-xl text-slate-100 tracking-tight">
                LIFEFORGE
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                Stage {stageLevel}: {stageName}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium line-clamp-1 max-w-xs">{stageDesc}</p>
          </div>

          <div className="hidden lg:block pl-4 border-l border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-500 block leading-none">Nourishment</span>
            <span className="font-mono font-bold text-sm text-amber-300 leading-tight">
              {totalXP} Life XP
            </span>
          </div>
        </div>

        {/* Natural Growth Lifecycle Inspector (Allows testing all biological phases) */}
        <div className="hidden sm:flex items-center gap-1 bg-slate-900/90 border border-white/10 rounded-xl px-2.5 py-1">
          <span className="text-[10px] text-slate-400 font-bold mr-1">Stages:</span>
          {[
            { level: 1, label: '🌱 Seed', xp: 0 },
            { level: 2, label: '🌿 Sprout', xp: 35 },
            { level: 3, label: '🪴 Seedling', xp: 85 },
            { level: 4, label: '🌿 Sapling', xp: 175 },
            { level: 5, label: '🌳 Bonsai', xp: 290 },
          ].map((s) => (
            <button
              key={s.level}
              onClick={() => setLifecycleStage(s.level)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                stageLevel === s.level
                  ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/50 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
              title={`Switch to ${s.label} (${s.xp} XP)`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Water Plant Living Water Pouring Button */}
          <button
            onClick={() => triggerManualWatering('mind')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-950/80 hover:bg-sky-900 border border-sky-400/50 hover:border-sky-300 text-sky-200 text-xs font-bold transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] active:scale-95 cursor-pointer"
            title="Pour Living Water from Watering Can into Soil"
          >
            <Droplets className="w-3.5 h-3.5 text-sky-400" />
            <span>Water Plant</span>
          </button>

          {/* Study Photo Upload Primary Action */}
          <button
            onClick={() => setActiveModalDomain('mind')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black transition-all shadow-[0_0_18px_rgba(59,130,246,0.4)] active:scale-95 cursor-pointer"
            title="Upload Study & Research Photo Proof (Waters plant & grows tree)"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Study Photo Upload</span>
          </button>

          {/* Replay Seed Ceremony Button */}
          <button
            onClick={() => setShowSeedCeremony(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
            title="Open First-Time Seed Planting Ceremony"
          >
            <Sprout className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">{seedPlanted ? 'Replant' : 'Plant Seed'}</span>
          </button>
        </div>

        {/* Daily Consistency Rings */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/10">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] font-bold text-slate-300">Disciplines:</span>
          <div className="flex items-center gap-1.5">
            {(['mind', 'body', 'craft', 'social'] as DomainType[]).map((dom) => (
              <span
                key={dom}
                title={`${dom.toUpperCase()}: ${todayCompleted[dom] ? 'Verified Today' : 'Pending Verification'}`}
                className={`w-3 h-3 rounded-full border transition-all ${
                  todayCompleted[dom]
                    ? 'bg-emerald-400 border-emerald-300 shadow-[0_0_8px_#34d399]'
                    : 'bg-slate-800 border-slate-600'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono text-slate-400 ml-1">
            {todayCompletedCount}/4 Done
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2.5">
          {/* Time of Day Switcher */}
          <div className="flex items-center bg-slate-900/90 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setTimeOfDay('day')}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                timeOfDay === 'day' ? 'bg-amber-500/30 text-amber-200 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Daylight — Bright Blue Sky & Sun"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTimeOfDay('dusk')}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                timeOfDay === 'dusk' ? 'bg-pink-500/30 text-pink-200 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Twilight Dusk — Radiant Sunset"
            >
              <Sunset className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTimeOfDay('night')}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                timeOfDay === 'night' ? 'bg-indigo-500/30 text-indigo-200 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Midnight Night — Starlight & Moon"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Voice Narrator toggle */}
          <button
            onClick={() => setNarratorEnabled(!narratorEnabled)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs border transition-colors cursor-pointer ${
              narratorEnabled
                ? 'bg-slate-900 border-amber-400/40 text-amber-300'
                : 'bg-slate-900/50 border-white/10 text-slate-500'
            }`}
            title="Toggle Voice Narrator"
          >
            {narratorEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Snapchat-Style Interactive Streak Badge */}
          <div
            onClick={() => {
              sounds.playFlameWhoosh();
              setShowStreakDrawer(true);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold font-mono transition-all cursor-pointer select-none group shadow-lg ${
              isProtectedToday
                ? 'bg-gradient-to-r from-orange-950/60 to-amber-950/60 border-orange-500/50 text-orange-300 hover:border-orange-400'
                : 'bg-gradient-to-r from-red-950/80 via-orange-950/80 to-red-950/80 border-red-500/70 text-orange-200 hover:scale-105 shadow-red-500/20'
            }`}
            title="Tap to open Streak Milestones & Status"
          >
            <Flame
              className={`w-4 h-4 ${
                isProtectedToday
                  ? 'text-orange-400 group-hover:scale-110'
                  : 'text-orange-400 animate-bounce'
              }`}
            />
            <span>{streakDays}d Streak</span>
            {!isProtectedToday && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            )}
          </div>

          {/* Essence */}
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-950/40 border border-amber-700/50 text-amber-300 text-xs font-bold font-mono">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>{essence}</span>
          </div>
        </div>
      </header>

      {/* ================= SIDE BRANCH STATUS PILLS ================= */}
      <aside className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-4">
        {/* Craft */}
        <div
          onClick={() => setActiveModalDomain('craft')}
          className={`p-3 rounded-2xl bg-slate-950/75 border backdrop-blur-md w-48 text-left cursor-pointer transition-all hover:scale-105 active:scale-95 group ${
            recentlyGrownDomain === 'craft'
              ? 'border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
              : 'border-amber-500/30 hover:border-amber-400/60'
          }`}
          title="Click to Upload Code Photo & Grow Craft Branch"
        >
          <div className="flex items-center justify-between text-xs font-bold text-amber-400 mb-1">
            <span>⚙️ Craft (Code)</span>
            <span className="font-mono text-[11px]">{branches.craft} XP</span>
          </div>
          <div className="text-[10px] text-slate-400 mb-1.5 flex items-center justify-between">
            <span>Upper-Left Branch</span>
            <span className="text-amber-300 text-[10px] group-hover:underline">📸 Upload</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-amber-400 transition-all duration-700" style={{ width: `${Math.min(100, (branches.craft / 250) * 100)}%` }} />
          </div>
          {verifiedProofImages.craft ? (
            <div className="flex items-center gap-2 pt-1 border-t border-white/10">
              <img src={verifiedProofImages.craft} alt="Craft Proof" className="w-6 h-6 rounded-full object-cover border border-emerald-400" />
              <span className="text-[9px] font-mono text-emerald-400 font-bold">✓ Verified Photo</span>
            </div>
          ) : todayCompleted.craft ? (
            <span className="text-[9px] font-mono text-emerald-400 font-bold block">✓ Verified Today</span>
          ) : (
            <span className="text-[9px] font-mono text-slate-400 block">+35 XP with Photo</span>
          )}
        </div>

        {/* Social */}
        <div
          onClick={() => setActiveModalDomain('social')}
          className={`p-3 rounded-2xl bg-slate-950/75 border backdrop-blur-md w-48 text-left cursor-pointer transition-all hover:scale-105 active:scale-95 group ${
            recentlyGrownDomain === 'social'
              ? 'border-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.5)]'
              : 'border-orange-500/30 hover:border-orange-400/60'
          }`}
          title="Click to Upload Social Photo & Grow Social Branch"
        >
          <div className="flex items-center justify-between text-xs font-bold text-orange-400 mb-1">
            <span>❤️ Social (Kinship)</span>
            <span className="font-mono text-[11px]">{branches.social} XP</span>
          </div>
          <div className="text-[10px] text-slate-400 mb-1.5 flex items-center justify-between">
            <span>Lower-Left Branch</span>
            <span className="text-orange-300 text-[10px] group-hover:underline">📸 Upload</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-orange-400 transition-all duration-700" style={{ width: `${Math.min(100, (branches.social / 250) * 100)}%` }} />
          </div>
          {verifiedProofImages.social ? (
            <div className="flex items-center gap-2 pt-1 border-t border-white/10">
              <img src={verifiedProofImages.social} alt="Social Proof" className="w-6 h-6 rounded-full object-cover border border-emerald-400" />
              <span className="text-[9px] font-mono text-emerald-400 font-bold">✓ Verified Photo</span>
            </div>
          ) : todayCompleted.social ? (
            <span className="text-[9px] font-mono text-emerald-400 font-bold block">✓ Verified Today</span>
          ) : (
            <span className="text-[9px] font-mono text-slate-400 block">+35 XP with Photo</span>
          )}
        </div>
      </aside>

      <aside className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-4">
        {/* Mind */}
        <div
          onClick={() => setActiveModalDomain('mind')}
          className={`p-3 rounded-2xl bg-slate-950/75 border backdrop-blur-md w-48 text-left cursor-pointer transition-all hover:scale-105 active:scale-95 group ${
            recentlyGrownDomain === 'mind'
              ? 'border-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.5)]'
              : 'border-blue-500/30 hover:border-blue-400/60'
          }`}
          title="Click to Upload Study Photo & Grow Mind Branch"
        >
          <div className="flex items-center justify-between text-xs font-bold text-blue-400 mb-1">
            <span>🧠 Mind (Study)</span>
            <span className="font-mono text-[11px]">{branches.mind} XP</span>
          </div>
          <div className="text-[10px] text-slate-400 mb-1.5 flex items-center justify-between">
            <span>Upper-Right Branch</span>
            <span className="text-blue-300 text-[10px] group-hover:underline">📸 Upload</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-blue-400 transition-all duration-700" style={{ width: `${Math.min(100, (branches.mind / 250) * 100)}%` }} />
          </div>
          {verifiedProofImages.mind ? (
            <div className="flex items-center gap-2 pt-1 border-t border-white/10">
              <img src={verifiedProofImages.mind} alt="Mind Proof" className="w-6 h-6 rounded-full object-cover border border-emerald-400" />
              <span className="text-[9px] font-mono text-emerald-400 font-bold">✓ Verified Photo</span>
            </div>
          ) : todayCompleted.mind ? (
            <span className="text-[9px] font-mono text-emerald-400 font-bold block">✓ Verified Today</span>
          ) : (
            <span className="text-[9px] font-mono text-slate-400 block">+35 XP with Photo</span>
          )}
        </div>

        {/* Body */}
        <div
          onClick={() => setActiveModalDomain('body')}
          className={`p-3 rounded-2xl bg-slate-950/75 border backdrop-blur-md w-48 text-left cursor-pointer transition-all hover:scale-105 active:scale-95 group ${
            recentlyGrownDomain === 'body'
              ? 'border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.5)]'
              : 'border-rose-500/30 hover:border-rose-400/60'
          }`}
          title="Click to Upload Gym Photo & Grow Body Branch"
        >
          <div className="flex items-center justify-between text-xs font-bold text-rose-400 mb-1">
            <span>💪 Body (Gym)</span>
            <span className="font-mono text-[11px]">{branches.body} XP</span>
          </div>
          <div className="text-[10px] text-slate-400 mb-1.5 flex items-center justify-between">
            <span>Lower-Right Branch</span>
            <span className="text-rose-300 text-[10px] group-hover:underline">📸 Upload</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-rose-400 transition-all duration-700" style={{ width: `${Math.min(100, (branches.body / 250) * 100)}%` }} />
          </div>
          {verifiedProofImages.body ? (
            <div className="flex items-center gap-2 pt-1 border-t border-white/10">
              <img src={verifiedProofImages.body} alt="Body Proof" className="w-6 h-6 rounded-full object-cover border border-emerald-400" />
              <span className="text-[9px] font-mono text-emerald-400 font-bold">✓ Verified Photo</span>
            </div>
          ) : todayCompleted.body ? (
            <span className="text-[9px] font-mono text-emerald-400 font-bold block">✓ Verified Today</span>
          ) : (
            <span className="text-[9px] font-mono text-slate-400 block">+35 XP with Photo</span>
          )}
        </div>
      </aside>

      {/* ================= 3D PARALLAX PLANT STAGE ================= */}
      {/* Notice: Whole tree gradually scales in height and trunk width based on consistent totalXP */}
      <div
        className="relative flex-1 w-full flex items-center justify-center transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          animate={
            isTreeTrembling
              ? { x: [-12, 12, -8, 8, -4, 4, 0], rotate: [-1.8, 1.8, -1.2, 1.2, 0] }
              : { x: 0, rotate: 0 }
          }
          transition={{ duration: 0.7 }}
          className={`w-full max-w-3xl h-[75vh] max-h-[600px] flex items-center justify-center transition-all duration-700 ${
            isTreePulsing ? 'scale-105' : 'scale-100'
          }`}
          style={{
            transform: `scale(${heightScale})`,
            transformOrigin: '300px 480px',
          }}
        >
          <svg viewBox="0 0 600 560" className="w-full h-full overflow-visible drop-shadow-[0_20px_40px_rgba(0,0,0,0.65)]">
            <defs>
              <linearGradient id="treeBarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5c3a21" />
                <stop offset="50%" stopColor="#3d2514" />
                <stop offset="100%" stopColor="#27160a" />
              </linearGradient>

              <radialGradient id="leafMindGrad" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#93c5fd" />
                <stop offset="100%" stopColor="#2563eb" />
              </radialGradient>

              <radialGradient id="leafBodyGrad" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#fca5a5" />
                <stop offset="100%" stopColor="#dc2626" />
              </radialGradient>

              <radialGradient id="leafCraftGrad" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#fde047" />
                <stop offset="100%" stopColor="#d97706" />
              </radialGradient>

              <radialGradient id="leafSocialGrad" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#fdba74" />
                <stop offset="100%" stopColor="#ea580c" />
              </radialGradient>

              {/* Verified Proof Thumbnail Clips */}
              <clipPath id="thumbClipMind">
                <circle cx="0" cy="0" r="16" />
              </clipPath>
              <clipPath id="thumbClipBody">
                <circle cx="0" cy="0" r="16" />
              </clipPath>
              <clipPath id="thumbClipCraft">
                <circle cx="0" cy="0" r="16" />
              </clipPath>
              <clipPath id="thumbClipSocial">
                <circle cx="0" cy="0" r="16" />
              </clipPath>
            </defs>

            {/* BASE / BONSAI POT & EXPANDING ROOTS */}
            <g transform="translate(0, 40)">
              {/* Pot Shadow */}
              <ellipse cx="300" cy="480" rx="145" ry="24" fill="rgba(0,0,0,0.55)" />

              {/* Ceramic Planter Tray */}
              <path d="M 180,455 Q 170,485 200,490 L 400,490 Q 430,485 420,455 Z" fill="#1e293b" stroke="#475569" strokeWidth="2" />
              <ellipse cx="300" cy="455" rx="122" ry="12" fill="#334155" stroke="#64748b" strokeWidth="1.5" />

              {/* Living Moss Mound (Gradually thickens and greens) */}
              <path d="M 195,455 Q 300,410 405,455 Z" fill="#14532d" stroke="#166534" strokeWidth="2" />

              {/* NATURAL BIOLOGICAL ROOT SYSTEM:
                  When seed is placed in soil, roots do NOT grow directly!
                  Roots only gradually emerge after moisture & germination tasks. */}
              {stageLevel === 1 ? (
                /* Stage 1: NO roots under soil! Natural moist earth resting bed */
                <g opacity={0.4}>
                  <ellipse cx="300" cy="442" rx="18" ry="6" fill="#0f172a" opacity="0.6" />
                </g>
              ) : stageLevel === 2 ? (
                /* Stage 2: Germination: Single tiny, delicate pale primary taproot descending */
                <g>
                  <path
                    d="M 300,446 Q 299,458 298,470"
                    fill="none"
                    stroke="#fef08a"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                  <path
                    d="M 298,460 Q 294,465 290,468"
                    fill="none"
                    stroke="#fef08a"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                </g>
              ) : stageLevel === 3 ? (
                /* Stage 3: Seedling: Taproot with 2 small lateral root hairs */
                <g>
                  <path
                    d="M 300,446 Q 298,460 297,476"
                    fill="none"
                    stroke="#fef08a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                  <path
                    d="M 298,456 Q 288,463 278,467"
                    fill="none"
                    stroke="#e4e4e7"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    opacity="0.75"
                  />
                  <path
                    d="M 299,460 Q 312,465 322,467"
                    fill="none"
                    stroke="#e4e4e7"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    opacity="0.75"
                  />
                </g>
              ) : (
                /* Stage 4, 5, 6: Deepening anchor roots spreading through soil and moss */
                <g opacity={0.35 + rootSpread * 0.65}>
                  <path
                    d="M 285,445 Q 260,460 230,465"
                    fill="none"
                    stroke="#3d2514"
                    strokeWidth={Math.max(3, trunkWidth * 0.2)}
                    strokeLinecap="round"
                  />
                  <path
                    d="M 310,445 Q 340,460 370,465"
                    fill="none"
                    stroke="#3d2514"
                    strokeWidth={Math.max(3, trunkWidth * 0.18)}
                    strokeLinecap="round"
                  />
                  {stageLevel >= 5 && (
                    <path
                      d="M 298,445 Q 300,470 305,475"
                      fill="none"
                      stroke="#27160a"
                      strokeWidth={3}
                      strokeLinecap="round"
                    />
                  )}
                  {stageLevel >= 6 && (
                    <>
                      <path
                        d="M 275,446 Q 250,455 215,468"
                        fill="none"
                        stroke="#27160a"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 322,446 Q 348,455 385,468"
                        fill="none"
                        stroke="#27160a"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </>
                  )}
                </g>
              )}

              {/* Moss Pebbles & Sprouting Flora */}
              <circle cx="230" cy="445" r="4" fill="#22c55e" opacity="0.7" />
              <circle cx="360" cy="448" r="5" fill="#22c55e" opacity="0.7" />
              <circle cx="290" cy="435" r="3" fill="#86efac" opacity="0.8" />
              {totalXP >= 150 && (
                <circle cx="325" cy="438" r="3.5" fill="#fde047" opacity="0.8" />
              )}
            </g>

            {!seedPlanted ? (
              /* Unplanted State: A floating primordial seed with radiant light awaiting drop */
              <g
                transform="translate(300, 395)"
                className="cursor-pointer"
                onClick={() => setShowSeedCeremony(true)}
              >
                {/* Radiant Halo */}
                <circle cx="0" cy="0" r="55" fill="url(#leafCraftGrad)" opacity="0.2" className="animate-pulse" />
                <circle cx="0" cy="0" r="32" fill="#f59e0b" opacity="0.3" />
                {/* Seed body */}
                <path
                  d="M 0,-24 C 15,-12 18,12 0,22 C -18,12 -15,-12 0,-24 Z"
                  fill="url(#leafCraftGrad)"
                  stroke="#fbbf24"
                  strokeWidth="2.5"
                />
                <circle cx="-3" cy="-6" r="3.5" fill="#ffffff" opacity="0.85" />
                {/* Subtle emerging shoot */}
                <path d="M 0,-24 Q 8,-38 20,-42 Q 10,-32 0,-24" fill="#4ade80" />
                <text
                  x="0"
                  y="52"
                  textAnchor="middle"
                  fill="#fde047"
                  fontSize="13"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  🌱 Click to Plant Seed Ceremony
                </text>
              </g>
            ) : stageLevel === 1 ? (
              /* ================= STAGE 1: DORMANT SEED IN SOIL (0 - 24 XP) ================= */
              /* In nature: Seed resting nestled in soil. Roots do NOT grow directly! */
              <g transform="translate(300, 442)">
                <ellipse cx="0" cy="2" rx="16" ry="6" fill="#090d16" opacity="0.75" />
                
                {/* Radiant moisture aura */}
                <motion.circle
                  cx="0"
                  cy="-4"
                  r="24"
                  fill="url(#leafCraftGrad)"
                  animate={{ opacity: [0.15, 0.45, 0.15], scale: [0.95, 1.15, 0.95] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* The Golden Seed resting in soil */}
                <motion.g
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="cursor-pointer"
                  onClick={() => triggerManualWatering('mind')}
                >
                  <path
                    d="M 0,-18 C 12,-9 14,8 0,16 C -14,8 -12,-9 0,-18 Z"
                    fill="url(#leafCraftGrad)"
                    stroke="#fbbf24"
                    strokeWidth="2"
                    filter="drop-shadow(0 0 8px rgba(245,158,11,0.6))"
                  />
                  <path
                    d="M 0,-12 Q 2,0 0,12"
                    fill="none"
                    stroke="#78350f"
                    strokeWidth="1.2"
                    strokeDasharray="2 2"
                  />
                  <circle cx="-2" cy="-4" r="2.5" fill="#ffffff" opacity="0.8" />
                </motion.g>

                {/* Living water absorption glow */}
                {nutrientSurgeActive && (
                  <motion.circle
                    cx="0"
                    cy="0"
                    r="32"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    className="animate-ping"
                  />
                )}

                {/* Biological Guidance Badge */}
                <g transform="translate(0, -35)">
                  <rect x="-135" y="-12" width="270" height="24" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="0" y="3.5" textAnchor="middle" fill="#7dd3fc" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">
                    💧 Water or Upload Study Photo to Awaken Seed
                  </text>
                </g>
              </g>
            ) : stageLevel === 2 ? (
              /* ================= STAGE 2: GERMINATION & FIRST TAPROOT (25 - 69 XP) ================= */
              /* Biological reality: Seed coat softens & cracks; tender hypocotyl sprout arches up */
              <g transform="translate(300, 442)">
                <path
                  d="M -7,6 C -12,0 -8,-8 -2,-12 L 2,-12 C 8,-8 12,0 7,6 Z"
                  fill="#78350f"
                  stroke="#fbbf24"
                  strokeWidth="1.5"
                  opacity="0.85"
                />

                {/* Arching tender pale-emerald sprout */}
                <motion.path
                  d="M 0,-4 Q -8,-24 0,-40 Q 6,-24 0,-4"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0.5 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                />

                {/* Emerging unopened cotyledon bud at apex */}
                <motion.g
                  transform="translate(0, -40)"
                  animate={{ rotate: [-2, 2, -2], y: [0, -2, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ellipse cx="-4" cy="-2" rx="5" ry="3" fill="#86efac" stroke="#22c55e" strokeWidth="1" transform="rotate(-30)" />
                  <ellipse cx="4" cy="-2" rx="5" ry="3" fill="#86efac" stroke="#22c55e" strokeWidth="1" transform="rotate(30)" />
                  <circle cx="0" cy="-6" r="2" fill="#e0f2fe" opacity="0.9" />
                </motion.g>

                {/* Biological Guidance Badge */}
                <g transform="translate(0, -65)">
                  <rect x="-120" y="-12" width="240" height="24" rx="12" fill="#0f172a" stroke="#22c55e" strokeWidth="1.5" />
                  <text x="0" y="3.5" textAnchor="middle" fill="#86efac" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">
                    🌱 Germinated • Taproot Formed in Soil
                  </text>
                </g>
              </g>
            ) : stageLevel === 3 ? (
              /* ================= STAGE 3: EMERGENT SEEDLING & COTYLEDONS (70 - 139 XP) ================= */
              /* Biological reality: Slender green stem with two heart-shaped cotyledons capturing light */
              <g transform="translate(300, 442)">
                <motion.path
                  d="M 0,0 Q -4,-35 0,-68"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />

                {/* Two fully unfurled cotyledons capturing sunlight */}
                <motion.g
                  transform="translate(0, -68)"
                  animate={{ rotate: [-2.5, 2.5, -2.5] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {/* Left Cotyledon Leaf */}
                  <path
                    d="M 0,0 C -12,-8 -26,-6 -30,2 C -24,10 -10,8 0,0 Z"
                    fill="url(#leafMindGrad)"
                    stroke="#3b82f6"
                    strokeWidth="1"
                  />
                  {/* Right Cotyledon Leaf */}
                  <path
                    d="M 0,0 C 12,-8 26,-6 30,2 C 24,10 10,8 0,0 Z"
                    fill="#22c55e"
                    stroke="#15803d"
                    strokeWidth="1"
                  />
                  <circle cx="0" cy="-3" r="3" fill="#86efac" />
                  <path d="M 0,-3 Q 0,-8 3,-10" fill="none" stroke="#4ade80" strokeWidth="1.5" />
                </motion.g>

                {/* Biological Guidance Badge */}
                <g transform="translate(0, -95)">
                  <rect x="-125" y="-12" width="250" height="24" rx="12" fill="#0f172a" stroke="#22c55e" strokeWidth="1.5" />
                  <text x="0" y="3.5" textAnchor="middle" fill="#86efac" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">
                    🌿 Cotyledon Seedling • First Leaves Catching Light
                  </text>
                </g>
              </g>
            ) : stageLevel === 4 ? (
              /* ================= STAGE 4: VEGETATIVE YOUNG SAPLING (140 - 239 XP) ================= */
              /* Biological reality: Upright sapling stem, base lignifying into soft bark, true leaves alternating */
              <g transform="translate(300, 442)">
                <path
                  d="M 0,0 Q -6,-60 2,-115 Q 0,-135 0,-155"
                  fill="none"
                  stroke="url(#treeBarkGrad)"
                  strokeWidth="11"
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
                <path
                  d="M 0,-80 Q 2,-120 0,-155"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="6.5"
                  strokeLinecap="round"
                />

                {/* Alternating Young True Leaves & Nascent Branch Buds */}
                {/* Lower Right Leaf / Bud */}
                <g transform="translate(0, -45)">
                  <path d="M 0,0 Q 15,-10 28,-4 Q 16,8 0,0" fill="url(#leafBodyGrad)" />
                  <circle cx="28" cy="-4" r="3" fill="#f87171" opacity="0.8" />
                </g>
                {/* Mid Left Leaf / Bud */}
                <g transform="translate(-1, -85)">
                  <path d="M 0,0 Q -15,-10 -28,-4 Q -16,8 0,0" fill="url(#leafCraftGrad)" />
                  <circle cx="-28" cy="-4" r="3" fill="#fbbf24" opacity="0.8" />
                </g>
                {/* Upper Right Study Leaf / Bud */}
                <g transform="translate(1, -120)">
                  <path d="M 0,0 Q 16,-12 32,-6 Q 18,10 0,0" fill="url(#leafMindGrad)" />
                  <circle cx="32" cy="-6" r="3.5" fill="#60a5fa" opacity="0.9" />
                </g>
                {/* Crown Terminal Shoot */}
                <g transform="translate(0, -155)">
                  <ellipse cx="-8" cy="-8" rx="10" ry="5" fill="#4ade80" transform="rotate(-35)" />
                  <ellipse cx="8" cy="-8" rx="10" ry="5" fill="#4ade80" transform="rotate(35)" />
                  <circle cx="0" cy="-12" r="3.5" fill="#a7f3d0" />
                </g>

                {/* Biological Guidance Badge */}
                <g transform="translate(0, -185)">
                  <rect x="-125" y="-12" width="250" height="24" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="0" y="3.5" textAnchor="middle" fill="#fde68a" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">
                    🪴 Young Sapling • Lignifying Stem & Side Buds
                  </text>
                </g>
              </g>
            ) : (
              <>
                {/* ================= STAGES 5 & 6: MATURE BONSAI WITH 4 HABIT BRANCHES ================= */}
                {/* CENTRAL TRUNK: Girth physically expands with consistent habit completions */}
                <g>
                  {/* Main Trunk Stroke */}
                  <path
                    d="M 285,455 Q 260,370 295,290 Q 305,250 300,210 Q 300,180 300,140"
                    fill="none"
                    stroke="url(#treeBarkGrad)"
                    strokeWidth={trunkWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-1000 ease-out"
                  />
                  {/* Bark Grain Lines */}
                  <path
                    d="M 280,450 Q 255,370 290,290 Q 300,250 295,210"
                    fill="none"
                    stroke="#221207"
                    strokeWidth={Math.max(2, trunkWidth * 0.1)}
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                  <path
                    d="M 295,445 Q 275,370 305,290 Q 312,250 305,210"
                    fill="none"
                    stroke="#784725"
                    strokeWidth={Math.max(1.5, trunkWidth * 0.08)}
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </g>

            {/* ================= BRANCH 1: MIND / INSIGHT (Upper-Right) ================= */}
            <g
              className="cursor-pointer group"
              onClick={() => setActiveModalDomain('mind')}
            >
              <path
                d="M 298,240 Q 350,210 400,195 Q 460,180 495,145"
                fill="none"
                stroke={recentlyGrownDomain === 'mind' ? '#60a5fa' : '#2e4a62'}
                strokeWidth={Math.max(8, trunkWidth * 0.45)}
                strokeLinecap="round"
                strokeDasharray="250"
                strokeDashoffset={250 * (1 - getBranchLength('mind'))}
                className="transition-all duration-1000 ease-out"
                style={{
                  filter: recentlyGrownDomain === 'mind'
                    ? 'drop-shadow(0 0 16px rgba(96,165,250,0.9))'
                    : 'drop-shadow(0 0 6px rgba(96,165,250,0.4))',
                }}
              />
              {branches.mind >= 50 && (
                <path d="M 390,200 Q 430,165 440,125" fill="none" stroke="#2e4a62" strokeWidth="6" strokeLinecap="round" />
              )}
              {branches.mind >= 100 && (
                <path d="M 440,185 Q 480,180 510,165" fill="none" stroke="#2e4a62" strokeWidth="5" strokeLinecap="round" />
              )}

              {/* Foliage leaves */}
              {[
                { x: 440, y: 125, r: 0 },
                { x: 495, y: 145, r: 15 },
                { x: 510, y: 165, r: -10 },
                { x: 415, y: 175, r: -25 },
                { x: 460, y: 160, r: 20 },
                { x: 430, y: 145, r: 5 },
              ].map((pos, idx) => (
                <motion.g
                  key={`mind-leaf-${idx}`}
                  transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.r})`}
                  initial={{ scale: 0 }}
                  animate={{ scale: idx < getUnfurledLeafCount('mind') ? 1 : 0 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                >
                  <path d="M 0,0 Q 16,-16 32,-5 Q 16,16 0,0" fill="url(#leafMindGrad)" />
                </motion.g>
              ))}

              {branches.mind >= 120 && (
                <motion.g
                  transform="translate(495, 145)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 15 }}
                >
                  <circle cx="0" cy="0" r="7" fill="#fde047" />
                  <circle cx="0" cy="-10" r="5" fill="#93c5fd" opacity="0.9" />
                  <circle cx="10" cy="0" r="5" fill="#93c5fd" opacity="0.9" />
                  <circle cx="0" cy="10" r="5" fill="#93c5fd" opacity="0.9" />
                  <circle cx="-10" cy="0" r="5" fill="#93c5fd" opacity="0.9" />
                  <circle cx="0" cy="0" r="3" fill="#ffffff" />
                </motion.g>
              )}

              {/* Branch Growth Surge Radiance */}
              {recentlyGrownDomain === 'mind' && (
                <g transform="translate(495, 145)">
                  <circle cx="0" cy="0" r="28" fill="none" stroke="#60a5fa" strokeWidth="2.5" className="animate-ping" opacity="0.8" />
                  <circle cx="0" cy="0" r="44" fill="none" stroke="#93c5fd" strokeWidth="1.5" className="animate-pulse" opacity="0.5" />
                </g>
              )}

              {/* Pinned Verified Photo Thumbnail or Interactive Upload Callout */}
              <g transform="translate(495, 105)" className="transition-transform group-hover:scale-110">
                {verifiedProofImages.mind ? (
                  <g>
                    <circle cx="0" cy="0" r="18" fill="#1e293b" stroke="#34d399" strokeWidth="2.5" />
                    <image
                      href={verifiedProofImages.mind}
                      x="-16"
                      y="-16"
                      width="32"
                      height="32"
                      clipPath="url(#thumbClipMind)"
                      preserveAspectRatio="xMidYMid slice"
                    />
                    <circle cx="12" cy="12" r="6" fill="#10b981" />
                    <path d="M 9.5,12 L 11.5,14 L 14.5,10" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                    <rect x="-36" y="20" width="72" height="14" rx="7" fill="#0f172a" stroke="#34d399" strokeWidth="1" />
                    <text x="0" y="30" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                      ✓ Study Proof
                    </text>
                  </g>
                ) : (
                  <g>
                    <rect x="-38" y="-12" width="76" height="22" rx="11" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.5" />
                    <text x="0" y="3" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
                      🧠 +Study Photo
                    </text>
                  </g>
                )}
              </g>
            </g>

            {/* ================= BRANCH 2: BODY / VITALITY (Lower-Right) ================= */}
            <g
              className="cursor-pointer group"
              onClick={() => setActiveModalDomain('body')}
            >
              <path
                d="M 292,305 Q 360,300 420,320 Q 480,345 520,340"
                fill="none"
                stroke={recentlyGrownDomain === 'body' ? '#f87171' : '#5a2e2b'}
                strokeWidth={Math.max(9, trunkWidth * 0.48)}
                strokeLinecap="round"
                strokeDasharray="250"
                strokeDashoffset={250 * (1 - getBranchLength('body'))}
                className="transition-all duration-1000 ease-out"
                style={{
                  filter: recentlyGrownDomain === 'body'
                    ? 'drop-shadow(0 0 16px rgba(248,113,113,0.9))'
                    : 'drop-shadow(0 0 6px rgba(248,113,113,0.4))',
                }}
              />
              {branches.body >= 50 && (
                <path d="M 390,310 Q 435,285 465,275" fill="none" stroke="#5a2e2b" strokeWidth="6" strokeLinecap="round" />
              )}
              {branches.body >= 100 && (
                <path d="M 460,335 Q 490,370 520,380" fill="none" stroke="#5a2e2b" strokeWidth="5" strokeLinecap="round" />
              )}

              {[
                { x: 465, y: 275, r: 0 },
                { x: 520, y: 340, r: 15 },
                { x: 520, y: 380, r: -20 },
                { x: 435, y: 290, r: -15 },
                { x: 490, y: 335, r: 25 },
                { x: 470, y: 355, r: 10 },
              ].map((pos, idx) => (
                <motion.g
                  key={`body-leaf-${idx}`}
                  transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.r})`}
                  initial={{ scale: 0 }}
                  animate={{ scale: idx < getUnfurledLeafCount('body') ? 1 : 0 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                >
                  <path d="M 0,0 Q 16,-14 34,-3 Q 16,16 0,0" fill="url(#leafBodyGrad)" />
                </motion.g>
              ))}

              {branches.body >= 120 && (
                <motion.g
                  transform="translate(520, 340)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 15 }}
                >
                  <circle cx="0" cy="0" r="8" fill="#fbbf24" />
                  <circle cx="0" cy="-12" r="6" fill="#f87171" opacity="0.9" />
                  <circle cx="12" cy="0" r="6" fill="#f87171" opacity="0.9" />
                  <circle cx="0" cy="12" r="6" fill="#f87171" opacity="0.9" />
                  <circle cx="-12" cy="0" r="6" fill="#f87171" opacity="0.9" />
                  <circle cx="0" cy="0" r="3" fill="#ffffff" />
                </motion.g>
              )}

              {/* Branch Growth Surge Radiance */}
              {recentlyGrownDomain === 'body' && (
                <g transform="translate(520, 340)">
                  <circle cx="0" cy="0" r="28" fill="none" stroke="#f87171" strokeWidth="2.5" className="animate-ping" opacity="0.8" />
                  <circle cx="0" cy="0" r="44" fill="none" stroke="#fca5a5" strokeWidth="1.5" className="animate-pulse" opacity="0.5" />
                </g>
              )}

              {/* Pinned Verified Photo Thumbnail or Interactive Upload Callout */}
              <g transform="translate(525, 305)" className="transition-transform group-hover:scale-110">
                {verifiedProofImages.body ? (
                  <g>
                    <circle cx="0" cy="0" r="18" fill="#1e293b" stroke="#34d399" strokeWidth="2.5" />
                    <image
                      href={verifiedProofImages.body}
                      x="-16"
                      y="-16"
                      width="32"
                      height="32"
                      clipPath="url(#thumbClipBody)"
                      preserveAspectRatio="xMidYMid slice"
                    />
                    <circle cx="12" cy="12" r="6" fill="#10b981" />
                    <path d="M 9.5,12 L 11.5,14 L 14.5,10" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                    <rect x="-34" y="20" width="68" height="14" rx="7" fill="#0f172a" stroke="#34d399" strokeWidth="1" />
                    <text x="0" y="30" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                      ✓ Gym Proof
                    </text>
                  </g>
                ) : (
                  <g>
                    <rect x="-36" y="-12" width="72" height="22" rx="11" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                    <text x="0" y="3" textAnchor="middle" fill="#fda4af" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
                      🏋️ +Gym Photo
                    </text>
                  </g>
                )}
              </g>
            </g>

            {/* ================= BRANCH 3: CRAFT / FORGEWORKS (Upper-Left) ================= */}
            <g
              className="cursor-pointer group"
              onClick={() => setActiveModalDomain('craft')}
            >
              <path
                d="M 298,220 Q 240,190 190,175 Q 130,155 90,125"
                fill="none"
                stroke={recentlyGrownDomain === 'craft' ? '#fbbf24' : '#5c421b'}
                strokeWidth={Math.max(8, trunkWidth * 0.45)}
                strokeLinecap="round"
                strokeDasharray="250"
                strokeDashoffset={250 * (1 - getBranchLength('craft'))}
                className="transition-all duration-1000 ease-out"
                style={{
                  filter: recentlyGrownDomain === 'craft'
                    ? 'drop-shadow(0 0 16px rgba(245,158,11,0.9))'
                    : 'drop-shadow(0 0 6px rgba(245,158,11,0.4))',
                }}
              />
              {branches.craft >= 50 && (
                <path d="M 210,180 Q 165,145 145,105" fill="none" stroke="#5c421b" strokeWidth="6" strokeLinecap="round" />
              )}
              {branches.craft >= 100 && (
                <path d="M 140,165 Q 100,165 70,150" fill="none" stroke="#5c421b" strokeWidth="5" strokeLinecap="round" />
              )}

              {[
                { x: 145, y: 105, r: 0 },
                { x: 90, y: 125, r: -15 },
                { x: 70, y: 150, r: 10 },
                { x: 170, y: 155, r: 25 },
                { x: 120, y: 140, r: -20 },
                { x: 155, y: 125, r: -5 },
              ].map((pos, idx) => (
                <motion.g
                  key={`craft-leaf-${idx}`}
                  transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.r})`}
                  initial={{ scale: 0 }}
                  animate={{ scale: idx < getUnfurledLeafCount('craft') ? 1 : 0 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                >
                  <path d="M 0,0 Q -16,-16 -32,-5 Q -16,16 0,0" fill="url(#leafCraftGrad)" />
                </motion.g>
              ))}

              {branches.craft >= 120 && (
                <motion.g
                  transform="translate(90, 125)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 15 }}
                >
                  <circle cx="0" cy="0" r="7" fill="#f59e0b" />
                  <circle cx="0" cy="-10" r="5" fill="#fde047" opacity="0.9" />
                  <circle cx="10" cy="0" r="5" fill="#fde047" opacity="0.9" />
                  <circle cx="0" cy="10" r="5" fill="#fde047" opacity="0.9" />
                  <circle cx="-10" cy="0" r="5" fill="#fde047" opacity="0.9" />
                  <circle cx="0" cy="0" r="3" fill="#ffffff" />
                </motion.g>
              )}

              {/* Branch Growth Surge Radiance */}
              {recentlyGrownDomain === 'craft' && (
                <g transform="translate(90, 125)">
                  <circle cx="0" cy="0" r="28" fill="none" stroke="#f59e0b" strokeWidth="2.5" className="animate-ping" opacity="0.8" />
                  <circle cx="0" cy="0" r="44" fill="none" stroke="#fde047" strokeWidth="1.5" className="animate-pulse" opacity="0.5" />
                </g>
              )}

              {/* Pinned Verified Photo Thumbnail or Interactive Upload Callout */}
              <g transform="translate(85, 90)" className="transition-transform group-hover:scale-110">
                {verifiedProofImages.craft ? (
                  <g>
                    <circle cx="0" cy="0" r="18" fill="#1e293b" stroke="#34d399" strokeWidth="2.5" />
                    <image
                      href={verifiedProofImages.craft}
                      x="-16"
                      y="-16"
                      width="32"
                      height="32"
                      clipPath="url(#thumbClipCraft)"
                      preserveAspectRatio="xMidYMid slice"
                    />
                    <circle cx="12" cy="12" r="6" fill="#10b981" />
                    <path d="M 9.5,12 L 11.5,14 L 14.5,10" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                    <rect x="-34" y="20" width="68" height="14" rx="7" fill="#0f172a" stroke="#34d399" strokeWidth="1" />
                    <text x="0" y="30" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                      ✓ Code Proof
                    </text>
                  </g>
                ) : (
                  <g>
                    <rect x="-36" y="-12" width="72" height="22" rx="11" fill="#0f172a" stroke="#d97706" strokeWidth="1.5" />
                    <text x="0" y="3" textAnchor="middle" fill="#fde68a" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
                      ⚙️ +Code Photo
                    </text>
                  </g>
                )}
              </g>
            </g>

            {/* ================= BRANCH 4: SOCIAL / KINSHIP (Lower-Left) ================= */}
            <g
              className="cursor-pointer group"
              onClick={() => setActiveModalDomain('social')}
            >
              <path
                d="M 288,320 Q 220,315 160,335 Q 100,360 65,355"
                fill="none"
                stroke={recentlyGrownDomain === 'social' ? '#fb923c' : '#583c21'}
                strokeWidth={Math.max(9, trunkWidth * 0.48)}
                strokeLinecap="round"
                strokeDasharray="250"
                strokeDashoffset={250 * (1 - getBranchLength('social'))}
                className="transition-all duration-1000 ease-out"
                style={{
                  filter: recentlyGrownDomain === 'social'
                    ? 'drop-shadow(0 0 16px rgba(251,146,60,0.9))'
                    : 'drop-shadow(0 0 6px rgba(251,146,60,0.4))',
                }}
              />
              {branches.social >= 50 && (
                <path d="M 190,325 Q 145,295 125,280" fill="none" stroke="#583c21" strokeWidth="6" strokeLinecap="round" />
              )}
              {branches.social >= 100 && (
                <path d="M 120,350 Q 80,385 50,395" fill="none" stroke="#583c21" strokeWidth="5" strokeLinecap="round" />
              )}

              {[
                { x: 125, y: 280, r: 0 },
                { x: 65, y: 355, r: -15 },
                { x: 50, y: 395, r: 20 },
                { x: 155, y: 305, r: 15 },
                { x: 95, y: 350, r: -25 },
                { x: 110, y: 320, r: -5 },
              ].map((pos, idx) => (
                <motion.g
                  key={`social-leaf-${idx}`}
                  transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.r})`}
                  initial={{ scale: 0 }}
                  animate={{ scale: idx < getUnfurledLeafCount('social') ? 1 : 0 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                >
                  <path d="M 0,0 Q -16,-14 -34,-3 Q -16,16 0,0" fill="url(#leafSocialGrad)" />
                </motion.g>
              ))}

              {branches.social >= 120 && (
                <motion.g
                  transform="translate(65, 355)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 15 }}
                >
                  <circle cx="0" cy="0" r="8" fill="#ea580c" />
                  <circle cx="0" cy="-11" r="5.5" fill="#fdba74" opacity="0.9" />
                  <circle cx="11" cy="0" r="5.5" fill="#fdba74" opacity="0.9" />
                  <circle cx="0" cy="11" r="5.5" fill="#fdba74" opacity="0.9" />
                  <circle cx="-11" cy="0" r="5.5" fill="#fdba74" opacity="0.9" />
                  <circle cx="0" cy="0" r="3" fill="#ffffff" />
                </motion.g>
              )}

              {/* Branch Growth Surge Radiance */}
              {recentlyGrownDomain === 'social' && (
                <g transform="translate(65, 355)">
                  <circle cx="0" cy="0" r="28" fill="none" stroke="#ea580c" strokeWidth="2.5" className="animate-ping" opacity="0.8" />
                  <circle cx="0" cy="0" r="44" fill="none" stroke="#fdba74" strokeWidth="1.5" className="animate-pulse" opacity="0.5" />
                </g>
              )}

              {/* Pinned Verified Photo Thumbnail or Interactive Upload Callout */}
              <g transform="translate(60, 320)" className="transition-transform group-hover:scale-110">
                {verifiedProofImages.social ? (
                  <g>
                    <circle cx="0" cy="0" r="18" fill="#1e293b" stroke="#34d399" strokeWidth="2.5" />
                    <image
                      href={verifiedProofImages.social}
                      x="-16"
                      y="-16"
                      width="32"
                      height="32"
                      clipPath="url(#thumbClipSocial)"
                      preserveAspectRatio="xMidYMid slice"
                    />
                    <circle cx="12" cy="12" r="6" fill="#10b981" />
                    <path d="M 9.5,12 L 11.5,14 L 14.5,10" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                    <rect x="-36" y="20" width="72" height="14" rx="7" fill="#0f172a" stroke="#34d399" strokeWidth="1" />
                    <text x="0" y="30" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                      ✓ Social Proof
                    </text>
                  </g>
                ) : (
                  <g>
                    <rect x="-38" y="-12" width="76" height="22" rx="11" fill="#0f172a" stroke="#ea580c" strokeWidth="1.5" />
                    <text x="0" y="3" textAnchor="middle" fill="#fdba74" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
                      ❤️ +Social Photo
                    </text>
                  </g>
                )}
              </g>
            </g>

            {/* TOP CROWN APEX */}
            <g transform="translate(300, 140)">
              <circle cx="0" cy="0" r={Math.max(8, trunkWidth * 0.3)} fill="#34d399" opacity="0.85" />
              <circle cx="0" cy="0" r="22" fill="none" stroke="#6ee7b7" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
            </g>
          </>
        )}
      </svg>
    </motion.div>
  </div>

      {/* Snapchat-Style Streak FOMO Urgency Warning Banner */}
      <div className="relative z-30 w-full max-w-3xl mx-auto px-4 mb-2">
        <motion.div
          onClick={() => {
            sounds.playFlameWhoosh();
            setShowStreakDrawer(true);
          }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={`cursor-pointer px-4 py-2.5 rounded-2xl border backdrop-blur-xl shadow-xl flex items-center justify-between transition-all ${
            isProtectedToday
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
              : 'bg-gradient-to-r from-red-950/90 via-orange-950/85 to-red-950/90 border-red-500/70 text-red-100 shadow-red-500/20'
          }`}
        >
          <div className="flex items-center gap-2.5 text-xs">
            {isProtectedToday ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold">
                  Day {streakDays} Protected! You have logged {todayCompletedCount}/4 daily disciplines today.
                </span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4 text-orange-400 shrink-0 animate-bounce" />
                <span className="font-semibold">
                  ⚠️ <strong className="text-amber-300 font-bold">{streakDays}-Day Flame at Risk:</strong> Upload 1 photo proof before midnight to keep your streak alive!
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-amber-300 shrink-0 ml-2">
            <span>Streak Details</span>
            <span>&rarr;</span>
          </div>
        </motion.div>
      </div>

      {/* ================= BOTTOM ACTION DOCK ================= */}
      <footer className="relative z-30 w-full max-w-4xl mx-auto mb-6 px-4">
        <div className="p-3 rounded-2xl bg-slate-950/85 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-wrap items-center justify-center gap-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline">
            Daily Habit Proof:
          </span>

          {/* Study (Mind) */}
          <button
            onClick={() => setActiveModalDomain('mind')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-slate-100 font-bold text-xs shadow-md active:scale-95 transition-all ${
              todayCompleted.mind
                ? 'bg-blue-950/40 border-blue-500/80 text-blue-200'
                : 'bg-slate-900/90 hover:bg-slate-800 border-blue-500/40 hover:border-blue-400 hover:shadow-blue-500/20'
            }`}
          >
            <span className="text-base">📖</span>
            <span>Study & Research (Mind)</span>
            {todayCompleted.mind && <span className="text-emerald-400 text-xs">✓</span>}
          </button>

          {/* Gym (Body) */}
          <button
            onClick={() => setActiveModalDomain('body')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-slate-100 font-bold text-xs shadow-md active:scale-95 transition-all ${
              todayCompleted.body
                ? 'bg-rose-950/40 border-rose-500/80 text-rose-200'
                : 'bg-slate-900/90 hover:bg-slate-800 border-rose-500/40 hover:border-rose-400 hover:shadow-rose-500/20'
            }`}
          >
            <span className="text-base">🏋️</span>
            <span>Gym & Fitness (Body)</span>
            {todayCompleted.body && <span className="text-emerald-400 text-xs">✓</span>}
          </button>

          {/* Code (Craft) */}
          <button
            onClick={() => setActiveModalDomain('craft')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-slate-100 font-bold text-xs shadow-md active:scale-95 transition-all ${
              todayCompleted.craft
                ? 'bg-amber-950/40 border-amber-500/80 text-amber-200'
                : 'bg-slate-900/90 hover:bg-slate-800 border-amber-500/40 hover:border-amber-400 hover:shadow-amber-500/20'
            }`}
          >
            <span className="text-base">💻</span>
            <span>Code & Build (Craft)</span>
            {todayCompleted.craft && <span className="text-emerald-400 text-xs">✓</span>}
          </button>

          {/* Kinship (Social) */}
          <button
            onClick={() => setActiveModalDomain('social')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-slate-100 font-bold text-xs shadow-md active:scale-95 transition-all ${
              todayCompleted.social
                ? 'bg-orange-950/40 border-orange-500/80 text-orange-200'
                : 'bg-slate-900/90 hover:bg-slate-800 border-orange-500/40 hover:border-orange-400 hover:shadow-orange-500/20'
            }`}
          >
            <span className="text-base">☕</span>
            <span>Gather & Friends (Social)</span>
            {todayCompleted.social && <span className="text-emerald-400 text-xs">✓</span>}
          </button>
        </div>
      </footer>

      {/* ================= DEDICATED HABIT UPLOAD & AI VERIFICATION MODAL ================= */}
      <AnimatePresence>
        {activeModalDomain && (
          <HabitUploadModal
            domain={activeModalDomain}
            initialDomain={activeModalDomain}
            onClose={() => setActiveModalDomain(null)}
            onVerifySuccess={handleVerifySuccess}
            onVerifyFailure={handleVerifyFailure}
          />
        )}
      </AnimatePresence>

      {/* ================= WATERING CAN NATURAL NOURISHMENT ANIMATION ================= */}
      <WateringCanAnimation
        isActive={isWateringCanActive}
        targetDomain={wateringDomain}
        domainLabel={
          wateringDomain === 'mind'
            ? 'Study & Research'
            : wateringDomain === 'body'
            ? 'Gym & Fitness'
            : wateringDomain === 'craft'
            ? 'Coding & Craft'
            : 'Kinship & Social'
        }
        onWateringComplete={handleWateringComplete}
      />

      {/* ================= LIVE TREE GROWTH CELEBRATION OVERLAY ================= */}
      <AnimatePresence>
        {growthCelebrationEvent && (
          <TreeGrowthCelebration
            growthEvent={growthCelebrationEvent}
            onDismiss={() => setGrowthCelebrationEvent(null)}
          />
        )}
      </AnimatePresence>

      {/* Interactive First-Time Seed Ceremony Modal */}
      <AnimatePresence>
        {showSeedCeremony && (
          <SeedCeremony
            onPlantComplete={handleSeedPlantComplete}
            onCancel={() => setShowSeedCeremony(false)}
            canCancel={seedPlanted}
          />
        )}
      </AnimatePresence>

      {/* Snapchat-Style FOMO Streak Drawer */}
      <AnimatePresence>
        {showStreakDrawer && (
          <StreakDrawer
            streakDays={streakDays}
            isProtectedToday={isProtectedToday}
            todayCompletedCount={todayCompletedCount}
            onClose={() => setShowStreakDrawer(false)}
            onOpenHabitModal={(dom) => {
              setShowStreakDrawer(false);
              setActiveModalDomain(dom);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
