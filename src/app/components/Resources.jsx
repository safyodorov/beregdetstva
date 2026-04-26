'use client';

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
      src: '/photos/resources/local-initiatives.mp4',
      poster: '/photos/resources/local-initiatives-poster.jpg',
      caption: 'Сюжет регионального ТВ',
    },
  },
  {
    n: '02',
    kicker: 'Гранты · экологическая программа',
    title: 'Цветущий город',
    body:
      'Победа в 2024 и 2025 годах. По программе ТОС получает посадочный материал, помощь в составлении проекта и мастер-классы по посадке от профессиональных ландшафтных дизайнеров.',
    badge: { value: '243', label: 'растения' },
    accent: '#385c3e',
    years: [
      { y: '2024', mark: 'победа' },
      { y: '2025', mark: 'победа' },
      { y: '2026', mark: 'участвуем снова' },
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
    reels: 8,
    media: { kind: 'promo-h', caption: 'Промо-ролик в поддержку проекта', duration: '1:12' },
  },
  {
    n: '04',
    kicker: 'Администрация поселения',
    title: 'Богданихское сельское поселение',
    body:
      'Ресурсная поддержка администрации — решение организационных и технических вопросов, помощь в подготовке основания и планировке территории. Настоящий речной песок, по которому босиком бегают наши дети — заслуга сельской администрации.',
    badge: { value: 'С. В.', label: 'глава поселения' },
    accent: '#5e3a2a',
    person: {
      name: 'Сергей Васильевич Машин',
      role: 'Глава Богданихского сельского поселения',
    },
  },
  {
    n: '05',
    kicker: 'Связующее звено',
    title: 'Команда ТОС «Новая Дерябиха»',
    body:
      'Восемь человек и сорок неравнодушных соседей, которые объединили все эти элементы и сделали невозможное возможным. О них — следующий раздел.',
    badge: { value: '8 + 40', label: 'соседей' },
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

function ResourceMediaVideo({ src, poster, caption, accent }) {
  return (
    <div className="rmedia rmedia--video" style={{ '--rmedia-accent': accent }}>
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

function ResourceReels({ count, accent }) {
  return (
    <div className="rreels">
      <div className="rreels__header">
        <div className="rreels__title mono">Промо-ролики · ВКонтакте</div>
        <div className="rreels__count mono">{count} вертикальных + 1 горизонтальный</div>
      </div>
      <div className="rreels__track">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="rreel rreel--v" style={{ '--reel-accent': accent }}>
            <div className="rreel__inner">
              <div className="rreel__noise" />
              <div className="rreel__num serif">{String(i + 1).padStart(2, '0')}</div>
              <div className="rreel__play">
                <svg viewBox="0 0 24 24">
                  <path d="M7 5v14l12-7z" />
                </svg>
              </div>
              <div className="rreel__waveform">
                {Array.from({ length: 22 }).map((_, k) => (
                  <span key={k} style={{ height: `${10 + ((i * 7 + k * 3) % 26)}px` }} />
                ))}
              </div>
              <div className="rreel__tag mono">VK · Reel</div>
              <div className="rreel__duration mono">
                0:{(15 + i * 4).toString().padStart(2, '0')}
              </div>
            </div>
          </div>
        ))}
        <div className="rreel rreel--h" style={{ '--reel-accent': accent }}>
          <div className="rreel__inner">
            <div className="rreel__noise" />
            <div className="rreel__num serif">+1</div>
            <div className="rreel__play rreel__play--big">
              <svg viewBox="0 0 24 24">
                <path d="M7 5v14l12-7z" />
              </svg>
            </div>
            <div className="rreel__tag mono">VK · горизонтальный</div>
            <div className="rreel__duration mono">2:18</div>
            <div className="rreel__caption mono">главный промо-ролик</div>
          </div>
        </div>
      </div>
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
        <div className="rperson__circle">
          <span className="rperson__init serif">{initials}</span>
        </div>
        <div className="rperson__tape mono">фото будет здесь</div>
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

function ResourceCard({ r, idx }) {
  const isLeft = idx % 2 === 0;
  return (
    <article
      className={`rcard ${isLeft ? '' : 'rcard--right'} ${r.isBridge ? 'rcard--bridge' : ''}`}
      style={{ '--rcard-accent': r.accent }}
    >
      <div className="rcard__num serif">{r.n}</div>
      <div className="rcard__body">
        <div className="rcard__kicker mono">{r.kicker}</div>
        <h3 className="rcard__title serif">{r.title}</h3>
        <p className="rcard__text">{r.body}</p>

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
        {r.extraMedia?.kind === 'tv' && (
          <div style={{ marginTop: 18 }}>
            <ResourceMediaTV
              caption={r.extraMedia.caption}
              duration={r.extraMedia.duration}
              accent={r.accent}
            />
          </div>
        )}
        {r.extraMedia?.kind === 'video' && (
          <div style={{ marginTop: 18 }}>
            <ResourceMediaVideo
              src={r.extraMedia.src}
              poster={r.extraMedia.poster}
              caption={r.extraMedia.caption}
              accent={r.accent}
            />
          </div>
        )}
        {r.reels && <ResourceReels count={r.reels} accent={r.accent} />}
        {r.person && <ResourcePerson person={r.person} accent={r.accent} />}
        {r.isBridge && (
          <div className="rcard__bridge">
            <div className="rcard__bridge-arrow">↓</div>
            <a href="#team" className="rcard__bridge-link mono">
              смотреть команду
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

export default function Resources() {
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
            <ResourceCard key={r.n} r={r} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
