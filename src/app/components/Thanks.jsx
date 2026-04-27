'use client';

import { useEffect, useRef } from 'react';

const DRAGONFLY_SVG = `
  <svg viewBox="0 0 240 320" class="dragonfly__svg" fill="none">
    <g class="dfly-wings" stroke="#fffaf2" stroke-linejoin="round" stroke-linecap="round">
      <g class="dfly-wing dfly-wing--front-l">
        <path d="M 118 128 C 80 110, 40 105, 12 118 C 4 122, 4 132, 14 134 C 50 138, 90 136, 117 132 Z" stroke-width="1.4"/>
        <path d="M 118 128 C 85 118, 50 116, 18 122" stroke-width="0.55" opacity="0.7"/>
        <path d="M 118 130 C 85 124, 50 124, 18 128" stroke-width="0.55" opacity="0.7"/>
        <path d="M 118 132 C 85 130, 50 130, 18 132" stroke-width="0.45" opacity="0.55"/>
        <ellipse cx="20" cy="124" rx="5" ry="2" stroke="#fffaf2" stroke-width="1.1"/>
      </g>
      <g class="dfly-wing dfly-wing--front-r">
        <path d="M 122 128 C 160 110, 200 105, 228 118 C 236 122, 236 132, 226 134 C 190 138, 150 136, 123 132 Z" stroke-width="1.4"/>
        <path d="M 122 128 C 155 118, 190 116, 222 122" stroke-width="0.55" opacity="0.7"/>
        <path d="M 122 130 C 155 124, 190 124, 222 128" stroke-width="0.55" opacity="0.7"/>
        <path d="M 122 132 C 155 130, 190 130, 222 132" stroke-width="0.45" opacity="0.55"/>
        <ellipse cx="220" cy="124" rx="5" ry="2" stroke="#fffaf2" stroke-width="1.1"/>
      </g>
      <g class="dfly-wing dfly-wing--back-l">
        <path d="M 121 138 C 88 152, 50 156, 22 148 C 14 145, 14 155, 24 160 C 56 168, 92 162, 122 142 Z" stroke-width="1.4"/>
        <path d="M 121 138 C 90 150, 56 152, 28 148" stroke-width="0.55" opacity="0.7"/>
        <path d="M 122 142 C 90 156, 56 158, 28 156" stroke-width="0.45" opacity="0.55"/>
        <ellipse cx="26" cy="152" rx="4" ry="1.7" stroke="#fffaf2" stroke-width="1"/>
      </g>
      <g class="dfly-wing dfly-wing--back-r">
        <path d="M 119 138 C 152 152, 190 156, 218 148 C 226 145, 226 155, 216 160 C 184 168, 148 162, 118 142 Z" stroke-width="1.4"/>
        <path d="M 119 138 C 150 150, 184 152, 212 148" stroke-width="0.55" opacity="0.7"/>
        <path d="M 118 142 C 150 156, 184 158, 212 156" stroke-width="0.45" opacity="0.55"/>
        <ellipse cx="214" cy="152" rx="4" ry="1.7" stroke="#fffaf2" stroke-width="1"/>
      </g>
    </g>
    <g class="dfly-body" stroke="#fffaf2" stroke-linecap="round" fill="none">
      <line x1="120" y1="148" x2="120" y2="290" stroke-width="3"/>
      <line x1="115.5" y1="166" x2="124.5" y2="166" stroke-width="0.9" opacity="0.85"/>
      <line x1="115.5" y1="184" x2="124.5" y2="184" stroke-width="0.9" opacity="0.85"/>
      <line x1="115.5" y1="202" x2="124.5" y2="202" stroke-width="0.9" opacity="0.85"/>
      <line x1="115.5" y1="220" x2="124.5" y2="220" stroke-width="0.9" opacity="0.85"/>
      <line x1="115.5" y1="238" x2="124.5" y2="238" stroke-width="0.9" opacity="0.85"/>
      <line x1="115.5" y1="256" x2="124.5" y2="256" stroke-width="0.9" opacity="0.85"/>
      <line x1="115.5" y1="274" x2="124.5" y2="274" stroke-width="0.9" opacity="0.85"/>
      <path d="M 120 290 L 116 300 M 120 290 L 124 300" stroke-width="1.4"/>
      <ellipse cx="120" cy="138" rx="7" ry="11" stroke-width="1.6"/>
      <circle cx="120" cy="116" r="9" stroke-width="1.6"/>
      <ellipse cx="115" cy="113" rx="3.5" ry="4.5" stroke-width="1"/>
      <ellipse cx="125" cy="113" rx="3.5" ry="4.5" stroke-width="1"/>
      <path d="M 116 108 L 113 100" stroke-width="1"/>
      <path d="M 124 108 L 127 100" stroke-width="1"/>
    </g>
  </svg>
`;

