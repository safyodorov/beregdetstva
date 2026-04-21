'use client';

const GALLERY_YEARS = [
  {
    year: '2022',
    kicker: 'Начало',
    note: 'Первые субботники, расчистка пустыря, идея «Берега».',
    items: [
      { kind: 'video', src: '/photos/red-leaves-frost.jpg', caption: 'Пустырь до расчистки', date: 'апр 2022', duration: '0:48' },
      { kind: 'photo', src: '/photos/playground-day.jpg', caption: 'Первый соседский сход', date: 'май 2022' },
      { kind: 'photo', src: '/photos/swings-through-trees.jpg', caption: 'Разметка территории', date: 'июн 2022' },
      { kind: 'photo', src: '/photos/lupines-sunset.jpg', caption: 'Вечер на заросшем берегу', date: 'июл 2022' },
    ],
  },
  {
    year: '2023',
    kicker: 'Стройка',
    note: 'Сборка игрового комплекса, покрытия, освещение, первые насаждения.',
    items: [
      { kind: 'photo', src: '/photos/playground-summer.jpg', caption: 'Первые качели', date: 'май 2023' },
      { kind: 'video', src: '/photos/playground-sunset.jpg', caption: 'Репортаж с монтажа', date: 'июн 2023', duration: '2:14' },
      { kind: 'photo', src: '/photos/swings-through-trees.jpg', caption: 'Песочные зоны', date: 'июл 2023' },
      { kind: 'photo', src: '/photos/spirea-pink.jpg', caption: 'Первая клумба', date: 'авг 2023' },
      { kind: 'photo', src: '/photos/playground-day.jpg', caption: 'Открытие площадки', date: 'сен 2023' },
    ],
  },
  {
    year: '2024',
    kicker: 'Цветущий город',
    note: 'Вход в программу, 1 200 однолетников вдоль улицы Парковой.',
    items: [
      { kind: 'photo', src: '/photos/spirea-pink.jpg', caption: 'Спирея в цвету', date: 'июн 2024' },
      { kind: 'photo', src: '/photos/lupines-sunset.jpg', caption: 'Люпины на закате', date: 'июл 2024' },
      { kind: 'video', src: '/photos/playground-summer.jpg', caption: 'Мастер-класс для детей', date: 'авг 2024', duration: '1:22' },
      { kind: 'photo', src: '/photos/red-leaves-frost.jpg', caption: 'Осенние краски', date: 'окт 2024' },
      { kind: 'photo', src: '/photos/playground-night.jpg', caption: 'Вечерняя подсветка', date: 'ноя 2024' },
    ],
  },
  {
    year: '2025',
    kicker: 'Многолетники',
    note: 'Пузыреплодник, спирея, ирисы, клёны Globosum. Структура пейзажа.',
    items: [
      { kind: 'photo', src: '/photos/swings-through-trees.jpg', caption: 'Тень от клёнов', date: 'май 2025' },
      { kind: 'photo', src: '/photos/playground-summer.jpg', caption: 'Ягодные острова', date: 'июн 2025' },
      { kind: 'video', src: '/photos/playground-sunset.jpg', caption: 'Квартальный субботник', date: 'июл 2025', duration: '3:05' },
      { kind: 'photo', src: '/photos/red-leaves-frost.jpg', caption: 'Первый иней', date: 'окт 2025' },
      { kind: 'photo', src: '/photos/playground-night.jpg', caption: 'Первый каток', date: 'дек 2025' },
      { kind: 'video', src: '/photos/lupines-sunset.jpg', caption: 'Годовой отчёт', date: 'дек 2025', duration: '4:30' },
    ],
  },
  {
    year: '2026',
    kicker: 'План',
    note: 'Зелёная лагуна, волнистый газон, многолетний цветник апрель–октябрь.',
    items: [
      { kind: 'photo', src: '/photos/playground-sunset.jpg', caption: 'Эскиз лагуны', date: 'план' },
      { kind: 'photo', src: '/photos/lupines-sunset.jpg', caption: 'Палитра сезона', date: 'план' },
      { kind: 'photo', src: '/photos/playground-day.jpg', caption: 'Зоны тихого отдыха', date: 'план' },
    ],
  },
];

function pluralize(n, forms) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return forms[2];
  if (mod10 === 1) return forms[0];
  if (mod10 >= 2 && mod10 <= 4) return forms[1];
  return forms[2];
}

function GalleryItem({ item }) {
  return (
    <figure className="gitem">
      <div className={`gitem__media ${item.kind === 'video' ? 'gitem__media--video' : ''}`}>
        <img src={item.src} alt={item.caption} loading="lazy" />
        {item.kind === 'video' && (
          <>
            <div className="gitem__veil" />
            <div className="gitem__play" aria-label="Проиграть видео">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 5v14l12-7z" />
              </svg>
            </div>
            <div className="gitem__badge mono">ВИДЕО</div>
            <div className="gitem__duration mono">{item.duration}</div>
          </>
        )}
      </div>
      <figcaption className="gitem__cap">
        <span className="mono gitem__date">{item.date}</span>
        <span className="gitem__title">{item.caption}</span>
      </figcaption>
    </figure>
  );
}

function GalleryYear({ data }) {
  const total = data.items.length;
  const videos = data.items.filter((i) => i.kind === 'video').length;
  const photos = total - videos;
  return (
    <div className="gyear">
      <div className="gyear__header">
        <div className="gyear__year serif">{data.year}</div>
        <div className="gyear__meta">
          <div className="gyear__kicker mono">{data.kicker}</div>
          <div className="gyear__note">{data.note}</div>
          <div className="gyear__count mono">
            {total} {pluralize(total, ['материал', 'материала', 'материалов'])}
            {videos > 0 && (
              <>
                {' '}
                · {videos} {pluralize(videos, ['видео', 'видео', 'видео'])}
              </>
            )}
            {photos > 0 && (
              <>
                {' '}
                · {photos} {pluralize(photos, ['фото', 'фото', 'фото'])}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="gyear__reel">
        <div className="gyear__track">
          {data.items.map((it, i) => (
            <GalleryItem key={i} item={it} />
          ))}
          <div className="gyear__endcap mono">
            <span>
              конец
              <br />
              {data.year}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="section section--gallery" data-screen-label="04 Галерея">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="num">— 04 —</div>
            <h2>Галерея по годам</h2>
          </div>
          <p className="lede">
            Фото- и видеохроника проекта с 2022 года. Каждый год — отдельная лента: прокрутите
            вправо, чтобы увидеть сезон целиком.
          </p>
        </div>

        <div className="gallery-stack">
          {GALLERY_YEARS.map((y) => (
            <GalleryYear key={y.year} data={y} />
          ))}
        </div>
      </div>
    </section>
  );
}
