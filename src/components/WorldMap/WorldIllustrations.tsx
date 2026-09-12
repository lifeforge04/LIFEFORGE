import React from 'react';
import { AttributeType, TimeOfDay } from '../../types';

interface LandmarkProps {
  level: number;
  timeOfDay: TimeOfDay;
}

/**
 * Central Landmark that evolves as the user levels up:
 * Lvl 1: Pioneer Tent & Sprout
 * Lvl 2-4: Hearth campfire & Cobblestone
 * Lvl 5-7: Homestead & Windmill
 * Lvl 8-11: Stone Athenaeum Dome
 * Lvl 12-14: Clockwork Spire
 * Lvl 15-19: Levitation Monolith
 * Lvl 20+: The Grand Golden World Tree of Vitale
 */
export const CentralLandmark: React.FC<LandmarkProps> = ({ level, timeOfDay }) => {
  const isNight = timeOfDay === 'night' || timeOfDay === 'dusk';

  if (level >= 20) {
    // Level 20+: The Grand Golden World Tree (Yggdrasil of Vitale)
    return (
      <g className="transition-all duration-700">
        {/* Divine Aura */}
        <circle cx="500" cy="410" r="95" fill="url(#goldAuraGrad)" className="animate-pulse-beacon" opacity="0.6" />
        {/* Ancient Tree Trunk */}
        <path
          d="M485,465 C485,425 470,390 495,355 C480,335 485,305 500,280 C515,305 520,335 505,355 C530,390 515,425 515,465 Z"
          fill="#5c3826"
          stroke="#3d2214"
          strokeWidth="3"
        />
        {/* Golden Roots */}
        <path d="M485,465 C470,475 445,480 435,485 M515,465 C530,475 555,480 565,485" stroke="#452718" strokeWidth="5" strokeLinecap="round" />
        {/* Lush Golden Foliage Canopy */}
        <ellipse cx="500" cy="270" rx="75" ry="50" fill="url(#goldenTreeLeaves)" />
        <ellipse cx="455" cy="290" rx="45" ry="35" fill="url(#goldenTreeLeaves)" />
        <ellipse cx="545" cy="290" rx="45" ry="35" fill="url(#goldenTreeLeaves)" />
        <ellipse cx="500" cy="240" rx="50" ry="35" fill="#fef08a" opacity="0.9" />
        {/* Floating Sparks */}
        <circle cx="475" cy="250" r="3" fill="#ffffff" className="animate-ping" />
        <circle cx="525" cy="265" r="2.5" fill="#ffffff" className="animate-ping" style={{ animationDelay: '1s' }} />
        {/* Crown Crystal */}
        <polygon points="500,205 508,225 500,235 492,225" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" className="animate-float-gentle" />
      </g>
    );
  }

  if (level >= 15) {
    // Level 15-19: Levitation Monolith
    return (
      <g className="transition-all duration-700">
        {/* Stone Pedestal */}
        <polygon points="465,465 535,465 550,480 450,480" fill="#334155" stroke="#1e293b" strokeWidth="2" />
        <polygon points="475,445 525,445 535,465 465,465" fill="#475569" stroke="#1e293b" strokeWidth="1.5" />
        {/* Ethereal Glow */}
        <ellipse cx="500" cy="370" rx="45" ry="60" fill="url(#monolithGlow)" className="animate-pulse-beacon" />
        {/* Floating Crystal Shard */}
        <g className="animate-float-gentle">
          <polygon points="500,320 525,370 500,420 475,370" fill="url(#crystalGrad)" stroke="#a7f3d0" strokeWidth="2" />
          <polygon points="500,320 525,370 500,420" fill="rgba(255,255,255,0.25)" />
          {/* Orbiting Runes */}
          <circle cx="465" cy="355" r="3" fill="#6ee7b7" />
          <circle cx="535" cy="385" r="3" fill="#6ee7b7" />
        </g>
      </g>
    );
  }

  if (level >= 12) {
    // Level 12-14: Clockwork Spire
    return (
      <g className="transition-all duration-700">
        {/* Stone Tower Base */}
        <polygon points="475,475 525,475 520,380 480,380" fill="#475569" stroke="#1e293b" strokeWidth="2" />
        {/* Brass Dome */}
        <path d="M475,380 Q500,340 525,380 Z" fill="#d97706" stroke="#92400e" strokeWidth="2" />
        <line x1="500" y1="340" x2="500" y2="310" stroke="#f59e0b" strokeWidth="3" />
        <circle cx="500" cy="310" r="5" fill="#fbbf24" />
        {/* Rotating Brass Gear on Spire */}
        <g transform="translate(500, 415)" className="animate-spin-slow">
          <circle cx="0" cy="0" r="14" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
          <circle cx="0" cy="0" r="5" fill="#1e293b" />
          <rect x="-2" y="-18" width="4" height="36" fill="#b45309" />
          <rect x="-18" y="-2" width="36" height="4" fill="#b45309" />
        </g>
        {/* Lit windows */}
        <rect x="492" y="440" width="16" height="22" rx="3" fill={isNight ? '#fde047' : '#94a3b8'} />
      </g>
    );
  }

  if (level >= 8) {
    // Level 8-11: Grand Athenaeum Dome
    return (
      <g className="transition-all duration-700">
        {/* Steps */}
        <polygon points="450,475 550,475 540,465 460,465" fill="#64748b" />
        {/* Columns */}
        <rect x="465" y="420" width="10" height="45" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
        <rect x="485" y="420" width="10" height="45" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
        <rect x="505" y="420" width="10" height="45" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
        <rect x="525" y="420" width="10" height="45" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
        {/* Architrave & Pediment */}
        <polygon points="460,420 540,420 500,390" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
        {/* Blue Azure Dome */}
        <path d="M475,390 Q500,345 525,390 Z" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
        <circle cx="500" cy="345" r="4" fill="#facc15" />
      </g>
    );
  }

  if (level >= 5) {
    // Level 5-7: Homestead & Windmill
    return (
      <g className="transition-all duration-700">
        {/* Homestead House */}
        <rect x="455" y="430" width="45" height="40" fill="#e2d3ae" stroke="#6b4a34" strokeWidth="2" rx="2" />
        <polygon points="445,430 477,395 510,430" fill="#991b1b" stroke="#6b4a34" strokeWidth="2" />
        <rect x="472" y="445" width="12" height="25" fill="#5c3826" />
        <circle cx="482" cy="457" r="1.5" fill="#facc15" />
        {/* Windmill Tower */}
        <polygon points="515,470 545,470 540,410 520,410" fill="#f1e6cf" stroke="#6b4a34" strokeWidth="2" />
        <polygon points="515,410 530,390 545,410" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
        {/* Windmill Blades */}
        <g transform="translate(530, 410)" className="animate-spin-slow">
          <circle cx="0" cy="0" r="4" fill="#b45309" />
          <line x1="0" y1="-32" x2="0" y2="32" stroke="#451a03" strokeWidth="2" />
          <line x1="-32" y1="0" x2="32" y2="0" stroke="#451a03" strokeWidth="2" />
          <polygon points="0,-32 10,-28 0,-8" fill="#f8fafc" opacity="0.8" />
          <polygon points="0,32 -10,28 0,8" fill="#f8fafc" opacity="0.8" />
          <polygon points="-32,0 -28,-10 -8,0" fill="#f8fafc" opacity="0.8" />
          <polygon points="32,0 28,10 8,0" fill="#f8fafc" opacity="0.8" />
        </g>
      </g>
    );
  }

  if (level >= 2) {
    // Level 2-4: Hearth campfire & Cobblestone
    return (
      <g className="transition-all duration-700">
        {/* Campfire Ring */}
        <circle cx="500" cy="460" r="24" fill="#292524" opacity="0.5" />
        <circle cx="484" cy="460" r="6" fill="#78716c" stroke="#44403c" strokeWidth="1" />
        <circle cx="493" cy="452" r="5" fill="#78716c" stroke="#44403c" strokeWidth="1" />
        <circle cx="508" cy="453" r="5.5" fill="#78716c" stroke="#44403c" strokeWidth="1" />
        <circle cx="516" cy="462" r="6" fill="#78716c" stroke="#44403c" strokeWidth="1" />
        <circle cx="507" cy="468" r="5" fill="#78716c" stroke="#44403c" strokeWidth="1" />
        <circle cx="492" cy="467" r="5.5" fill="#78716c" stroke="#44403c" strokeWidth="1" />
        {/* Crackling Flames */}
        <polygon points="495,462 505,462 500,440" fill="#ea580c" className="animate-pulse" />
        <polygon points="497,462 503,462 500,446" fill="#fde047" />
        {/* Small Log Bench */}
        <rect x="460" y="452" width="18" height="6" rx="2" fill="#5c3826" />
        <rect x="522" y="452" width="18" height="6" rx="2" fill="#5c3826" />
      </g>
    );
  }

  // Level 1: Pioneer Tent & Nascent Sprout
  return (
    <g className="transition-all duration-700">
      {/* Pioneer Tent */}
      <polygon points="475,470 515,470 495,435" fill="#e2d3ae" stroke="#78350f" strokeWidth="2" />
      <polygon points="495,435 500,470 515,470" fill="#ccb78f" stroke="#78350f" strokeWidth="1.5" />
      {/* Wooden Pegs */}
      <line x1="470" y1="472" x2="477" y2="466" stroke="#451a03" strokeWidth="2" />
      <line x1="520" y1="472" x2="513" y2="466" stroke="#451a03" strokeWidth="2" />
      {/* Glowing Green Sprout */}
      <g className="animate-float-gentle" transform="translate(528, 452)">
        <path d="M0,15 Q0,4 6,0 Q-4,6 -6,14" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
        <path d="M0,15 Q4,6 12,5 Q4,10 0,15" fill="#4ade80" />
        <circle cx="6" cy="0" r="2.5" fill="#86efac" />
      </g>
    </g>
  );
};

