# Берег Детства — лендинг

Сайт-история одного пустыря, который соседи превратили в детскую площадку и ландшафтный парк. Проект ТОС «Новая Дерябиха» (с. Богданиха, Ивановский район).

**Продакшн:** [https://берегдетства.рф](https://берегдетства.рф)

---

## Стек

| Компонент | Технология |
|-----------|-----------|
| Фронтенд | Next.js 14.2 (App Router), React 18 |
| Язык | JavaScript (JSX) — без TypeScript |
| Стили | Чистый CSS (2 файла, 1400+ строк из исходного прототипа) |
| Шрифты | Cormorant Garamond · Manrope · JetBrains Mono (Google Fonts) |
| Медиа | JPG-фото в `public/photos/`, MP4-видео — только на VPS |
| Деплой | VPS (Ubuntu), Nginx + PM2, Let's Encrypt |

Дизайн пришёл как HTML/CSS/JS-прототип из [Claude Design](https://claude.ai/design) и был портирован 1:1 в Next.js.

---

## Структура проекта

```
BeregDetstva/
├── src/app/
│   ├── layout.jsx              # Шрифты, мета, inline-скрипт для темы
│   ├── page.jsx                # Корневая страница — собирает секции
│   ├── icon.svg                # Фавиконка (бордовый круг с «Б»)
│   ├── apple-icon.png          # 180×180 иконка для iOS
│   ├── styles.css              # Дизайн-система: переменные, layout, nav, buttons
│   ├── sections.css            # Стили секций: hero, chapters, timeline, ...
│   └── components/
│       ├── Chrome.jsx          # Nav + SkyBackdrop + Stars + scroll-reveal
│       ├── Hero.jsx            # Hero с облаками, параллаксом и 72 травинками
│       ├── History.jsx         # 9 глав + галерея 1.1/1.5 + видео 1.3
│       ├── Stages.jsx          # 6 этапов проекта (таймлайн + схема)
│       ├── Landscape.jsx       # «Цветущий город» 2024-2026
│       ├── Gallery.jsx         # Ленты фото/видео по годам
│       ├── Team.jsx            # Полароиды команды ТОС
│       └── Thanks.jsx          # Благодарности + footer
├── public/
│   ├── photos/                 # Все фото проекта
│   │   ├── pustyr/             # Галерея главы 1.1 «Пустырь»
│   │   ├── sovet/              # Галерея главы 1.5 «Общественное обсуждение»
│   │   └── promo-poster.jpg    # Постер для промо-видео (кадр 4:38)
│   └── videos/                 # (не в git — >100МБ)
│       └── promo.mp4           # Промо-ролик 2020 года
├── deploy/
│   └── nginx.conf              # Vhost для /etc/nginx/sites-available/
├── ecosystem.config.js         # PM2-конфиг: порт 3001, процесс beregdetstva-site
├── next.config.mjs
├── jsconfig.json
├── package.json
└── package-lock.json
```

---

## Секции главной страницы

1. **Hero** — полноэкранный, фон-фото площадки на закате, облака-параллакс, 72 процедурных травинки с ветром, анимация появления заголовка.
2. **История (9 глав)** — пошаговая история проекта с параллакс-фото и прогресс-индикатором:
   - 1.1 **Пустырь** — галерея 6 фото (автолистание 3с, кроссфейд 1.8с, клик → лайтбокс)
   - 1.2 **Кадастровые сложности**
   - 1.3 **Промо-ролик** — встроенный `<video>` с постером (кадр 4:38)
   - 1.4 **Публичные слушания**
   - 1.5 **Общественное обсуждение** — галерея 6 фото
   - 1.6 **Первый шаг**
   - 1.7 **Местные инициативы**
   - 1.8 **Ландшафтный дизайн**
   - 1.9 **Взгляд в будущее**
3. **Этапы проекта (6)** — интерактивный горизонтальный таймлайн + схема + список оборудования. Последний этап — открытый вопрос соседям.
4. **Ландшафт** — программа «Цветущий город» по годам (2024-2026): палитра сезона, статистика, ассортиментная ведомость, masonry-галерея.
5. **Галерея по годам** — 2022-2026, горизонтальные ленты фото и видео.
6. **Команда** — 8 полароидов (инициалы на бордовом фоне, разный наклон).
7. **Спасибо** — список благодарностей + огромное «СПАСИБО» + footer с контактами.

---

## Интерактив

- **Тема день/ночь** — переключатель в навигации, сохраняется в `localStorage` под ключом `bd-theme`. При ночной теме небо затемняется, травинки становятся неоновыми, появляются мерцающие звёзды.
- **Scroll reveals** — появление секций по ходу скролла (IntersectionObserver в `Chrome.jsx`).
- **Параллакс** — в Hero-фото, главах Истории и облаках.
- **Лайтбокс** — полноэкранный просмотр фото с клавиатурой ←/→/Esc, показывает номер кадра из общего числа.
- **Автолистание** — галереи 1.1 и 1.5 сами листают кадры; пауза, пока открыт лайтбокс.

---

## Локальная разработка

**Требования:** Node.js 20+, npm.

```bash
npm install
npm run dev           # http://localhost:3000
npm run build         # production-сборка в .next/
npm start             # запуск продакшн-сборки локально
```

Исходные HTML/CSS/JS-прототипы (handoff-бандл от Claude Design) лежат локально в папке `beregdetstva/` (в git не попадают) — если они нужны, разверните заново из `BeregDetstva-handoff.zip`.

---

## Деплой на продакшн

Сервер: `root@155.212.133.103` (Ubuntu, Nginx, PM2).

```bash
# 1. Собрать
npm run build

# 2. Залить (без node_modules, .git, handoff-бандла)
rsync -az --delete \
  --exclude=node_modules \
  --exclude=.git \
  --exclude=beregdetstva \
  --exclude=public/videos \
  src public .next package.json package-lock.json \
  next.config.mjs jsconfig.json ecosystem.config.js deploy \
  root@155.212.133.103:/var/www/beregdetstva/

# 3. Обновить зависимости и перезапустить
ssh root@155.212.133.103 '\
  cd /var/www/beregdetstva && \
  npm ci --omit=dev && \
  pm2 restart beregdetstva-site \
'
```

### Расположение на сервере

| Ресурс | Путь / значение |
|---|---|
| Директория проекта | `/var/www/beregdetstva/` |
| PM2 процесс | `beregdetstva-site` (порт `3001`) |
| Nginx vhost | `/etc/nginx/sites-enabled/beregdetstva` |
| Сертификат | `/etc/letsencrypt/live/xn--80abddfeac9gokb.xn--p1ai/` |
| Лог PM2 | `pm2 logs beregdetstva-site` |

### Про видео

Файл `public/videos/promo.mp4` (~170 МБ) исключён из git (лимит GitHub 100 МБ). На прод загружается отдельно:

```bash
scp public/videos/promo.mp4 root@155.212.133.103:/var/www/beregdetstva/public/videos/
```

---

## Настройка с нуля (если разворачиваете на другой машине)

1. `git clone git@github.com:safyodorov/beregdetstva.git`
2. `cd beregdetstva && npm install`
3. Скопировать `promo.mp4` в `public/videos/` (не в git)
4. `npm run dev`

---

## Где что менять

| Хочу изменить... | Где |
|---|---|
| Текст главы Истории | `src/app/components/History.jsx` — массив `CHAPTERS` |
| Этап проекта | `src/app/components/Stages.jsx` — массив `STAGES` |
| Ассортимент / статистику по году | `src/app/components/Landscape.jsx` — массив `YEARS` |
| Фото в Галерее | `src/app/components/Gallery.jsx` — массив `GALLERY_YEARS` |
| Состав команды | `src/app/components/Team.jsx` — массив `TEAM` |
| Благодарности / контакты | `src/app/components/Thanks.jsx` — массив `THANKS` + footer |
| Навигационное меню | `src/app/components/Chrome.jsx` — блок `.nav__links` |
| Цвета и шрифты | `src/app/styles.css` — блок `:root { ... }` |

---

## Лицензия

Проект разработан для ТОС «Новая Дерябиха». Все права защищены.
