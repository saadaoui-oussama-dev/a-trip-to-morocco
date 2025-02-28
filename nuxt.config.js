export default {
  server: {
    port: process.env.NODE_ENV === 'production' ? 2338 : 3000,
  },
  head: {
    title: 'A Trip To Morocco',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'initial-scale=1.0, maximum-scale=1.0' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.ico' }],
  },
  css: [
    '~/static/global/libs/antd.css',
    '~/assets/styles/antd-theme.css',
    '~/assets/styles/main.css',
  ],
  plugins: ['@/plugins/ant-design-vue', '@/plugins/moment'],
  components: true,
  buildModules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    'cookie-universal-nuxt',
    'nuxt-izitoast',
  ],
  build: {},
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:1337/graphql',
      },
    },
  },
  izitoast: {
    position: 'bottomLeft',
    transitionIn: 'bounceInRight',
    transitionOut: 'fadeOutLeft',
  },
  googleFonts: {
    families: {
      Dosis: true,
      DavidLibre: true,
    },
  },
}
