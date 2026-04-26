'use client';

import { useRef, useState } from 'react';
import Lightbox from './Lightbox';

const SUBBOTNIK_2024 = Array.from({ length: 71 }, (_, i) => `/photos/subbotnik/2024/${i + 1}.jpg`);

const YEARS = [
  {
    year: '2024',
    title: 'Каркас из деревьев и многолетников',
    desc:
      'Наш первый сезон в программе. Создали вертикальный скелет с помощью крупномерных саженцев клёнов остролистных, Royal Red, Drummondii, ивы Шверина. Задали границы участка посадкой живых изгородей из пузыреплодника Lady in Red, и Ивы пурпурной на-на, использовали сортовые вейники, чтобы оживить пустое пятно у забора «Территории Заботы».',
    palette: ['#c24a4a', '#f5c945', '#7a1f1f', '#5a8862'],
    stats: [
      ['растений', '76'],
      ['деревьев', '7'],
      ['сезон', 'первый'],
    ],
    assortment: [
      'Пузыреплодник калинолистный «Lady in Red» — 43 шт.',
      'Ива пурпурная «Nana» — 15 шт.',
      'Вейник остроцветковый «Karl Foerster» — 9 шт.',
      'Клён остролистный «Royal Red» — 2 шт.',
      'Клён «Drummondii» — 2 шт.',
      'Клён остролистный — 2 шт.',
      'Пузыреплодник калинолистный «Diabolo» — 2 шт.',
      'Ива Шверина — 1 шт.',
    ],
    plants: [
      '/photos/plants/2024/1.jpg',
      '/photos/plants/2024/2.jpg',
      '/photos/plants/2024/3.jpg',
      '/photos/plants/2024/4.jpg',
      '/photos/plants/2024/5.jpg',
      '/photos/plants/2024/6.jpg',
      '/photos/plants/2024/7.jpg',
      '/photos/plants/2024/8.jpg',
    ],
    subbotniks: SUBBOTNIK_2024,
  },
  {
    year: '2025',
    title: 'Облако спирей и сиреней',
    desc:
      'Второй сезон участия в программе «Цветущий город». Добавили уровней и объема нашей площадке с помощью групповой посадки спирей сортов Zigeunerblut и Grefsheim. Появился средний ярус благодаря использованию многоствольной формы клёна приречного Ginnala и сиреней отечественной селекции. В качестве спокойного, но привлекающего внимания акцента посадили берёзу Schneverdinger Goldbirke.',
    palette: ['#7a1f1f', '#385c3e', '#c24a4a', '#6b5ca3', '#d8d4cc', '#b5c47a'],
    stats: [
      ['растений', '167'],
      ['сортов сирени', '3'],
      ['сезон', 'второй'],
    ],
    assortment: [
      'Спирея японская «Zigeunerblut» — 150 шт.',
      'Спирея пепельная «Grefsheim» — 8 шт.',
      'Клён татарский «Ginnala» — 3 шт.',
      'Сирень обыкновенная «Красавица Москвы» — 2 шт.',
      'Сирень венгерская — 2 шт.',
      'Сирень «Знамя Ленина» — 1 шт.',
      'Берёза плакучая «Schneverdingen Goldbirke» — 1 шт.',
    ],
    plants: [
      '/photos/plants/2025/1.jpg',
      '/photos/plants/2025/2.jpg',
      '/photos/plants/2025/3.jpg',
      '/photos/plants/2025/4.jpg',
      '/photos/plants/2025/5.jpg',
      '/photos/plants/2025/6.jpg',
      '/photos/plants/2025/7.jpg',
    ],
    subbotniks: [],
  },
  {
    year: '2026',
    title: 'Зелёная лагуна и ягодные острова',
    desc:
      'Работаем над этапом «Зелёная лагуна»: волнистый газон, ягодные острова, многолетний цветник непрерывного цветения с апреля по октябрь.',
    palette: ['#5a8862', '#385c3e', '#7a1f1f', '#b89098', '#4a5e8a', '#2d1f2a', '#d8d4cc'],
    stats: [
      ['растений', '100'],
      ['ягодников', '36'],
      ['сезон', 'третий'],
    ],
    assortment: [
      'Спирея Дугласа — 50 шт.',
      'Чёрная смородина «Титания», «Дар Смольяниновой», «Селеченская-2» — 15 шт.',
      'Жимолость «Югана», «Восторг», «Дочь великана» / «Стрежевчанка» — 12 шт.',
      'Спирея серая «Grefsheim» — 10 шт.',
      'Ирга видовая — 5 шт.',
      'Черноплодная рябина «Хугин», «Черноокая» — 4 шт.',
      'Клён татарский «Ginnala» — 3 шт.',
      'Клён остролистный «Royal Red» — 1 шт.',
    ],
    plants: [
      '/photos/plants/2026/1.jpg',
      '/photos/plants/2026/2.jpg',
      '/photos/plants/2026/3.jpg',
      '/photos/plants/2026/4.jpg',
      '/photos/plants/2026/5.jpg',
      '/photos/plants/2026/6.jpg',
      '/photos/plants/2026/7.jpg',
      '/photos/plants/2026/8.jpg',
    ],
    subbotniks: [],
  },
];