/**
 * Knowledge District (Mind) - North East
 */
export const KnowledgeDistrictSVG: React.FC<{
  xp: number;
  isHovered: boolean;
  hasUpgrade: boolean;
  timeOfDay: TimeOfDay;
}> = ({ xp, isHovered, hasUpgrade, timeOfDay }) => {
  const isNight = timeOfDay === 'night' || timeOfDay === 'dusk';
  const stage = xp >= 150 ? 3 : xp >= 50 ? 2 : 1;

  return (
    <g id="district-mind-svg" className="cursor-pointer transition-transform duration-300">
      {/* Highlight glow when hovered */}
      {isHovered && (
        <circle cx="710" cy="220" r="85" fill="rgba(59, 130, 246, 0.22)" className="animate-pulse" />
      )}

      {/* District Plateau Base */}
      <ellipse cx="710" cy="250" rx="90" ry="38" fill="#3b5943" stroke="#2a4231" strokeWidth="2" />

      {/* Stage 1: Ancient Reading Gazebo */}
      <g>
        <polygon points="680,240 740,240 710,210" fill="#1e3a8a" stroke="#172554" strokeWidth="2" />
        <rect x="688" y="240" width="6" height="22" fill="#cbd5e1" />
        <rect x="702" y="240" width="6" height="22" fill="#cbd5e1" />
        <rect x="716" y="240" width="6" height="22" fill="#cbd5e1" />
        <rect x="726" y="240" width="6" height="22" fill="#cbd5e1" />
      </g>

      {/* Stage 2: Great Athenaeum Library Spire */}
      {stage >= 2 && (
        <g className="transition-opacity duration-700">
          {/* Main Hall */}
          <rect x="660" y="210" width="45" height="35" fill="#f8fafc" stroke="#334155" strokeWidth="2" rx="3" />
          <path d="M660,210 Q682,185 705,210 Z" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
          {/* Windows lit */}
          <rect x="670" y="222" width="10" height="15" rx="2" fill={isNight ? '#fde047' : '#93c5fd'} />
          <rect x="686" y="222" width="10" height="15" rx="2" fill={isNight ? '#fde047' : '#93c5fd'} />
        </g>
      )}

      {/* Stage 3: Astrolabe Telescope Tower */}
      {stage >= 3 && (
        <g className="transition-opacity duration-700">
          <polygon points="730,235 755,235 750,165 735,165" fill="#e2e8f0" stroke="#334155" strokeWidth="2" />
          <circle cx="742" cy="165" r="14" fill="#1d4ed8" stroke="#f59e0b" strokeWidth="2" />
          {/* Telescope angling toward the stars */}
          <line x1="742" y1="165" x2="765" y2="140" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
          <circle cx="765" cy="140" r="3" fill="#ffffff" className="animate-ping" />
        </g>
      )}

      {/* Special Upgrade: Astrolabe Observatory Orbiting Rings */}
      {hasUpgrade && (
        <g transform="translate(742, 165)" className="animate-spin-slow">
          <ellipse cx="0" cy="0" rx="24" ry="8" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="24" cy="0" r="2.5" fill="#93c5fd" />
        </g>
      )}

      {/* Floating Knowledge Books / Magic Runes */}
      <g className="animate-float-gentle">
        <polygon points="650,185 662,180 662,192 650,197" fill="#60a5fa" opacity="0.9" />
        <polygon points="662,180 674,185 674,197 662,192" fill="#93c5fd" opacity="0.9" />
      </g>
    </g>
  );
};

