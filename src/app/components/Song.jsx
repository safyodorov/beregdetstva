'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BEREG_DETSTVA_LRC } from './songLyrics';

const SRC = '/audio/bereg-detstva.mp3';
const COVER = '/audio/bereg-detstva-cover.jpg';
const DURATION = 258; // с — пока не загрузились метаданные
const LEAD = 0.3; // строка подсвечивается чуть раньше пения — как на песнидерябихи.рф
const ALBUM_URL = 'https://песнидерябихи.рф';

const parseLrc = (lrc) =>
  lrc.split('\n').flatMap((row) => {
    const m = row.match(/^\[(\d+):(\d+(?:\.\d+)?)\](.*)$/);
    return m ? [{ t: Number(m[1]) * 60 + Number(m[2]), text: m[3].trim() }] : [];
  });

const LINES = parseLrc(BEREG_DETSTVA_LRC);

const lineAt = (time) => {
  let idx = 0;
  for (let i = 0; i < LINES.length; i++) {
    if (LINES[i].t <= time + LEAD) idx = i;
    else break;
  }
  return idx;
};

const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export default function Song() {
  const audioRef = useRef(null);
  const boxRef = useRef(null);
  const listRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(DURATION);
  const [expanded, setExpanded] = useState(false);
  const [center, setCenter] = useState(0);
  const [fullHeight, setFullHeight] = useState(null);

  const idx = lineAt(time);

  // Время во время игры — по кадрам, но состояние меняем не чаще 10 раз в секунду
  useEffect(() => {
    if (!playing) return undefined;
    let raf;
    const tick = () => {
      const t = audioRef.current?.currentTime ?? 0;
      setTime((prev) => (Math.abs(prev - t) >= 0.1 ? t : prev));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  // Одновременно играет что-то одно: любое видео на странице ставит песню на паузу
  useEffect(() => {
    const onPlay = (e) => {
      if (e.target !== audioRef.current) audioRef.current?.pause();
    };
    document.addEventListener('play', onPlay, true);
    return () => document.removeEventListener('play', onPlay, true);
  }, []);

  // Караоке: активная строка — по центру окна. Высоту окна берём из CSS (--win), а не из
  // clientHeight: после сворачивания текста окно ещё анимируется и clientHeight врёт
  useLayoutEffect(() => {
    const el = listRef.current?.children[idx];
    if (el) setCenter(el.offsetTop + el.offsetHeight / 2);
  }, [idx, expanded]);

  // Высота развёрнутого текста — для плавного раскрытия. Меряем сразу после смены режима
  // (до отрисовки: в развёрнутом виде другой шрифт и колонки) и при изменении ширины
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;
    const measure = () => setFullHeight(list.scrollHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, [expanded]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (!a.paused) {
      a.pause();
      return;
    }
    document.querySelectorAll('video, audio').forEach((m) => m !== a && m.pause());
    if ('mediaSession' in navigator && window.MediaMetadata) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: 'Берег Детства',
        artist: 'Песни Дерябихи',
        album: 'Песни Дерябихи',
        artwork: [{ src: COVER, sizes: '512x512', type: 'image/jpeg' }],
      });
    }
    a.play().catch(() => {});
    setStarted(true);
  };

  const seek = (e) => {
    const t = Number(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = t;
    setTime(t);
    setStarted(true);
  };

  const toggleLyrics = () => {
    // После сворачивания длинного текста страница не должна «уехать» дальше песни
    if (expanded && boxRef.current && boxRef.current.getBoundingClientRect().top < 0) {
      document.getElementById('song')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setExpanded((x) => !x);
  };

  return (
    <section id="song" className="section section--song" data-screen-label="Песня">
      <div className="container">
        <div className={`song ${playing ? 'is-playing' : ''}`}>
          <div className="song__info">
            <div className="song__kicker mono">— ♪ — Песни Дерябихи · трек 08</div>
            <h2 className="song__title serif">Берег Детства</h2>
            <p className="song__lede">Песня о нашем пустыре — от борщевика до стрекозы.</p>

            <div className="song__deck">
              {/* Пластинка — она же кнопка: этикетка с надписью крутится, значок в центре — нет */}
              <button
                type="button"
                className="song__disc"
                onClick={toggle}
                aria-label={playing ? 'Пауза' : 'Слушать песню «Берег Детства»'}
              >
                <svg className="song__vinyl" viewBox="-100 -100 200 200" aria-hidden="true">
                  <circle r="99" className="song__vinyl-body" />
                  {[92, 86, 80, 74, 68, 62, 56, 50].map((r) => (
                    <circle key={r} r={r} className="song__vinyl-groove" />
                  ))}
                  <circle r="42" className="song__vinyl-label" />
                  <path id="song-ring" d="M0,-33 a33,33 0 1,1 0,66 a33,33 0 1,1 0,-66" fill="none" />
                  <text className="song__vinyl-ring">
                    {/* textLength = длина окружности r=33, чтобы надпись замкнулась ровно в кольцо */}
                    <textPath href="#song-ring" textLength="205" lengthAdjust="spacing">
                      {'БЕРЕГ ДЕТСТВА · ПЕСНИ ДЕРЯБИХИ · '}
                    </textPath>
                  </text>
                </svg>
                <span className="song__icon" aria-hidden="true">
                  {playing ? (
                    <svg viewBox="0 0 24 24">
                      <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </span>
              </button>

              <div className="song__controls">
                <div className="song__progress">
                  <input
                    type="range"
                    min={0}
                    max={duration}
                    step={0.1}
                    value={Math.min(time, duration)}
                    onChange={seek}
                    aria-label="Перемотка"
                    style={{ '--p': `${(Math.min(time, duration) / duration) * 100}%` }}
                  />
                  <div className="song__time mono">
                    {fmt(time)} / {fmt(duration)}
                  </div>
                </div>
                <a className="song__album mono" href={ALBUM_URL} target="_blank" rel="noopener">
                  Весь альбом — песнидерябихи.рф ↗
                </a>
              </div>
            </div>
          </div>

          <div className="song__text">
            <div
              ref={boxRef}
              className={`song__lyrics ${expanded ? 'is-expanded' : ''} ${started ? '' : 'is-idle'}`}
              style={expanded && fullHeight ? { height: fullHeight } : undefined}
              role="button"
              tabIndex={0}
              aria-expanded={expanded}
              aria-label={expanded ? 'Свернуть текст песни' : 'Развернуть текст песни'}
              onClick={toggleLyrics}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleLyrics();
                }
              }}
            >
              <div
                ref={listRef}
                className="song__lines"
                style={{
                  transform: expanded ? 'none' : `translateY(calc(var(--win) / 2 - ${center}px))`,
                }}
              >
                {LINES.map((l, i) => (
                  <div
                    key={i}
                    className={[
                      'song__line',
                      l.text ? '' : 'song__line--gap',
                      started && i === idx ? 'is-active' : '',
                      started && i < idx ? 'is-past' : '',
                    ].join(' ')}
                  >
                    {l.text || '♪'}
                  </div>
                ))}
              </div>
            </div>
            <button type="button" className="song__toggle mono" onClick={toggleLyrics}>
              {expanded ? 'Свернуть текст ↑' : 'Весь текст песни ↓'}
            </button>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={SRC}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || DURATION)}
      />
    </section>
  );
}
