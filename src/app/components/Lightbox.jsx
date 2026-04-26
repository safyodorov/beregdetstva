'use client';

import { useEffect, useRef } from 'react';

export default function Lightbox({ photos, index, onClose, onPrev, onNext, onSelect }) {
  const stripRef = useRef(null);

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
        {index + 1} / {photos.length}
      </div>
      <div className="lightbox__stage" onClick={(e) => e.stopPropagation()}>
        <img src={photos[index]} alt="" className="lightbox__img" />
      </div>
      <div
        className="lightbox__strip"
        ref={stripRef}
        onClick={(e) => e.stopPropagation()}
      >
        {photos.map((p, i) => (
          <button
            key={i}
            type="button"
            className={`lightbox__thumb ${i === index ? 'is-active' : ''}`}
            onClick={() => onSelect(i)}
            aria-label={`Кадр ${i + 1}`}
          >
            <img src={p} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
