import { AttributeType, Task, WorldMilestone, StreakMilestone, WorldUpgrade, UserGameState, JourneyEvent } from '../types';

export const ATTRIBUTE_CONFIG: Record<
  AttributeType,
  {
    name: string;
    icon: string;
    color: string;
    accentHex: string;
    bgGlow: string;
    districtName: string;
    description: string;
    realWorldTasks: string;
  }
> = {
  mind: {
    name: 'Mind',
    icon: '🧠',
    color: '#60a5fa', // blue-400
    accentHex: '#3b82f6',
    bgGlow: 'rgba(59, 130, 246, 0.25)',
    districtName: 'Knowledge District',
    description: 'Expands the grand library, observatories, and scroll archives.',
    realWorldTasks: 'Study, reading, algorithm practice, courses',
  },
  body: {
    name: 'Body',
    icon: '💪',
    color: '#f87171', // red-400
    accentHex: '#ef4444',
    bgGlow: 'rgba(239, 68, 68, 0.25)',
    districtName: 'Vitality District',
    description: 'Grows athletic arenas, mountain running trails, and waterfalls.',
    realWorldTasks: 'Gym, workouts, running, mobility, sports',
  },
  craft: {
    name: 'Craft',
    icon: '⚙️',
    color: '#fbbf24', // amber-400
    accentHex: '#f59e0b',
    bgGlow: 'rgba(245, 158, 11, 0.25)',
    districtName: 'Tech District',
    description: 'Erects clockwork workshops, steam foundries, and code spires.',
    realWorldTasks: 'Coding, projects, prototyping, design',
  },
  social: {
    name: 'Social',
    icon: '❤️',
    color: '#fb923c', // orange-400
    accentHex: '#f97316',
    bgGlow: 'rgba(249, 115, 22, 0.25)',
    districtName: 'Community District',
    description: 'Builds lively town squares, amphitheatres, and festival lanterns.',
    realWorldTasks: 'Friends, networking, speaking, community',
  },
  balance: {
    name: 'Balance',
    icon: '🧘',
    color: '#34d399', // emerald-400
    accentHex: '#10b981',
    bgGlow: 'rgba(16, 185, 129, 0.25)',
    districtName: 'Sanctuary District',
    description: 'Unlocks tranquil bamboo groves, lotus ponds, and floating crystals.',
    realWorldTasks: 'Meditation, sleep hygiene, journaling, rest',
  },
};

/**
 * Non-linear XP curve explicitly specified:
 * XP required for level n = 100 * n^1.65
 */
export function xpForLevel(n: number): number {
  if (n <= 0) return 0;
  return Math.round(100 * Math.pow(n, 1.65));
}

export function calculateLevelFromXP(totalXP: number): number {
  let level = 1;
  while (totalXP >= xpForLevel(level)) {
    level++;
  }
  return level;
}

export function getLevelProgress(totalXP: number, level: number): {
  currentXPInLevel: number;
  neededForNextLevel: number;
  percentage: number;
} {
  const currentBase = xpForLevel(level - 1);
  const nextTarget = xpForLevel(level);
  const diff = nextTarget - currentBase;
  const currentXPInLevel = Math.max(0, totalXP - currentBase);
  const percentage = Math.min(100, Math.max(0, (currentXPInLevel / diff) * 100));
  return {
    currentXPInLevel,
    neededForNextLevel: diff,
    percentage,
  };
}