function useDragonflyEgg(dotRef) {
  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    let armed = false;
    let dflyEl = null;
    const timers = [];

    const startEgg = () => {
      if (armed) return;
      armed = true;

      timers.push(
        setTimeout(() => {
          const rect = dot.getBoundingClientRect();
          const startX = rect.left + rect.width / 2;
          const startY = rect.top + rect.height / 2;

          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const path = [
            { x: startX, y: startY, t: 0 },
            { x: startX - 40, y: startY - 60, t: 900 },
            { x: vw * 0.65, y: vh * 0.35, t: 2400 },
            { x: vw * 0.3, y: vh * 0.2, t: 4200 },
            { x: vw * 0.5, y: vh * 0.55, t: 5850 },
            { x: vw * 0.85, y: vh * 0.3, t: 7800 },
            { x: vw * 0.5, y: vh * 0.15, t: 9450 },
            { x: vw + 120, y: vh * 0.05, t: 11400 },
          ];

          dot.classList.add('big-thanks__dot--hidden');

          dflyEl = document.createElement('div');
          dflyEl.className = 'dragonfly dragonfly--hatch';
          dflyEl.setAttribute('aria-hidden', 'true');
          dflyEl.innerHTML = DRAGONFLY_SVG;
          dflyEl.style.transform = `translate(${path[0].x}px, ${path[0].y}px) rotate(0deg)`;
          document.body.appendChild(dflyEl);

          timers.push(
            setTimeout(() => {
              if (dflyEl) dflyEl.classList.remove('dragonfly--hatch');
              const startTime = performance.now();
              const tween = (now) => {
                if (!dflyEl) return;
                const T = now - startTime;
                let i = 0;
                while (i < path.length - 1 && path[i + 1].t < T) i++;
                if (i >= path.length - 1) {
                  const last = path[path.length - 1];
                  dflyEl.style.transform = `translate(${last.x}px, ${last.y}px) rotate(0deg)`;
                  return;
                }
                const a = path[i];
                const b = path[i + 1];
                const k = Math.max(0, Math.min(1, (T - a.t) / (b.t - a.t)));
                const ke = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
                const x = a.x + (b.x - a.x) * ke;
                const y = a.y + (b.y - a.y) * ke;
                const wobX = Math.sin(T / 90) * 12;
                const wobY = Math.cos(T / 130) * 8;
                const dx = b.x - a.x;
                const dy = b.y - a.y;
                const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
                dflyEl.style.transform =
                  `translate(${x + wobX}px, ${y + wobY}px) rotate(${angle + 90}deg)`;
                requestAnimationFrame(tween);
              };
              requestAnimationFrame(tween);
            }, 520),
          );

          timers.push(
            setTimeout(() => {
              if (dflyEl && dflyEl.parentNode) dflyEl.parentNode.removeChild(dflyEl);
              dflyEl = null;
            }, 11700),
          );
        }, 800),
      );
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) startEgg();
        });
      },
      { threshold: 0.6 },
    );
    obs.observe(dot);

    return () => {
      obs.disconnect();
      timers.forEach((t) => clearTimeout(t));
      if (dflyEl && dflyEl.parentNode) dflyEl.parentNode.removeChild(dflyEl);
    };
  }, [dotRef]);
}

const THANKS = [
  { n: 'Администрация Богданихского сельского поселения', note: 'За поддержку инициатив и решимость говорить «да».' },
  { n: 'Команда БФ «Ива»', note: 'За грантовую программу и методическую помощь.' },
  { n: 'Управляющая компания «МР Сервис»', note: 'За содержание территории и суздальский чернозём.' },
  { n: 'Эггер', note: 'За мульчу и инструменты.' },
  { n: 'Компания 21 Век', note: 'За надёжность в деле и долгосрочное качество игрового оборудования.' },
  { n: 'Все вы — наши соседи', note: 'Каждый субботник, каждая банка краски, каждое «я помогу».' },
];

export default function Thanks() {
  const dotRef = useRef(null);
  useDragonflyEgg(dotRef);

  return (
    <section id="thanks" className="section section--thanks" data-screen-label="06 Благодарности">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="num">— 06 —</div>
            <h2>Спасибо</h2>
          </div>
          <p className="lede">
            Всё, что сделано, — сделано общими силами. Перечисляем тех, без кого «Берег Детства»
            остался бы черновиком.
          </p>
        </div>

        <div className="thanks-list">
          {THANKS.map((t, i) => (
            <div key={i} className="thanks-row">
              <div className="thanks-row__num serif">{String(i + 1).padStart(2, '0')}</div>
              <div className="thanks-row__name serif">{t.n}</div>
              <div className="thanks-row__note">{t.note}</div>
            </div>
          ))}
        </div>

        <div className="big-thanks serif">
          СПАСИБО<span className="big-thanks__dot" ref={dotRef} />
        </div>
      </div>

      <footer className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <div className="nav__brand-mark" style={{ width: 48, height: 48, fontSize: 22 }}>
              Б
            </div>
            <div>
              <div className="serif footer__title">Берег Детства</div>
              <div className="mono footer__sub">ТОС «Новая Дерябиха» · Ивановская область</div>
            </div>
          </div>
          <div className="footer__col">
            <div className="mono footer__label">Адрес</div>
            <div>д. Дерябиха</div>
            <div>Ивановская область</div>
          </div>
          <div className="footer__col">
            <div className="mono footer__label">Связь</div>
            <div>
              <a href="https://новаядерябиха.рф">новаядерябиха.рф</a>
            </div>
            <div>
              <a href="mailto:newderyabiha@gmail.com">newderyabiha@gmail.com</a>
            </div>
          </div>
          <div className="footer__col">
            <div className="mono footer__label">Проект</div>
            <div>берегдетства.рф</div>
            <div className="footer__year mono">© 2019–2026</div>
          </div>
        </div>
      </footer>
    </section>
  );
}
