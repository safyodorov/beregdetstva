'use client';

import { useEffect, useRef, useState } from 'react';

const CHAPTERS = [
  {
    n: '1.1',
    t: 'Пустырь',
    body:
      'Когда-то здесь были заросли борщевика, старые стройматериалы и тропинки, проложенные детьми в высокой траве. Никто не ждал, что это место станет чем-то большим.',
    photo: '/photos/pustyr/1.jpg',
    accent: '#7a1f1f',
    gallery: [
      '/photos/pustyr/1.jpg',
      '/photos/pustyr/2.jpg',
      '/photos/pustyr/3.jpg',
      '/photos/pustyr/4.jpg',
      '/photos/pustyr/5.jpg',
      '/photos/pustyr/6.jpg',
    ],
  },
  {
    n: '1.2',
    t: 'Кадастровые сложности',
    body: [
      'Основная проблема, связанная с этим участком, — расположение пустыря на территории г. Иваново, из-за этого администрация Ивановского района не могла напрямую участвовать в формировании комфортной среды для жителей Дерябихи на этой земле.',
      'Многочисленные официальные запросы и обращения ТОСа ни к чему не приводили, мы как-будто упёрлись в стену.',
    ],
    photo: '/photos/kadastr/1.jpg',
    accent: '#6b5ca3',
    gallery: ['/photos/kadastr/1.jpg', '/photos/kadastr/2.jpg'],
  },
  {
    n: '1.3',
    t: 'Промо-ролик',
    body:
      'В 2020 году, отчаявшись добиться разрешения на строительство детской площадки на этом пустыре, дети с помощью родителей сняли этот видеоролик с обращением к чиновникам. Видео имело огромный резонанс, и после публикации лёд тронулся.',
    photo: '/photos/promo-poster.jpg',
    accent: '#385c3e',
    video: true,
    videoSrc: '/videos/promo.mp4',
    videoPoster: '/photos/promo-poster.jpg',
    duration: '1:47',
  },
  {
    n: '1.4',
    t: 'Публичные слушания',
    body: [
      'В начале 2021 года представители ТОСа были приглашены в администрацию г. Иваново на расширенную комиссию по решению нашего вопроса. Совместными усилиями удалось выработать план выделения и передачи земельного участка. Отдельной благодарности заслуживает активная позиция начальника департамента архитектуры и градостроительства администрации г. Иваново — Юлии Алексеевны Косоруковой.',
      'Весной 2021 года были проведены работы по межеванию земельного участка, которые полностью профинансировала управляющая компания «МР Сервис».',
      'Летом 2021 года прошли публичные слушания, по результатам которых земельный участок официально переходит в разряд участков под размещение детской площадки.',
    ],
    photo: '/photos/public-hearings.jpg',
    accent: '#7a1f1f',
  },
  {
    n: '1.5',
    t: 'Общественное обсуждение',
    body:
      'Когда стало понятно, что детской площадке быть, ТОС провёл внеочередной Совет микрорайона прямо на месте, где вместе с жителями обсудили концепцию, план и очередность реализации проекта.',
    photo: '/photos/sovet/1.jpg',
    accent: '#5a8862',
    gallery: [
      '/photos/sovet/1.jpg',
      '/photos/sovet/2.jpg',
      '/photos/sovet/3.jpg',
      '/photos/sovet/4.jpg',
      '/photos/sovet/5.jpg',
      '/photos/sovet/6.jpg',
    ],
  },
  {
    n: '1.6',
    t: 'Первый шаг',
    body:
      'Песок, доски, качели. Самое простое оборудование, поставленное руками соседей за один субботний день. Этот день и стал началом.',
    photo: '/photos/playground-summer.jpg',
    accent: '#c24a4a',
  },
  {
    n: '1.7',
    t: 'Местные инициативы',
    body:
      'ТОС вступил в муниципальные и региональные программы. Так появились деньги на большее — и ответственность делать хорошо.',
    photo: '/photos/lupines-sunset.jpg',
    accent: '#6b5ca3',
  },
  {
    n: '1.8',
    t: 'Ландшафтный дизайн',
    body:
      'Привлекли профессиональных ландшафтных дизайнеров. Пузыреплодник, клёны, спирея, люпины — у каждого растения своё место и свой сезон.',
    photo: '/photos/spirea-pink.jpg',
    accent: '#385c3e',
  },
  {
    n: '1.9',
    t: 'Освещение',
    body:
      'В 2025 году с помощью администрации Богданихского сельского поселения и лично Сергея Васильевича Машина удалось решить вопрос с освещением детской площадки. Теперь тут светло и безопасно в любое время дня и ночи.',
    photo: '/photos/osveshchenie/1.jpg',
    accent: '#c9a77b',
    gallery: [
      '/photos/osveshchenie/1.jpg',
      '/photos/osveshchenie/2.jpg',
      '/photos/osveshchenie/3.jpg',
      '/photos/osveshchenie/4.jpg',
      '/photos/osveshchenie/5.jpg',
      '/photos/osveshchenie/6.jpg',
      '/photos/osveshchenie/7.jpg',
      '/photos/osveshchenie/8.jpg',
      '/photos/osveshchenie/9.jpg',
    ],
  },
  {
    n: '1.10',
    t: 'Взгляд в будущее',
    body:
      'Каток зимой, ролики и самокаты летом, ягодные острова, зелёная лагуна. Пятый этап — открытый вопрос, который мы задаём соседям.',
    photo: '/photos/playground-sunset.jpg',
    accent: '#7a1f1f',
  },
];

