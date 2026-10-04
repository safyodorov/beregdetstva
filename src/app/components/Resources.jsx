'use client';

import { useState } from 'react';
import Lightbox from './Lightbox';

// ?v=N — версия файла. Видео идут кусками (Range), поэтому при перекодировании по тому же
// пути версию надо поднять, иначе браузер склеит закешированные куски старого файла с новым.
// reelRow(year, dir, count, title, tag, versions?) — versions: { номер ролика: версия }
const reelRow = (year, dir, count, title, tag, versions = {}) => ({
  year,
  title,
  tag,
  items: Array.from({ length: count }, (_, i) => ({
    src: `${dir}/${i + 1}.mp4${versions[i + 1] ? `?v=${versions[i + 1]}` : ''}`,
    poster: `${dir}/${i + 1}-poster.jpg`,
  })),
});

const REEL_ROWS = [
  reelRow('2025', '/photos/resources/reels', 8, 'Промо-ролики · ВКонтакте', 'VK · Reel', { 3: 2 }),
  reelRow('2026', '/photos/resources/reels/2026', 6, 'Ролики сборов', null),
];

// [номер файла, ширина / высота] — пропорции нужны, чтобы собрать ровные ряды без обрезки
const SUBBOTNIK_PHOTOS = [
  [1, 3 / 2],
  [2, 3 / 2],
  [3, 3 / 2],
  [4, 3 / 2],
  [5, 3 / 4],
  [6, 4 / 3],
  [7, 3 / 4],
].map(([n, ar]) => ({ src: `/photos/resources/subbotniki/${n}.jpg`, ar }));

const pluralReels = (n) => {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return `${n} ролик`;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return `${n} ролика`;
  return `${n} роликов`;
};

const RESOURCES = [
  {
    n: '01',
    kicker: 'Гранты · программа',
    title: 'Местные инициативы',
    body:
      'ТОС «Новая Дерябиха» — победитель программы 2024, 2025 и 2026 годов. Именно по этой программе на площадке устанавливается всё игровое и парковое оборудование.',
    badge: { value: '3', label: 'победы подряд' },
    accent: '#7a1f1f',
    years: [
      { y: '2024', mark: 'победа' },
      { y: '2025', mark: 'победа' },
      { y: '2026', mark: 'победа' },
    ],
    media: {
      kind: 'video',
      src: '/photos/resources/local-initiatives.mp4?v=2',
      poster: '/photos/resources/local-initiatives-poster.jpg',
      caption: 'Сюжет регионального ТВ',
    },
    extraMedia: {
      kind: 'video',
      wide: true,
      src: '/photos/resources/local-initiatives-2026.mp4',
      poster: '/photos/resources/local-initiatives-2026-poster.jpg',
      caption: 'Сюжет на ТВ · 2026',
    },
  },
  {
    n: '02',
    kicker: 'Гранты · экологическая программа',
    title: 'Цветущий город',
    body:
      'Победа в 2024, 2025 и 2026 годах. По программе ТОС получает посадочный материал, помощь в составлении проекта и мастер-классы по посадке от профессиональных ландшафтных дизайнеров.',
    badge: { value: '343', label: 'растения' },
    accent: '#385c3e',
    years: [
      { y: '2024', mark: 'победа' },
      { y: '2025', mark: 'победа' },
      { y: '2026', mark: 'победа' },
    ],
    media: {
      kind: 'photo',
      src: '/photos/resources/cvetushij-gorod.jpg',
      caption: 'Цветущий город',
    },
    extraMedia: {
      kind: 'video',
      src: '/photos/resources/cvetushij-gorod.mp4',
      poster: '/photos/resources/cvetushij-gorod-poster.jpg',
      caption: 'Сюжет ТВ о программе',
    },
  },
  {
    n: '03',
    kicker: 'Жители и предприниматели',
    title: 'Софинансирование',
    body:
      'За три года жители и местный бизнес собрали более 300 000 рублей. Софинансирование — обязательное условие грантовых программ и база для проведения субботников.',
    badge: { value: '300 000+ ₽', label: 'за три года' },
    accent: '#c24a4a',
    reels: REEL_ROWS,
    media: {
      kind: 'video',
      src: '/photos/resources/sofinansirovanie.mp4?v=2',
      poster: '/photos/resources/sofinansirovanie-poster.jpg',
      caption: 'Промо-ролик в поддержку проекта',
    },
  },
  {
    n: '04',
    kicker: 'Администрация поселения',
    title: 'Богданихское сельское поселение',
    body:
      'Ресурсная поддержка администрации — решение организационных и технических вопросов, помощь в подготовке основания и планировке территории. Настоящий речной песок, по которому босиком бегают наши дети — заслуга сельской администрации.',
    accent: '#5e3a2a',
    person: {
      name: 'Сергей Васильевич Машин',
      role: 'Глава Богданихского сельского поселения',
      photo: '/photos/resources/mashin.jpg',
    },
  },
  {
    n: '05',
    kicker: 'Жители · трудовое участие',
    title: 'Субботники',
    body:
      'Трудовое участие жителей — основа проекта и самое ценное, что у нас есть. Именно оно позволяет нам двигаться вперёд и вдохновляет на новые подвиги.',
    accent: '#5a8862',
    media: {
      kind: 'video',
      vertical: true,
      src: '/photos/resources/subbotniki.mp4',
      poster: '/photos/resources/subbotniki-poster.jpg',
      caption: 'Видео с субботника',
    },
    photos: SUBBOTNIK_PHOTOS,
  },
  {
    n: '06',
    kicker: 'Связующее звено',
    title: 'Команда ТОС «Новая Дерябиха»',
    body:
      'Девять человек в проектной команде и больше ста неравнодушных соседей, которые объединили все эти элементы и сделали невозможное возможным. Об этой команде — следующий раздел.',
    badge: { value: '9 + 100', label: 'соседей' },
    accent: '#7a1f1f',
    isBridge: true,
  },
];

