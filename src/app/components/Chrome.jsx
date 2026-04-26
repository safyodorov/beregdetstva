'use client';

import { useEffect, useState } from 'react';

const NAV_LINKS = [
  ['#history', 'История'],
  ['#stages', 'Этапы'],
  ['#landscape', 'Ландшафт'],
  ['#team', 'Команда'],
  ['#thanks', 'Спасибо'],
];

function Nav({ theme, setTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="#top" className="nav__brand">
          <span className="nav__brand-mark">Б</span>
          <span>
            <span style={{ display: 'block', fontSize: 16, lineHeight: 1.1 }}>Берег Детства</span>
            <span
              className="mono"
              style={{ display: 'block', fontSize: 10, opacity: 0.6, letterSpacing: '0.15em' }}
            >
              ТОС · Новая Дерябиха
            </span>
          </span>
        </a>
        <div className="nav__links">
          {NAV_LINKS.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </div>
        <button
          className="theme-toggle"
          aria-label="Переключить тему"
          onClick={() => setTheme(theme === 'day' ? 'night' : 'day')}
        >
          <span className="theme-toggle__knob">{theme === 'day' ? '☀' : '☾'}</span>
        </button>
        <button
          className={`nav__burger ${menuOpen ? 'is-open' : ''}`}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      >
        <div className="mobile-menu__inner" onClick={(e) => e.stopPropagation()}>
          {NAV_LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="mobile-menu__link serif"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

function SkyBackdrop({ theme }) {
  const day = 'radial-gradient(ellipse at 70% -10%, #fde7c4 0%, #fbf7f1 40%, #f5efe5 100%)';
  const night = 'radial-gradient(ellipse at 70% -10%, #2a1a12 0%, #15090a 45%, #0a0506 100%)';
  return <div className="skybg" style={{ background: theme === 'day' ? day : night }} />;
}

function Stars() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    x: (i * 37) % 100,
    y: (i * 53) % 60,
    s: 0.5 + (i % 4) * 0.4,
    d: (i * 0.21) % 3,
  }));
  return (
    <div className="stars" aria-hidden="true">
      {stars.map((s, i) => (
        <span
          key={i}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.s}px`,
            height: `${s.s}px`,
            animationDelay: `${s.d}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Chrome() {
  const [theme, setTheme] = useState('day');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bd-theme');
      if (saved) setTheme(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('bd-theme', theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) en.target.classList.add('in');
        });
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(
        '.reveal, .chapter, .polaroid, .thanks-row, .year-tab, .masonry__cell, .equip-card, .section-heading',
      )
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div id="sky-root" />
      <div id="stars-root" />
      <Nav theme={theme} setTheme={setTheme} />
      <SkyBackdrop theme={theme} />
      <Stars />
    </>
  );
}
