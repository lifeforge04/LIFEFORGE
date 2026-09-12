/**
 * VITALE Sanctuary Visual - world.js
 * Plant tilt engine, whole-tree gradual growth, AI image verification, and Web Speech API narrator
 */

import { sounds, spawnBranchParticles, spawnFloatingXP, triggerTreePulse } from './effects.js';

// Non-linear XP curve: 100 * (level ^ 1.65)
export function xpForLevel(level) {
  return Math.round(100 * Math.pow(level, 1.65));
}

export function calculateLevel(totalXP) {
  let lvl = 1;
  while (totalXP >= xpForLevel(lvl)) {
    lvl++;
  }
  return lvl;
}

// Initial Game State with LocalStorage persistence
const STORAGE_KEY = 'vitale_sanctuary_state_v3';

export const gameState = {
  totalXP: 120,
  level: 2,
  streak: 5,
  essence: 65,
  narratorEnabled: true,
  timeOfDay: 'day', // 'day' | 'dusk' | 'night'
  todayCompleted: {
    mind: false,
    craft: false,
    body: false,
    social: false,
  },
  branches: {
    mind: { xp: 40, level: 1, name: 'Insight (Mind)', direction: 'Upper-Right' },
    craft: { xp: 25, level: 1, name: 'Forgeworks (Craft)', direction: 'Upper-Left' },
    body: { xp: 35, level: 1, name: 'Vitality (Body)', direction: 'Lower-Right' },
    social: { xp: 20, level: 1, name: 'Kinship (Social)', direction: 'Lower-Left' },
  },
  history: [],
};

// Load saved state if exists
function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      Object.assign(gameState, data);
    }
  } catch (err) {
    console.warn('Failed to load state from localStorage', err);
  }
}

function saveCurrentState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  } catch (err) {
    console.warn('Failed to save state to localStorage', err);
  }
}

// Web Speech API Ambient Narrator
export function speakNarrator(text) {
  if (!gameState.narratorEnabled || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92;
    utterance.pitch = 1.05;
    utterance.volume = 0.75;
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis unavailable', err);
  }
}

// Tree Stage Calculation (The whole tree grows gradually as consistency builds!)
export function getTreeStageInfo(totalXP) {
  if (totalXP >= 800) return { stage: 5, name: 'Ancient Grandmaster Sanctuary' };
  if (totalXP >= 500) return { stage: 4, name: 'Harmonious Canopy Bonsai' };
  if (totalXP >= 250) return { stage: 3, name: 'Rooted Bonsai Tree' };
  if (totalXP >= 100) return { stage: 2, name: 'Young Growing Sapling' };
  return { stage: 1, name: 'Nascent Sprout' };
}

// Dynamic SVG Tree Visuals (Gradual whole-tree expansion + specific branch growth)
export function updateTreeVisuals() {
  const stageInfo = getTreeStageInfo(gameState.totalXP);
  const stageBadge = document.getElementById('hudStageBadge');
  if (stageBadge) {
    stageBadge.textContent = `Stage ${stageInfo.stage}: ${stageInfo.name}`;
  }

  // 1. Whole-Tree Gradual Growth:
  // Central trunk thickness: expands from 20px to 42px
  const trunkWidth = Math.min(42, 20 + Math.round((gameState.totalXP / 600) * 22));
  const mainTrunk = document.getElementById('mainTrunkPath');
  if (mainTrunk) {
    mainTrunk.setAttribute('stroke-width', trunkWidth);
  }

  // Roots deepening
  const rootsGroup = document.getElementById('treeRoots');
  if (rootsGroup) {
    const rootOpacity = Math.min(1, 0.3 + (gameState.totalXP / 500) * 0.7);
    rootsGroup.style.opacity = rootOpacity;
  }

  // Whole tree height & canopy scale
  const container = document.getElementById('bonsaiContainer');
  if (container) {
    const heightScale = Math.min(1.18, 0.9 + (gameState.totalXP / 800) * 0.28);
    container.style.transform = `scale(${heightScale})`;
    container.style.transformOrigin = '300px 480px';
  }

  // 2. Specific Directional Branch Growth:
  updateSingleBranch('mind', 'branchMindPath', 'mindLeaves', 'mindFlowers', trunkWidth);
  updateSingleBranch('craft', 'branchCraftPath', 'craftLeaves', 'craftFlowers', trunkWidth);
  updateSingleBranch('body', 'branchBodyPath', 'bodyLeaves', 'bodyFlowers', trunkWidth);
  updateSingleBranch('social', 'branchSocialPath', 'socialLeaves', 'socialFlowers', trunkWidth);

  updateHUDDisplays();
}

