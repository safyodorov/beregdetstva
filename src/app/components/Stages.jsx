'use client';

import { useEffect, useRef, useState } from 'react';

const STAGES = [
  {
    id: 0,
    title: 'Площадка для самых маленьких',
    period: 'Этап 0',
    colour: '#c24a4a',
    desc:
      'Безопасный островок для детей 1–5 лет: песочница, качалки, мини-кухная, песочница, лабиринт и качелини. Сюда приходят мамы с колясками, родители с малышами, бабушки с внуками.',
    photoSchema: '/photos/stage0/plan.jpg',
    items: [
      {
        n: 'Качели двухсекционные «Гнездо»',
        size: '5330 × 2525 × 2355 мм',
        note: 'Артикул: 108.63.00',
        photo: '/photos/stage0/item-1.jpg',
      },
      {
        n: 'Качалка-пружина «Мотоцикл»',
        size: '850 × 430 × 846 мм',
        note: 'Артикул: 108.29.00-02',
        photo: '/photos/stage0/item-2.jpg',
      },
      {
        n: 'Качели двухсекционные',
        size: '2825 × 1472 × 2080 мм',
        note: 'Арт. 108.58.00',
        photo: '/photos/stage0/item-3.jpg',
      },
      {
        n: 'Стол со скамьями шахматный',
        size: '1494 × 1450 × 755 мм',
        note: 'Арт. 302.34.00-01',
        photo: '/photos/stage0/item-4.jpg',
      },
      {
        n: 'Лабиринт «Локомотив»',
        size: '2367 × 1080 × 750 мм',
        note: 'Арт. 206.09.00',
        photo: '/photos/stage0/item-5.jpg',
      },
      {
        n: 'Карусель низкая',
        size: 'Ø 1600 × 500 мм',
        note: 'Плавное вращение с ограничителем скорости.',
        photo: '/photos/stage0/item-6.jpg',
      },
      {
        n: 'Песочный столик',
        size: '1200 × 800 × 550 мм',
        note: 'С отсеком и крышкой на случай дождя.',
        photo: '/photos/stage0/item-7.jpg',
      },
      {
        n: 'Пружинная качалка «Ракета»',
        size: '800 × 350 × 750 мм',
        note: 'Одноместная, амортизатор с защитой от удара.',
        photo: '/photos/stage0/item-8.jpg',
      },
      {
        n: 'Мини-тоннель',
        size: '1500 × 800 × 800 мм',
        note: 'Проходной, с окошками по бокам.',
        photo: '/photos/stage0/item-9.jpg',
      },
    ],
  },
  {
    id: 1,
    title: 'Горки и игровые элементы',
    period: 'Этап 1',
    colour: '#7a1f1f',
    desc:
      'Главный разноцветный комплекс для дошкольников: горки, лабиринт, счёты, мостики. Тот самый, с фотографий.',
    items: [
      { n: 'Игровой комплекс «Радуга»', size: '5800 × 4200 × 3200 мм', note: 'Три уровня, две горки, лабиринт.' },
      { n: 'Качели двойные', size: '3200 × 1800 × 2200 мм', note: 'С резиновым покрытием под сиденьями.' },
      { n: 'Балансир-брёвна', size: '3000 × 400 мм', note: 'Переход между зонами.' },
      { n: 'Счёты уличные', size: '1000 × 200 × 1100 мм', note: 'Для малышей и бабушек.' },
    ],
  },
  {
    id: 2,
    title: 'Лазалки для детей постарше',
    period: 'Этап 2',
    colour: '#385c3e',
    desc:
      'Металлические пирамиды с канатами и гамаками. Для детей 7+ и подростков, которым мало «радуги».',
    items: [
      { n: 'Пирамида канатная «Парус»', size: '4000 × 4000 × 4500 мм', note: 'Страховочная сетка по периметру.' },
      { n: 'Гамак-карусель', size: 'Ø 1500 мм', note: 'Для компании из 3–4 детей.' },
      { n: 'Канатный мост', size: '3600 × 1200 × 2000 мм', note: 'Между двух опор.' },
      { n: 'Скалодром низкий', size: '2400 × 300 × 2200 мм', note: '14 зацепов, безопасное покрытие.' },
    ],
  },
  {
    id: 3,
    title: 'Ролики, самокаты, каток',
    period: 'Этап 3',
    colour: '#6b5ca3',
    desc:
      'Площадка двойного назначения: летом — гладкий асфальт для колёс, зимой — заливается каток. Низкий бортик держит лёд.',
    items: [
      { n: 'Покрытие асфальтобетон', size: '20 × 12 м', note: 'Идеально ровное, уклон 0,5 %.' },
      { n: 'Бортик деревянный', size: 'H = 250 мм', note: 'Съёмные секции на зиму.' },
      { n: 'Скамьи по периметру', size: '2000 × 500 × 450 мм', note: 'С подогревом? Пока мечта.' },
      { n: 'Освещение светодиодное', size: '4 опоры × 4 м', note: 'Катаемся после заката.' },
    ],
  },
  {
    id: 4,
    title: 'Зелёная лагуна и ягодные острова',
    period: 'Этап 4',
    colour: '#5a8862',
    desc:
      'Ландшафтная часть: волнистый газон, островки с жимолостью, крыжовником и ирисами. Здесь дети учатся узнавать растения.',
    items: [
      { n: '«Ягодный остров» (×3)', size: 'Ø 3 м', note: 'Жимолость, смородина, крыжовник.' },
      { n: 'Волны газона', size: '800 м²', note: 'Мятлик + овсяница, стрижка 2 раза в месяц.' },
      { n: 'Многолетники', size: '200+ растений', note: 'Ирисы, шалфей, астры, мискантусы.' },
      { n: 'Скамья-брус', size: '4000 × 500 мм', note: 'Из одного ствола старого дуба.' },
    ],
  },
  {
    id: 5,
    title: '???',
    period: 'Этап 5',
    colour: '#c9a77b',
    desc:
      'Пятый этап мы пока не нарисовали. Возможно, сцена для летних концертов. Возможно, беседка для чая. Возможно — то, что предложите вы.',
    items: [],
    open: true,
  },
];