export const WORLD_MILESTONES: WorldMilestone[] = [
  {
    level: 1,
    title: 'The Seed of Vitale',
    description: 'A quiet, unshaped clearing with a nascent sprout waiting to awaken.',
    unlockedVisual: 'Pioneer Camp & Sprout',
    icon: '🌱',
  },
  {
    level: 2,
    title: 'Ember Hearth',
    description: 'A cozy campfire crackles, lighting pathways connecting your wilderness.',
    unlockedVisual: 'Cobblestone Paths & Campfire',
    icon: '🔥',
  },
  {
    level: 3,
    title: 'Flowering Orchard',
    description: 'Fruitful blossoms unfurl and a rustic timber footbridge crosses the brook.',
    unlockedVisual: 'Bloom Orchards & Timber Bridge',
    icon: '🌸',
  },
  {
    level: 5,
    title: 'First Settlement',
    description: 'Sturdy thatched cottages appear with smoke drifting peacefully from stone chimneys.',
    unlockedVisual: 'Homesteads & Windmill',
    icon: '🏡',
  },
  {
    level: 8,
    title: 'Grand Athenaeum',
    description: 'An ancient dome and high astronomical telescope tower rises into the sky.',
    unlockedVisual: 'Athenaeum & Astrolabe Spire',
    icon: '🏛️',
  },
  {
    level: 12,
    title: 'Clockwork Foundry',
    description: 'Brass gears, glowing forge kilns, and steam conduits power the Tech region.',
    unlockedVisual: 'Foundry & Turning Waterwheel',
    icon: '⚙️',
  },
  {
    level: 15,
    title: 'Sanctuary Monolith',
    description: 'A crystal shard floats effortlessly over a shimmering lotus mirror-lake.',
    unlockedVisual: 'Floating Levitation Monolith',
    icon: '💎',
  },
  {
    level: 20,
    title: 'Citadel of Harmony',
    description: 'The great World Tree blooms in golden radiance, joining all five domains in equilibrium.',
    unlockedVisual: 'Great Golden World Tree & Citadel',
    icon: '👑',
  },
];

export const STREAK_MILESTONES: StreakMilestone[] = [
  {
    days: 3,
    title: 'Firefly Awakening',
    description: 'Warm glowing fireflies drift through the twilight reeds and trees.',
    effect: 'fireflies',
    icon: '✨',
  },
  {
    days: 7,
    title: 'Verdant Canopy',
    description: 'Rich emerald foliage blooms across hillsides, giving your world a lush forest texture.',
    effect: 'foliage',
    icon: '🌲',
  },
  {
    days: 14,
    title: 'The Great Arched Viaduct',
    description: 'An ancient grand stone aqueduct arches across the river gorge.',
    effect: 'aqueduct',
    icon: '🌉',
  },
  {
    days: 30,
    title: 'Celestial Aurora',
    description: 'A breathtaking curtain of cosmic aurora borealis dances across the night skies.',
    effect: 'aurora',
    icon: '🌌',
  },
];

