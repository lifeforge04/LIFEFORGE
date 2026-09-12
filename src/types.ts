export type AttributeType = 'mind' | 'body' | 'craft' | 'social' | 'balance';

export type DomainType = 'mind' | 'body' | 'craft' | 'social';

export interface VerificationResult {
  verified: boolean;
  confidence: number;
  domain: DomainType;
  activityDetected: string;
  reason: string;
  growthBonus: number;
  encouragement: string;
  detectedItems?: string[];
  isSimulated?: boolean;
}

export interface TreeGrowthEvent {
  domain: DomainType;
  earnedXP: number;
  newBranchXP: number;
  newTotalXP: number;
  growthBonus: number;
  activityDetected: string;
  encouragement: string;
  imageUrl?: string;
  timestamp: number;
}

export type TimeOfDay = 'dawn' | 'day' | 'dusk' | 'night';

export type WeatherType = 'clear' | 'blossoms' | 'fireflies' | 'gentle_rain';

export interface AttributeData {
  id: AttributeType;
  name: string;
  icon: string;
  tagline: string;
  color: string;
  bgGlow: string;
  districtName: string;
  currentXP: number;
  level: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  attribute: AttributeType;
  difficulty: 'easy' | 'medium' | 'hard';
  durationMinutes: number;
  xpReward: number;
  essenceReward: number;
  completed: boolean;
  completedAt?: string;
  proofName?: string;
  proofUrl?: string;
  isCustom?: boolean;
}

export interface WorldMilestone {
  level: number;
  title: string;
  description: string;
  unlockedVisual: string;
  icon: string;
}

export interface StreakMilestone {
  days: number;
  title: string;
  description: string;
  effect: string;
  icon: string;
}

export interface WorldUpgrade {
  id: string;
  title: string;
  description: string;
  district: AttributeType | 'world';
  costEssence: number;
  xpBonusPercent: number;
  bonusAttribute: AttributeType | 'all';
  icon: string;
  purchased: boolean;
  visualUnlocked: string;
}

export interface JourneyEvent {
  id: string;
  timestamp: string;
  dayLabel: string;
  title: string;
  description: string;
  type: 'milestone' | 'task' | 'streak' | 'upgrade';
  attribute?: AttributeType;
}

export interface UserGameState {
  displayName: string;
  level: number;
  totalXP: number;
  essence: number;
  streak: number;
  lastActiveDate: string;
  attributes: Record<AttributeType, number>;
  upgrades: string[]; // IDs of purchased upgrades
  completedTaskIds: string[];
  tasks: Task[];
  journeyEvents: JourneyEvent[];
}
