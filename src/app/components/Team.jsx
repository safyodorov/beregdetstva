'use client';

const TEAM = [
  { n: 'Сергей Фёдоров', r: 'Председатель ТОС', b: 'Собирает соседей и держит проект на плечах. Знает, какой лопатой копать и к кому идти в администрацию.' },
  { n: 'Анна Куча', r: 'Координатор программ', b: 'Готовит заявки, сметы и отчёты. Умеет превращать «хотим площадку» в «вот документы, подписывайте».' },
  { n: 'Татьяна Арефьева', r: 'Ландшафтный дизайнер', b: 'Автор схем «Цветущего города 2024–2026». Знает каждое растение в лицо и по латыни.' },
  { n: 'Юлия Чистякова', r: 'Коммуникации', b: 'Фотографии, тексты, соцсети. Наш голос в интернете и в чате подъезда.' },
  { n: 'Алексей Чистяков', r: 'Техническая часть', b: 'Сборка, ремонт, сварка. Если где-то скрипит — идёт и чинит.' },
  { n: 'Ангелина Горнушкина', r: 'События и дети', b: 'Придумывает субботники, праздники, мастер-классы. Знает всех детей во дворе по именам.' },
  { n: 'Александр Горнушкин', r: 'Логистика и материалы', b: 'Привозит песок, доски, саженцы. Если надо — своим прицепом и в субботу.' },
  { n: 'Елена Козлова', r: 'Казначей', b: 'Ведёт бухгалтерию ТОС, следит за целевыми расходами и грантовой отчётностью. Каждый рубль — под роспись.' },
];

const TILTS = [-2.5, 1.8, -1.2, 2.2, -1.8, 1.5, -2.1, 1.3];

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
            Восемь человек и сорок неравнодушных соседей. Без должностей, с ответственностью. Это
            не организация — это <em>двор</em>.
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
                  <span className="polaroid__initials serif">
                    {p.n
                      .split(' ')
                      .map((w) => w[0])
                      .join('')}
                  </span>
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