/**
 * Tech District (Craft) - East / Mid-East
 */
export const TechDistrictSVG: React.FC<{
  xp: number;
  isHovered: boolean;
  hasUpgrade: boolean;
  timeOfDay: TimeOfDay;
}> = ({ xp, isHovered, hasUpgrade, timeOfDay }) => {
  const stage = xp >= 150 ? 3 : xp >= 50 ? 2 : 1;

  return (
    <g id="district-craft-svg" className="cursor-pointer transition-transform duration-300">
      {isHovered && (
        <circle cx="780" cy="420" r="85" fill="rgba(245, 158, 11, 0.22)" className="animate-pulse" />
      )}

      {/* Ground Foundation */}
      <ellipse cx="780" cy="450" rx="85" ry="36" fill="#3c5943" stroke="#2a4231" strokeWidth="2" />

      {/* Stage 1: Crafting Workshop & Anvil */}
      <g>
        <polygon points="740,440 790,440 765,410" fill="#78350f" stroke="#451a03" strokeWidth="2" />
        <rect x="748" y="440" width="34" height="22" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
        {/* Iron Anvil */}
        <polygon points="798,452 812,452 810,458 800,458" fill="#475569" />
        <rect x="803" y="458" width="4" height="6" fill="#334155" />
      </g>

      {/* Stage 2: Clockwork Foundry & Chimney */}
      {stage >= 2 && (
        <g className="transition-opacity duration-700">
          {/* Brick Foundry Kiln */}
          <rect x="775" y="415" width="40" height="35" fill="#9a3412" stroke="#431407" strokeWidth="2" rx="2" />
          {/* Chimney with Steam */}
          <rect x="800" y="380" width="10" height="38" fill="#7c2d12" stroke="#431407" strokeWidth="1.5" />
          {/* Steam Smoke Puffs */}
          <circle cx="805" cy="370" r="5" fill="#cbd5e1" opacity="0.75" className="animate-float-gentle" />
          <circle cx="809" cy="358" r="7" fill="#e2e8f0" opacity="0.6" className="animate-float-gentle" />
          <circle cx="813" cy="344" r="9" fill="#f8fafc" opacity="0.4" className="animate-float-gentle" />
        </g>
      )}

      {/* Stage 3: Rotating Waterwheel & Gearworks */}
      {stage >= 3 && (
        <g className="transition-opacity duration-700">
          {/* Turning Waterwheel by the stream */}
          <g transform="translate(825, 460)" className="animate-spin-slow">
            <circle cx="0" cy="0" r="16" fill="none" stroke="#78350f" strokeWidth="4" />
            <line x1="-16" y1="0" x2="16" y2="0" stroke="#78350f" strokeWidth="3" />
            <line x1="0" y1="-16" x2="0" y2="16" stroke="#78350f" strokeWidth="3" />
            <circle cx="0" cy="0" r="4" fill="#451a03" />
          </g>
          {/* Brass Cog on wall */}
          <g transform="translate(755, 420)" className="animate-spin-slow" style={{ animationDirection: 'reverse' }}>
            <circle cx="0" cy="0" r="10" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
            <circle cx="0" cy="0" r="3" fill="#451a03" />
          </g>
        </g>
      )}

      {/* Upgrade Visual: Steam Forge Pipes & Brass Heat Core */}
      {hasUpgrade && (
        <g>
          <path d="M785,410 L785,395 L770,395" fill="none" stroke="#f59e0b" strokeWidth="3" />
          <circle cx="770" cy="395" r="4" fill="#ef4444" className="animate-ping" />
        </g>
      )}
    </g>
  );
};

