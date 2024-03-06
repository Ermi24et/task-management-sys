module.exports = {
  apps : [{
    name: 'server',
    script: 'php',
    args: 'artisan serve',
    watch: './server',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    cwd: './server'
  },
    {
    name: 'client',
    script: 'npm',
    args: 'run dev',
    watch: './client',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    cwd: './client'
  }
  ]
}