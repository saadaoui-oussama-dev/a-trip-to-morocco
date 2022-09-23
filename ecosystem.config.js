module.exports = {
    apps: [
      {
        name: 'bactood-nuxt',
        exec_mode: 'cluster',
        script: './node_modules/nuxt/bin/nuxt.js',
        args: 'start'
      }
    ]
  }