/**
 * Vitality District (Body) - South-East
 */
export const VitalityDistrictSVG: React.FC<{
  xp: number;
  isHovered: boolean;
  hasUpgrade: boolean;
  timeOfDay: TimeOfDay;
}> = ({ xp, isHovered, hasUpgrade, timeOfDay }) => {
  const stage = xp >= 150 ? 3 : xp >= 50 ? 2 : 1;

  return (
    <g id="district-body-svg" className="cursor-pointer transition-transform duration-300">
      {isHovered && (
        <circle cx="670" cy="570" r="85" fill="rgba(239, 68, 68, 0.22)" className="animate-pulse" />
      )}

      {/* Mountainous Ridge Terrain */}
      <polygon points="590,620 670,520 750,620" fill="#4b5563" stroke="#1f2937" strokeWidth="2" />
      <polygon points="630,620 670,520 710,620" fill="#6b7280" />
      {/* Snow/Rock Cap */}
      <polygon points="655,540 670,520 685,540 675,545 670,538 662,545" fill="#f8fafc" />

      {/* Stage 1: Training Trail & Running Marker */}
      <path d="M610,610 Q640,580 670,590 Q700,600 730,615" fill="none" stroke="#d97706" strokeWidth="3" strokeDasharray="4 3" />
      <rect x="620" y="595" width="4" height="15" fill="#78350f" />
      <polygon points="624,595 638,600 624,606" fill="#ef4444" />

      {/* Stage 2: Athletic Arena & Training Benches */}
      {stage >= 2 && (
        <g className="transition-opacity duration-700">
          <ellipse cx="640" cy="580" rx="30" ry="14" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="1.5" />
          <polygon points="620,575 660,575 650,560 630,560" fill="#fca5a5" stroke="#ef4444" strokeWidth="1.5" />
          {/* Victory Torches */}
          <circle cx="618" cy="565" r="3" fill="#f97316" className="animate-pulse" />
          <circle cx="662" cy="565" r="3" fill="#f97316" className="animate-pulse" />
        </g>
      )}

      {/* Stage 3: Roaring Waterfall cascading into delta */}
      {stage >= 3 && (
        <g className="transition-opacity duration-700">
          <path d="M670,545 C672,560 668,580 673,605 C675,615 671,625 675,635" fill="none" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
          <ellipse cx="675" cy="635" rx="14" ry="5" fill="#7dd3fc" className="animate-pulse" />
        </g>
      )}

      {/* Upgrade Visual: Titan Mountain Pavilion */}
      {hasUpgrade && (
        <g>
          <polygon points="660,520 670,500 680,520" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
          <line x1="655" y1="520" x2="685" y2="520" stroke="#facc15" strokeWidth="2" />
        </g>
      )}
    </g>
  );
};