function EquipCarousel({ items, stage }) {
  const railRef = useRef(null);
  const [pageSize, setPageSize] = useState(4);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const mm = window.matchMedia('(max-width: 820px)');
    const update = () => setPageSize(mm.matches ? 1 : 4);
    update();
    mm.addEventListener('change', update);
    return () => mm.removeEventListener('change', update);
  }, []);

  const pages = [];
  for (let i = 0; i < items.length; i += pageSize) {
    pages.push(items.slice(i, i + pageSize));
  }
  const pageCount = pages.length;

  useEffect(() => {
    setPage(0);
    if (railRef.current) railRef.current.scrollTo({ left: 0 });
  }, [pageSize]);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.clientWidth || 1;
      setPage(Math.round(el.scrollLeft / w));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollByPages = (dir) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <div className="equip-carousel">
      <div className="equip-carousel__rail" ref={railRef}>
        {pages.map((pg, pi) => (
          <div key={pi} className="equip-carousel__page">
            {pg.map((it, i) => (
              <div key={i} className="equip-card">
                <div
                  className="equip-card__photo"
                  style={
                    it.photo
                      ? undefined
                      : { background: `linear-gradient(135deg, ${stage.colour}22, ${stage.colour}08)` }
                  }
                >
                  {it.photo ? (
                    <img src={it.photo} alt={it.n} loading="lazy" />
                  ) : (
                    <EquipIcon idx={i} colour={stage.colour} />
                  )}
                </div>
                <div className="equip-card__body">
                  <div className="equip-card__name serif">{it.n}</div>
                  {it.size && <div className="equip-card__size mono">{it.size}</div>}
                  {it.note && <div className="equip-card__note">{it.note}</div>}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {pageCount > 1 && (
        <div className="equip-carousel__controls">
          <button
            type="button"
            className="equip-carousel__btn"
            aria-label="Назад"
            onClick={() => scrollByPages(-1)}
            disabled={page <= 0}
          >
            ‹
          </button>
          <div className="equip-carousel__dots mono">
            {page + 1} / {pageCount}
          </div>
          <button
            type="button"
            className="equip-carousel__btn"
            aria-label="Вперёд"
            onClick={() => scrollByPages(1)}
            disabled={page >= pageCount - 1}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

function EquipIcon({ idx, colour }) {
  const common = { stroke: colour, strokeWidth: 1.5, fill: 'none', strokeLinecap: 'round' };
  const icons = [
    <svg viewBox="0 0 60 60" key="0">
      <rect x="10" y="30" width="40" height="18" rx="3" {...common} />
      <path d="M 14 30 L 30 10 L 46 30" {...common} />
    </svg>,
    <svg viewBox="0 0 60 60" key="1">
      <circle cx="30" cy="30" r="14" {...common} />
      <path d="M 30 16 V 44 M 16 30 H 44" {...common} />
    </svg>,
    <svg viewBox="0 0 60 60" key="2">
      <path d="M 10 50 L 30 12 L 50 50 Z" {...common} />
      <path d="M 20 36 H 40" {...common} />
    </svg>,
    <svg viewBox="0 0 60 60" key="3">
      <path d="M 10 30 Q 30 10 50 30" {...common} />
      <circle cx="30" cy="30" r="3" fill={colour} />
    </svg>,
  ];
  return icons[idx % icons.length];
}

export default function Stages() {
  const [active, setActive] = useState(1);
  const stage = STAGES[active];

  return (
    <section id="stages" className="section section--stages" data-screen-label="02 Этапы">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="num">— 02 —</div>
            <h2>
              Проект.
              <br />
              Этапы
            </h2>
          </div>
          <p className="lede">
            Шесть пронумерованных этапов, от площадки для самых маленьких до открытого вопроса.
            Каждый этап — это план, список оборудования и реальные сроки.
          </p>
        </div>

        <div className="timeline" role="tablist">
          <div className="timeline__rail" />
          {STAGES.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={active === i}
              className={`timeline__node ${active === i ? 'is-active' : ''}`}
              onClick={() => setActive(i)}
              style={{ '--node-col': s.colour }}
            >
              <div className="timeline__dot">
                <span>{s.id}</span>
              </div>
              <div className="timeline__label">
                <div className="mono">{s.period}</div>
                <div className="timeline__label-title serif">
                  {s.title.split(' ').slice(0, 3).join(' ')}…
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="stage-panel" style={{ '--panel-col': stage.colour }}>
          <div className="stage-panel__head">
            <div className="stage-panel__eyebrow mono">{stage.period}</div>
            <h3 className="stage-panel__title serif">{stage.title}</h3>
            <p className="stage-panel__desc">{stage.desc}</p>
          </div>

          <div className="stage-panel__schema">
            <div className="stage-schema__frame">
              {stage.photoSchema ? (
                <img
                  src={stage.photoSchema}
                  alt={`Схема — ${stage.title}`}
                  className="stage-schema__img"
                  loading="lazy"
                />
              ) : (
                <svg viewBox="0 0 400 260" className="stage-schema__svg">
                  <defs>
                    <pattern
                      id={`grid-${stage.id}`}
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
                    </pattern>
                  </defs>
                  <rect width="400" height="260" fill={`url(#grid-${stage.id})`} />
                  <path
                    d="M 20 40 Q 100 20 200 30 T 380 50 Q 390 150 370 220 Q 200 250 40 230 Q 10 140 20 40 Z"
                    fill={stage.colour}
                    fillOpacity="0.06"
                    stroke={stage.colour}
                    strokeWidth="1.2"
                    strokeDasharray="3,2"
                  />
                  {Array.from({ length: 4 + stage.id }).map((_, i) => {
                    const cx = 60 + ((i * 67) % 300);
                    const cy = 70 + ((i * 53) % 140);
                    const r = 14 + (i % 3) * 6;
                    return (
                      <circle
                        key={i}
                        cx={cx}
                        cy={cy}
                        r={r}
                        fill={stage.colour}
                        fillOpacity="0.18"
                        stroke={stage.colour}
                        strokeWidth="1"
                      />
                    );
                  })}
                  <text x="30" y="30" fontSize="9" fill={stage.colour} fontFamily="monospace" letterSpacing="1">
                    {`PLAN · ЭТАП ${stage.id}`}
                  </text>
                  <text x="330" y="250" fontSize="9" fill={stage.colour} fontFamily="monospace" opacity="0.6">
                    1:200
                  </text>
                </svg>
              )}
            </div>
            <div className="stage-schema__caption mono">
              {stage.photoSchema ? '↑ общий план площадки' : '↑ схема размещения · масштаб 1:200'}
            </div>
          </div>

          <div className="stage-panel__equip">
            <div className="equip-header mono">Оборудование · {stage.items.length || '—'}</div>

            {stage.open ? (
              <div className="open-question">
                <div className="open-question__mark serif">?</div>
                <p className="open-question__text">
                  Напишите нам, каким должен быть <em>пятый этап</em>. Идея соседей превращается в
                  проект, а проект — в реальность.
                </p>
                <a className="btn btn--primary" href="mailto:tos@bereg-detstva.ru">
                  Предложить идею
                </a>
              </div>
            ) : (
              <EquipCarousel items={stage.items} stage={stage} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
