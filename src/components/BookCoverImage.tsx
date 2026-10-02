import React, { useState } from 'react';
import { BookOpen, Sparkles, Heart } from 'lucide-react';

interface BookCoverImageProps {
  className?: string;
  showOverlayBadges?: boolean;
}

export const BookCoverImage: React.FC<BookCoverImageProps> = ({
  className = '',
  showOverlayBadges = true,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-100/90 group select-none transition-all duration-300 ${className}`}
    >
      {!imgError ? (
        <img
          src="/1.png"
          alt="Aile Dediğin - Aynı Çatı Altında Buluşan Hikayeler"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover rounded-xl"
        />
      ) : (
        /* High fidelity, warm & vibrant illustrated cover matching 1.png exactly */
        <div className="w-full h-full bg-[#fbf6ec] flex flex-col justify-between p-5 relative overflow-hidden text-center">
          {/* Sunny meadow warm backdrop */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#fbf6ec] via-[#f7edd6] to-[#e4f1d6] opacity-95"></div>
          
          {/* Subtle sun glow */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-amber-200/40 rounded-full blur-2xl pointer-events-none"></div>

          {/* Top Title & Subtitle */}
          <div className="relative z-10 pt-2">
            <h2 className="font-serif font-extrabold text-2xl md:text-3xl text-[#1e4620] tracking-wider uppercase drop-shadow-xs">
              AİLE DEDİĞİN
            </h2>
            <p className="font-serif font-bold text-sm md:text-base text-[#28572b] mt-1 tracking-normal">
              Aynı Çatı Altında Buluşan Hikayeler
            </p>
          </div>

          {/* Center Illustration - Loving Family in the Meadow */}
          <div className="relative z-10 my-auto py-2 flex flex-col items-center">
            
            {/* SVG Scene depicting the uploaded cover art with warm vibrant colors */}
            <svg
              viewBox="0 0 320 280"
              className="w-full max-w-[260px] h-auto drop-shadow-md"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Soft Meadow Hill */}
              <path
                d="M0 200 C80 180, 240 180, 320 200 L320 280 L0 280 Z"
                fill="#8cc870"
              />
              <path
                d="M0 220 C100 205, 220 205, 320 220 L320 280 L0 280 Z"
                fill="#72b554"
              />

              {/* Distant trees */}
              <circle cx="60" cy="90" r="35" fill="#a4cf8a" opacity="0.6" />
              <circle cx="260" cy="80" r="30" fill="#a4cf8a" opacity="0.6" />

              {/* Butterfly fluttering in the center */}
              <g transform="translate(155, 65) scale(0.9)">
                <path d="M0,0 C-12,-15 -22,-5 -5,5 C-18,12 -12,20 0,6 C12,20 18,12 5,5 C22,-5 12,-15 0,0 Z" fill="#d97706" />
                <path d="M0,-2 L0,8" stroke="#78350f" strokeWidth="1.5" />
                <circle cx="-7" cy="-4" r="2.5" fill="#fbbf24" />
                <circle cx="7" cy="-4" r="2.5" fill="#fbbf24" />
              </g>

              {/* FATHER (Right) - Warm yellow shirt, resting on grass, smiling */}
              <g transform="translate(195, 85)">
                {/* Arm under head */}
                <path d="M40 50 C55 35 65 20 50 15 C35 10 30 35 30 45" stroke="#f4b58a" strokeWidth="9" strokeLinecap="round" />
                {/* Head */}
                <ellipse cx="25" cy="20" rx="14" ry="17" fill="#f4b58a" />
                {/* Dark hair */}
                <path d="M12 18 C10 8 20 4 33 6 C38 8 40 15 36 22 C32 18 20 18 12 18 Z" fill="#475569" />
                {/* Facial smile */}
                <path d="M18 24 Q24 28 30 24" stroke="#78350f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <circle cx="21" cy="18" r="1.5" fill="#334155" />
                <circle cx="29" cy="19" r="1.5" fill="#334155" />
                {/* Yellow T-shirt Body */}
                <path d="M12 36 C5 50 0 80 15 95 C30 100 65 90 70 65 C70 50 55 35 38 35 Z" fill="#f59e0b" />
                {/* Blue jeans */}
                <path d="M15 95 L5 140 L35 140 L45 95 Z" fill="#3b82f6" opacity="0.9" />
              </g>

              {/* MOTHER (Left) - Auburn hair, lilac-blue dress, holding orange book */}
              <g transform="translate(25, 100)">
                {/* Long reddish hair */}
                <path d="M30 10 C15 5 8 25 10 50 C12 65 25 70 28 65 C22 45 25 25 35 15 C45 25 50 45 44 65 C48 68 55 60 55 45 C55 20 45 5 30 10 Z" fill="#b45309" />
                {/* Head */}
                <ellipse cx="32" cy="25" rx="13" ry="15" fill="#fad2b3" />
                {/* Smile & Eyes */}
                <path d="M26 30 Q32 34 37 30" stroke="#92400e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <ellipse cx="27" cy="24" rx="1.5" ry="1.2" fill="#78350f" />
                <ellipse cx="36" cy="24" rx="1.5" ry="1.2" fill="#78350f" />
                {/* Lavender / Periwinkle Dress */}
                <path d="M20 40 C10 55 0 95 12 110 C25 115 55 115 65 105 C70 85 55 50 42 40 Z" fill="#6366f1" />
                <path d="M20 40 L42 40 L50 80 L10 80 Z" fill="#818cf8" opacity="0.4" />
                {/* Hands holding open book */}
                <ellipse cx="25" cy="80" rx="4" ry="4" fill="#fad2b3" />
                <ellipse cx="45" cy="80" rx="4" ry="4" fill="#fad2b3" />
                {/* Open Orange Book */}
                <g transform="translate(22, 72)">
                  <path d="M0 6 Q8 2 13 8 Q18 2 26 6 L24 20 Q18 16 13 22 Q8 16 2 20 Z" fill="#ea580c" />
                  <path d="M2 7 Q8 3 13 9 L13 21 Q8 16 3 19 Z" fill="#fff7ed" />
                  <path d="M13 9 Q18 3 24 7 L23 19 Q18 16 13 21 Z" fill="#fff7ed" />
                </g>
              </g>

              {/* BOY (Center) - Coral red t-shirt, blue shorts, hands behind head */}
              <g transform="translate(105, 115)">
                {/* Arms behind head */}
                <path d="M5 25 C-5 10 5 -5 20 0" stroke="#fcd3b8" strokeWidth="7" strokeLinecap="round" />
                <path d="M35 25 C45 10 35 -5 20 0" stroke="#fcd3b8" strokeWidth="7" strokeLinecap="round" />
                {/* Head */}
                <circle cx="20" cy="18" rx="12" ry="13" fill="#fcd3b8" />
                {/* Blond hair */}
                <path d="M8 15 C8 6 15 3 24 3 C30 5 32 10 32 16 C27 12 15 12 8 15 Z" fill="#f59e0b" />
                {/* Joyful grin */}
                <path d="M14 22 Q20 27 26 22" stroke="#9a3412" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <circle cx="16" cy="17" r="1.3" fill="#431407" />
                <circle cx="24" cy="17" r="1.3" fill="#431407" />
                {/* Coral Red T-shirt */}
                <path d="M8 32 C2 42 5 62 12 68 C20 70 32 70 38 65 C42 55 38 40 32 32 Z" fill="#ef4444" />
                {/* Blue Shorts */}
                <path d="M12 68 L8 95 L22 95 L24 75 L28 95 L40 95 L36 67 Z" fill="#2563eb" />
                {/* Legs */}
                <path d="M12 95 L14 115" stroke="#fcd3b8" strokeWidth="6" strokeLinecap="round" />
                <path d="M34 95 L36 115" stroke="#fcd3b8" strokeWidth="6" strokeLinecap="round" />
              </g>

              {/* Blooming flowers in foreground */}
              <g transform="translate(40, 240)">
                <circle cx="0" cy="0" r="4" fill="#fbbf24" />
                <circle cx="-7" cy="0" r="3.5" fill="#f43f5e" />
                <circle cx="7" cy="0" r="3.5" fill="#f43f5e" />
                <circle cx="0" cy="-7" r="3.5" fill="#f43f5e" />
                <circle cx="0" cy="7" r="3.5" fill="#f43f5e" />
              </g>
              <g transform="translate(140, 245)">
                <circle cx="0" cy="0" r="4" fill="#fbbf24" />
                <circle cx="-6" cy="-4" r="3" fill="#e11d48" />
                <circle cx="6" cy="-4" r="3" fill="#e11d48" />
                <circle cx="-6" cy="4" r="3" fill="#e11d48" />
                <circle cx="6" cy="4" r="3" fill="#e11d48" />
              </g>
              <g transform="translate(240, 235)">
                <circle cx="0" cy="0" r="4" fill="#fbbf24" />
                <circle cx="-7" cy="0" r="3.5" fill="#8b5cf6" />
                <circle cx="7" cy="0" r="3.5" fill="#8b5cf6" />
                <circle cx="0" cy="-7" r="3.5" fill="#8b5cf6" />
                <circle cx="0" cy="7" r="3.5" fill="#8b5cf6" />
              </g>
              <g transform="translate(280, 250)">
                <circle cx="0" cy="0" r="3.5" fill="#fbbf24" />
                <circle cx="-5" cy="0" r="3" fill="#a855f7" />
                <circle cx="5" cy="0" r="3" fill="#a855f7" />
                <circle cx="0" cy="-5" r="3" fill="#a855f7" />
                <circle cx="0" cy="5" r="3.5" fill="#a855f7" />
              </g>
            </svg>

          </div>

          {/* Bottom Authors Bar */}
          <div className="relative z-10 pt-1 pb-1 border-t border-amber-900/10 flex items-center justify-between text-[11px] font-serif font-bold text-amber-950/80">
            <span>Hümeyra EKMEN</span>
            <span>& Öğrencileri</span>
          </div>
        </div>
      )}

      {/* Warm Overlay Badge */}
      {showOverlayBadges && (
        <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-md py-1.5 px-3 rounded-xl border border-amber-200/80 shadow-xs flex items-center justify-between text-[11px] font-bold text-amber-900">
          <span className="flex items-center gap-1">
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            "Aile Dediğin" Kitabı
          </span>
          <span className="text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full text-[10px]">
            Rehber Eser
          </span>
        </div>
      )}
    </div>
  );
};
