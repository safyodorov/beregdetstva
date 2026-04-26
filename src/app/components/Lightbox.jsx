'use client';

import { useEffect, useRef } from 'react';

const isVideo = (src) => /\.(mp4|webm|mov|m4v)(\?|$)/i.test(src);

// Item can be a string URL or { src, poster, type }
const itemSrc = (it) => (typeof it === 'string' ? it : it.src);
const itemPoster = (it) => (typeof it === 'string' ? null : it.poster);

export default function Lightbox({ photos, index, onClose, onPrev, onNext, onSelect, caption }) {
  const stripRef = useRef(null);
  const touchStart = useRef(null);

  const onTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx > 0) onPrev();
      else onNext();
    }
  };

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

  useEffect(() => {
    const el = stripRef.current?.children[index];
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [index]);

  const current = photos[index];
  const currentSrc = itemSrc(current);
  const currentPoster = itemPoster(current);
  const currentIsVideo = isVideo(currentSrc);

  return (
    <div role="dialog" aria-modal="true" onClick={onClose} className="lightbox">
      <button
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
        className="lightbox__btn lightbox__btn--close"
      >
        ✕
      </button>
      <button
        type="button"
        aria-label="Предыдущее"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="lightbox__btn lightbox__btn--prev"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Следующее"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="lightbox__btn lightbox__btn--next"
      >
        ›
      </button>
      <div className="lightbox__counter mono">
        {caption ? <span className="lightbox__caption">{caption}</span> : null}
        <span>
          {index + 1} / {photos.length}
        </span>
      </div>
      <div
        className="lightbox__stage"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {currentIsVideo ? (
          <video
            key={currentSrc}
            src={currentSrc}
            poster={currentPoster || undefined}
            controls
            autoPlay
            playsInline
            className="lightbox__video"
          />
        ) : (
          <img src={currentSrc} alt="" className="lightbox__img" />
        )}
      </div>
      <div
        className="lightbox__strip"
        ref={stripRef}
        onClick={(e) => e.stopPropagation()}
      >
        {photos.map((p, i) => {
          const src = itemSrc(p);
          const poster = itemPoster(p);
          const v = isVideo(src);
          return (
            <button
              key={i}
              type="button"
              className={`lightbox__thumb ${i === index ? 'is-active' : ''} ${v ? 'lightbox__thumb--video' : ''}`}
              onClick={() => onSelect(i)}
              aria-label={`Кадр ${i + 1}`}
            >
              <img src={poster || src} alt="" loading="lazy" />
              {v && <span className="lightbox__thumb-play">▶</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
