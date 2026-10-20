import React from 'react';

export default function SlothMascot({ state = 'sleeping', size = 100 }) {
  // state: 'sleeping' | 'thinking' | 'shocked' | 'happy'
  return (
    <div className={`sloth-mascot-container ${state === 'sleeping' ? 'animate-breathe' : 'animate-float'}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Glow backdrop */}
        <circle cx="60" cy="60" r="54" fill="rgba(61, 95, 88, 0.3)" />
        <circle cx="60" cy="60" r="48" stroke="#f5b726" strokeWidth="3" strokeDasharray="4 4" opacity="0.6" />

        {/* Sloth Body */}
        <ellipse cx="60" cy="64" rx="36" ry="32" fill="#5a4536" stroke="#10201d" strokeWidth="3" />
        
        {/* Sloth Chest Patch */}
        <ellipse cx="60" cy="68" rx="22" ry="20" fill="#a8927e" />

        {/* Sloth Head */}
        <circle cx="60" cy="46" r="28" fill="#755a47" stroke="#10201d" strokeWidth="3" />

        {/* Sloth Face Mask (Cream) */}
        <path
          d="M44 42 C40 34 50 30 60 30 C70 30 80 34 76 42 C74 54 68 58 60 58 C52 58 46 54 44 42 Z"
          fill="#eddcd2"
          stroke="#10201d"
          strokeWidth="2"
        />

        {/* Eye Patches (Dark Fur) */}
        <ellipse cx="50" cy="42" rx="7" ry="5" fill="#423126" transform="rotate(-15 50 42)" />
        <ellipse cx="70" cy="42" rx="7" ry="5" fill="#423126" transform="rotate(15 70 42)" />

        {/* Eyes based on state */}
        {state === 'sleeping' && (
          <>
            <path d="M46 43 Q 50 47 54 43" stroke="#10201d" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M66 43 Q 70 47 74 43" stroke="#10201d" strokeWidth="2.5" strokeLinecap="round" />
            {/* Zzz animation text */}
            <text x="86" y="24" fill="#f5b726" fontSize="14" fontWeight="bold" fontFamily="monospace">z</text>
            <text x="96" y="16" fill="#f5b726" fontSize="18" fontWeight="bold" fontFamily="monospace">Z</text>
          </>
        )}

        {state === 'thinking' && (
          <>
            <circle cx="50" cy="42" r="2.5" fill="#10201d" />
            <circle cx="70" cy="42" r="2.5" fill="#10201d" />
            <path d="M47 36 Q 51 34 55 37" stroke="#10201d" strokeWidth="1.5" />
            <path d="M65 37 Q 69 34 73 36" stroke="#10201d" strokeWidth="1.5" />
            {/* Thinking gear / dot */}
            <circle cx="86" cy="28" r="4" fill="#f5b726" />
            <circle cx="96" cy="20" r="6" fill="#3d5f58" stroke="#f5b726" strokeWidth="2" />
          </>
        )}

        {state === 'shocked' && (
          <>
            <ellipse cx="50" cy="42" rx="3.5" ry="4.5" fill="#10201d" />
            <ellipse cx="70" cy="42" rx="3.5" ry="4.5" fill="#10201d" />
            <circle cx="51" cy="40" r="1.5" fill="#ffffff" />
            <circle cx="71" cy="40" r="1.5" fill="#ffffff" />
            {/* O-mouth */}
            <ellipse cx="60" cy="52" rx="4" ry="5" fill="#e97b77" stroke="#10201d" strokeWidth="2" />
          </>
        )}

        {state === 'happy' && (
          <>
            <path d="M46 42 Q 50 38 54 42" stroke="#10201d" strokeWidth="3" strokeLinecap="round" />
            <path d="M66 42 Q 70 38 74 42" stroke="#10201d" strokeWidth="3" strokeLinecap="round" />
            {/* Cheerful wide grin */}
            <path d="M52 48 Q 60 56 68 48" stroke="#10201d" strokeWidth="2.5" fill="#e97b77" />
          </>
        )}

        {/* Sloth Nose */}
        {state !== 'shocked' && (
          <ellipse cx="60" cy="47" rx="5" ry="3.5" fill="#2d1e17" />
        )}

        {/* Sloth Smile if not shocked */}
        {state !== 'shocked' && state !== 'happy' && (
          <path d="M56 51 Q 60 54 64 51" stroke="#10201d" strokeWidth="2" strokeLinecap="round" />
        )}

        {/* Sloth Claws / Hands holding Coin */}
        <path d="M30 64 C25 68 28 80 40 78 C35 76 34 70 36 66 Z" fill="#5a4536" stroke="#10201d" strokeWidth="2" />
        <path d="M90 64 C95 68 92 80 80 78 C85 76 86 70 84 66 Z" fill="#5a4536" stroke="#10201d" strokeWidth="2" />

        {/* Golden Coin in claws */}
        <circle cx="60" cy="80" r="12" fill="#f5b726" stroke="#10201d" strokeWidth="2.5" />
        <text x="60" y="85" textAnchor="middle" fill="#10201d" fontSize="13" fontWeight="900" fontFamily="monospace">$</text>
      </svg>
    </div>
  );
}
