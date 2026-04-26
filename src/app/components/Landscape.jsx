'use client';

import { useState } from 'react';

const YEARS = [
  {
    year: '2024',
    title: 'Каркас из деревьев и многолетников',
    desc:
      'Наш первый сезон в программе. Создали вертикальный скелет с помощью крупномерных саженцев клёнов остролистных, Royal Red, Drummondii, ивы Шаверина. Задали границы участка посадкой живых изгородей из пузыреплодника Lady in Red, и Ивы пурпурной на-на, использовали сортовые вейники, чтобы оживить пустое пятно у забора «Территории Заботы».',
    palette: ['#c24a4a', '#f5c945', '#7a1f1f', '#5a8862'],
    stats: [
      ['растений', '1 200'],
      ['метров', '120'],
      ['волонтёров', '18'],
    ],
    assortment: [
      'Петуния ампельная — 400 шт.',
      'Бархатцы низкорослые — 300 шт.',
      'Циния тонкоцветная — 250 шт.',
      'Колеус — 150 шт.',
      'Агератум — 100 шт.',
    ],
    photos: [
      '/photos/spirea-pink.jpg',
      '/photos/lupines-sunset.jpg',
      '/photos/red-leaves-frost.jpg',
      '/photos/playground-summer.jpg',
      '/photos/playground-day.jpg',
    ],
  },
  {
    year: '2025',
    title: 'Облако спирей и сиреней',
    desc:
      'Второй сезон участия в программе «Цветущий город». Добавили уровней и объема нашей площадке с помощью групповой посадки спирей соротов Zigeunerblut и Grefsheim. Появился средний ярус благодаря использованию многоствольных формы клёна приречного Ginnala и сиреней отечественно селекции. В качестве спокойного, но привлекающего внимания акцента посадили берёзу Schneverdinger Goldbirke.',
    palette: ['#7a1f1f', '#385c3e', '#c24a4a', '#6b5ca3'],
    stats: [
      ['растений', '2 400'],
      ['деревьев', '12'],
      ['сезонов цветения', '4'],
    ],
    assortment: [
      'Пузыреплодник «Diabolo» — 80 шт.',
      'Спирея японская — 60 шт.',
      'Ирис сибирский — 200 шт.',
      'Клён остролистный «Globosum» — 6 шт.',
      'Мискантус китайский — 40 шт.',
      'Шалфей дубравный — 180 шт.',
    ],
    photos: [
      '/photos/swings-through-trees.jpg',
      '/photos/playground-summer.jpg',
      '/photos/spirea-pink.jpg',
      '/photos/red-leaves-frost.jpg',
      '/photos/lupines-sunset.jpg',
    ],
  },
  {
    year: '2026',
    title: 'Зелёная лагуна и ягодные острова',
    desc:
      'Работаем над этапом «Зелёная лагуна»: волнистый газон, ягодные острова, многолетний цветник непрерывного цветения с апреля по октябрь.',
    palette: ['#5a8862', '#385c3e', '#7a1f1f', '#c9a77b'],
    stats: [
      ['растений', 'в плане'],
      ['деревьев', '20+'],
      ['стартуем', 'май 2026'],
    ],
    assortment: [
      'Пузыреплодник «Lady in Red» — 40 шт.',
      'Дёрен белый «Elegantissima» — 24 шт.',
      'Жимолость съедобная — 18 шт.',
      'Хоста разных сортов — 120 шт.',
      'Астильба — 200 шт.',
      'Вейник остроцветковый — 60 шт.',
    ],
    photos: [
      '/photos/lupines-sunset.jpg',
      '/photos/playground-day.jpg',
      '/photos/playground-sunset.jpg',
      '/photos/swings-through-trees.jpg',
      '/photos/playground-night.jpg',
    ],
  },
];

function MasonryGallery({ photos }) {
  return (
    <div className="masonry">
      {photos.map((p, i) => (
        <div
          key={p + i}
          className={`masonry__cell masonry__cell--${i % 5}`}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="photo">
            <img src={p} alt="" loading="lazy" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Landscape() {
  const [y, setY] = useState(1);
  const data = YEARS[y];

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
              onClick={() => setY(i)}
            >
              <span className="year-tab__year serif">{yr.year}</span>
              <span className="year-tab__title">{yr.title}</span>
            </button>
          ))}
        </div>

        <div className="year-content">
          <div className="year-intro">
            <h3 className="serif year-intro__h">{data.title}</h3>
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
            <div className="year-assortment__stamp seal">подписано · {data.year}</div>
          </div>
        </div>

        <MasonryGallery photos={data.photos} />
      </div>
    </section>
  );
}
