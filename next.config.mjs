/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Без этих правил браузер перевалидирует каждый файл при каждом открытии галерей.
  // Именные файлы (future.jpg, планы этапов, постеры) могут заменяться по месту — им сутки.
  // Альбомы субботников append-only (новые фото = новые папки/номера) — им месяц.
  // При совпадении путей побеждает последнее правило.
  async headers() {
    return [
      {
        source: '/:prefix(photos|videos)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/photos/subbotnik/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