export const WORLD_UPGRADES: WorldUpgrade[] = [
  {
    id: 'upgrade-library',
    title: 'Astrolabe Observatory',
    description: 'Refined brass optics that sharpen focus. Grants permanent bonus Mind XP.',
    district: 'mind',
    costEssence: 120,
    xpBonusPercent: 8,
    bonusAttribute: 'mind',
    icon: '🔭',
    purchased: false,
    visualUnlocked: 'Observatory Dome & Telescope',
  },
  {
    id: 'upgrade-forge',
    title: 'Steam-Powered Forge',
    description: 'High-heat crucible enabling faster iteration. Grants permanent bonus Craft XP.',
    district: 'craft',
    costEssence: 140,
    xpBonusPercent: 8,
    bonusAttribute: 'craft',
    icon: '⚒️',
    purchased: false,
    visualUnlocked: 'Smoking Chimney & Brass Piping',
  },
  {
    id: 'upgrade-training',
    title: 'Titan Summit Arena',
    description: 'High altitude mountain pavilion for conditioning. Grants permanent bonus Body XP.',
    district: 'body',
    costEssence: 110,
    xpBonusPercent: 8,
    bonusAttribute: 'body',
    icon: '🏔️',
    purchased: false,
    visualUnlocked: 'Cliffside Banners & Rope Bridge',
  },
  {
    id: 'upgrade-agora',
    title: 'Festival Lantern Square',
    description: 'Strung paper lanterns and acoustic pavilion. Grants permanent bonus Social XP.',
    district: 'social',
    costEssence: 100,
    xpBonusPercent: 8,
    bonusAttribute: 'social',
    icon: '🏮',
    purchased: false,
    visualUnlocked: 'Festive Lanterns & Agora Amphitheater',
  },
  {
    id: 'upgrade-lotus',
    title: 'Zen Mirror Pool',
    description: 'Clear water reflecting the heavens. Grants permanent bonus Balance XP.',
    district: 'balance',
    costEssence: 120,
    xpBonusPercent: 8,
    bonusAttribute: 'balance',
    icon: '🪷',
    purchased: false,
    visualUnlocked: 'Water Lilies & Stone Torii Arch',
  },
  {
    id: 'upgrade-beacon',
    title: 'Beacon of Harmony',
    description: 'Prismatic crystal lighthouse illuminating the entire world. Boosts ALL XP by +10%.',
    district: 'world',
    costEssence: 250,
    xpBonusPercent: 10,
    bonusAttribute: 'all',
    icon: '✨',
    purchased: false,
    visualUnlocked: 'Central Beacon of Light',
  },
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Study Data Structures & Algorithms',
    description: 'Deep dive into graph algorithms and dynamic programming (45 min focus session).',
    attribute: 'mind',
    difficulty: 'hard',
    durationMinutes: 45,
    xpReward: 72,
    essenceReward: 28,
    completed: false,
  },
  {
    id: 'task-2',
    title: 'Full Body Gym Training',
    description: 'Compound lifts, kettlebell circuits, and core stability routine.',
    attribute: 'body',
    difficulty: 'hard',
    durationMinutes: 60,
    xpReward: 65,
    essenceReward: 25,
    completed: false,
  },
  {
    id: 'task-3',
    title: 'Build Interactive UI Component',
    description: 'Implement fluid spring transitions, canvas particles, and responsive states.',
    attribute: 'craft',
    difficulty: 'medium',
    durationMinutes: 45,
    xpReward: 52,
    essenceReward: 20,
    completed: false,
  },
  {
    id: 'task-4',
    title: 'Deep Reconnection Call',
    description: 'Reach out to an old friend or family member for a meaningful conversation.',
    attribute: 'social',
    difficulty: 'easy',
    durationMinutes: 25,
    xpReward: 35,
    essenceReward: 15,
    completed: false,
  },
  {
    id: 'task-5',
    title: 'Mindfulness & Breathwork',
    description: '15-minute diaphragm pacing and evening reflective journaling.',
    attribute: 'balance',
    difficulty: 'easy',
    durationMinutes: 15,
    xpReward: 30,
    essenceReward: 12,
    completed: false,
  },
  {
    id: 'task-6',
    title: 'Read Non-Fiction Chapter',
    description: '30 minutes of intentional reading and note extraction.',
    attribute: 'mind',
    difficulty: 'medium',
    durationMinutes: 30,
    xpReward: 42,
    essenceReward: 18,
    completed: false,
  },
];

export const INITIAL_JOURNEY: JourneyEvent[] = [
  {
    id: 'journey-init',
    timestamp: new Date().toISOString(),
    dayLabel: 'Day 1',
    title: 'Camp Established in the Wilderness',
    description: 'You stepped into the uncharted valley of Vitale. The first spark of life has taken root.',
    type: 'milestone',
  },
];

export const DEFAULT_GAME_STATE: UserGameState = {
  displayName: 'Wanderer',
  level: 1,
  totalXP: 0,
  essence: 40,
  streak: 3, // Start with 3 days so the firefly effect is demonstrated immediately, or user can toggle
  lastActiveDate: new Date().toISOString().split('T')[0],
  attributes: {
    mind: 0,
    body: 0,
    craft: 0,
    social: 0,
    balance: 0,
  },
  upgrades: [],
  completedTaskIds: [],
  tasks: INITIAL_TASKS,
  journeyEvents: INITIAL_JOURNEY,
};

const STORAGE_KEY = 'vitale_living_world_v1';

export function loadGameState(): UserGameState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure all tasks and fields are intact
      return {
        ...DEFAULT_GAME_STATE,
        ...parsed,
        tasks: parsed.tasks?.length ? parsed.tasks : INITIAL_TASKS,
      };
    }
  } catch (e) {
    console.error('Error loading game state:', e);
  }
  return DEFAULT_GAME_STATE;
}

export function saveGameState(state: UserGameState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving game state:', e);
  }
}
