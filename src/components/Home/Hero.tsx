"use client"
import React, { useState } from 'react';
import { MaxWidthWrapper } from '../common/MaxWidthWrapper';

export const Hero = () => {
  const rows = 58;
  const cols = 58;
  const total = rows * cols;

  const [highlighted, setHighlighted] = useState<Set<number>>(new Set());

  const triangles = Array.from({ length: total });

  const getNearbyRandom = (idx: number) => {
    const nearby: number[] = [];
    const row = Math.floor(idx / cols);
    const col = idx % cols;
    const radius = 2;

    for (let r = Math.max(0, row - radius); r <= Math.min(rows - 1, row + radius); r++) {
      for (let c = Math.max(0, col - radius); c <= Math.min(cols - 1, col + radius); c++) {
        const neighborIdx = r * cols + c;
        nearby.push(neighborIdx);
      }
    }

    for (let i = nearby.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nearby[i], nearby[j]] = [nearby[j], nearby[i]];
    }

    return new Set(nearby.slice(0, 6));
  };

  return (
    <div className="relative w-full h-[100vh] bg-black overflow-clip">
      {/* Triangle Grid */}
      <div className="absolute inset-0 grid grid-cols-58 gap-0 z-0">
        {triangles.map((_, idx) => {
          const isHighlighted = highlighted.has(idx);
          return (
            <div
              key={idx}
              onMouseEnter={() => setHighlighted(getNearbyRandom(idx))}
              onMouseLeave={() => setHighlighted(new Set())}
              className="w-[1.6025rem] h-[1.5625rem] border"
              style={{
                borderColor: isHighlighted ? '#3b82f6' : 'rgba(100,100,100,0.12)',
                transition: isHighlighted
                  ? 'transform 0.1s ease-out, border-color 0.1s ease-out'
                  : 'transform 2s ease, border-color 2s ease',
              }}
            />
          );
        })}
      </div>

      {/* Foreground Content */}
      <MaxWidthWrapper>
        <div className="relative z-20 flex items-center justify-center h-full">
          <p className="text-white text-3xl font-semibold">Full-Stack Engineer</p>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};
