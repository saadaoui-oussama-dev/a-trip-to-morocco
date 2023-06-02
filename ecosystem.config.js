module.exports = {
  apps: [
    {
      name: 'attm-nuxt',
      exec_mode: 'cluster',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