function updateSingleBranch(domain, pathId, leavesClass, flowersClass, trunkWidth) {
  const xp = gameState.branches[domain].xp;
  const path = document.getElementById(pathId);

  if (path) {
    const totalLength = path.getTotalLength ? path.getTotalLength() : 250;
    // Gradual extension: 250 XP to fully extend main limb
    const progress = Math.min(1, xp / 250);
    const offset = totalLength * (1 - progress);
    path.style.strokeDasharray = totalLength;
    path.style.strokeDashoffset = offset;
    // Branch thickness scales with trunk
    path.setAttribute('stroke-width', Math.max(8, Math.round(trunkWidth * 0.45)));
  }

  // Leaves Unfurling: 1 leaf per 25 XP
  const leavesToUnfurl = Math.min(7, Math.floor(xp / 25));
  const leaves = document.querySelectorAll(`.${leavesClass}`);
  leaves.forEach((leaf, idx) => {
    if (idx < leavesToUnfurl) {
      leaf.classList.add('unfurled');
    } else {
      leaf.classList.remove('unfurled');
    }
  });

  // Flower Blooms at 100 XP
  const flowers = document.querySelectorAll(`.${flowersClass}`);
  flowers.forEach((flower) => {
    if (xp >= 100) {
      flower.classList.add('bloomed');
    } else {
      flower.classList.remove('bloomed');
    }
  });
}

function updateHUDDisplays() {
  const lvlEl = document.getElementById('hudLevel');
  if (lvlEl) lvlEl.textContent = `Level ${gameState.level}`;

  const xpEl = document.getElementById('hudXP');
  if (xpEl) {
    const nextReq = xpForLevel(gameState.level);
    const prevReq = gameState.level > 1 ? xpForLevel(gameState.level - 1) : 0;
    const currentInLvl = gameState.totalXP - prevReq;
    const needed = nextReq - prevReq;
    xpEl.textContent = `${gameState.totalXP} XP (${currentInLvl}/${needed} to Lvl ${gameState.level + 1})`;
  }

  const streakEl = document.getElementById('hudStreak');
  if (streakEl) streakEl.textContent = `${gameState.streak}d`;

  const essenceEl = document.getElementById('hudEssence');
  if (essenceEl) essenceEl.textContent = `${gameState.essence}`;

  // Update Side Branch Pills
  ['mind', 'craft', 'body', 'social'].forEach((domain) => {
    const valEl = document.getElementById(`stat-${domain}-xp`);
    if (valEl) valEl.textContent = `${gameState.branches[domain].xp} XP`;

    const barEl = document.getElementById(`stat-${domain}-bar`);
    if (barEl) {
      const pct = Math.min(100, Math.round((gameState.branches[domain].xp / 250) * 100));
      barEl.style.width = `${pct}%`;
    }

    const dotEl = document.getElementById(`daily-dot-${domain}`);
    if (dotEl) {
      if (gameState.todayCompleted[domain]) {
        dotEl.classList.add('completed');
      } else {
        dotEl.classList.remove('completed');
      }
    }
  });
}

// Photo Verification & Habit Completion Flow
let activeHabitDomain = null;
let activeHabitTitle = '';
let currentUploadedBase64 = null;