/**
 * Community District (Social) - South-West
 */
export const CommunityDistrictSVG: React.FC<{
  xp: number;
  isHovered: boolean;
  hasUpgrade: boolean;
  timeOfDay: TimeOfDay;
}> = ({ xp, isHovered, hasUpgrade, timeOfDay }) => {
  const isNight = timeOfDay === 'night' || timeOfDay === 'dusk';
  const stage = xp >= 150 ? 3 : xp >= 50 ? 2 : 1;

  return (
    <g id="district-social-svg" className="cursor-pointer transition-transform duration-300">
      {isHovered && (
        <circle cx="320" cy="560" r="85" fill="rgba(249, 115, 22, 0.22)" className="animate-pulse" />
      )}

      {/* Ground Meadow */}
      <ellipse cx="320" cy="580" rx="90" ry="38" fill="#3c5943" stroke="#2a4231" strokeWidth="2" />

      {/* Stage 1: Village Cottages */}
      <g>
        {/* Cottage 1 */}
        <rect x="275" y="550" width="35" height="26" fill="#f1e6cf" stroke="#78350f" strokeWidth="2" rx="2" />
        <polygon points="268,550 292,530 317,550" fill="#c2410c" stroke="#78350f" strokeWidth="2" />
        <rect x="288" y="562" width="8" height="14" fill="#451a03" />
        <rect x="279" y="556" width="6" height="6" fill={isNight ? '#fde047' : '#94a3b8'} />

        {/* Cottage 2 */}
        <rect x="330" y="555" width="30" height="24" fill="#f1e6cf" stroke="#78350f" strokeWidth="2" rx="2" />
        <polygon points="325,555 345,536 365,555" fill="#ea580c" stroke="#78350f" strokeWidth="2" />
        <rect x="340" y="565" width="7" height="14" fill="#451a03" />
      </g>

      {/* Stage 2: Agora Town Square & Market Canopies */}
      {stage >= 2 && (
        <g className="transition-opacity duration-700">
          <ellipse cx="320" cy="570" rx="22" ry="10" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
          {/* Market Canopy */}
          <polygon points="305,558 335,558 332,548 308,548" fill="#f97316" stroke="#c2410c" strokeWidth="1" />
          <line x1="308" y1="558" x2="308" y2="568" stroke="#78350f" strokeWidth="1.5" />
          <line x1="332" y1="558" x2="332" y2="568" stroke="#78350f" strokeWidth="1.5" />
        </g>
      )}

      {/* Stage 3: Festival Paper Lanterns strung between posts */}
      {stage >= 3 && (
        <g className="transition-opacity duration-700">
          <path d="M270,535 Q320,550 370,535" fill="none" stroke="#451a03" strokeWidth="1.5" />
          {/* Swaying Lanterns */}
          <circle cx="290" cy="542" r="4" fill="#ef4444" className="animate-pulse" />
          <circle cx="310" cy="546" r="4.5" fill="#f59e0b" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
          <circle cx="330" cy="546" r="4.5" fill="#ef4444" className="animate-pulse" style={{ animationDelay: '1s' }} />
          <circle cx="350" cy="542" r="4" fill="#f59e0b" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
        </g>
      )}

      {/* Upgrade Visual: Festival Lantern Archway */}
      {hasUpgrade && (
        <g>
          <path d="M300,530 Q320,510 340,530" fill="none" stroke="#f97316" strokeWidth="3" />
          <circle cx="320" cy="515" r="5" fill="#fde047" className="animate-pulse" />
        </g>
      )}
    </g>
  );
};