function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(10, 5, 6, 0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(20px, 4vw, 60px)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <button
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
        style={lbBtnStyle({ top: 20, right: 20 })}
      >
        ✕
      </button>
      <button
        type="button"
        aria-label="Предыдущее фото"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        style={lbBtnStyle({ top: '50%', left: 20, transform: 'translateY(-50%)' })}
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Следующее фото"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        style={lbBtnStyle({ top: '50%', right: 20, transform: 'translateY(-50%)' })}
      >
        ›
      </button>
      <img
        src={photos[index]}
        alt=""
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
          borderRadius: 6,
        }}
      />
      <div
        className="mono"
        style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#fff5e8',
          fontSize: 11,
          letterSpacing: '0.18em',
          opacity: 0.75,
        }}
      >
        {index + 1} / {photos.length}
      </div>
    </div>
  );
}

function lbBtnStyle(pos) {
  return {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: '50%',
    border: '1px solid rgba(255,245,232,0.3)',
    background: 'rgba(20,8,6,0.5)',
    color: '#fff5e8',
    fontSize: 22,
    cursor: 'pointer',
    display: 'grid',
    placeItems: 'center',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    ...pos,
  };
}

function HistoryChapter({ ch, idx }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [lbIdx, setLbIdx] = useState(-1);
  const [rotIdx, setRotIdx] = useState(0);
  const hasGallery = Array.isArray(ch.gallery) && ch.gallery.length > 0;

  useEffect(() => {
    if (!hasGallery || ch.gallery.length < 2 || lbIdx >= 0) return;
    const id = setInterval(() => {
      setRotIdx((i) => (i + 1) % ch.gallery.length);
    }, 3000);
    return () => clearInterval(id);
  }, [hasGallery, ch.gallery, lbIdx]);

  useEffect(() => {
    const handler = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = 1 - (r.top + r.height * 0.3) / vh;
      setProgress(Math.max(0, Math.min(1, raw)));
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const reversed = idx % 2 === 1;

  return (
    <article
      ref={ref}
      className={`chapter ${reversed ? 'chapter--reversed' : ''}`}
      style={{ '--accent-chapter': ch.accent }}
    >
      <div className="chapter__photo-wrap">
        <div
          className="chapter__photo"
          onClick={hasGallery ? () => setLbIdx(rotIdx) : undefined}
          style={{
            transform: `translate3d(0, ${(1 - progress) * 40 - 20}px, 0)`,
            cursor: hasGallery ? 'zoom-in' : undefined,
          }}
        >
          {playing && ch.videoSrc ? (
            <video
              src={ch.videoSrc}
              poster={ch.videoPoster}
              controls
              autoPlay
              playsInline
              preload="metadata"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : hasGallery ? (
            ch.gallery.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                loading={i === 0 ? 'eager' : 'lazy'}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: i === rotIdx ? 1 : 0,
                  transition: 'opacity 1800ms ease',
                }}
              />
            ))
          ) : (
            <img src={ch.photo} alt={ch.t} loading="lazy" />
          )}
        </div>
        {hasGallery && (
          <div
            className="mono"
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              background: 'rgba(20,8,6,0.72)',
              color: '#fff5e8',
              padding: '6px 10px',
              borderRadius: 999,
              fontSize: 10,
              letterSpacing: '0.18em',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              pointerEvents: 'none',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4 6h16v12H4zm2 2v8h12V8zm3 2l2 2 3-3 4 4v2H8z" />
            </svg>
            {ch.gallery.length} фото
          </div>
        )}
        {ch.video && !playing && (
          <>
            <div className="chapter__video-overlay">
              <button
                type="button"
                className="chapter__video-play"
                aria-label="Проиграть видео"
                onClick={() => ch.videoSrc && setPlaying(true)}
                style={{ border: 0, padding: 0 }}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 5v14l12-7z" />
                </svg>
              </button>
            </div>
            <div className="chapter__video-badge mono">ВИДЕО</div>
            <div className="chapter__video-duration mono">{ch.duration}</div>
          </>
        )}
        <div className="chapter__photo-tag mono" style={{ opacity: progress }}>
          глава {ch.n}
        </div>
      </div>

      <div className="chapter__text">
        <div className="chapter__num serif">{ch.n}</div>
        <h3 className="chapter__title serif">{ch.t}</h3>
        {Array.isArray(ch.body) ? (
          ch.body.map((p, i) => (
            <p key={i} className="chapter__body">
              {p}
            </p>
          ))
        ) : (
          <p className="chapter__body">{ch.body}</p>
        )}
        <div className="chapter__line" style={{ transform: `scaleX(${progress})` }} />
      </div>
      {hasGallery && lbIdx >= 0 && (
        <Lightbox
          photos={ch.gallery}
          index={lbIdx}
          onClose={() => setLbIdx(-1)}
          onPrev={() => setLbIdx((i) => (i - 1 + ch.gallery.length) % ch.gallery.length)}
          onNext={() => setLbIdx((i) => (i + 1) % ch.gallery.length)}
        />
      )}
    </article>
  );
}

export default function History() {
  return (
    <section id="history" className="section section--history" data-screen-label="01 История">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="num">— 01 —</div>
            <h2>История</h2>
          </div>
          <p className="lede">
            Десять коротких глав про то, как пустырь за окном превращался в «Берег Детства». Не
            планировалось ничего. Просто однажды соседи начали действовать.
          </p>
        </div>

        <div className="chapters">
          {CHAPTERS.map((ch, i) => (
            <HistoryChapter key={ch.n} ch={ch} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