function ResourceMediaPhoto({ src, caption, accent }) {
  return (
    <div className="rmedia rmedia--photo" style={{ '--rmedia-accent': accent }}>
      <div className="rmedia__frame rmedia__frame--photo-real">
        <img src={src} alt={caption} loading="lazy" className="rmedia__photo" />
      </div>
      {caption && <div className="rmedia__caption mono">{caption}</div>}
    </div>
  );
}

function ResourceMediaVideo({ src, poster, caption, accent, vertical }) {
  return (
    <div
      className={`rmedia rmedia--video ${vertical ? 'rmedia--vertical' : ''}`}
      style={{ '--rmedia-accent': accent }}
    >
      <div className="rmedia__frame rmedia__frame--video">
        <video
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          className="rmedia__player"
        />
      </div>
      {caption && <div className="rmedia__caption mono">{caption}</div>}
    </div>
  );
}

function ResourceMediaTV({ caption, duration, accent }) {
  return (
    <div className="rmedia rmedia--tv" style={{ '--rmedia-accent': accent }}>
      <div className="rmedia__frame">
        <div className="rmedia__chrome">
          <span className="rmedia__chrome-dot" />
          <span className="rmedia__chrome-dot" />
          <span className="rmedia__chrome-dot" />
          <span className="rmedia__chrome-text mono">телевизионный сюжет</span>
        </div>
        <div className="rmedia__body rmedia__body--tv">
          <div className="rmedia__static" />
          <div className="rmedia__bars" aria-hidden="true">
            {Array.from({ length: 7 }).map((_, i) => (
              <span
                key={i}
                style={{
                  background: ['#c24a4a', '#e8a13a', '#385c3e', '#3b6e9c', '#7a1f1f', '#a85a45', '#5a8862'][i],
                }}
              />
            ))}
          </div>
          <div className="rmedia__play" role="button" aria-label="Проиграть">
            <svg viewBox="0 0 24 24">
              <path d="M7 5v14l12-7z" />
            </svg>
          </div>
          <div className="rmedia__live mono">● LIVE / ЭФИР</div>
          <div className="rmedia__duration mono">{duration}</div>
        </div>
      </div>
      <div className="rmedia__caption mono">{caption}</div>
    </div>
  );
}

function ResourceMediaCeremony({ caption, accent }) {
  return (
    <div className="rmedia rmedia--ceremony" style={{ '--rmedia-accent': accent }}>
      <div className="rmedia__frame rmedia__frame--photo">
        <div className="rmedia__photo-ph">
          <svg viewBox="0 0 200 112" preserveAspectRatio="none" aria-hidden="true">
            <rect width="200" height="112" fill="#f0e3cf" />
            <rect y="80" width="200" height="32" fill="#d8c0a0" opacity="0.6" />
            <rect x="20" y="14" width="160" height="50" fill={accent} opacity="0.18" />
            <text
              x="100"
              y="42"
              fontSize="6"
              fill={accent}
              textAnchor="middle"
              fontFamily="monospace"
              letterSpacing="2"
            >
              ЦВЕТУЩИЙ ГОРОД · 2025
            </text>
            {[60, 100, 140].map((cx, i) => (
              <g key={i}>
                <circle cx={cx} cy="58" r="5" fill={accent} opacity="0.55" />
                <path
                  d={`M ${cx - 7} 80 L ${cx - 7} 64 L ${cx + 7} 64 L ${cx + 7} 80 Z`}
                  fill={accent}
                  opacity="0.45"
                />
              </g>
            ))}
            <rect x="92" y="62" width="16" height="11" fill="#fbf7f1" stroke={accent} strokeWidth="0.3" />
            <line x1="94" y1="65" x2="106" y2="65" stroke={accent} strokeWidth="0.3" />
            <line x1="94" y1="68" x2="106" y2="68" stroke={accent} strokeWidth="0.3" />
          </svg>
          <div className="rmedia__photo-stamp mono">фото будет здесь</div>
        </div>
      </div>
      <div className="rmedia__caption mono">{caption}</div>
    </div>
  );
}