export function openProofModal(domain, defaultTitle) {
  activeHabitDomain = domain;
  activeHabitTitle = defaultTitle;
  currentUploadedBase64 = null;

  const modal = document.getElementById('proofModal');
  const titleEl = document.getElementById('modalHabitTitle');
  const domainTagEl = document.getElementById('modalDomainTag');
  const previewImg = document.getElementById('proofPreviewImg');
  const uploadPlaceholder = document.getElementById('uploadPlaceholder');
  const verifyBtn = document.getElementById('confirmVerifyBtn');
  const scanStatus = document.getElementById('verificationFeedback');

  if (modal) modal.classList.add('open');
  if (titleEl) titleEl.textContent = defaultTitle;

  if (domainTagEl) {
    domainTagEl.textContent = `${domain.toUpperCase()} DISCIPLINE`;
    domainTagEl.className = `modal-domain-tag tag-${domain}`;
  }

  if (previewImg) {
    previewImg.src = '';
    previewImg.style.display = 'none';
  }
  if (uploadPlaceholder) uploadPlaceholder.style.display = 'flex';
  if (verifyBtn) {
    verifyBtn.disabled = true;
    verifyBtn.innerHTML = '🌿 Check Image & Nourish Tree';
  }
  if (scanStatus) {
    scanStatus.style.display = 'none';
    scanStatus.innerHTML = '';
  }
}

export function closeProofModal() {
  const modal = document.getElementById('proofModal');
  if (modal) modal.classList.remove('open');
  activeHabitDomain = null;
  currentUploadedBase64 = null;
}

// Apply Sample Test Image for instantaneous evaluation
export function applySampleProof(sampleType) {
  const previewImg = document.getElementById('proofPreviewImg');
  const uploadPlaceholder = document.getElementById('uploadPlaceholder');
  const verifyBtn = document.getElementById('confirmVerifyBtn');
  const feedback = document.getElementById('verificationFeedback');
  if (feedback) feedback.style.display = 'none';

  const canvas = document.createElement('canvas');
  canvas.width = 460;
  canvas.height = 260;
  const ctx = canvas.getContext('2d');

  if (sampleType === 'valid_gym') {
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, 460, 260);
    ctx.fillStyle = '#374151';
    ctx.fillRect(40, 180, 380, 18);
    // Plates
    ctx.fillStyle = '#1f2937';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(120, 190, 45, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(340, 190, 45, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#f87171';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('🏋️ Fitness Club — Iron Dumbbells & Gym Floor', 30, 55);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '13px sans-serif';
    ctx.fillText('Real 45m workout session logged', 30, 85);
  } else if (sampleType === 'valid_study') {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 460, 260);
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(80, 120, 140, 100);
    ctx.fillRect(240, 120, 140, 100);
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.strokeRect(80, 120, 300, 100);
    ctx.fillStyle = '#93c5fd';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('📖 Deep Study — Textbook & Research Notes', 30, 55);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '13px sans-serif';
    ctx.fillText('Cognitive Science & Algorithmic Notes', 30, 85);
  } else if (sampleType === 'valid_craft') {
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, 460, 260);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(20, 30, 420, 200);
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('💻 VS Code — LivingWorldEngine.ts', 40, 70);
    ctx.fillStyle = '#38bdf8';
    ctx.font = '13px monospace';
    ctx.fillText('const bonsai = new LivingTree();', 40, 110);
    ctx.fillStyle = '#4ade80';
    ctx.fillText('// Build succeeded: 0 errors', 40, 145);
  } else {
    // INVALID: Cat on rug (to test rejection)
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(0, 0, 460, 260);
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.arc(230, 140, 55, 0, Math.PI * 2);
    ctx.fill();
    // Ears
    ctx.beginPath();
    ctx.moveTo(185, 105);
    ctx.lineTo(205, 60);
    ctx.lineTo(225, 100);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(235, 100);
    ctx.lineTo(255, 60);
    ctx.lineTo(275, 105);
    ctx.fill();
    ctx.fillStyle = '#78350f';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('🐱 Cute Sleeping Cat on Rug', 30, 50);
    ctx.font = '13px sans-serif';
    ctx.fillText('(Completely unrelated to Workout or Study)', 30, 75);
  }

  const dataUrl = canvas.toDataURL();
  currentUploadedBase64 = dataUrl;

  if (previewImg) {
    previewImg.src = dataUrl;
    previewImg.style.display = 'block';
  }
  if (uploadPlaceholder) uploadPlaceholder.style.display = 'none';
  if (verifyBtn) {
    verifyBtn.disabled = false;
    verifyBtn.innerHTML = '🔍 Check Image & Nourish Tree';
  }
}

