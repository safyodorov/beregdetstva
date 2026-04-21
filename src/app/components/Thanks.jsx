'use client';

const THANKS = [
  { n: 'Администрация Богданихского сельского поселения', note: 'За поддержку инициатив и решимость говорить «да».' },
  { n: 'Команда БФ «Ива»', note: 'За грантовую программу и методическую помощь.' },
  { n: 'Управляющая компания «МР Сервис»', note: 'За содержание территории и добрые руки.' },
  { n: 'Эггер', note: 'За материалы и дружественное соседство.' },
  { n: 'Все вы — наши соседи', note: 'Каждый субботник, каждая банка краски, каждое «я помогу».' },
];

export default function Thanks() {
  return (
    <section id="thanks" className="section section--thanks" data-screen-label="06 Благодарности">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="num">— 06 —</div>
            <h2>Спасибо</h2>
          </div>
          <p className="lede">
            Всё, что сделано, — сделано общими силами. Перечисляем тех, без кого «Берег Детства»
            остался бы черновиком.
          </p>
        </div>

        <div className="thanks-list">
          {THANKS.map((t, i) => (
            <div key={i} className="thanks-row">
              <div className="thanks-row__num serif">{String(i + 1).padStart(2, '0')}</div>
              <div className="thanks-row__name serif">{t.n}</div>
              <div className="thanks-row__note">{t.note}</div>
            </div>
          ))}
        </div>

        <div className="big-thanks serif">
          СПАСИБО<span className="big-thanks__dot" />
        </div>
      </div>

      <footer className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <div className="nav__brand-mark" style={{ width: 48, height: 48, fontSize: 22 }}>
              Б
            </div>
            <div>
              <div className="serif footer__title">Берег Детства</div>
              <div className="mono footer__sub">ТОС «Новая Дерябиха» · Ивановская область</div>
            </div>
          </div>
          <div className="footer__col">
            <div className="mono footer__label">Адрес</div>
            <div>с. Богданиха, микрорайон Новая Дерябиха</div>
          </div>
          <div className="footer__col">
            <div className="mono footer__label">Связь</div>
            <div>
              <a href="mailto:tos@bereg-detstva.ru">tos@bereg-detstva.ru</a>
            </div>
            <div>
              <a href="https://новаядерябиха.рф">новаядерябиха.рф</a>
            </div>
          </div>
          <div className="footer__col">
            <div className="mono footer__label">Проект</div>
            <div>берегдетства.рф</div>
            <div className="footer__year mono">© 2024–2026</div>
          </div>
        </div>
      </footer>
    </section>
  );
}
