'use client';

const TEAM = [
  { n: 'Сергей Фёдоров', r: 'Председатель ТОС', b: 'Собирает соседей и держит проект на плечах. Знает, какой лопатой копать и к кому идти в администрацию.', photo: '/photos/team/sergey-fedorov.jpg' },
  { n: 'Анна Куча', r: 'Координатор программ', b: 'Готовит заявки, сметы и отчёты. Умеет превращать «хотим площадку» в «вот документы, подписывайте».', photo: '/photos/team/anna-kucha.jpg' },
  { n: 'Татьяна Арефьева', r: 'Ландшафтный дизайнер', b: 'Автор схем «Цветущего города 2024–2026». Знает каждое растение в лицо и по латыни.' },
  { n: 'Юлия Налимова', r: 'Коммуникации', b: 'Фотографии, тексты, соцсети. Наш голос в интернете и в чате подъезда.', photo: '/photos/team/yulia-nalimova.jpg' },
  { n: 'Сергей Туманов', r: 'Администратор чатов и фоторепортёр', b: 'Держит дворовые чаты живыми и спокойными, фиксирует каждое событие на камеру. Если есть кадр — он есть благодаря Сергею.', photo: '/photos/team/sergey-tumanov.jpg' },
  { n: 'Алексей Чистяков', r: 'Техническая часть', b: 'Сборка, ремонт. Человек надёжный и чёткий как швейцарский нож.' },
  { n: 'Ангелина Горнушкина', r: 'Хранительница очага', b: 'Забота о каждом члене нашей команды, всегда рядом — поможет и поддержит.' },
  { n: 'Александр Горнушкин', r: 'Зелёный атаман', b: 'Лопата в его руках — как кисточка в руках художника: он не копает, он творит. Всегда бодр и добр!' },
  { n: 'Елена Козлова', r: 'Казначей', b: 'Ведёт бухгалтерию ТОС, следит за целевыми расходами и грантовой отчётностью. Каждый рубль — под роспись.', photo: '/photos/team/elena-kozlova.jpg' },
];

const TILTS = [-2.5, 1.8, -1.2, 2.2, -1.8, 1.5, -2.1, 1.3, -1.5];

export default function Team() {
  return (
    <section id="team" className="section section--team" data-screen-label="05 Команда">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="num">— 05 —</div>
            <h2>Команда</h2>
          </div>
          <p className="lede">
            Девять человек и больше 100 неравнодушных соседей. Без должностей, с ответственностью
            и любовью к своему дому, к своему микрорайону.
          </p>
        </div>

        <div className="polaroids">
          {TEAM.map((p, i) => (
            <figure
              key={p.n}
              className="polaroid"
              style={{ '--tilt': `${TILTS[i % TILTS.length]}deg` }}
            >
              <div className="polaroid__photo">
                <div className="polaroid__portrait">
                  {p.photo ? (
                    <img src={p.photo} alt={p.n} loading="lazy" className="polaroid__img" />
                  ) : (
                    <span className="polaroid__initials serif">
                      {p.n
                        .split(' ')
                        .map((w) => w[0])
                        .join('')}
                    </span>
                  )}
                  <div className="polaroid__portrait-wash" />
                </div>
                <div className="polaroid__tape" />
              </div>
              <figcaption className="polaroid__caption">
                <div className="polaroid__name serif">{p.n}</div>
                <div className="polaroid__role mono">{p.r}</div>
                <div className="polaroid__bio">{p.b}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