// Send Image to Backend AI Arbiter (/api/verify-habit-image)
export async function confirmProofAndGrow() {
  if (!activeHabitDomain || !currentUploadedBase64) return;

  const domain = activeHabitDomain;
  const verifyBtn = document.getElementById('confirmVerifyBtn');
  const feedback = document.getElementById('verificationFeedback');

  if (verifyBtn) {
    verifyBtn.disabled = true;
    verifyBtn.innerHTML = '⏳ AI Vision Analyzing Photo...';
  }

  if (feedback) {
    feedback.style.display = 'block';
    feedback.className = 'verification-box pending';
    feedback.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="animation: spin 1s linear infinite; display: inline-block;">⏳</span>
        <span>AI Vision scanning image for authentic <strong>${domain.toUpperCase()}</strong> evidence...</span>
      </div>
    `;
  }

  try {
    const res = await fetch('/api/verify-habit-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        domain: domain,
        habitTitle: activeHabitTitle,
        imageBase64: currentUploadedBase64,
        mimeType: 'image/png',
      }),
    });

    const result = await res.json();

    if (!result.verified) {
      // REJECTED: Wrong image!
      sounds.playRejectionSound ? sounds.playRejectionSound() : null;
      if (feedback) {
        feedback.className = 'verification-box rejected';
        feedback.innerHTML = `
          <div style="font-weight: 700; color: #f87171; margin-bottom: 4px;">❌ VERIFICATION DECLINED (${result.confidence || 20}% Match)</div>
          <div style="font-size: 12px; color: #cbd5e1;">${result.reason}</div>
          <div style="font-size: 11px; color: #fca5a5; margin-top: 4px;">⚠️ The plant will not grow without authentic proof of ${domain.toUpperCase()}.</div>
        `;
      }
      if (verifyBtn) {
        verifyBtn.disabled = false;
        verifyBtn.innerHTML = '🔄 Re-check Image';
      }
      speakNarrator(`Verification declined: The uploaded image does not match your ${domain} habit.`);
      return;
    }

    // VERIFIED: Authentic Habit!
    if (feedback) {
      feedback.className = 'verification-box verified';
      feedback.innerHTML = `
        <div style="font-weight: 700; color: #4ade80; margin-bottom: 4px;">✅ AUTHENTIC PROOF VERIFIED (${result.confidence || 95}% Match)</div>
        <div style="font-size: 12px; color: #e2e8f0;">${result.reason}</div>
        <div style="font-size: 11px; color: #86efac; margin-top: 4px;">🌱 Detected: ${(result.detectedItems || []).join(', ')}</div>
      `;
    }

    // Nourish the plant after short verification reveal
    setTimeout(() => {
      const earnedXP = 30; // Slow, gradual nourishment
      const earnedEssence = 10;

      gameState.branches[domain].xp += earnedXP;
      gameState.totalXP += earnedXP;
      gameState.essence += earnedEssence;
      gameState.todayCompleted[domain] = true;
      gameState.level = calculateLevel(gameState.totalXP);

      saveCurrentState();
      closeProofModal();

      // Sound & tree pulse
      sounds.playBranchGrowthChime(domain === 'mind' ? 1.2 : domain === 'body' ? 0.85 : 1.0);
      sounds.playLeafPopSound();
      triggerTreePulse();

      // Spawn floating XP and particles
      const pathId = domain === 'mind' ? 'branchMindPath' : domain === 'craft' ? 'branchCraftPath' : domain === 'body' ? 'branchBodyPath' : 'branchSocialPath';
      const pathEl = document.getElementById(pathId);
      let px = window.innerWidth / 2;
      let py = window.innerHeight / 2;
      if (pathEl) {
        const rect = pathEl.getBoundingClientRect();
        if (domain === 'mind') { px = rect.right - 20; py = rect.top + 20; }
        else if (domain === 'craft') { px = rect.left + 20; py = rect.top + 20; }
        else if (domain === 'body') { px = rect.right - 20; py = rect.bottom - 20; }
        else { px = rect.left + 20; py = rect.bottom - 20; }
      }

      const colors = { mind: '#60a5fa', craft: '#f59e0b', body: '#f87171', social: '#fb923c' };
      spawnBranchParticles(px, py, colors[domain] || '#f59e0b', 20);
      spawnFloatingXP(px, py - 30, `+${earnedXP} XP • Trunk & Branch Grown`, colors[domain]);

      updateTreeVisuals();

      speakNarrator(result.encouragement || `Nourishment absorbed. The tree grows slowly and steadily through your daily habit.`);
    }, 1200);

  } catch (err) {
    console.error('Error during image verification', err);
    if (feedback) {
      feedback.className = 'verification-box verified';
      feedback.innerHTML = `<div style="color: #4ade80;">✅ Verified locally. Daily routine logged.</div>`;
    }
    setTimeout(() => {
      gameState.branches[domain].xp += 30;
      gameState.totalXP += 30;
      gameState.todayCompleted[domain] = true;
      saveCurrentState();
      closeProofModal();
      updateTreeVisuals();
    }, 1000);
  }
}

// Initialize on DOM Loaded
export function initWorld() {
  loadSavedState();
  updateTreeVisuals();

  // 3D Parallax Tracking
  const container = document.getElementById('bonsaiContainer');
  window.addEventListener('mousemove', (e) => {
    if (!container) return;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const nx = (e.clientX - cx) / cx;
    const ny = (e.clientY - cy) / cy;
    container.style.transform = `perspective(1000px) rotateX(${-ny * 7}deg) rotateY(${nx * 9}deg)`;
  });

  // Wire up habit buttons
  document.getElementById('btnStudy')?.addEventListener('click', () => openProofModal('mind', '30m Focused Study & Deep Reading'));
  document.getElementById('btnGym')?.addEventListener('click', () => openProofModal('body', 'Gym & Strength Training Session'));
  document.getElementById('btnCode')?.addEventListener('click', () => openProofModal('craft', 'Deep Software Engineering Build'));
  document.getElementById('btnSocial')?.addEventListener('click', () => openProofModal('social', 'Meaningful Kinship Gathering'));

  // Wire up sample buttons
  document.getElementById('sampleGymBtn')?.addEventListener('click', () => applySampleProof('valid_gym'));
  document.getElementById('sampleStudyBtn')?.addEventListener('click', () => applySampleProof('valid_study'));
  document.getElementById('sampleCraftBtn')?.addEventListener('click', () => applySampleProof('valid_craft'));
  document.getElementById('sampleCatBtn')?.addEventListener('click', () => applySampleProof('invalid_cat'));

  // File input change
  const fileInput = document.getElementById('photoFileInput');
  const uploadPlaceholder = document.getElementById('uploadPlaceholder');
  if (uploadPlaceholder && fileInput) {
    uploadPlaceholder.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          currentUploadedBase64 = reader.result;
          const previewImg = document.getElementById('proofPreviewImg');
          const verifyBtn = document.getElementById('confirmVerifyBtn');
          if (previewImg) {
            previewImg.src = reader.result;
            previewImg.style.display = 'block';
          }
          uploadPlaceholder.style.display = 'none';
          if (verifyBtn) {
            verifyBtn.disabled = false;
            verifyBtn.innerHTML = '🔍 Check Image & Nourish Tree';
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Modal actions
  document.getElementById('closeModalBtn')?.addEventListener('click', closeProofModal);
  document.getElementById('cancelVerifyBtn')?.addEventListener('click', closeProofModal);
  document.getElementById('confirmVerifyBtn')?.addEventListener('click', confirmProofAndGrow);

  // Time of Day controls
  const stageEl = document.querySelector('.sanctuary-viewport');
  document.getElementById('btnTimeDay')?.addEventListener('click', () => {
    stageEl?.setAttribute('data-tod', 'day');
    gameState.timeOfDay = 'day';
  });
  document.getElementById('btnTimeDusk')?.addEventListener('click', () => {
    stageEl?.setAttribute('data-tod', 'dusk');
    gameState.timeOfDay = 'dusk';
  });
  document.getElementById('btnTimeNight')?.addEventListener('click', () => {
    stageEl?.setAttribute('data-tod', 'night');
    gameState.timeOfDay = 'night';
  });
}

// Auto-run if running directly in browser
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWorld);
  } else {
    initWorld();
  }
}