/**
 * Sanctuary District (Balance) - North-West
 */
export const SanctuaryDistrictSVG: React.FC<{
  xp: number;
  isHovered: boolean;
  hasUpgrade: boolean;
  timeOfDay: TimeOfDay;
}> = ({ xp, isHovered, hasUpgrade, timeOfDay }) => {
  const stage = xp >= 150 ? 3 : xp >= 50 ? 2 : 1;

  return (
    <g id="district-balance-svg" className="cursor-pointer transition-transform duration-300">
      {isHovered && (
        <circle cx="260" cy="240" r="85" fill="rgba(16, 185, 129, 0.22)" className="animate-pulse" />
      )}

      {/* Sanctuary Hill */}
      <ellipse cx="260" cy="260" rx="90" ry="38" fill="#3b5943" stroke="#2a4231" strokeWidth="2" />

      {/* Stage 1: Bamboo Grove & Stepping Stones */}
      <g>
        {/* Bamboo stalks */}
        <line x1="220" y1="260" x2="220" y2="215" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
        <line x1="226" y1="265" x2="226" y2="205" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="233" y1="260" x2="233" y2="220" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
        {/* Stepping stones */}
        <ellipse cx="250" cy="265" rx="7" ry="4" fill="#94a3b8" />
        <ellipse cx="268" cy="268" rx="8" ry="4" fill="#94a3b8" />
      </g>

      {/* Stage 2: Japanese Zen Torii Gate */}
      {stage >= 2 && (
        <g className="transition-opacity duration-700">
          {/* Torii Top Bar */}
          <line x1="240" y1="220" x2="280" y2="220" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
          <line x1="244" y1="226" x2="276" y2="226" stroke="#b91c1c" strokeWidth="3" />
          {/* Torii Pillars */}
          <line x1="248" y1="220" x2="248" y2="255" stroke="#dc2626" strokeWidth="3.5" />
          <line x1="272" y1="220" x2="272" y2="255" stroke="#dc2626" strokeWidth="3.5" />
        </g>
      )}

      {/* Stage 3: Cherry Blossom Tree & Floating Crystal Monolith */}
      {stage >= 3 && (
        <g className="transition-opacity duration-700">
          {/* Sakura Tree */}
          <path d="M285,255 C288,240 280,225 295,210" fill="none" stroke="#5c3826" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="295" cy="205" rx="22" ry="16" fill="#fbcfe8" opacity="0.95" />
          <ellipse cx="308" cy="210" rx="15" ry="12" fill="#f472b6" opacity="0.85" />
          {/* Floating emerald meditation shard */}
          <g className="animate-float-gentle">
            <polygon points="260,185 268,198 260,210 252,198" fill="#10b981" stroke="#6ee7b7" strokeWidth="1.5" />
            <circle cx="260" cy="198" r="1.5" fill="#ffffff" />
          </g>
        </g>
      )}

      {/* Upgrade Visual: Zen Mirror Lotus Pool */}
      {hasUpgrade && (
        <g>
          <ellipse cx="260" cy="272" rx="20" ry="7" fill="#0284c7" opacity="0.8" />
          <circle cx="258" cy="272" r="3" fill="#f472b6" />
          <circle cx="263" cy="271" r="2.5" fill="#ffffff" />
        </g>
      )}
    </g>
  );
};