function GalleryRow({ photos, captions, kind, label, perView, onOpen }) {
  const railRef = useRef(null);

  const scrollByOne = (dir) => {
    const el = railRef.current;
    if (!el) return;
    const first = el.firstChild;
    if (!first) return;
    const cellW = first.getBoundingClientRect().width;
    const gap = 14;
    el.scrollBy({ left: dir * (cellW + gap), behavior: 'smooth' });
  };

  return (
    <div className={`gallery-row gallery-row--${kind}`} style={{ '--per-view': perView }}>
      <button
        type="button"
        className="gallery-row__nav gallery-row__nav--prev"
        aria-label="Предыдущее"
        onClick={() => scrollByOne(-1)}
      >
        ‹
      </button>
      <div className="gallery-row__viewport" ref={railRef}>
        {photos.map((p, i) => (
          <button
            key={i}
            type="button"
            className="gallery-row__cell"
            onClick={() => onOpen(kind, i)}
          >
            <img src={p} alt={captions?.[i] || label} loading="lazy" />
            <div className="gallery-row__badge mono">
              <span>{label}</span>
              {photos.length > 1 && (
                <span className="gallery-row__count">
                  {i + 1}/{photos.length}
                </span>
              )}
            </div>
            {captions?.[i] && (
              <div className="gallery-row__caption">{captions[i]}</div>
            )}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="gallery-row__nav gallery-row__nav--next"
        aria-label="Следующее"
        onClick={() => scrollByOne(1)}
      >
        ›
      </button>
    </div>
  );
}

export default function Landscape() {
  const [y, setY] = useState(1);
  const [lb, setLb] = useState(null);
  const data = YEARS[y];

  const openLightbox = (kind, index) => {
    const photos = kind === 'plants' ? data.plants : data.subbotniks;
    setLb({ photos, index });
  };
  const closeLb = () => setLb(null);
  const prevLb = () => setLb((s) => s && { ...s, index: (s.index - 1 + s.photos.length) % s.photos.length });
  const nextLb = () => setLb((s) => s && { ...s, index: (s.index + 1) % s.photos.length });
  const selectLb = (i) => setLb((s) => s && { ...s, index: i });

  return (
    <section id="landscape" className="section section--landscape" data-screen-label="03 Ландшафт">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="num">— 03 —</div>
            <h2>Профессиональный ландшафтный дизайн</h2>
          </div>
          <p className="lede">
            Мы — участники программы <strong>«Цветущий город»</strong>. Это не про клумбы, а про
            концепцию «третьего места», т.е. места, где человек может и хочет провести время
            свободное от работы и домашних дел, места, где мысли и тело наполняются новыми силами,
            где можно черпать вдохновение.
          </p>
        </div>

        <div className="year-tabs">
          {YEARS.map((yr, i) => (
            <button
              key={yr.year}
              className={`year-tab ${i === y ? 'is-active' : ''}`}
              onClick={(e) => {
                setY(i);
                e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              }}
            >
              <span className="year-tab__year serif">{yr.year}</span>
              <span className="year-tab__title">{yr.title}</span>
            </button>
          ))}
        </div>

        <div className="year-content">
          <div className="year-intro">
            <h3 className="serif year-intro__h" id="year-intro-h">{data.title}</h3>
            <p className="year-intro__desc">{data.desc}</p>

            <div className="year-palette">
              <div className="mono year-palette__label">Палитра сезона</div>
              <div className="year-palette__row">
                {data.palette.map((c, i) => (
                  <span
                    key={i}
                    className="year-palette__chip"
                    style={{ background: c }}
                    title={c}
                  />
                ))}
              </div>
            </div>

            <div className="year-stats">
              {data.stats.map(([k, v], i) => (
                <div key={i} className="year-stats__cell">
                  <div className="year-stats__v serif">{v}</div>
                  <div className="year-stats__k mono">{k}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="year-assortment">
            <div className="year-assortment__header">
              <div className="mono">Ассортиментная ведомость</div>
              <div className="mono year-assortment__year">{data.year}</div>
            </div>
            <ul className="year-assortment__list">
              {data.assortment.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
            <div className="year-assortment__stamp seal">сезон · {data.year}</div>
          </div>
        </div>

        <div className="masonry">
          <GalleryRow
            key={`plants-${data.year}`}
            photos={data.plants}
            captions={data.assortment}
            kind="plants"
            label="Растения"
            perView={3}
            onOpen={openLightbox}
          />
          {data.subbotniks.length > 0 && (
            <GalleryRow
              key={`subbotniks-${data.year}`}
              photos={data.subbotniks}
              kind="subbotniks"
              label="Субботники"
              perView={2}
              onOpen={openLightbox}
            />
          )}
        </div>

        <div className="year-tabs year-tabs--bottom">
          {YEARS.map((yr, i) => (
            <button
              key={yr.year}
              className={`year-tab ${i === y ? 'is-active' : ''}`}
              onClick={() => {
                setY(i);
                document
                  .getElementById('year-intro-h')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <span className="year-tab__year serif">{yr.year}</span>
              <span className="year-tab__title">{yr.title}</span>
            </button>
          ))}
        </div>
      </div>
      {lb && (
        <Lightbox
          photos={lb.photos}
          index={lb.index}
          onClose={closeLb}
          onPrev={prevLb}
          onNext={nextLb}
          onSelect={selectLb}
        />
      )}
    </section>
  );
}
