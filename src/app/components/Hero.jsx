'use client';

import { useEffect, useRef, useState } from 'react';

function Clouds() {
  return (
    <svg
      className="hero-clouds"
      viewBox="0 0 1600 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <filter id="cloud-soft">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <g filter="url(#cloud-soft)" fill="currentColor">
        <g className="cloud-drift cloud-drift--slow">
          <ellipse cx="220" cy="90" rx="140" ry="20" opacity="0.55" />
          <ellipse cx="520" cy="60" rx="180" ry="22" opacity="0.45" />
          <ellipse cx="980" cy="110" rx="220" ry="28" opacity="0.60" />
          <ellipse cx="1380" cy="70" rx="160" ry="20" opacity="0.50" />
        </g>
        <g className="cloud-drift cloud-drift--fast">
          <ellipse cx="120" cy="180" rx="100" ry="12" opacity="0.35" />
          <ellipse cx="600" cy="220" rx="220" ry="16" opacity="0.40" />
          <ellipse cx="1200" cy="170" rx="180" ry="14" opacity="0.38" />
          <ellipse cx="1560" cy="230" rx="120" ry="12" opacity="0.32" />
        </g>
      </g>
    </svg>
  );
}

function Grass() {
  const [theme, setTheme] = useState('day');

  useEffect(() => {
    const root = document.documentElement;
    setTheme(root.getAttribute('data-theme') || 'day');
    const obs = new MutationObserver(() => {
      setTheme(root.getAttribute('data-theme') || 'day');
    });
    obs.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  const species = [
    { viewBox: '0 0 20 120', d: 'M 10 120 C 10 90, 7 60, 11 30 C 13 18, 12 8, 10 0', stroke: 2.2, endCap: null },
    { viewBox: '0 0 30 120', d: 'M 15 120 C 15 80, 5 50, 22 20 C 26 14, 28 8, 29 2', stroke: 2.8, endCap: null },
    { viewBox: '0 0 24 130', d: 'M 12 130 C 12 95, 10 65, 13 35 L 13 12', stroke: 1.8, endCap: 'wheat' },
    { viewBox: '0 0 20 130', d: 'M 10 130 C 10 100, 9 75, 11 45 L 11 20', stroke: 1.6, endCap: 'timothy' },
    { viewBox: '0 0 32 130', d: 'M 16 130 C 16 100, 14 70, 16 40 L 16 18', stroke: 1.6, endCap: 'umbel' },
  ];

  const layers = [
    { n: 18, scale: 0.55, opacity: 0.45, blur: 1.6, hueShift: -12, durBase: 4.8, z: 0 },
    { n: 30, scale: 0.85, opacity: 0.75, blur: 0.6, hueShift: 0, durBase: 4.0, z: 1 },
    { n: 24, scale: 1.15, opacity: 1.0, blur: 0.0, hueShift: 6, durBase: 3.3, z: 2 },
  ];

  const paletteDay = [
    { core: '#385c3e', tip: '#6b9370', glow: '#6fffa0' },
    { core: '#5a8862', tip: '#a8c3ac', glow: '#8affb0' },
    { core: '#4a7553', tip: '#8aab92', glow: '#4effa5' },
    { core: '#2f4a33', tip: '#5a7a5e', glow: '#3effc4' },
    { core: '#7a1f1f', tip: '#c24a4a', glow: '#ff4a6b' },
    { core: '#5e2a2a', tip: '#9a4545', glow: '#ff5577' },
    { core: '#385c3e', tip: '#a33a3a', glow: '#ff7a5c' },
  ];
  const paletteNight = [
    { core: '#3effc4', tip: '#8affb0', glow: '#6fffa0' },
    { core: '#6fffa0', tip: '#c8ffd8', glow: '#8affb0' },
    { core: '#4effa5', tip: '#a8ffcd', glow: '#4effa5' },
    { core: '#00e6a8', tip: '#6fffcc', glow: '#3effc4' },
    { core: '#ff4a6b', tip: '#ff8aa3', glow: '#ff4a6b' },
    { core: '#ff5577', tip: '#ff9ab0', glow: '#ff5577' },
    { core: '#ff7a5c', tip: '#ffbaa5', glow: '#ff7a5c' },
  ];
  const palette = theme === 'night' ? paletteNight : paletteDay;

  const blades = [];
  let gi = 0;
  layers.forEach((layer, li) => {
    for (let i = 0; i < layer.n; i++) {
      const sp = species[(i * 7 + li) % species.length];
      const col = palette[(i * 11 + li * 3) % palette.length];
      const x = (i + li * 0.37) / layer.n * 102 - 1 + ((i * 0.31) % 1) * 2;
      const h = 60 + ((i * 37 + li * 53) % 90);
      const delay = (i * 0.137 + li * 0.6) % 5;
      const dur = layer.durBase + ((i % 5) * 0.35) - (li * 0.2);
      const sway = 4 + (i % 4);
      const tilt = ((i * 13) % 9) - 4;
      const flip = i % 2 ? 'scaleX(-1)' : '';

      const key = gi++;
      blades.push(
        <svg
          key={`b${key}`}
          className="blade"
          viewBox={sp.viewBox}
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{
            left: `${x}%`,
            height: `${h * layer.scale}px`,
            opacity: layer.opacity,
            filter: layer.blur ? `blur(${layer.blur}px)` : 'none',
            '--sway': `${sway}deg`,
            '--tilt': `${tilt}deg`,
            '--glow': col.glow,
            '--flip': flip,
            animationDelay: `-${delay}s`,
            animationDuration: `${dur}s`,
            zIndex: layer.z,
          }}
        >
          <defs>
            <linearGradient id={`bg-${key}`} x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor={col.core} stopOpacity="1" />
              <stop offset="70%" stopColor={col.core} stopOpacity="0.85" />
              <stop offset="100%" stopColor={col.tip} stopOpacity="0.65" />
            </linearGradient>
          </defs>
          <path
            d={sp.d}
            fill="none"
            stroke={`url(#bg-${key})`}
            strokeWidth={sp.stroke}
            strokeLinecap="round"
          />
          {sp.endCap === 'wheat' &&
            (() => {
              const cx = Number(sp.viewBox.split(' ')[2]) / 2;
              return (
                <g opacity="0.95">
                  {[0, 1, 2, 3, 4, 5].map((k) => {
                    const y = 2 + k * 3.2;
                    return (
                      <g key={k}>
                        <ellipse
                          cx={cx - 2.2}
                          cy={y}
                          rx="2.4"
                          ry="1.6"
                          fill={col.tip}
                          transform={`rotate(-28 ${cx - 2.2} ${y})`}
                        />
                        <ellipse
                          cx={cx + 2.2}
                          cy={y}
                          rx="2.4"
                          ry="1.6"
                          fill={col.tip}
                          transform={`rotate(28 ${cx + 2.2} ${y})`}
                        />
                      </g>
                    );
                  })}
                  <line x1={cx} y1="2" x2={cx - 3} y2="-6" stroke={col.tip} strokeWidth="0.6" opacity="0.7" />
                  <line x1={cx} y1="2" x2={cx} y2="-7" stroke={col.tip} strokeWidth="0.6" opacity="0.7" />
                  <line x1={cx} y1="2" x2={cx + 3} y2="-6" stroke={col.tip} strokeWidth="0.6" opacity="0.7" />
                </g>
              );
            })()}
          {sp.endCap === 'timothy' &&
            (() => {
              const cx = Number(sp.viewBox.split(' ')[2]) / 2;
              return (
                <g opacity="0.95">
                  <rect x={cx - 2.2} y="2" width="4.4" height="18" rx="2.2" fill={col.tip} />
                  {[0, 1, 2, 3, 4, 5, 6].map((k) => (
                    <circle
                      key={k}
                      cx={cx + (k % 2 === 0 ? -1.2 : 1.2)}
                      cy={4 + k * 2.2}
                      r="0.7"
                      fill={col.core}
                      opacity="0.6"
                    />
                  ))}
                </g>
              );
            })()}
          {sp.endCap === 'umbel' &&
            (() => {
              const cx = Number(sp.viewBox.split(' ')[2]) / 2;
              const spokes = 7;
              return (
                <g opacity="0.9">
                  {Array.from({ length: spokes }).map((_, k) => {
                    const angle = -90 + (k - (spokes - 1) / 2) * 22;
                    const rad = (angle * Math.PI) / 180;
                    const x2 = cx + Math.cos(rad) * 9;
                    const y2 = 14 + Math.sin(rad) * 9;
                    return (
                      <g key={k}>
                        <line
                          x1={cx}
                          y1="14"
                          x2={x2}
                          y2={y2}
                          stroke={col.core}
                          strokeWidth="0.7"
                          opacity="0.7"
                        />
                        <circle cx={x2} cy={y2} r="1.4" fill={col.tip} />
                      </g>
                    );
                  })}
                  <circle cx={cx} cy="14" r="1.2" fill={col.core} />
                </g>
              );
            })()}
        </svg>,
      );
    }
  });

  const seeds = Array.from({ length: 14 }, (_, i) => (
    <span
      key={`s${i}`}
      className="seed"
      style={{
        left: `${(i * 7.3) % 100}%`,
        bottom: `${20 + ((i * 11) % 80)}px`,
        animationDelay: `-${(i * 1.3) % 8}s`,
        animationDuration: `${12 + (i % 5) * 2}s`,
        opacity: 0.45 + (i % 3) * 0.15,
      }}
    />
  ));

  return (
    <div className="hero-grass" aria-hidden="true">
      <div className="hero-grass__seeds">{seeds}</div>
      {blades}
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const p1 = Math.min(scroll * 0.2, 200);
  const opacity = Math.max(0, 1 - scroll / 700);

  return (
    <section className="hero" ref={heroRef} data-screen-label="00 Hero">
      <div
        className="hero__photo"
        style={{ transform: `translate3d(0, ${p1}px, 0) scale(${1 + scroll * 0.0003})` }}
      >
        <img src="/photos/playground-sunset.jpg" alt="Площадка на закате" />
        <div className="hero__photo-wash" />
      </div>

      <div className="hero__clouds" style={{ transform: `translate3d(0, ${-scroll * 0.1}px, 0)` }}>
        <Clouds />
      </div>

      <div
        className="hero__content"
        style={{ opacity, transform: `translate3d(0, ${scroll * 0.15}px, 0)` }}
      >
        <div className="hero__meta">
          <span className="seal">ТОС Новая Дерябиха</span>
          <span className="hero__coord mono">57.923° N · 40.985° E</span>
        </div>

        <h1 className="hero__title serif">
          <span className="hero__title-word hero__title-word--1">Берег</span>
          <span className="hero__title-word hero__title-word--2">
            <em>Детства</em>
          </span>
        </h1>

        <p className="hero__lede">
          История одного пустыря, который соседи превратили
          <br />в место, где дети растут, а растения цветут.
        </p>

        <div className="hero__cta">
          <a className="btn btn--primary" href="#history">
            Узнать историю
          </a>
          <a className="btn btn--ghost" href="#stages">
            Этапы проекта →
          </a>
        </div>
      </div>

      <Grass />

      <div className="hero__scroll-hint" style={{ opacity }}>
        <span className="mono">прокрутите ↓</span>
      </div>
    </section>
  );
}