/**
 * Connecting roads, footbridges, and 14-day streak viaduct
 */
export const WorldPathways: React.FC<{ streak: number }> = ({ streak }) => {
  return (
    <g id="world-pathways" opacity="0.75">
      {/* Cobblestone trails from center to districts */}
      <path d="M480,450 Q390,490 330,560" fill="none" stroke="#d6c7a1" strokeWidth="4" strokeDasharray="3 4" />
      <path d="M520,450 Q600,500 660,570" fill="none" stroke="#d6c7a1" strokeWidth="4" strokeDasharray="3 4" />
      <path d="M490,430 Q370,350 270,260" fill="none" stroke="#d6c7a1" strokeWidth="4" strokeDasharray="3 4" />
      <path d="M510,430 Q610,340 700,240" fill="none" stroke="#d6c7a1" strokeWidth="4" strokeDasharray="3 4" />
      <path d="M525,450 Q660,440 760,435" fill="none" stroke="#d6c7a1" strokeWidth="4" strokeDasharray="3 4" />

      {/* 14-day Streak Grand Stone Arched Viaduct */}
      {streak >= 14 && (
        <g className="transition-opacity duration-700">
          <path d="M430,340 Q500,325 570,340" fill="none" stroke="#64748b" strokeWidth="8" />
          <path d="M430,340 Q500,325 570,340" fill="none" stroke="#94a3b8" strokeWidth="4" />
          {/* Arches */}
          <path d="M450,340 Q465,360 480,340" fill="none" stroke="#475569" strokeWidth="3" />
          <path d="M490,337 Q505,357 520,337" fill="none" stroke="#475569" strokeWidth="3" />
          <path d="M530,340 Q545,360 560,340" fill="none" stroke="#475569" strokeWidth="3" />
        </g>
      )}
    </g>
  );
};