function ResourceReels({ rows, accent, onOpenReels }) {
  return (
    <div className="rreels">
      {rows.map((row, r) => (
        <div key={row.year} className="rreels__row">
          <div className="rreels__header">
            <div className="rreels__title">
              <span className="rreels__year serif">{row.year}</span>
              <span className="mono">{row.title}</span>
            </div>
            <div className="rreels__count mono">{pluralReels(row.items.length)}</div>
          </div>
          <div className="rreels__track">
            {row.items.map((reel, i) => (
              <button
                key={i}
                type="button"
                className="rreel rreel--v"
                style={{ '--reel-accent': accent }}
                onClick={() => onOpenReels(r, i)}
                aria-label={`Открыть ролик ${i + 1} (${row.year})`}
              >
                <div className="rreel__inner">
                  <img src={reel.poster} alt="" className="rreel__poster" loading="lazy" />
                  <div className="rreel__veil" />
                  <div className="rreel__num serif">{String(i + 1).padStart(2, '0')}</div>
                  <div className="rreel__play">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 5v14l12-7z" />
                    </svg>
                  </div>
                  {row.tag && <div className="rreel__tag mono">{row.tag}</div>}
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Ряды для десктопа: добавляем фото в ряд, пока сумма пропорций приближается к целевой
// (4.5 — это ряд высотой ~250px на широком экране)
const toPhotoRows = (photos, target = 4.5) => {
  const rows = [[]];
  let sum = 0;
  photos.forEach((p) => {
    if (rows.at(-1).length && Math.abs(sum + p.ar - target) > Math.abs(sum - target)) {
      rows.push([]);
      sum = 0;
    }
    rows.at(-1).push(p);
    sum += p.ar;
  });
  return rows;
};

function ResourcePhotos({ photos, onOpen }) {
  return (
    <div className="rphotos">
      {toPhotoRows(photos).map((row, r) => (
        <div key={r} className="rphotos__row">
          {row.map((p) => {
            const i = photos.indexOf(p);
            return (
              <button
                key={p.src}
                type="button"
                className="rphoto"
                style={{ '--ar': p.ar }}
                onClick={() => onOpen(i)}
                aria-label={`Открыть фото ${i + 1}`}
              >
                <img src={p.src} alt="" loading="lazy" />
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function ResourcePerson({ person, accent }) {
  const initials = person.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 3);
  return (
    <div className="rperson" style={{ '--rperson-accent': accent }}>
      <div className="rperson__portrait">
        {person.photo ? (
          <img src={person.photo} alt={person.name} className="rperson__img" loading="lazy" />
        ) : (
          <>
            <div className="rperson__circle">
              <span className="rperson__init serif">{initials}</span>
            </div>
            <div className="rperson__tape mono">фото будет здесь</div>
          </>
        )}
      </div>
      <div className="rperson__meta">
        <div className="rperson__name serif">{person.name}</div>
        <div className="rperson__role mono">{person.role}</div>
        <div className="rperson__quote serif">
          <span className="rperson__qmark">«</span>
          Песок речной, настоящий — детям такой и нужен.
          <span className="rperson__qmark">»</span>
        </div>
      </div>
    </div>
  );
}

function ResourceCard({ r, idx, onOpenReels, onOpenPhotos }) {
  // Мостик к «Команде» свёрстан под левую раскладку — не чередуем его
  const isLeft = idx % 2 === 0 || r.isBridge;
  return (
    <article
      className={`rcard ${isLeft ? '' : 'rcard--right'} ${r.isBridge ? 'rcard--bridge' : ''}`}
      style={{ '--rcard-accent': r.accent }}
    >
      <div className="rcard__num serif">{r.n}</div>
      <div className="rcard__body">
        <div className="rcard__kicker mono">{r.kicker}</div>
        <h3 className="rcard__title serif">{r.title}</h3>
        {!r.isBridge && <p className="rcard__text">{r.body}</p>}

        {!r.isBridge && (r.badge || r.years) && (
          <div className="rcard__stats">
            {r.badge && (
              <div className="rcard__badge">
                <div className="rcard__badge-value serif">{r.badge.value}</div>
                <div className="rcard__badge-label mono">{r.badge.label}</div>
              </div>
            )}
            {r.years && (
              <div className="rcard__years">
                {r.years.map(({ y, mark }) => (
                  <div key={y} className="rcard__year">
                    <span className="rcard__year-num serif">{y}</span>
                    <span className="rcard__year-mark mono">{mark}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="rcard__media">
        {r.media?.kind === 'tv' && (
          <ResourceMediaTV caption={r.media.caption} duration={r.media.duration} accent={r.accent} />
        )}
        {r.media?.kind === 'video' && (
          <ResourceMediaVideo
            src={r.media.src}
            poster={r.media.poster}
            caption={r.media.caption}
            accent={r.accent}
            vertical={r.media.vertical}
          />
        )}
        {r.media?.kind === 'photo' && (
          <ResourceMediaPhoto src={r.media.src} caption={r.media.caption} accent={r.accent} />
        )}
        {r.media?.kind === 'ceremony' && (
          <ResourceMediaCeremony caption={r.media.caption} accent={r.accent} />
        )}
        {r.media?.kind === 'promo-h' && (
          <ResourceMediaTV caption={r.media.caption} duration={r.media.duration} accent={r.accent} />
        )}
        {r.person && <ResourcePerson person={r.person} accent={r.accent} />}
        {r.isBridge && (
          <div className="rcard__bridge">
            <p className="rcard__bridge-text">{r.body}</p>
            {r.badge && (
              <div className="rcard__badge rcard__badge--bridge">
                <div className="rcard__badge-value serif">{r.badge.value}</div>
                <div className="rcard__badge-label mono">{r.badge.label}</div>
              </div>
            )}
          </div>
        )}
      </div>

      {r.extraMedia?.kind === 'tv' && (
        <div className="rcard__extra">
          <ResourceMediaTV
            caption={r.extraMedia.caption}
            duration={r.extraMedia.duration}
            accent={r.accent}
          />
        </div>
      )}
      {r.extraMedia?.kind === 'video' && (
        <div className={`rcard__extra ${r.extraMedia.wide ? 'rcard__extra--wide' : ''}`}>
          <ResourceMediaVideo
            src={r.extraMedia.src}
            poster={r.extraMedia.poster}
            caption={r.extraMedia.caption}
            accent={r.accent}
          />
        </div>
      )}
      {r.photos && (
        <div className="rcard__extra rcard__extra--wide">
          <ResourcePhotos photos={r.photos} onOpen={(i) => onOpenPhotos(r.photos, i, r.title)} />
        </div>
      )}
      {r.reels && (
        <div className="rcard__reels">
          <ResourceReels rows={r.reels} accent={r.accent} onOpenReels={onOpenReels} />
        </div>
      )}
    </article>
  );
}

export default function Resources() {
  const [lb, setLb] = useState(null); // { items, index, caption }
  const openReels = (row, index) => {
    const { items, title, year } = REEL_ROWS[row];
    setLb({ items, index, caption: `${title} · ${year}` });
  };
  const openPhotos = (items, index, caption) => setLb({ items, index, caption });
  const closeLb = () => setLb(null);
  const lbStep = (d) =>
    setLb((s) => s && { ...s, index: (s.index + d + s.items.length) % s.items.length });

  return (
    <section id="resources" className="section section--resources" data-screen-label="05 Ресурсы">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="num">— 05 —</div>
            <h2>
              Ресурсы
              <br />
              проекта
            </h2>
          </div>
          <p className="lede">
            Опоры, на которых стоит «Берег Детства»: гранты, поддержка соседей, ресурсы
            администрации и команда. Без любой из них — проект не смог бы состояться.
          </p>
        </div>

        <div className="rcards">
          {RESOURCES.map((r, i) => (
            <ResourceCard
              key={r.n}
              r={r}
              idx={i}
              onOpenReels={openReels}
              onOpenPhotos={openPhotos}
            />
          ))}
        </div>
      </div>

      {lb && (
        <Lightbox
          photos={lb.items}
          index={lb.index}
          caption={lb.caption}
          onClose={closeLb}
          onPrev={() => lbStep(-1)}
          onNext={() => lbStep(1)}
          onSelect={(i) => setLb((s) => s && { ...s, index: i })}
        />
      )}
    </section>
  );
}
