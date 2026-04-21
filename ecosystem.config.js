module.exports = {
  apps: [
    {
      name: 'beregdetstva-site',
      cwd: '/var/www/beregdetstva',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3001',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      max_memory_restart: '512M',
      autorestart: true,
    },
  ],
};
